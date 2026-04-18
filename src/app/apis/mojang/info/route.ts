import { getSkinHead } from "@/lib/texture-generator";
import { md5 } from "js-md5";

interface MinecraftProfile {
  id: string;
  name: string;
  properties?: Array<{ name: string; value: string }>;
}

function formatUuid(uuid: string): string {
  if (uuid.includes("-")) return uuid;
  return `${uuid.slice(0, 8)}-${uuid.slice(8, 12)}-${uuid.slice(12, 16)}-${uuid.slice(16, 20)}-${uuid.slice(20)}`;
}

function generateOfflineUuid(name: string): string {
  if (!name) return "";
  const str = "OfflinePlayer:" + name;
  const bytes = Array.from(md5.array(str)) as number[];

  bytes[6] = (bytes[6] & 0x0f) | 0x30;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");
  return formatUuid(hex);
}

function isUuid(value: string | null): boolean {
  if (!value) return false;
  return /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(
    value,
  );
}

async function getMojangProfile(
  identifier: string,
): Promise<MinecraftProfile | null> {
  let uuid = identifier;

  if (!isUuid(identifier)) {
    const res = await fetch(
      `https://api.mojang.com/users/profiles/minecraft/${identifier}`,
    );
    if (!res.ok) return null;
    const data = await res.json();
    uuid = data.id;
  }

  const profileRes = await fetch(
    `https://sessionserver.mojang.com/session/minecraft/profile/${uuid.replace(/-/g, "")}`,
  );
  return profileRes.ok ? await profileRes.json() : null;
}

async function extractHeadSrc(
  profile: MinecraftProfile,
): Promise<string | null> {
  const textureProp = profile.properties?.find((p) => p.name === "textures");
  if (!textureProp) return null;

  try {
    const decoded = JSON.parse(
      Buffer.from(textureProp.value, "base64").toString("utf-8"),
    );
    const skinUrl = decoded.textures?.SKIN?.url;
    return skinUrl ? await getSkinHead(skinUrl) : null;
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get("username");

    if (!username) {
      return Response.json(
        { status: 400, error: "Username is required" },
        { status: 400 },
      );
    }

    const profile = await getMojangProfile(username);

    if (!profile) {
      return Response.json({
        status: 404,
        nickname: username,
        uuid: "",
        offlineUuid: generateOfflineUuid(username),
        headSrc: null,
      });
    }

    return Response.json({
      status: 200,
      uuid: formatUuid(profile.id),
      offlineUuid: generateOfflineUuid(profile.name),
      nickname: profile.name,
      headSrc: await extractHeadSrc(profile),
    });
  } catch (error) {
    console.error("[API_ERROR]:", error);
    return Response.json(
      {
        status: 500,
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
