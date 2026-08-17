import ServerFlagsGenerator from "./_components/server-flag-generator"
import PageTemplate from "@/components/shared/page-template"
import HeroCard from "@/components/shared/hero-card"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Tools.ServerFlagsGenerator",
})

export default function ServerFlagsGeneratorPage() {
  return (
    <PageTemplate>
      <HeroCard
        contentWidth="md"
        namespace="FlectoneTools.ServerFlagsGenerator"
      />
      <ServerFlagsGenerator />
    </PageTemplate>
  )
}
