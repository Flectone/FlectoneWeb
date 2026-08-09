import { createMetadata } from "@/lib/create-metadata";
import HeaderCard from "@/components/Card/HeaderCard";
import PulseMetrics from "@/components/Content/Pulse/Metrics/PulseMetrics";
import Callout from "@/components/Docs/Callout";

export const generateMetadata = createMetadata({
  namespace: "Pulse.Metrics",
});

export default function MetricsPage() {
  return (
    <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-8">
      <HeaderCard
        namespace="Pulse.Metrics"
        background="/assets/flectonepulse/flectonepulse_metrics_preview_dark.webp"
      />
      <PulseMetrics />
    </div>
  );
}
