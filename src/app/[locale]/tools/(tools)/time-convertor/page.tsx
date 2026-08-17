import { createMetadata } from "@/lib/create-metadata"
import PageTemplate from "@/components/shared/page-template"
import TimeConvertor from "./_components/time-convertor"
import HeroCard from "@/components/shared/hero-card"

export const generateMetadata = createMetadata({
  namespace: "Tools.TimeConvertor",
})

export default function TimeConvertorPage() {
  return (
    <PageTemplate>
      <HeroCard namespace="FlectoneTools.TimeConvertor" />
      <TimeConvertor />
    </PageTemplate>
  )
}
