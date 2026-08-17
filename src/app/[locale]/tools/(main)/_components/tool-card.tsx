"use client"
import { ReactNode } from "react"
import { DynamicIcon, IconName } from "lucide-react/dynamic"
import Container from "@/components/shared/container"

interface ToolCardProps {
  name: string
  description: string
  icon: IconName
  path: string
  color?: string
  preview?: ReactNode
}

export default function ToolCard({
  name,
  description,
  icon,
  path,
  color = "var(--color-fd-primary)",
  preview,
}: ToolCardProps) {
  return (
    <Container
      href={path}
      className="group relative flex h-full w-full flex-col gap-4"
    >
      <div
        className="absolute inset-0 z-1 opacity-70 duration-100 group-hover:opacity-100"
        style={{
          background: `linear-gradient(140deg, color-mix(in srgb, ${color} 20%, transparent), transparent 65%)`,
        }}
      ></div>

      <div className="flex flex-col gap-1 text-start">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span
            className="flex size-8 shrink-0 items-center justify-center rounded-sm"
            style={{
              background: `color-mix(in srgb, ${color} 18%, transparent)`,
              color: color,
            }}
          >
            <DynamicIcon size={1.1 + "em"} name={icon} />
          </span>
          {name}
        </h2>
        <p>{description}</p>
      </div>

      {preview && (
        <div className="z-20 mt-auto flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border bg-background/40 py-3">
          {preview}
        </div>
      )}
    </Container>
  )
}
