import PageTemplate from "@/components/shared/page-template"
import HeroCard from "./_components/hero-card"
import ProjectCard from "./_components/project-card"
import { Separator } from "@/components/ui/separator"
import { getTranslations } from "next-intl/server"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Root",
})

export default async function HomePage() {
  const t = await getTranslations("Main")
  return (
    <PageTemplate>
      <HeroCard />
      <div className="flex w-full flex-col gap-6">
        <ProjectCard
          href="/pulse"
          title={t("FlectonePulse.title")}
          description={t("FlectonePulse.description")}
          badges={[
            t("FlectonePulse.Badges.versions"),
            t("FlectonePulse.Badges.commands"),
            t("FlectonePulse.Badges.integrations"),
          ]}
          src="/assets/flectonepulse/flectonepulse_features.webp"
        />
        <div className="flex gap-6 max-md:flex-col">
          <ProjectCard
            href="/tools"
            align="vertical"
            title={t("FlectoneTools.title")}
            description={t("FlectoneTools.description")}
            src="/assets/flectonetools/flectonetools_preview_dark.webp"
          />
          <ProjectCard
            href="/vault"
            align="vertical"
            title={t("FlectoneVault.title")}
            description={t("FlectoneVault.description")}
            src="/assets/flectonevault/flectonevault_preview.webp"
          />
        </div>
        <Separator />
        <div className="flex gap-6 max-sm:flex-col">
          <ProjectCard
            archive
            href="/mix"
            align="horizontal"
            moreButton={false}
            title={t("FlectoneMix.title")}
            description={t("FlectoneMix.description")}
            src="/assets/flectonechat/flectonechat_preview_ru_dark.webp"
          />
          <ProjectCard
            archive
            href="/chat"
            align="horizontal"
            moreButton={false}
            title={t("FlectoneChat.title")}
            description={t("FlectoneChat.description")}
            src="/assets/flectonemix/flectonemix_preview_dark.webp"
          />
        </div>
      </div>
    </PageTemplate>
  )
}
