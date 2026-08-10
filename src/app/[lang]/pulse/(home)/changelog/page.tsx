import { createMetadata } from "@/lib/create-metadata";
import HeaderCard from "@/components/Card/HeaderCard";
import PulseChangelog from "@/components/Content/Pulse/Changelog/PulseChangelog";
import data from "@/data/changelog-ru.json";
import Sidebar from "@/components/Navigation/Sidebar";

export const generateMetadata = createMetadata({
  namespace: "Pulse.Changelog",
});

export default function ChangelogPage() {
  const anchors = Array.from(data.map((item) => item.version));

  return (
    <div className="w-full max-w-7xl flex gap-4 justify-center my-8 relative">
      <div className="flex-1 min-w-0 flex gap-4 flex-col justify-center">
        <HeaderCard
          namespace="Pulse.Changelog"
          background="/assets/flectonepulse/flectonepulse_changelog_preview_dark.webp"
        />
        <PulseChangelog />
      </div>
      <Sidebar anchors={anchors} />
    </div>
  );
}
