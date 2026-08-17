import { FaInfoCircle } from "react-icons/fa"
import { TiWarning } from "react-icons/ti"
import { BiSolidErrorAlt } from "react-icons/bi"
import { IoMdBulb } from "react-icons/io"
import { ReactNode } from "react"

interface CalloutProps {
  type: "info" | "warn" | "idea" | "error"
  title: string
  children?: ReactNode
  margin?: "none" | "normal"
}

const typeStyles: Record<CalloutProps["type"], string> = {
  info: "bg-info/20 border-fd-info/10",
  warn: "bg-warning/20 border-fd-warning/10",
  idea: "bg-success/20 border-fd-success/10",
  error: "bg-error/20 border-fd-error/10",
}

const codeStyles: Record<CalloutProps["type"], string> = {
  info: "[&_code]:bg-info/40",
  warn: "[&_code]:bg-warning/40",
  idea: "[&_code]:bg-success/40",
  error: "[&_code]:bg-error/40",
}

const titleStyles: Record<CalloutProps["type"], string> = {
  info: "text-info",
  warn: "text-warning",
  idea: "text-success",
  error: "text-error",
}

const typeIcons: Record<CalloutProps["type"], ReactNode> = {
  info: <FaInfoCircle className="text-info w-[1em] shrink-0" />,
  warn: <TiWarning className="text-warning w-[1em] shrink-0" />,
  idea: <IoMdBulb className="text-success w-[1em] shrink-0" />,
  error: <BiSolidErrorAlt className="text-error w-[1em] shrink-0" />,
}

export default function Callout({
  type,
  title,
  children,
  margin = "normal",
}: CalloutProps) {
  return (
    <div
      className={`flex w-full gap-3 p-3 ${margin == "normal" ? "mb-4" : ""} ${typeStyles[type]} overflow-hidden rounded-lg border`}
    >
      <div className={`flex flex-col ${title ? "gap-2" : "gap-0"}`}>
        <div
          className={`${titleStyles[type]} ${title ? "" : "[&_p]:" + titleStyles[type] + "!"} flex items-center gap-2 text-sm font-semibold [&_p]:my-0`}
        >
          {typeIcons[type]}
          {title ? title : children}
        </div>
        <div
          className={`text-sm leading-6 [&_.fd-steps]:my-2 [&_.fd-steps]:flex! [&_.fd-steps]:flex-col [&_.fd-steps]:gap-4 [&_p]:my-0 [&_p]:text-foreground! ${codeStyles[type]}`}
        >
          {title ? children : ""}
        </div>
      </div>
    </div>
  )
}
