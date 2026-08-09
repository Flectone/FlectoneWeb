import { createMetadata } from "@/lib/create-metadata";
import HeaderCard from "@/components/Card/HeaderCard";
import PulseChangelog from "@/components/Content/Pulse/Changelog/PulseChangelog";

export const generateMetadata = createMetadata({
  namespace: "Pulse.Changelog",
});

export default function MetricsPage() {
  return (
    <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-8">
      <HeaderCard
        namespace="Pulse.Changelog"
        background="/assets/flectonepulse/flectonepulse_changelog_preview_dark.webp"
      />
      <span className="w-full border-b"></span>
      <PulseChangelog />
    </div>
  );
}
