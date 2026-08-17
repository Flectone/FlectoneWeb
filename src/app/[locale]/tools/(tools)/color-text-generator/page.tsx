import HeroCard from "@/components/shared/hero-card"
import ColorTextGenerator from "./_components/color-text-generator"
import PageTemplate from "@/components/shared/page-template"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Tools.ColorTextGenerator",
})

export default function ColorTextGeneratorPage() {
  return (
    <PageTemplate>
      <HeroCard namespace="FlectoneTools.ColorTextGenerator" />
      <ColorTextGenerator />
    </PageTemplate>
  )
}
