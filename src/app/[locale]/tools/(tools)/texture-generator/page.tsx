import { useTranslations } from "next-intl"
import Callout from "@/components/shared/callout"
import { createMetadata } from "@/lib/create-metadata"
import PageTemplate from "@/components/shared/page-template"
import HeroCard from "@/components/shared/hero-card"
import TextureGenerator from "./_components/texture-generator"

export const generateMetadata = createMetadata({
  namespace: "Tools.TextureGenerator",
})

export default function TextureGeneratorPage() {
  const t = useTranslations("FlectoneTools.TextureGenerator")

  return (
    <PageTemplate>
      <HeroCard contentWidth="md" namespace="FlectoneTools.TextureGenerator" />
      <Callout margin="none" title="" type="warn">
        {t("warn")}
      </Callout>
      <TextureGenerator />
    </PageTemplate>
  )
}
