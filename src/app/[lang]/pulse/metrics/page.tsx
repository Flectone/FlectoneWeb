import { createMetadata } from "@/lib/create-metadata";
import HeaderCard from "@/components/Card/HeaderCard";
import PulseMetrics from "@/components/Content/Pulse/Metrics/PulseMetrics";
import Callout from "@/components/Docs/Callout";

export const generateMetadata = createMetadata({
  namespace: "Pulse.Metrics",
});

export default function VaultPage() {
  return (
    <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-8">
      <HeaderCard namespace="Pulse.Metrics" />
      <Callout type="info" title="Информация">
        Ты в любой момент можешь отключить сбор этих данных на своём сервере{" "}
        <a
          className="text-fd-primary hover:text-fd-muted-primary transition"
          href="/pulse/docs/config/metrics"
        >
          здесь
        </a>
      </Callout>
      <PulseMetrics />
    </div>
  );
}
