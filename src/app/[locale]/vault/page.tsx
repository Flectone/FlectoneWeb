import HeroCard from "@/components/shared/hero-card"
import PageTemplate from "@/components/shared/page-template"
import FlectoneVault from "./_components/flectone-vault"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Vault",
})

export default function FlectoneVaultPage() {
  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectoneVault.Main"
        background="/assets/flectonevault/flectonevault_preview.webp"
      />
      <FlectoneVault />
    </PageTemplate>
  )
}
