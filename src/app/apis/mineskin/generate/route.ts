import { NextResponse } from "next/server";
import { imageToHeadSkin } from "@/actions/texture-generator";

const MINESKIN_API_URL = "https://api.mineskin.org/v2/generate";

export async function POST(req: Request) {
  const signal = req.signal;

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;

    if (!file || file.size === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const filename = file.name.split(".").slice(0, -1).join(".") || "skin";

    const processedData = await imageToHeadSkin(file);

    if (!processedData || "error" in processedData) {
      return NextResponse.json(
        { error: processedData?.error || "Processing failed" },
        { status: 400 },
      );
    }

    const imageArray = processedData.imageArray || [];
    if (imageArray.length === 0) {
      return NextResponse.json(
        { error: "No images found in array" },
        { status: 400 },
      );
    }

    const frames = [];
    const token = process.env.MINESKIN_API_TOKEN;

    for (const item of imageArray) {
      if (signal.aborted) break;

      try {
        const fetchResponse = await fetch(MINESKIN_API_URL, {
          method: "POST",
          signal,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            variant: "classic",
            visibility: "public",
            url: item.skin,
          }),
        });

        const data = await fetchResponse.json();

        if (data.success && data.skin) {
          frames.push({
            x: item.x,
            y: item.y,
            value: data.skin.texture.data.value,
          });
        } else {
          console.error("Mineskin API returned success:false", data);
        }

        const nextDelay = data.rateLimit?.delay?.millis || 1000;
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, nextDelay);
          const abortHandler = () => {
            clearTimeout(timeout);
            reject(new Error("AbortError"));
          };
          signal.addEventListener("abort", abortHandler, { once: true });
          setTimeout(
            () => signal.removeEventListener("abort", abortHandler),
            nextDelay,
          );
        });
      } catch (error: any) {
        if (error.name === "AbortError" || error.message === "AbortError") {
          break;
        }
        console.error(`Ошибка кадра ${item.x}:${item.y}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      data: { lastModified: Date.now(), frames },
      imageArray: imageArray,
      filename,
    });
  } catch (err: any) {
    console.error("Критическая ошибка роута:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 },
    );
  }
}
