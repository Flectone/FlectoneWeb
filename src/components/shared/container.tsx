import { cn } from "@/lib/utils"
import { Link } from "@/i18n/navigation"
import { ReactNode } from "react"

export default function Container({
  children,
  className,
  href,
  target,
}: {
  children: ReactNode
  className?: string
  href?: string
  target?: string
}) {
  return !href ? (
    <div
      className={cn("overflow-hidden rounded-xl border bg-card p-6", className)}
    >
      {children}
    </div>
  ) : (
    <Link
      href={href}
      className={cn(
        "cursor-pointer overflow-hidden rounded-xl border bg-card p-6 transition hover:bg-muted-card",
        className
      )}
    >
      {children}
    </Link>
  )
}
