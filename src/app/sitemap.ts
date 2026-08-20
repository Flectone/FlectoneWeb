import type { MetadataRoute } from "next"
import { source } from "@/lib/source"
import { routing } from "@/i18n/routing"
import { siteUrl } from "@/lib/create-metadata"
import gitDates from "@/pulse/git-dates.json"

const STATIC_PATHS = [
  "",
  "/members",
  "/mix",
  "/chat",
  "/vault",
  "/pulse",
  "/pulse/changelog",
  "/pulse/metrics",
  "/tools",
  "/tools/color-text-generator",
  "/tools/coordinate-calculator",
  "/tools/inventory-viewer",
  "/tools/prefix-generator",
  "/tools/server-flags-generator",
  "/tools/text-animation",
  "/tools/texture-generator",
  "/tools/time-convertor",
  "/tools/uuid-extractor",
]

function languagesFor(path: string) {
  const languages: Record<string, string> = {}

  for (const locale of routing.locales) {
    languages[locale] = `${siteUrl}/${locale}${path}`
  }

  return languages
}

function lastModifiedOf(pagePath: string) {
  const iso = (gitDates as Record<string, string>)[
    `src/pulse/content/docs/${pagePath}`
  ]

  return iso ? new Date(iso) : undefined
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const path of STATIC_PATHS) {
    for (const locale of routing.locales) {
      entries.push({
        url: `${siteUrl}/${locale}${path}`,
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
        alternates: { languages: languagesFor(path) },
      })
    }
  }

  for (const page of source.getPages()) {
    const path = `/pulse/docs${page.slugs.length > 0 ? `/${page.slugs.join("/")}` : ""}`

    entries.push({
      url: `${siteUrl}${page.url}`,
      lastModified: lastModifiedOf(page.path),
      changeFrequency: "monthly",
      priority: 0.5,
      alternates: { languages: languagesFor(path) },
    })
  }

  return entries
}
