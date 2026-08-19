import { useTranslations } from "next-intl"
import Callout from "@/components/shared/callout"
import { createMetadata } from "@/lib/create-metadata"
import PageTemplate from "@/components/shared/page-template"
import HeroCard from "@/components/shared/hero-card"
import TextureGenerator from "./_components/texture-generator"

export const generateMetadata = createMetadata({
  namespace: "Tools.TextureGenerator",
  path: "/tools/texture-generator",
})

export default function TextureGeneratorPage() {
  const t = useTranslations("FlectoneTools")

  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectoneTools.TextureGenerator"
        background={t("Main.background")}
      />
      <Callout margin="none" title="" type="warn">
        {t("TextureGenerator.warn")}
      </Callout>
      <TextureGenerator />
    </PageTemplate>
  )
}
