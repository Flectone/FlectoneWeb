import { useTranslations } from "next-intl"
import Image from "next/image"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { Link } from "@/i18n/navigation"

export default function Footer() {
  const t = useTranslations("Footer")

  return (
    <footer className="flex w-full justify-center">
      <div className="container flex w-full flex-col gap-4 border-t py-4">
        <div className="flex flex-col gap-4">
          <div className="flex w-full justify-between">
            <div className="flex w-full items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <Image
                  alt="FlectoneLogo"
                  src={"/assets/flectone_logo.png"}
                  width={24}
                  height={24}
                />
                <span className="font-bold">Flectone</span>
              </div>
              <Link
                href="/members"
                className="mt-[1px] flex h-[24px] items-center text-sm text-muted-foreground transition hover:text-primary"
              >
                {t("authors")}
              </Link>
            </div>
          </div>
          <div className="flex w-full items-start justify-between text-muted-foreground max-md:flex-col-reverse max-md:gap-4">
            <p className="w-1/2 text-[10px] leading-relaxed font-medium tracking-wider uppercase opacity-50 max-md:w-full max-md:text-justify">
              {t("answer")}
            </p>
            <div className="flex items-center gap-4 text-sm font-medium text-muted-foreground max-md:w-full max-md:justify-between">
              <a
                href="https://www.youtube.com/@thefaser"
                className="transition-colors hover:text-primary"
              >
                Youtube
              </a>
              <a
                href="https://boosty.to/thefaser"
                className="transition-colors hover:text-primary"
              >
                Boosty
              </a>
              <a
                href="https://discord.flectone.net/"
                className="transition-colors hover:text-primary"
              >
                Discord
              </a>
              <a
                href="https://t.me/flectone"
                className="transition-colors hover:text-primary"
              >
                Telegram
              </a>
              <a
                href="https://github.com/Flectone"
                className="transition-colors hover:text-primary"
              >
                Github
              </a>
            </div>
          </div>
        </div>

        <hr className="border-fd-border opacity-50" />

        <div className="flex justify-between text-xs text-muted-foreground max-md:flex-col max-md:gap-2">
          <p>{t("date")}</p>
          <p>
            {t.rich("openSourse", {
              a: (chunks) => (
                <a
                  href="https://github.com/flectone"
                  target="_blank"
                  className="text-primary transition-colors"
                >
                  {chunks}
                </a>
              ),
            })}
          </p>
        </div>
      </div>
    </footer>
  )
}
