import { Link } from "@/i18n/navigation"
import HeroCard from "@/components/shared/hero-card"
import PageTemplate from "@/components/shared/page-template"
import { createMetadata } from "@/lib/create-metadata"
import Callout from "@/components/shared/callout"
import {
  BarChartComponent,
  GeoMapChartComponent,
  PieChartComponent,
  TreemapChartComponent,
  TwoAreaChartComponent,
  TwoPieChartComponent,
} from "./_components/charts"
import { getTranslations } from "next-intl/server"

export const generateMetadata = createMetadata({
  namespace: "Pulse.Metrics",
  path: "/pulse/metrics",
})

export default async function MetricsPage() {
  const t = await getTranslations("FlectonePulse.Metrics")
  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectonePulse.Metrics"
        background="/assets/flectonepulse/flectonepulse_metrics_preview_dark.webp"
      />
      <Callout margin="none" type="info" title={t("Callout.title")}>
        {t.rich("Callout.text", {
          a: (chunks) => (
            <Link
              className="hover:text-fd-muted-primary text-fd-primary transition"
              href="/pulse/docs/config/metrics"
            >
              {chunks}
            </Link>
          ),
        })}
      </Callout>
      <TwoAreaChartComponent
        title={t("items.activity")}
        firstAreaPath="serverCount"
        secondAreaPath="playerCount"
        firstAreaLabel={t("labels.servers")}
        secondAreaLabel={t("labels.players")}
      />
      <div className="flex gap-6 max-lg:flex-col">
        <PieChartComponent
          piePath="field?name=serverVersion"
          title={t("items.serverVersion")}
          pieLabel={t("labels.count")}
        />
        <PieChartComponent
          piePath="field?name=projectVersion"
          title={t("items.projectVersion")}
          pieLabel={t("labels.count")}
        />
      </div>
      <TreemapChartComponent
        treemapPath="field?name=modules"
        title={t("items.modules")}
        treemapLabel={t("labels.count")}
      />
      <div className="flex gap-6 max-lg:flex-col">
        <PieChartComponent
          piePath="field?name=cpuCores"
          title={t("items.cpuCores")}
          prefix="CPU"
          pieLabel={t("labels.count")}
        />
        <PieChartComponent
          piePath="field?name=totalRam"
          title={t("items.totalRam")}
          prefix="RAM"
          convert="gb"
          pieLabel={t("labels.count")}
        />
      </div>
      <BarChartComponent
        layout="horizontal"
        barPath="field?name=projectLanguage"
        title={t("items.projectLanguage")}
        barLabel={t("labels.count")}
      />
      <TwoPieChartComponent
        firstPiePath="field?name=serverCore"
        secondPiePath="field?name=playerCountByServerCore"
        firstPieLabel={t("labels.servers")}
        secondPieLabel={t("labels.players")}
        title={t("items.serverCore")}
      />
      <div className="flex gap-6 max-lg:flex-col">
        <PieChartComponent
          piePath="field?name=osArchitecture"
          title={t("items.osArchitecture")}
          pieLabel={t("labels.count")}
        />
        <PieChartComponent
          piePath="field?name=osName"
          title={t("items.osName")}
          pieLabel={t("labels.count")}
        />
      </div>
      <PieChartComponent
        piePath="field?name=javaVersion"
        title={t("items.javaVersion")}
        pieLabel={t("labels.count")}
      />
      <BarChartComponent
        layout="horizontal"
        minVisible={0}
        barPath="field?name=proxyMode"
        title={t("items.proxyMode")}
        barLabel={t("labels.count")}
      />
      <BarChartComponent
        layout="horizontal"
        minVisible={0}
        barPath="field?name=onlineMode"
        title={t("items.onlineMode")}
        barLabel={t("labels.count")}
      />
      <BarChartComponent
        layout="horizontal"
        minVisible={0}
        barPath="field?name=databaseMode"
        title={t("items.databaseMode")}
        barLabel={t("labels.count")}
      />
      <GeoMapChartComponent
        geoPath="field?name=location"
        title={t("items.location")}
        geoLabel={t("labels.count")}
      />
    </PageTemplate>
  )
}
