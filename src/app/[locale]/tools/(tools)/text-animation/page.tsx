import TextAnimation from "./_components/text-animation"
import PageTemplate from "@/components/shared/page-template"
import HeroCard from "@/components/shared/hero-card"
import { createMetadata } from "@/lib/create-metadata"
import { useTranslations } from "next-intl"

export const generateMetadata = createMetadata({
  namespace: "Tools.TextAnimation",
  path: "/tools/text-animation",
})

export default function TabAnimationPage() {
  const t = useTranslations("FlectoneTools.Main")
  return (
    <PageTemplate className="gap-6">
      <HeroCard
        namespace="FlectoneTools.TextAnimation"
        background={t("background")}
      />
      <TextAnimation />
    </PageTemplate>
  )
}
