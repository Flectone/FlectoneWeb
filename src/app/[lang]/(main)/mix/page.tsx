import FlectoneMix from "@/components/Content/FlectoneMix";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
  namespace: 'Mix'
});

export default function Home() {
  return (
    <div className="flex py-4 w-full max-w-6xl flex-col justify-center max-xl:items-center">
      <FlectoneMix />
    </div>
  );
}