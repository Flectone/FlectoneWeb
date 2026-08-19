"use client"

import { type ReactNode, useEffect, useState } from "react"
import Image from "next/image"
import { Wrench, Package, Zap, Bug, Download, ChevronUp } from "lucide-react"
import { useTranslations, useLocale } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { useIsStuck } from "@/hooks/use-is-stuck"
import { Link } from "@/i18n/navigation"

interface VersionProps {
  v: string
  className?: string
  id?: string
  date?: string
  authors?: string[]
  anchors?: string[]
  children: ReactNode
}

interface GroupProps {
  children: ReactNode
}

export function Title({
  date,
  children,
}: Readonly<{ date?: string; children: ReactNode }>) {
  const locale = useLocale()

  return (
    <>
      {children}
      {date && (
        <time className="changelog-date">{formatDate(date, locale)}</time>
      )}
    </>
  )
}

export function Features({ children }: Readonly<GroupProps>) {
  const t = useTranslations("FlectonePulse.Changelog")

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 text-lg font-bold">
        <Zap
          className="text-success"
          size={20}
          fill="var(--color-success)"
          strokeWidth={1}
        />
        <span>{t("features")}</span>
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  )
}

export function Fixes({ children }: Readonly<GroupProps>) {
  const t = useTranslations("FlectonePulse.Changelog")

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 text-lg font-bold">
        <Bug className="text-error" size={20} fill="var(--color-error)" />
        <span>{t("bugFixes")}</span>
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  )
}

export function Refactors({ children }: Readonly<GroupProps>) {
  const t = useTranslations("FlectonePulse.Changelog")

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 text-lg font-bold">
        <Wrench
          className="text-warning"
          size={20}
          strokeWidth={1}
          fill="var(--color-warning)"
        />
        <span>{t("refactors")}</span>
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  )
}

export function Dependencies({ children }: Readonly<GroupProps>) {
  const t = useTranslations("FlectonePulse.Changelog")

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1 text-lg font-bold">
        <Package className="text-primary" size={20} />
        <span>{t("dependencies")}</span>
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  )
}

export function Feature({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <li className="text-md flex items-start gap-1 text-muted-foreground">
      <span className="flex h-6 w-5 shrink-0 items-center justify-center">
        <span className="rounded-full border-3 border-success" />
      </span>
      <span className="w-full min-w-0 wrap-break-word">{children}</span>
    </li>
  )
}

export function Fix({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <li className="text-md flex items-start gap-1 text-muted-foreground">
      <span className="flex h-6 w-5 shrink-0 items-center justify-center">
        <span className="rounded-full border-3 border-error" />
      </span>
      <span className="w-full min-w-0 wrap-break-word">{children}</span>
    </li>
  )
}

export function Refactor({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <li className="text-md flex items-start gap-1 text-muted-foreground">
      <span className="flex h-6 w-5 shrink-0 items-center justify-center">
        <span className="rounded-full border-3 border-warning" />
      </span>
      <span className="w-full min-w-0 wrap-break-word">{children}</span>
    </li>
  )
}

export function Dependency({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <li className="text-md flex items-start gap-1 text-muted-foreground">
      <span className="flex h-6 w-5 shrink-0 items-center justify-center">
        <span className="rounded-full border-3 border-primary" />
      </span>
      <span className="w-full min-w-0 wrap-break-word">{children}</span>
    </li>
  )
}

function formatDate(dateStr: string, localeValue: string) {
  const userLocale = localeValue === "en" ? "en-US" : "ru-RU"

  return new Date(dateStr).toLocaleDateString(userLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function Version({
  v,
  date,
  authors = [],
  anchors = [],
  children,
  id,
  className,
}: VersionProps) {
  const t = useTranslations("FlectonePulse.Changelog")
  const locale = useLocale()

  const [headerRef, isStuck] = useIsStuck<HTMLDivElement>(58)
  const [isOpen, setIsOpen] = useState<boolean>(false)

  function scrollToSection(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      window.history.pushState(null, "", `#${id}`)
    }
  }

  return (
    <section
      className={`${className} group rounded-tl-md border-l-2 pb-8 transition hover:border-l-primary`}
      id={id}
      onMouseOver={() => {
        setIsOpen(true)
      }}
      onMouseOut={() => {
        setIsOpen(false)
      }}
    >
      <div className="relative flex shrink-0 flex-col gap-4">
        <div
          ref={headerRef}
          className={`sticky top-14 z-2 flex items-center justify-between gap-2 bg-card transition-shadow ${
            isStuck ? "py-4" : ""
          }`}
        >
          <Link
            href={`https://github.com/Flectone/FlectonePulse/releases/tag/v${v}`}
            target="_blank"
            className="absolute top-1/2 -left-3.25 -translate-y-1/2 bg-card py-6"
          >
            <div className="h-full w-fit rounded-full border-2 border-primary bg-card backdrop-blur-3xl">
              <div className="m-1.25 rounded-full border-5 border-primary"></div>
            </div>
          </Link>

          <div className="absolute top-13 -left-3.25 flex -translate-y-1/2 flex-col items-center">
            {!isStuck && (
              <ChevronUp className="text-border transition group-hover:text-primary" />
            )}
          </div>
          <div className="ml-8 flex items-center gap-4">
            <h2 className="text-lg font-bold">
              {t("version")} {v}
            </h2>
            {date && (
              <time className="text-[16px] text-muted-foreground">
                {formatDate(date, locale)}
              </time>
            )}
            <AnimatePresence>
              <Link
                href="/pulse/download"
                className="hover:text-muted-primary flex cursor-pointer items-center justify-center gap-1 rounded-md text-primary transition"
              >
                <Download className="" size="22px" strokeWidth={"2px"} />
                {isOpen && (
                  <motion.span
                    className="text-sm max-sm:hidden"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: -0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {t("download")}
                  </motion.span>
                )}
              </Link>
            </AnimatePresence>
          </div>
        </div>

        <div className="ml-8 flex flex-col gap-4">{children}</div>

        {authors.length > 0 && (
          <div className="ml-8 flex gap-2">
            {authors.map((username) => (
              <a
                key={username}
                href={`https://github.com/${username}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground transition hover:text-foreground"
              >
                <Image
                  width={20}
                  height={20}
                  src={`https://github.com/${username}.png?size=40`}
                  alt={username}
                  className="rounded-full"
                  onError={(e) => {
                    ;(e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`
                  }}
                />
                <span>{username}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
