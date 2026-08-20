import { getSkinHead } from "@/lib/texture-generator"
import { enforceRateLimit } from "@/lib/rate-limit"
import { md5 } from "js-md5"

interface MinecraftProfile {
  id: string
  name: string
  properties?: Array<{ name: string; value: string }>
}

const RATE_LIMIT = { name: "mojang-info", limit: 60, windowMs: 60_000 }
const UPSTREAM_RATE_LIMIT = {
  name: "mojang-upstream",
  limit: 100,
  windowMs: 60_000,
  scope: "global" as const,
}

const MAX_IDENTIFIER_LENGTH = 64
const USERNAME_PATTERN = /^[A-Za-z0-9_]{1,16}$/
const UUID_PATTERN =
  /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i

const UPSTREAM_TIMEOUT_MS = 5000
const UPSTREAM_REVALIDATE = 600
const CACHE_CONTROL = "public, s-maxage=600, stale-while-revalidate=3600"

function formatUuid(uuid: string): string {
  if (uuid.includes("-")) return uuid
  return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`
}

function generateOfflineUuid(name: string): string {
  if (!name) return ""
  const str = "OfflinePlayer:" + name
  const bytes = Array.from(md5.array(str)) as number[]

  bytes[6] = (bytes[6] & 0x0f) | 0x30
  bytes[8] = (bytes[8] & 0x3f) | 0x80

  const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("")
  return formatUuid(hex)
}

async function fetchUpstream(url: string) {
  return fetch(url, {
    signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
    next: { revalidate: UPSTREAM_REVALIDATE },
  })
}

async function getMojangProfile(
  identifier: string
): Promise<MinecraftProfile | null> {
  let uuid = identifier

  if (!UUID_PATTERN.test(identifier)) {
    const res = await fetchUpstream(
      `https://api.mojang.com/users/profiles/minecraft/${encodeURIComponent(identifier)}`
    )
    if (!res.ok) return null

    const data = await res.json()
    if (typeof data?.id !== "string" || !UUID_PATTERN.test(data.id)) return null
    uuid = data.id
  }

  const profileRes = await fetchUpstream(
    `https://sessionserver.mojang.com/session/minecraft/profile/${encodeURIComponent(uuid.replace(/-/g, ""))}`
  )
  return profileRes.ok ? await profileRes.json() : null
}

async function extractHeadSrc(
  profile: MinecraftProfile
): Promise<string | null> {
  const textureProp = profile.properties?.find((p) => p.name === "textures")
  if (!textureProp || typeof textureProp.value !== "string") return null

  try {
    const decoded = JSON.parse(
      Buffer.from(textureProp.value, "base64").toString("utf-8")
    )
    const skinUrl = decoded.textures?.SKIN?.url
    return typeof skinUrl === "string" ? await getSkinHead(skinUrl) : null
  } catch {
    return null
  }
}

function offlineOnlyResponse(username: string) {
  return Response.json(
    {
      status: 404,
      nickname: username,
      uuid: "",
      offlineUuid: generateOfflineUuid(username),
      headSrc: null,
    },
    { headers: { "Cache-Control": CACHE_CONTROL } }
  )
}

export async function GET(request: Request) {
  const limited = enforceRateLimit(request, RATE_LIMIT)
  if (limited) return limited

  try {
    const { searchParams } = new URL(request.url)
    const username = searchParams.get("username")

    if (!username || username.length > MAX_IDENTIFIER_LENGTH) {
      return Response.json(
        { status: 400, error: "Username is required" },
        { status: 400, headers: { "Cache-Control": "no-store" } }
      )
    }

    if (!USERNAME_PATTERN.test(username) && !UUID_PATTERN.test(username)) {
      return offlineOnlyResponse(username)
    }

    const upstreamLimited = enforceRateLimit(request, UPSTREAM_RATE_LIMIT)
    if (upstreamLimited) return upstreamLimited

    const profile = await getMojangProfile(username)

    if (
      !profile ||
      typeof profile.id !== "string" ||
      typeof profile.name !== "string"
    ) {
      return offlineOnlyResponse(username)
    }

    return Response.json(
      {
        status: 200,
        uuid: formatUuid(profile.id),
        offlineUuid: generateOfflineUuid(profile.name),
        nickname: profile.name,
        headSrc: await extractHeadSrc(profile),
      },
      { headers: { "Cache-Control": CACHE_CONTROL } }
    )
  } catch (error) {
    console.error("[API_ERROR]:", error)
    return Response.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    )
  }
}
