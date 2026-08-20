"use client"
import { ReactNode } from "react"
import { Download } from "lucide-react"
import Container from "@/components/shared/container"

interface DownloadCardProps {
  link: string
  button: string
  icon: ReactNode
  name: string
  color?: string
  release: string
}

export default function DownloadCard({
  link,
  icon,
  name,
  color,
  release,
}: DownloadCardProps) {
  return (
    <Container
      href={link}
      target={"blank"}
      className="group relative flex w-full items-center gap-3 overflow-hidden text-start"
    >
      <div
        className="absolute inset-0 z-1 opacity-70 duration-100 group-hover:opacity-100"
        style={{
          background: `linear-gradient(to right, color-mix(in srgb, ${color} 22%, transparent), transparent)`,
        }}
      ></div>
      <div
        className="absolute -right-5 -bottom-6 z-2 mask-[linear-gradient(to_left,white,transparent)] opacity-10 *:size-28"
        style={{ color: color }}
        aria-hidden="true"
      >
        {icon}
      </div>

      <span className="shrink-0 *:size-9" style={{ color: color }}>
        {icon}
      </span>

      <div className="flex min-w-0 flex-col">
        <h2 className="truncate font-bold">{name}</h2>
        <p className="truncate text-sm">{release}</p>
      </div>

      <span
        className="text-fd-muted-foreground group-hover:text-fd-foreground ml-auto flex size-9 shrink-0 items-center justify-center rounded-lg duration-100"
        style={{ background: `color-mix(in srgb, ${color} 18%, transparent)` }}
      >
        <Download size={18} />
      </span>
    </Container>
  )
}
