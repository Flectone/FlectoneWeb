import { NextResponse } from "next/server"

export interface RateLimitRule {
  name: string
  limit: number
  windowMs: number
  scope?: "ip" | "global"
}

interface Counter {
  count: number
  reset: number
}

interface Gate {
  active: number
  queue: Array<() => void>
}

const MAX_COUNTERS = 20000
const SWEEP_INTERVAL_MS = 60_000
const UNKNOWN_CLIENT_MULTIPLIER = 20

const counters = new Map<string, Counter>()
const gates = new Map<string, Gate>()

let nextSweep = 0

function sweep(now: number) {
  if (now < nextSweep) return
  nextSweep = now + SWEEP_INTERVAL_MS

  for (const [key, counter] of counters) {
    if (counter.reset <= now) counters.delete(key)
  }

  if (counters.size > MAX_COUNTERS) counters.clear()
}

export function getClientIp(request: Request): string {
  const headers = request.headers

  const cloudflare = headers.get("cf-connecting-ip")
  if (cloudflare) return cloudflare.trim()

  const real = headers.get("x-real-ip")
  if (real) return real.trim()

  const forwarded = headers.get("x-forwarded-for")
  if (forwarded) {
    const hops = forwarded
      .split(",")
      .map((hop) => hop.trim())
      .filter(Boolean)
    if (hops.length > 0) return hops[hops.length - 1]
  }

  return "unknown"
}

export function checkRateLimit(request: Request, rule: RateLimitRule) {
  const now = Date.now()
  sweep(now)

  const client = rule.scope === "global" ? "global" : getClientIp(request)
  const limit =
    client === "unknown" ? rule.limit * UNKNOWN_CLIENT_MULTIPLIER : rule.limit

  const key = `${rule.name}:${client}`
  const counter = counters.get(key)

  if (!counter || counter.reset <= now) {
    counters.set(key, { count: 1, reset: now + rule.windowMs })
    return { allowed: true, retryAfter: 0 }
  }

  counter.count += 1

  if (counter.count > limit) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((counter.reset - now) / 1000)),
    }
  }

  return { allowed: true, retryAfter: 0 }
}

export function enforceRateLimit(
  request: Request,
  rule: RateLimitRule
): NextResponse | null {
  const result = checkRateLimit(request, rule)
  if (result.allowed) return null

  return NextResponse.json(
    { error: "Too many requests" },
    {
      status: 429,
      headers: {
        "Retry-After": String(result.retryAfter),
        "Cache-Control": "no-store",
      },
    }
  )
}

export async function acquireSlot(
  name: string,
  max: number,
  maxQueue: number,
  queueTimeoutMs: number
): Promise<(() => void) | null> {
  let gate = gates.get(name)
  if (!gate) {
    gate = { active: 0, queue: [] }
    gates.set(name, gate)
  }

  const current = gate
  const mustWait = current.active >= max

  if (mustWait) {
    if (current.queue.length >= maxQueue) return null

    const granted = await new Promise<boolean>((resolve) => {
      const waiter = () => {
        clearTimeout(timer)
        resolve(true)
      }
      const timer = setTimeout(() => {
        const index = current.queue.indexOf(waiter)
        if (index !== -1) current.queue.splice(index, 1)
        resolve(false)
      }, queueTimeoutMs)

      current.queue.push(waiter)
    })

    if (!granted) return null
  } else {
    current.active += 1
  }

  let released = false
  return () => {
    if (released) return
    released = true

    const next = current.queue.shift()
    if (next) next()
    else current.active -= 1
  }
}
