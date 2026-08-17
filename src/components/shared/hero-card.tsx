"use client"

import { useTranslations } from "next-intl"
import { useCurrentTheme } from "@/hooks/use-current-theme"
import Container from "./container"
import { cn } from "@/lib/utils"

interface HeroCardProps {
  namespace: string
  background?: string
  theming?: boolean
  contentWidth?: "sm" | "md" | "lg"
}

export default function HeroCard({
  namespace,
  background,
  theming = true,
  contentWidth = "sm",
}: HeroCardProps) {
  const t = useTranslations(namespace)
  const currentTheme = useCurrentTheme()
  const bg = theming
    ? background?.replace("_dark", `_${currentTheme}`)
    : background

  return (
    <Container className="flex w-full items-center justify-between gap-6 overflow-hidden backdrop-blur-3xl">
      {background && (
        <div
          className={`absolute top-0 right-0 h-full w-2/3 mask-[linear-gradient(to_left,white,transparent)] bg-cover bg-center max-md:w-2/4`}
          style={{
            backgroundImage: `url(${bg})`,
          }}
        ></div>
      )}
      <div
        className={cn(
          "flex flex-col text-start",
          contentWidth === "sm"
            ? "w-2/5"
            : contentWidth === "md"
              ? "w-3/5"
              : contentWidth === "lg"
                ? "w-4/5"
                : ""
        )}
      >
        <h1 className="text-3xl font-bold max-md:w-full">
          {t.rich("title", {
            b: (chunks) => <b>{chunks}</b>,
          })}
        </h1>
        <p>
          {t.rich("description", {
            b: (chunks) => <b>{chunks}</b>,
          })}
        </p>
      </div>
    </Container>
  )
}
