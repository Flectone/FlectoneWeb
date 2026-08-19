import { createMetadata } from "@/lib/create-metadata"
import PageTemplate from "@/components/shared/page-template"
import TimeConvertor from "./_components/time-convertor"
import HeroCard from "@/components/shared/hero-card"
import { useTranslations } from "next-intl"

export const generateMetadata = createMetadata({
  namespace: "Tools.TimeConvertor",
  path: "/tools/time-convertor",
})

export default function TimeConvertorPage() {
  const t = useTranslations("FlectoneTools.Main")

  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectoneTools.TimeConvertor"
        background={t("background")}
      />
      <TimeConvertor />
    </PageTemplate>
  )
}
