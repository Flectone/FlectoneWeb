import PageTemplate from "@/components/shared/page-template"
import HeroCard from "./_components/hero-card"
import Stats from "./_components/stats"
import Features from "./_components/features"
import Title from "./_components/title"
import { Separator } from "@/components/ui/separator"
import Modules from "./_components/modules"
import Download from "./_components/download"
import { createMetadata } from "@/lib/create-metadata"
import { TwoAreaChartComponent } from "../(info)/metrics/_components/charts"
import { getTranslations } from "next-intl/server"

export const generateMetadata = createMetadata({
  namespace: "Pulse",
})

export default async function PulseHomePage() {
  const t = await getTranslations("FlectonePulse.Main")
  return (
    <PageTemplate>
      <HeroCard />
      <Stats />
      <Separator />
      <Title
        title={t.raw("Features.title")}
        description={t("Features.description")}
        button={{
          text: t("Features.button"),
          href: "/pulse/docs",
          icon: "book-open",
        }}
      />
      <Features />
      <Separator />
      <Title
        title={t.raw("Modules.title")}
        description={t("Modules.description")}
        button={{
          text: t("Features.button"),
          href: "/pulse/docs",
          icon: "book-open",
        }}
      />
      <Modules />
      <Separator />
      <Download />
      <Separator />
      <Title
        title={t.raw("Metrics.title")}
        description={t("Metrics.description")}
        button={{
          text: t("Metrics.button"),
          href: "/pulse/metrics",
          icon: "chart-no-axes-combined",
        }}
      />
      <TwoAreaChartComponent
        title={t("Metrics.activity")}
        firstAreaPath="serverCount"
        secondAreaPath="playerCount"
        firstAreaLabel={t("Metrics.serverCount")}
        secondAreaLabel={t("Metrics.playerCount")}
      />
    </PageTemplate>
  )
}
