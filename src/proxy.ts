import createMiddleware from "next-intl/middleware"
import { NextResponse, type NextRequest } from "next/server"
import { routing } from "./i18n/routing"
import { enforceRateLimit } from "./lib/rate-limit"

const intlMiddleware = createMiddleware(routing)

const PULSE_PROXY_RATE_LIMIT = {
  name: "pulse-proxy",
  limit: 120,
  windowMs: 60_000,
}

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/api/pulse/")) {
    return (
      enforceRateLimit(request, PULSE_PROXY_RATE_LIMIT) ?? NextResponse.next()
    )
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|og|search|.*\\..*).*)",
    "/api/pulse/:path*",
  ],
}
