import type { MetadataRoute } from "next"
import { siteUrl } from "@/lib/create-metadata"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/og/"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
