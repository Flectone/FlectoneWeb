import { createMetadata } from "@/lib/create-metadata";
import FlectoneTools from "@/components/Content/Tools/FlectoneTools";
import HeaderCard from "@/components/Card/HeaderCard";

export const generateMetadata = createMetadata({
  namespace: "Tools.Main",
});

export default function ToolsPage() {
  return (
    <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-8">
      <HeaderCard
        namespace="Tools.Main"
        background="/assets/flectonetools/flectonetools_preview_dark.webp"
      />
      <span className="border-b"></span>
      <FlectoneTools />
    </div>
  );
}
