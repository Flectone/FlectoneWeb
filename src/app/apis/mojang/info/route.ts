import { getSkinHead } from "@/actions/texture-generator";
import { md5 } from "js-md5";

function generateOfflineUuid(name: string) {
  if (!name) return "";

  const str = "OfflinePlayer:" + name;

  const bytes = (md5 as any).array(str) as number[];

  bytes[6] = (bytes[6] & 0x0f) | 0x30;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = bytes.map((b) => b.toString(16).padStart(2, "0")).join("");

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

export async function GET(request: { url: string | URL }) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  const uuidFetch = await fetch(
    `https://api.mojang.com/users/profiles/minecraft/${username}`,
  );
  const uuidRes = await uuidFetch.json();
  if (uuidFetch.status === 404) {
    const offlineUuid = await generateOfflineUuid(username || "<username>");
    return Response.json({
      status: 404,
      nickname: username,
      uuid: "Игрока не существует",
      offlineUuid: offlineUuid,
      headSrc: null,
    });
  }
  const uuid = uuidRes.id;

  const res = await fetch(
    `https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`,
  );
  const data = await res.json();
  const parseData = JSON.parse(
    Buffer.from(data.properties[0].value, "base64").toString("utf-8"),
  );
  const finalData = {
    status: 200,
    uuid: `${parseData.profileId.slice(0, 8)}-${parseData.profileId.slice(8, 12)}-${parseData.profileId.slice(12, 16)}-${parseData.profileId.slice(16, 20)}-${parseData.profileId.slice(20)}`,
    offlineUuid: generateOfflineUuid(parseData.profileName),
    nickname: parseData.profileName,
    headSrc: await getSkinHead(parseData.textures.SKIN.url),
  };
  return Response.json(finalData);
}
