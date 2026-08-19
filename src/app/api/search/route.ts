import { source } from "@/lib/source"
import { createFromSource } from "fumadocs-core/search/server"
import { enforceRateLimit } from "@/lib/rate-limit"

const RATE_LIMIT = { name: "search", limit: 120, windowMs: 60_000 }

const MAX_QUERY_LENGTH = 128
const DEFAULT_RESULT_LIMIT = 40
const MAX_RESULT_LIMIT = 100

const search = createFromSource(source, {
  buildIndex(page) {
    return {
      id: page.url,
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      tag: page.data.tag,
      structuredData: page.data.structuredData,
    }
  },
})

export async function GET(request: Request) {
  const limited = enforceRateLimit(request, RATE_LIMIT)
  if (limited) return limited

  const url = new URL(request.url)
  const query = url.searchParams.get("query")

  if (query && query.length > MAX_QUERY_LENGTH) {
    return Response.json([], { headers: { "Cache-Control": "no-store" } })
  }

  const requested = Number(url.searchParams.get("limit"))
  const limit =
    Number.isInteger(requested) && requested > 0
      ? Math.min(requested, MAX_RESULT_LIMIT)
      : DEFAULT_RESULT_LIMIT

  url.searchParams.set("limit", String(limit))

  return search.GET(
    new Request(url, { method: request.method, headers: request.headers })
  )
}
