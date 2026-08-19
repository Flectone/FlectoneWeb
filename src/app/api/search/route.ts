import { source } from "@/lib/source"
import { createSearchAPI } from "fumadocs-core/search/server"
import { enforceRateLimit } from "@/lib/rate-limit"

const RATE_LIMIT = { name: "search", limit: 120, windowMs: 60_000 }

const MAX_QUERY_LENGTH = 128

const search = createSearchAPI("advanced", {
  language: "russian",
  indexes: source.getPages().map((page) => {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: page.data.tag,
    }
  }),
})

export async function GET(request: Request) {
  const limited = enforceRateLimit(request, RATE_LIMIT)
  if (limited) return limited

  const url = new URL(request.url)
  const query = url.searchParams.get("query")

  if (query && query.length > MAX_QUERY_LENGTH) {
    return Response.json([], { headers: { "Cache-Control": "no-store" } })
  }

  return search.GET(request)
}
