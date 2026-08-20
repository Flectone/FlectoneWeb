import PageTemplate from "@/components/shared/page-template"
import UuidExtractor from "./_components/uuid-enxtractor"
import HeroCard from "@/components/shared/hero-card"
import { createMetadata } from "@/lib/create-metadata"
import { useTranslations } from "next-intl"

export const generateMetadata = createMetadata({
  namespace: "Tools.UuidExtractor",
  path: "/tools/uuid-extractor",
})

export default function UuidExtractorPage() {
  const t = useTranslations("FlectoneTools.Main")
  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectoneTools.UuidExtractor"
        background={t("background")}
      />
      <UuidExtractor />
    </PageTemplate>
  )
}
