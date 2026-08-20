import { useTranslations } from "next-intl"
import { SquarePen } from "lucide-react"
import { JSX } from "react"

interface EditOnGitHubProps {
  href: string
}

export default function EditOnGitHub({ href }: EditOnGitHubProps): JSX.Element {
  const t = useTranslations("FlectonePulse.Docs")

  return (
    <a
      href={href}
      className="flex items-center gap-1 text-sm font-normal text-fd-muted-foreground no-underline"
    >
      <SquarePen size={1.2 + "em"} />
      {t("editOnGithub")}
    </a>
  )
}
