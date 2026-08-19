import { Button } from "@/components/ui/button"
import parse from "html-react-parser"
import Link from "next/link"
import { DynamicIcon, IconName } from "lucide-react/dynamic"

export default function Title({
  title,
  description,
  button,
}: {
  title: string
  description?: string
  button?: {
    href: string
    text: string
    icon?: IconName
  }
}) {
  return (
    <div className="flex w-full items-center justify-between gap-2 max-lg:flex-col max-lg:items-start">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold">{parse(String(title))}</h2>
        <p>{description}</p>
      </div>
      {button && (
        <Link href={button.href}>
          <Button size={"sm"} variant={"secondary"}>
            {button.icon && <DynamicIcon name={button.icon} />}
            {button.text}
          </Button>
        </Link>
      )}
    </div>
  )
}
