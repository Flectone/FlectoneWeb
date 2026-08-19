import PrefixGenerator from "./_components/prefix-generator"
import PageTemplate from "@/components/shared/page-template"
import HeroCard from "@/components/shared/hero-card"
import { createMetadata } from "@/lib/create-metadata"
import { useTranslations } from "next-intl"

export const generateMetadata = createMetadata({
  namespace: "Tools.PrefixGenerator",
})

export default function PrefixGeneratorPage() {
  const t = useTranslations("FlectoneTools.Main")
  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectoneTools.PrefixGenerator"
        background={t("background")}
      />
      <PrefixGenerator />
    </PageTemplate>
  )
}
