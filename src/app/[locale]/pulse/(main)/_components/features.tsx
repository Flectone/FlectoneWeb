import Container from "@/components/shared/container"
import {
  Carousel,
  CarouselBreadcrumbs,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

const FEATURES = [
  {
    key: "Format",
    image: "/pulse/message_format_animation.webp",
    width: 580,
    height: 130,
    link: "/pulse/docs/message/format/",
  },
  {
    key: "Command",
    image: "/pulse/command_tictactoe.webp",
    width: 1107,
    height: 472,
    link: "/pulse/docs/command/",
  },
  {
    key: "Integration",
    image: "/pulse/integration_discord_message_minecraft.webp",
    width: 810,
    height: 145,
    link: "/pulse/docs/integration/",
  },
  {
    key: "Symbol",
    image: "/pulse/command_symbol.webp",
    width: 1131,
    height: 425,
    link: "/pulse/docs/command/symbol/",
  },
  {
    key: "Status",
    image: "/pulse/message_status_motd.webp",
    width: 1786,
    height: 207,
    link: "/pulse/docs/message/status/",
  },
]

export default function Features() {
  const t = useTranslations("FlectonePulse.Main.Features")
  return (
    <Carousel>
      <CarouselContent>
        {FEATURES.map((feature, key) => (
          <CarouselItem key={key}>
            <Container
              href={feature.link}
              className="group flex h-80 w-full items-center gap-4 transition"
            >
              <div className="flex w-2/5 flex-col gap-2">
                <h2 className="text-xl font-bold">
                  {t(`${feature.key}.title`)}
                </h2>
                <p>{t(`${feature.key}.description`)}</p>
                <span className="flex items-center gap-1 text-sm text-primary transition-all group-hover:gap-2">
                  <span>Подробнее</span>{" "}
                  <ArrowRight size={18} strokeWidth={1.5} />
                </span>
              </div>
              <div className="flex flex-1 items-center justify-center overflow-hidden rounded-lg">
                <Image
                  width={feature.width}
                  height={feature.height}
                  src={feature.image}
                  alt={feature.image}
                  className="w-full"
                />
              </div>
            </Container>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-2 flex w-full items-center justify-center gap-2">
        <CarouselPrevious />
        <CarouselBreadcrumbs className="" />
        <CarouselNext />
      </div>
    </Carousel>
  )
}
