import { createMetadata } from "@/lib/create-metadata";
import FlectoneVault from "@/components/Content/Vault/FlectoneVault";
import HeaderCard from "@/components/Card/HeaderCard";

export const generateMetadata = createMetadata({
  namespace: "Vault",
});

export default function VaultPage() {
  return (
    <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-8">
      <HeaderCard
        namespace="Vault.Main"
        background="/assets/flectonevault/flectonevault_preview_dark.webp"
      />
      <span className="border-b"></span>
      <FlectoneVault />
    </div>
  );
}
