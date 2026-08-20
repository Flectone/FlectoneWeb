import HeroCard from "@/components/shared/hero-card"
import CoordinateCalculator from "./_components/coordinate-calculator"
import PageTemplate from "@/components/shared/page-template"
import { createMetadata } from "@/lib/create-metadata"
import { useTranslations } from "next-intl"

export const generateMetadata = createMetadata({
  namespace: "Tools.CoordinateCalculator",
  path: "/tools/coordinate-calculator",
})

export default function CoordinateCalculatorPage() {
  const t = useTranslations("FlectoneTools.Main")
  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectoneTools.CoordinateCalculator"
        background={t("background")}
      />
      <CoordinateCalculator />
    </PageTemplate>
  )
}
