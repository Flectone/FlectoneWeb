import { createHmac, randomBytes, timingSafeEqual } from "node:crypto"

const SECRET =
  process.env.MINESKIN_SIGNING_SECRET ?? randomBytes(32).toString("hex")

export function signSkin(value: string): string {
  return createHmac("sha256", SECRET).update(value).digest("hex")
}

export function verifySkin(value: string, signature: string | null): boolean {
  if (!signature || !/^[0-9a-f]{64}$/.test(signature)) return false

  const expected = Buffer.from(signSkin(value), "hex")
  const provided = Buffer.from(signature, "hex")

  if (expected.length !== provided.length) return false
  return timingSafeEqual(expected, provided)
}
