"use client"
import { Badge } from "@/components/ui/badge"
import GradientWaves from "./gradient-waves"
import { useCurrentTheme } from "@/hooks/use-current-theme"
import { useTranslations } from "next-intl"
import Container from "@/components/shared/container"

export default function HeroCard() {
  const t = useTranslations("Main.HeroCard")
  const currentTheme = useCurrentTheme()
  return (
    <Container className="relative flex w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-xl border py-16">
      <div className="absolute z-1 h-full w-full">
        <GradientWaves
          horizonColor={currentTheme === "dark" ? "#3b6fbe" : "#72c1f3"}
          waveColor={currentTheme === "dark" ? "#3b6fbe" : "#72c1f3"}
          crestColor={currentTheme === "dark" ? "#ffffff" : "#082b5e"}
          speed={0.4}
          amplitude={2.5}
          waveScale={0.5}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1.35}
          height={5.5}
          fogDepth={17}
          detail="medium"
          brightness={1}
          opacity={1}
          mouseInteraction={false}
          parallaxStrength={0.5}
          grain={false}
          grainIntensity={0.05}
        />
      </div>
      <Badge className="z-2">{t("badge")}</Badge>
      <h1 className="z-2 text-7xl font-extrabold">{t("title")}</h1>
      <p className="z-2 w-1/3 text-center text-foreground max-md:w-full">
        {t("description")}
      </p>
    </Container>
  )
}
