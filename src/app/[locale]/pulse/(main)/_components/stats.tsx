import Container from "@/components/shared/container"
import { useTranslations } from "next-intl"

const STATS = [
  { key: "versions", value: "1.8.8+" },
  { key: "commands", value: "~51" },
  { key: "integrations", value: "~30" },
  { key: "platforms", value: "12" },
]

export default function Stats() {
  const t = useTranslations("FlectonePulse.Main.Stats")
  return (
    <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2">
      {STATS.map((stat, key) => (
        <Container className="w-full px-6 py-4" key={key}>
          <h2 className="text-xl font-bold text-primary">{stat.value}</h2>
          <p className="text-sm">{t(`${stat.key}`)}</p>
        </Container>
      ))}
    </div>
  )
}
