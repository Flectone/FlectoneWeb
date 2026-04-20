import { NextResponse } from "next/server";
import { imageToHeadSkin } from "@/lib/texture-generator";

const MINESKIN_API_URL = "https://api.mineskin.org/v2/generate";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("image") as File | null;
        const skinUrl = formData.get("skin") as string | null;

        if (file) {
            if (file.size === 0) {
                return NextResponse.json({ error: "File not found" }, { status: 404 });
            }

            const processedData = await imageToHeadSkin(file);

            if (!processedData || "error" in processedData) {
                return NextResponse.json(
                    { error: processedData?.error || "Processing failed" },
                    { status: 400 },
                );
            }

            const imageArray = processedData.imageArray || [];
            if (imageArray.length === 0) {
                return NextResponse.json({ error: "No images found in array" }, { status: 400 });
            }

            const filename = file.name.split(".").slice(0, -1).join(".") || "skin";
            return NextResponse.json({ imageArray, filename });
        }

        if (skinUrl) {
            const token = process.env.MINESKIN_API_TOKEN;

            const fetchResponse = await fetch(MINESKIN_API_URL, {
                method: "POST",
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
            });

            const data = await fetchResponse.json();

            if (!data.success || !data.skin) {
                return NextResponse.json({ success: false });
            }

            return NextResponse.json({
                success: true,
                delay: data.rateLimit?.delay?.millis || 1000,
            });
        }

        return NextResponse.json({ error: "Invalid request" }, { status: 400 });

    } catch (err: any) {
        console.error("Route error:", err);
        return NextResponse.json({ error: err.message || "Internal Server Error" }, { status: 500 });
    }
}