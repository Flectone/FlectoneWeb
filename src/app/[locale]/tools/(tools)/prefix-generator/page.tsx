import PrefixGenerator from "./_components/prefix-generator"
import PageTemplate from "@/components/shared/page-template"
import HeroCard from "@/components/shared/hero-card"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Tools.PrefixGenerator",
})

export default function PrefixGeneratorPage() {
  return (
    <PageTemplate>
      <HeroCard contentWidth="md" namespace="FlectoneTools.PrefixGenerator" />
      <PrefixGenerator />
    </PageTemplate>
  )
}
