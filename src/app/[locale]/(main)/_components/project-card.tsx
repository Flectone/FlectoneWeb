"use client"
import { Badge } from "@/components/ui/badge"
import { Archive, ArrowRight } from "lucide-react"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import Container from "@/components/shared/container"
import { useState, useEffect } from "react"

interface ProjectCardProps {
  href: string
  title: string
  description: string
  badges?: string[]
  align?: "vertical" | "horizontal"
  src: string
  moreButton?: boolean
  archive?: boolean
  className?: string
}

export default function ProjectCard({
  href,
  title,
  description,
  badges,
  src,
  align = "horizontal",
  moreButton = true,
  archive = false,
  className,
}: ProjectCardProps) {
  const t = useTranslations("Main")

  return (
    <Container
      href={href}
      className={cn(
        "group flex h-full items-stretch justify-between gap-4",
        align === "vertical"
          ? "w-1/2 flex-col max-md:w-full"
          : "w-full flex-row max-md:flex-col"
      )}
    >
      <div className="flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 className={cn("font-bold", archive ? "text-xl" : "text-2xl")}>
                Flectone<b>{title}</b>
              </h2>
              {archive && (
                <Badge
                  variant={"outline"}
                  className="bg-muted-card text-muted-foreground"
                >
                  <Archive />
                  {t("archive")}
                </Badge>
              )}
            </div>
            <p className="text-sm">{description}</p>
          </div>
        </div>
        {badges && (
          <div className="flex gap-2">
            {badges.map((item, key) => (
              <Badge key={key} variant={"secondary"}>
                {item}
              </Badge>
            ))}
          </div>
        )}
        {moreButton && align === "horizontal" && (
          <span className="flex items-center gap-1 text-sm text-primary transition-all group-hover:gap-2 max-md:hidden">
            <span>{t("more")}</span> <ArrowRight size={18} strokeWidth={1.5} />
          </span>
        )}
      </div>
      {!archive &&
        (align === "horizontal" ? (
          <div
            className={
              "relative overflow-hidden rounded-sm max-md:h-31 max-md:w-full md:flex-1"
            }
          >
            <Image
              src={src}
              alt={src.split("/")[src.split("/").length - 1].split(".")[0]}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
            />
          </div>
        ) : (
          <div className={"relative h-31 w-full overflow-hidden rounded-sm"}>
            <Image
              src={src}
              alt={src.split("/")[src.split("/").length - 1].split(".")[0]}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="w-full object-cover"
            />
          </div>
        ))}

      {moreButton && align === "vertical" && (
        <span className="flex items-center gap-1 text-sm text-primary transition-all group-hover:gap-2 max-md:hidden">
          <span>{t("more")}</span> <ArrowRight size={18} strokeWidth={1.5} />
        </span>
      )}
    </Container>
  )
}
