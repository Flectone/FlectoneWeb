import sharp from "sharp"

sharp.cache(false)
sharp.concurrency(1)

const SHARP_INPUT = { limitInputPixels: 4096 * 4096 } as const

const SKIN_FETCH_TIMEOUT_MS = 5000
const MAX_SKIN_BYTES = 2 * 1024 * 1024
const MAX_UPLOAD_BYTES = 2 * 1024 * 1024
const MAX_IMAGE_SIDE = 256

const ALLOWED_TEXTURE_HOSTS = new Set([
  "textures.minecraft.net",
  "assets.mojang.com",
])

function isAllowedTextureUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return (
      parsed.protocol === "https:" && ALLOWED_TEXTURE_HOSTS.has(parsed.hostname)
    )
  } catch {
    return false
  }
}

export async function getSkinHead(url: string) {
  if (!isAllowedTextureUrl(url)) return null

  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(SKIN_FETCH_TIMEOUT_MS),
      redirect: "error",
    })

    if (!response.ok) throw new Error("Failed to fetch image")

    const declaredLength = Number(response.headers.get("content-length"))
    if (Number.isFinite(declaredLength) && declaredLength > MAX_SKIN_BYTES) {
      throw new Error("Image too large")
    }

    const arrayBuffer = await response.arrayBuffer()
    if (arrayBuffer.byteLength > MAX_SKIN_BYTES) {
      throw new Error("Image too large")
    }

    const imageBuffer = Buffer.from(arrayBuffer)

    const headImage = await sharp(imageBuffer, SHARP_INPUT)
      .extract({ left: 8, top: 8, width: 8, height: 8 })
      .resize(64, 64, { kernel: sharp.kernel.nearest, fit: "fill" })
      .png()
      .toBuffer()

    return `data:image/png;base64,${headImage.toString("base64")}`
  } catch (error) {
    console.error("getSkinHead error:", error)
    return null
  }
}

export async function imageToHeadSkin(file: File) {
  if (!file.type.startsWith("image/"))
    return { status: 415, error: "Invalid file type" }

  if (file.size > MAX_UPLOAD_BYTES)
    return { status: 413, error: "File too large" }

  const imageBuffer = Buffer.from(await file.arrayBuffer())

  const metadata = await sharp(imageBuffer, SHARP_INPUT)
    .metadata()
    .catch(() => null)

  if (!metadata) return { status: 400, error: "Invalid image file" }

  if (!metadata.width || !metadata.height)
    return { status: 400, error: "Invalid image metadata" }

  if (metadata.width > MAX_IMAGE_SIDE || metadata.height > MAX_IMAGE_SIDE) {
    return { status: 413, error: "Image too large. Max 256x256 pixels." }
  }

  if (metadata.height % 8 !== 0 || metadata.width % 8 !== 0) {
    return { status: 422, error: "Image dimensions must be divisible by 8." }
  }

  const imageArray = []

  for (let y = 0; y < metadata.height; y += 8) {
    for (let x = 0; x < metadata.width; x += 8) {
      try {
        const posX = x / 8
        const posY = y / 8

        const imageBlockBuffer = await sharp(imageBuffer, SHARP_INPUT)
          .extract({ left: x, top: y, width: 8, height: 8 })
          .resize(64, 64, { kernel: sharp.kernel.nearest, fit: "fill" })
          .flatten({ background: "#000000" })
          .png()
          .toBuffer()

        const skinHeadImageBuffer = await sharp(imageBuffer, SHARP_INPUT)
          .extract({ left: x, top: y, width: 8, height: 8 })
          .flatten({ background: "#000000" })
          .extend({
            top: 8,
            left: 8,
            right: 48,
            bottom: 48,
            background: { r: 0, g: 0, b: 0, alpha: 0 },
          })
          .png()
          .toBuffer()

        imageArray.push({
          skin: `data:image/png;base64,${skinHeadImageBuffer.toString("base64")}`,
          x: posX,
          y: posY,
          imageBlock: `data:image/png;base64,${imageBlockBuffer.toString("base64")}`,
        })
      } catch (err) {
        console.error(`Error processing block at ${x},${y} - ${err}`)
      }
    }
  }

  return { imageArray }
}
