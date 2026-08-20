import { getTranslations } from "next-intl/server"
import type { Metadata } from "next"
import { routing } from "@/i18n/routing"

type MetadataParams = {
  params: Promise<{ locale: string }>
}

type MetadataConfig = {
  namespace: string
  path?: string
}

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://flectone.net"

export function localeAlternates(path: string) {
  const languages: Record<string, string> = {}

  for (const locale of routing.locales) {
    languages[locale] = `/${locale}${path}`
  }

  languages["x-default"] = `/${routing.defaultLocale}${path}`

  return languages
}

export function createMetadata(config: MetadataConfig) {
  return async function generateMetadata({
    params,
  }: MetadataParams): Promise<Metadata> {
    const { locale } = await params

    const t = await getTranslations({
      locale,
      namespace: `Metadata.${config.namespace}`,
    })

    const path = config.path ?? ""
    const url = `/${locale}${path}`
    const title = t("title")
    const description = t("description")
    const image = t.has("image") ? t("image") : "/assets/flectone_logo.png"

    return {
      metadataBase: new URL(siteUrl),
      title,
      description,
      applicationName: t.has("applicationName")
        ? t("applicationName")
        : undefined,
      keywords: t.has("keywords") ? t("keywords") : undefined,
      alternates: {
        canonical: url,
        languages: localeAlternates(path),
      },
      openGraph: {
        type: "website",
        siteName: "Flectone",
        url,
        title,
        description,
        locale,
        images: [image],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
      },
    }
  }
}
