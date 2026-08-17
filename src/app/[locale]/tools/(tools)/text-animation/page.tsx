import TextAnimation from "./_components/text-animation"
import PageTemplate from "@/components/shared/page-template"
import HeroCard from "@/components/shared/hero-card"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Tools.TextAnimation",
})

export default function TabAnimationPage() {
  return (
    <PageTemplate className="gap-6">
      <HeroCard contentWidth="md" namespace="FlectoneTools.TextAnimation" />
      <TextAnimation />
    </PageTemplate>
  )
}
