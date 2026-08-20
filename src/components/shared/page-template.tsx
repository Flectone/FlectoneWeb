import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface PageTemplateProps {
  children: ReactNode
  className?: string
}

export default function PageTemplate({
  children,
  className,
}: PageTemplateProps) {
  return (
    <main
      className={cn(
        "container my-6 flex min-h-[calc(100vh-112px)] flex-col justify-center gap-6",
        className
      )}
    >
      {children}
    </main>
  )
}
