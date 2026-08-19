import HeroCard from "@/components/shared/hero-card"
import ColorTextGenerator from "./_components/color-text-generator"
import PageTemplate from "@/components/shared/page-template"
import { createMetadata } from "@/lib/create-metadata"
import { useTranslations } from "next-intl"

export const generateMetadata = createMetadata({
  namespace: "Tools.ColorTextGenerator",
})

export default function ColorTextGeneratorPage() {
  const t = useTranslations("FlectoneTools.Main")
  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectoneTools.ColorTextGenerator"
        background={t("background")}
      />
      <ColorTextGenerator />
    </PageTemplate>
  )
}
