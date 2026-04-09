"use server";
import sharp from "sharp";

sharp.cache(false);

const MAX_IMAGE_SIZE = 256;
const MINESKIN_API_URL = "https://api.mineskin.org/v2/generate";

export async function getSkinHead(url: string) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 секунд таймаут

    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeout);

    if (!response.ok) throw new Error("Failed to fetch image");

    const arrayBuffer = await response.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const headImage = await sharp(imageBuffer)
      .extract({ left: 8, top: 8, width: 8, height: 8 })
      .resize(64, 64, { kernel: sharp.kernel.nearest, fit: "fill" })
      .png()
      .toBuffer();

    return `data:image/png;base64,${headImage.toString("base64")}`;
  } catch (error) {
    console.error("getSkinHead error:", error);
    return null;
  }
}

export async function imageToHeadSkin(file: File) {
  if (!file.type.startsWith("image/"))
    return { status: 415, error: "Invalid file type" };

  const imageBuffer = Buffer.from(await file.arrayBuffer());
  try {
    await sharp(imageBuffer).metadata();
  } catch (error) {
    return { status: 400, error: "Invalid image file" };
  }
  const metadata = await sharp(imageBuffer).metadata();

  if (!metadata.width || !metadata.height)
    return { status: 400, error: "Invalid image metadata" };

  if (metadata.width > MAX_IMAGE_SIZE || metadata.height > MAX_IMAGE_SIZE) {
    return { status: 413, error: "Image too large. Max 256x256 pixels." };
  }

  if (metadata.height % 8 !== 0 || metadata.width % 8 !== 0) {
    return { status: 422, error: "Image dimensions must be divisible by 8." };
  }

  const imageArray = [];

  for (let y = 0; y < metadata.height; y += 8) {
    for (let x = 0; x < metadata.width; x += 8) {
      try {
        const posX = x / 8;
        const posY = y / 8;

        const imageBlockBuffer = await sharp(imageBuffer)
          .extract({ left: x, top: y, width: 8, height: 8 })
          .resize(64, 64, { kernel: sharp.kernel.nearest, fit: "fill" })
          .flatten({ background: "#000000" })
          .toBuffer();

        const skinHeadImageBuffer = await sharp(imageBuffer)
          .extract({ left: x, top: y, width: 8, height: 8 })
          .flatten({ background: "#000000" })
          .extend({
            top: 8,
            left: 8,
            right: 48,
            bottom: 48,
            background: { r: 0, g: 0, b: 0, alpha: 1 },
          })
          .png()
          .toBuffer();

        imageArray.push({
          skin: `data:image/png;base64,${skinHeadImageBuffer.toString("base64")}`,
          x: posX,
          y: posY,
          imageBlock: `data:${file.type};base64,${imageBlockBuffer.toString("base64")}`,
        });
      } catch (err) {
        console.error(`Error processing block at ${x},${y} - ${err}`);
      }
    }
  }

  return { imageArray };
}
