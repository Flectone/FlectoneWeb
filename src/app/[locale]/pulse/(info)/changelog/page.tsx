import HeroCard from "@/components/shared/hero-card"
import PageTemplate from "@/components/shared/page-template"
import Changelog from "./_components/changelog"
import data from "@/data/changelog-ru.json"
import Sidebar from "./_components/sidebar"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
  namespace: "Pulse.Changelog",
  path: "/pulse/changelog",
})

export default async function ChangelogPage() {
  const anchors = Array.from(data.map((item) => item.version))
  return (
    <PageTemplate className="flex-row">
      <div className="flex min-w-0 flex-1 flex-col justify-center gap-4">
        <HeroCard
          namespace="FlectonePulse.Changelog"
          background="/assets/flectonepulse/flectonepulse_changelog_preview_dark.webp"
        />
        <Changelog />
      </div>
      <Sidebar anchors={anchors} />
    </PageTemplate>
  )
}
