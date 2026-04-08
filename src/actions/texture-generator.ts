"use server";
import sharp from "sharp";
sharp.cache(false);

export async function getSkinHead(url: string) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const image = Buffer.from(arrayBuffer);

  let headImage = await sharp(image)
    .extract({
      left: 8,
      top: 8,
      width: 8,
      height: 8,
    })
    .resize(64, 64, {
      kernel: sharp.kernel.nearest,
      fit: "fill",
    })
    .png()
    .toBuffer();

  return `data:image/png;base64,${headImage.toString("base64")}`;
}

export async function imageToHeadSkin(file: File) {
  const image = Buffer.from(await file.arrayBuffer());

  const [imageHeignt, imageWidth] = [
    (await sharp(image).metadata()).height,
    (await sharp(image).metadata()).width,
  ];
  if (imageHeignt % 8 != 0 || imageWidth % 8 != 0) {
    return { error: 422 };
  }
  const imageArray = [];

  for (let [y, posY] = [0, 0]; y < imageHeignt; [y, posY] = [y + 8, posY + 1]) {
    for (
      let [x, posX] = [0, 0];
      x < imageWidth;
      [x, posX] = [x + 8, posX + 1]
    ) {
      const width = 8;
      const height = 8;

      try {
        let skinImage = sharp(image)
          .extract({
            left: x,
            top: y,
            width: width,
            height: height,
          })
          .flatten({ background: "#000000" });

        const imageBlock = await sharp(image)
          .extract({
            left: x,
            top: y,
            width: width,
            height: height,
          })
          .resize(64, 64, {
            kernel: sharp.kernel.nearest,
            fit: "fill",
          })
          .flatten({ background: "#000000" })
          .toBuffer();

        let SkinHeadImage = await skinImage
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
          skin: `data:image/png;base64,${SkinHeadImage.toString("base64")}`,
          x: posX,
          y: posY,
          imageBlock: `data:${file.type};base64,${imageBlock.toString("base64")}`,
        });
      } catch (error) {
        console.error(`Error when processing the block (${x},${y}):`, error);
      }
    }
  }

  return { imageArray };
}

export interface imageToHeadSkinResult {
  imageArray: {
    skin: string;
    x: number;
    y: number;
    imageBlock: string;
  }[];
}

export async function MainSkin(prevState: any, formData: FormData) {
  const file = formData.get("image") as File;
  if (!file || file.size === 0) return { error: 404 };
  const filename = file.name.split(".").slice(0, -1).join(".");
  const processedData = await imageToHeadSkin(file);
  const frames = [];

  if (processedData?.imageArray) {
    for (const item of processedData.imageArray) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Accept", "application/json");
        myHeaders.append(
          "Authorization",
          `Bearer ${process.env.MINESKIN_API_TOKEN}`,
        );

        const fetchResponse = await fetch(
          "https://api.mineskin.org/v2/generate",
          {
            method: "POST",
            headers: myHeaders,
            body: JSON.stringify({
              variant: "classic",
              visibility: "public",
              url: item.skin,
            }),
          },
        );

        const data = await fetchResponse.json();

        if (data.success && data.skin) {
          frames.push({
            x: item.x,
            y: item.y,
            value: data.skin.texture.data.value,
          });
        }

        const nextDelay = data.rateLimit?.delay?.millis || 0;
        if (nextDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, nextDelay));
        }
      } catch (error) {
        console.error(
          `Error creating skin for block ${item.x}:${item.y}`,
          error,
        );
      }
    }
  }

  const finalResult = {
    lastModified: Date.now(),
    frames: frames,
  };

  return {
    success: true,
    data: finalResult,
    imageArray: processedData?.imageArray,
    filename: filename,
  };
}
