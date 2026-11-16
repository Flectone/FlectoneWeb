export function canUseWebGL(): boolean {
  if (typeof window === "undefined") return false

  try {
    const canvas = document.createElement("canvas")
    const gl =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl")

    if (!gl) return false

    gl.getExtension("WEBGL_lose_context")?.loseContext()
    return true
  } catch {
    return false
  }
}
