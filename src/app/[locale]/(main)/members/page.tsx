import { useTranslations } from "next-intl"
import { createMetadata } from "@/lib/create-metadata"
import HeroCard from "@/components/shared/hero-card"
import PageTemplate from "@/components/shared/page-template"
import GithubCard from "./_components/github-card"

export const generateMetadata = createMetadata({
  namespace: "About",
})

const MEMBERS = ["TheFaser", "FunnyBars", "fxdsu", "vplend"]

export default function MembersPage() {
  const t = useTranslations("Main.Members")

  return (
    <PageTemplate>
      <HeroCard namespace="Main.Members" />
      <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
        {MEMBERS.map((member, key) => (
          <GithubCard
            key={key}
            link={t(member + ".link")}
            name={t(member + ".name")}
            description={t(member + ".description")}
            avatar={t(member + ".avatar")}
          />
        ))}
      </div>
    </PageTemplate>
  )
}
