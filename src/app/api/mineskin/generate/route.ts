import { NextResponse } from "next/server"
import { imageToHeadSkin } from "@/lib/texture-generator"
import { acquireSlot, enforceRateLimit } from "@/lib/rate-limit"
import { signSkin, verifySkin } from "@/lib/skin-signature"

const MINESKIN_API_URL = "https://api.mineskin.org/v2/generate"

const REQUEST_RATE_LIMIT = {
  name: "mineskin-request",
  limit: 150,
  windowMs: 60_000,
}
const UPLOAD_RATE_LIMIT = {
  name: "mineskin-upload",
  limit: 10,
  windowMs: 60_000,
}
const GENERATE_RATE_LIMIT = {
  name: "mineskin-generate",
  limit: 120,
  windowMs: 60_000,
}

const MAX_BODY_BYTES = 3 * 1024 * 1024
const MAX_SKIN_DATA_URL_LENGTH = 512 * 1024
const SKIN_DATA_URL_PATTERN = /^data:image\/png;base64,[A-Za-z0-9+/]+={0,2}$/

const UPLOAD_SLOT = {
  name: "mineskin-upload",
  max: 2,
  queue: 8,
  timeoutMs: 15_000,
}
const UPSTREAM_TIMEOUT_MS = 20_000

const NO_STORE = { "Cache-Control": "no-store" }

export async function POST(req: Request) {
  const limitedRequest = enforceRateLimit(req, REQUEST_RATE_LIMIT)
  if (limitedRequest) return limitedRequest

  const declaredLength = Number(req.headers.get("content-length"))
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return NextResponse.json(
      { status: 413, error: "Payload too large" },
      { status: 413, headers: NO_STORE }
    )
  }

  try {
    const formData = await req.formData()
    const entry = formData.get("image")
    const skinUrl = formData.get("skin")

    if (entry && typeof entry !== "string") {
      const file = entry as File

      const limited = enforceRateLimit(req, UPLOAD_RATE_LIMIT)
      if (limited) return limited

      if (file.size === 0) {
        return NextResponse.json(
          { status: 404, error: "File not found" },
          { status: 404, headers: NO_STORE }
        )
      }

      if (file.size > MAX_BODY_BYTES) {
        return NextResponse.json(
          { status: 413, error: "Payload too large" },
          { status: 413, headers: NO_STORE }
        )
      }

      const release = await acquireSlot(
        UPLOAD_SLOT.name,
        UPLOAD_SLOT.max,
        UPLOAD_SLOT.queue,
        UPLOAD_SLOT.timeoutMs
      )

      if (!release) {
        return NextResponse.json(
          { status: 503, error: "Server busy" },
          { status: 503, headers: { ...NO_STORE, "Retry-After": "10" } }
        )
      }

      try {
        const processedData = await imageToHeadSkin(file)

        if ("error" in processedData) {
          return NextResponse.json(
            { status: processedData.status, error: processedData.error },
            { status: processedData.status, headers: NO_STORE }
          )
        }

        const imageArray = processedData.imageArray || []
        if (imageArray.length === 0) {
          return NextResponse.json(
            { status: 400, error: "No images found in array" },
            { status: 400, headers: NO_STORE }
          )
        }

        const filename = file.name.split(".").slice(0, -1).join(".") || "skin"
        return NextResponse.json(
          {
            imageArray: imageArray.map((item) => ({
              ...item,
              signature: signSkin(item.skin),
            })),
            filename: filename.replace(/[^\w.-]+/g, "_"),
          },
          { headers: NO_STORE }
        )
      } finally {
        release()
      }
    }

    if (typeof skinUrl === "string") {
      const limited = enforceRateLimit(req, GENERATE_RATE_LIMIT)
      if (limited) return limited

      if (
        skinUrl.length > MAX_SKIN_DATA_URL_LENGTH ||
        !SKIN_DATA_URL_PATTERN.test(skinUrl)
      ) {
        return NextResponse.json(
          { status: 400, error: "Invalid skin data" },
          { status: 400, headers: NO_STORE }
        )
      }

      const signature = formData.get("signature")

      if (typeof signature !== "string" || !verifySkin(skinUrl, signature)) {
        return NextResponse.json(
          { status: 403, error: "Invalid skin signature" },
          { status: 403, headers: NO_STORE }
        )
      }

      const token = process.env.MINESKIN_API_TOKEN
      if (!token) {
        return NextResponse.json(
          { status: 503, error: "Service unavailable" },
          { status: 503, headers: NO_STORE }
        )
      }

      const fetchResponse = await fetch(MINESKIN_API_URL, {
        method: "POST",
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          variant: "classic",
          visibility: "public",
          url: skinUrl,
        }),
      })

      const data = await fetchResponse.json().catch(() => null)
      const texture = data?.skin?.texture?.data?.value
      const delay = data?.rateLimit?.delay?.millis || 1000

      if (!fetchResponse.ok || !data?.success || typeof texture !== "string") {
        return NextResponse.json(
          { success: false, delay },
          { headers: NO_STORE }
        )
      }

      return NextResponse.json(
        { success: true, delay, skin: texture },
        { headers: NO_STORE }
      )
    }

    return NextResponse.json(
      { status: 400, error: "Invalid request" },
      { status: 400, headers: NO_STORE }
    )
  } catch (err: unknown) {
    console.error("Route error:", err)
    return NextResponse.json(
      { status: 500, error: "Internal Server Error" },
      { status: 500, headers: NO_STORE }
    )
  }
}
