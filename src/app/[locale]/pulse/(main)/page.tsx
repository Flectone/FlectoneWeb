import PageTemplate from "@/components/shared/page-template"
import HeroCard from "./_components/hero-card"
import Stats from "./_components/stats"
import Features from "./_components/features"
import Title from "./_components/title"
import { Separator } from "@/components/ui/separator"
import Modules from "./_components/modules"
import Download from "./_components/download"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Pulse",
})

export default async function PulseHomePage() {
  return (
    <PageTemplate>
      <HeroCard />
      <Stats />
      <Separator />
      <Title
        titleKey={"FlectonePulse.Main.Features.title"}
        descriptionKey={"FlectonePulse.Main.Features.description"}
      />
      <Features />
      <Separator />
      <Title
        titleKey={"FlectonePulse.Main.Modules.title"}
        descriptionKey={"FlectonePulse.Main.Modules.description"}
      />
      <Modules />
      <Separator />
      <Title
        titleKey="FlectonePulse.Main.Download.title"
        descriptionKey="FlectonePulse.Main.Download.description"
      />
      <Download />
    </PageTemplate>
  )
}
