import PageTemplate from "@/components/shared/page-template"
import UuidExtractor from "./_components/uuid-enxtractor"
import HeroCard from "@/components/shared/hero-card"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Tools.UuidExtractor",
})

export default function UuidExtractorPage() {
  return (
    <PageTemplate>
      <HeroCard contentWidth="md" namespace="FlectoneTools.UuidExtractor" />
      <UuidExtractor />
    </PageTemplate>
  )
}
