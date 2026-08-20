import ServerFlagsGenerator from "./_components/server-flag-generator"
import PageTemplate from "@/components/shared/page-template"
import HeroCard from "@/components/shared/hero-card"
import { createMetadata } from "@/lib/create-metadata"
import { useTranslations } from "next-intl"

export const generateMetadata = createMetadata({
  namespace: "Tools.ServerFlagsGenerator",
  path: "/tools/server-flags-generator",
})

export default function ServerFlagsGeneratorPage() {
  const t = useTranslations("FlectoneTools.Main")
  return (
    <PageTemplate>
      <HeroCard
        namespace="FlectoneTools.ServerFlagsGenerator"
        background={t("background")}
      />
      <ServerFlagsGenerator />
    </PageTemplate>
  )
}
