import { useTranslations, useLocale } from "next-intl"
import { Clock } from "lucide-react"
import { JSX } from "react"

interface LastUpdateProps {
  date: Date
}

export default function LastUpdate({ date }: LastUpdateProps): JSX.Element {
  const t = useTranslations("FlectonePulse.Docs")
  const locale = useLocale()

  const formatted = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)

  return (
    <div className="flex items-center gap-1 text-sm font-normal text-fd-muted-foreground">
      <Clock size={1.2 + "em"} />
      <span>
        {t("lastUpdate")} {formatted}
      </span>
    </div>
  )
}
