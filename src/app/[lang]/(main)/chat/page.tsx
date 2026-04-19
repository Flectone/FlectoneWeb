import FlectoneChat from "@/components/Content/FlectoneChat";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
  namespace: 'Chat'
});

export default function Home() {
  return (
    <div className="flex py-4 w-full max-w-6xl flex-col justify-center max-xl:items-center">
      <FlectoneChat />
    </div>
  );
}
