import InventoryViewer from "./_components/inventory-viewer"
import PageTemplate from "@/components/shared/page-template"
import HeroCard from "@/components/shared/hero-card"
import { createMetadata } from "@/lib/create-metadata"
import { useTranslations } from "next-intl"

export const generateMetadata = createMetadata({
  namespace: "Tools.InventoryPreviewer",
  path: "/tools/inventory-viewer",
})

export default function InventoryViewerPage() {
  const t = useTranslations("FlectoneTools.Main")
  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectoneTools.InventoryViewer"
        background={t("background")}
      />
      <InventoryViewer />
    </PageTemplate>
  )
}
