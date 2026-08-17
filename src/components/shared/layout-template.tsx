import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface LayoutTemplateProps {
  children: ReactNode
}

export default function LayoutTemplate({ children }: LayoutTemplateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center")}>
      {children}
    </div>
  )
}
