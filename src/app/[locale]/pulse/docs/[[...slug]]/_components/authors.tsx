"use client"

import { Feather } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"

export function Authors({ ids }: { ids: string[] }) {
  const t = useTranslations("FlectonePulse.Docs")

  if (ids.length === 0) return null

  return (
    <div className="mt-4 flex flex-col gap-3 border-t pt-4">
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Feather size={16} />
        <p className="">{t("authorsOfPage")}</p>
      </div>
      <div className="flex flex-col gap-2">
        {ids.map((username) => (
          <Link
            key={username}
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer noopener"
            className="group -ml-1 flex items-center gap-2 rounded-md p-1 transition-colors"
          >
            <Image
              width={32}
              height={32}
              src={`https://github.com/${username}.png?size=64`}
              alt={username}
              className="h-8 w-8 rounded-full border border-border transition-colors"
              onError={(e) => {
                ;(e.currentTarget as HTMLImageElement).src =
                  `https://ui-avatars.com/api/?name=${username}&background=random`
              }}
            />
            <span className="text-sm text-foreground transition-colors group-hover:text-muted-foreground">
              {username}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
