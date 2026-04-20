import { NextResponse } from "next/server";
import { imageToHeadSkin } from "@/lib/texture-generator";

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

    const token = process.env.MINESKIN_API_TOKEN;
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
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
                        const frame = {
                            x: item.x,
                            y: item.y,
                            imageBlock: item.imageBlock,
                        };
                        controller.enqueue(encoder.encode(JSON.stringify(frame) + "\n"));
                    }

                    const nextDelay = data.rateLimit?.delay?.millis || 1000;
                    await new Promise((resolve, reject) => {
                        const timeout = setTimeout(resolve, nextDelay);
                        const abortHandler = () => {
                            clearTimeout(timeout);
                            reject(new Error("AbortError"));
                        };

                        signal.addEventListener("abort", abortHandler, { once: true });
                        setTimeout(() => signal.removeEventListener("abort", abortHandler), nextDelay);
                    });
                } catch (error: any) {
                    if (error.name === "AbortError" || error.message === "AbortError") break;
                    console.error(`Frame error ${item.x}:${item.y}:`, error);
                }
            }

            controller.close();
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/plain",
            "X-Filename": filename,
        },
    });
  } catch (err: any) {
      console.error("Critical route error:", err);
      return NextResponse.json(
          { error: err.message || "Internal Server Error" },
          { status: 500 }
      );
  }
}