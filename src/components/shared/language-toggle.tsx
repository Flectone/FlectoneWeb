"use client"

import { useLocale, useTranslations } from "next-intl"
import { useRouter, usePathname } from "@/i18n/navigation"
import { useTransition, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Languages } from "lucide-react"

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations("Header.LanguageToggle")

  function onSelectLocale(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
      router.refresh()
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size={"icon-sm"} disabled={isPending} />
        }
      >
        <Languages />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("language")}</DropdownMenuLabel>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={"ru" === locale}
            onClick={() => onSelectLocale("ru")}
          >
            {t("Locales.russian")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={"en" === locale}
            onClick={() => onSelectLocale("en")}
          >
            {t("Locales.english")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
