import InventoryViewer from "./_components/inventory-viewer"
import PageTemplate from "@/components/shared/page-template"
import HeroCard from "@/components/shared/hero-card"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Tools.InventoryPreviewer",
})

export default function InventoryViewerPage() {
  return (
    <PageTemplate>
      <HeroCard contentWidth="md" namespace="FlectoneTools.InventoryViewer" />
      <InventoryViewer />
    </PageTemplate>
  )
}
