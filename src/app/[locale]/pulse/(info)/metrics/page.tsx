import HeroCard from "@/components/shared/hero-card"
import PageTemplate from "@/components/shared/page-template"
import Metrics from "./_components/metrics"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Pulse.Metrics",
})

export default async function MetricsPage() {
  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectonePulse.Metrics"
        background="/assets/flectonepulse/flectonepulse_metrics_preview_dark.webp"
      />
      <Metrics />
    </PageTemplate>
  )
}
