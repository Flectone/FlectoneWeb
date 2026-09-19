"use client"

import { useTranslations } from "next-intl"
import { ReactNode } from "react"

interface MinecraftChatProps {
  message?: ReactNode
  prefix?: ReactNode
  addString?: ReactNode
}

export default function MinecraftChat({
  message,
  prefix,
  addString,
}: MinecraftChatProps) {
  const t = useTranslations()
  return (
    <div className="relative flex h-full w-full items-end justify-start pt-8 font-[Minecraft] transition-transform">
      <div className="mb-5 flex h-fit w-3/4 flex-col items-start justify-end gap-2 bg-black/60 pr-6 pl-1">
        <div className="flex items-end gap-1">
          {prefix}
          <div className="flex h-3.5 items-center gap-1">
            <p className="text-[#ABD5E3]! [text-shadow:1.2px_1.2px_0px_#212F38]">
              TheFaser:
            </p>
            <p className="text-white! [text-shadow:1.2px_1.2px_0px_#252525]">
              {t(
                "FlectoneTools.ColorTextGenerator.Previews.Chat.Content.hello"
              )}
            </p>
          </div>
        </div>
        <div className="flex items-end gap-1">
          <div className="flex h-3.5 items-center gap-1">
            <p className="text-[#ABD5E3]! [text-shadow:1.2px_1.2px_0px_#212F38]">
              vpllll:
            </p>
            <p className="text-white! [text-shadow:1.2px_1.2px_0px_#252525]">
              {t(
                "FlectoneTools.ColorTextGenerator.Previews.Chat.Content.hello"
              )}
            </p>
          </div>
        </div>
        <div className="flex items-end gap-1">
          <div className="flex h-3.5 items-center gap-1">
            <p className="text-[#ABD5E3]! [text-shadow:1.2px_1.2px_0px_#212F38]">
              Terrona:
            </p>
            <p className="text-white! [text-shadow:1.2px_1.2px_0px_#252525]">
              {t("FlectoneTools.ColorTextGenerator.Previews.Chat.Content.qq")}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-1">
          <div className="flex h-3.5 items-center gap-1">
            <p className="text-[#ABD5E3]! [text-shadow:1.2px_1.2px_0px_#212F38]">
              Realepi_Bars_:
            </p>
            <p className="text-white! [text-shadow:1.2px_1.2px_0px_#252525]">
              {t("FlectoneTools.ColorTextGenerator.Previews.Chat.Content.hi")}
            </p>
          </div>
          {message}
        </div>
        {addString && addString}
      </div>
      <div className="absolute bottom-0 flex h-4 w-full bg-black/60 pb-2"></div>
    </div>
  )
}
