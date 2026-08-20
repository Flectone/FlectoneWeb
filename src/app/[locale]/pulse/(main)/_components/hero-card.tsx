"use client"
import { Badge } from "@/components/ui/badge"
import { useCurrentTheme } from "@/hooks/use-current-theme"
import { useTranslations } from "next-intl"
import PixelBlast from "./pixel-blast"
import { Button } from "@/components/ui/button"
import { SiBoosty } from "react-icons/si"
import { BookOpen, Download } from "lucide-react"
import { Link } from "@/i18n/navigation"
import Container from "@/components/shared/container"

const scrollToSection = (
  e: React.MouseEvent<HTMLAnchorElement>,
  id: string
) => {
  e.preventDefault()
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
    window.history.pushState(null, "", `#${id}`)
  }
}

export default function HeroCard() {
  const t = useTranslations("FlectonePulse.Main.HeroCard")
  const currentTheme = useCurrentTheme()
  return (
    <Container className="relative flex w-full overflow-hidden rounded-xl border bg-card p-6">
      <PixelBlast
        className="absolute top-0 right-0 w-2/3 bg-card mask-[linear-gradient(to_left,white,transparent)]"
        variant="square"
        pixelSize={5}
        color={currentTheme === "dark" ? "#72c1f3" : "#3b6fbe"}
        patternScale={3}
        patternDensity={2}
        pixelSizeJitter={0}
        enableRipples
        rippleSpeed={0.4}
        rippleThickness={0.12}
        rippleIntensityScale={1.5}
        liquid={false}
        liquidStrength={0.12}
        liquidRadius={1.2}
        liquidWobbleSpeed={5}
        speed={0.35}
        edgeFade={0}
        transparent
      />
      <div className="z-1 flex w-1/2 flex-col gap-4 max-md:w-4/5">
        <Badge>{t("badge")}</Badge>
        <h1 className="text-3xl font-bold">
          {t.rich("slogan", {
            b: (chunks) => <b>{chunks}</b>,
          })}
        </h1>
        <p>{t("description")}</p>
        <div className="flex gap-2 max-md:flex-col">
          <Link href={"https://boosty.to/thefaser"}>
            <Button>
              <SiBoosty />
              {t("support")}
            </Button>
          </Link>
          <div className="flex gap-2">
            <Link href={"/pulse/docs"}>
              <Button variant={"secondary"}>
                <BookOpen />
                {t("documentation")}
              </Button>
            </Link>
            <Link
              href={"/pulse#download"}
              onClick={(e) => scrollToSection(e, "download")}
            >
              <Button variant={"secondary"}>
                <Download />
                {t("download")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  )
}
