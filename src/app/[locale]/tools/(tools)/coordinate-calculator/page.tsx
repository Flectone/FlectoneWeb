import HeroCard from "@/components/shared/hero-card"
import CoordinateCalculator from "./_components/coordinate-calculator"
import PageTemplate from "@/components/shared/page-template"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Tools.CoordinateCalculator",
})

export default function CoordinateCalculatorPage() {
  return (
    <PageTemplate>
      <HeroCard
        contentWidth="md"
        namespace="FlectoneTools.CoordinateCalculator"
      />
      <CoordinateCalculator />
    </PageTemplate>
  )
}
