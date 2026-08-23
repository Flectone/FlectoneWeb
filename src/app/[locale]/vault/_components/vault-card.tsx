"use client"
import Container from "@/components/shared/container"
import { LucideCalendar, Clock, Eye, Download, Calendar } from "lucide-react"
import { FaYoutube } from "react-icons/fa"
import { SiBoosty } from "react-icons/si"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "motion/react"
import { Link } from "@/i18n/navigation"
import { useState } from "react"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

interface VaultCardProps {
  title: string
  image: string
  date: string
  views: string
  videoUrl: string
  mapUrl: string
  duration: string
  className?: string
}

export function VaultCardLoading() {
  return (
    <Card>
      <div className="-mt-(--card-spacing) aspect-video">
        <Skeleton className="aspect-video rounded-b-none" />
      </div>
      <div className="mx-(--card-spacing) flex flex-col gap-4">
        <CardTitle className="flex flex-col gap-1">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-4 w-2/3" />
        </CardDescription>
      </div>
    </Card>
  )
}

export function VaultCard({
  title,
  image,
  date,
  views,
  videoUrl,
  mapUrl,
  duration,
  className,
}: VaultCardProps) {
  const t = useTranslations("FlectoneVault.Card")

  const [youtubeIsOpen, setYoutubeIsOpen] = useState<boolean>(false)
  const [boostyIsOpen, setBoostyIsOpen] = useState<boolean>(false)

  return (
    <Card>
      <Link
        target="blank"
        rel="noopener noreferrer"
        href={videoUrl}
        className="relative -mt-(--card-spacing)"
      >
        <motion.div
          whileHover={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          className="absolute z-5 h-full w-full bg-card/70"
        >
          <Badge variant={"secondary"} className="absolute bottom-0 left-0 m-2">
            <FaYoutube />
            {t("watchYoutube")}
          </Badge>
        </motion.div>
        <img
          src={image}
          alt="Event cover"
          loading="lazy"
          decoding="async"
          className="aspect-video"
        />
        <Badge
          className="absolute right-0 bottom-0 m-2 rounded-sm bg-secondary/70"
          variant={"secondary"}
        >
          {duration}
        </Badge>
      </Link>
      <Link
        target="blank"
        rel="noopener noreferrer"
        href={mapUrl}
        onMouseOver={() => setBoostyIsOpen(true)}
        onMouseOut={() => setBoostyIsOpen(false)}
        className="relative -my-(--card-spacing) flex flex-col gap-2 p-(--card-spacing) transition hover:bg-muted-card"
      >
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className={cn("relative", boostyIsOpen && "h-5")}>
          <AnimatePresence>
            {boostyIsOpen && (
              <motion.div className="absolute flex gap-1" exit={{ opacity: 0 }}>
                <Badge className="" variant={"secondary"}>
                  <SiBoosty />
                  {t("watchBoosty")}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!boostyIsOpen && (
              <motion.div className="flex gap-1" exit={{ opacity: 0 }}>
                <Badge className="text-muted-foreground" variant={"secondary"}>
                  <Calendar />
                  {date}
                </Badge>
                <Badge className="text-muted-foreground" variant={"secondary"}>
                  <Eye />
                  {views}
                </Badge>
                <Badge className="text-muted-foreground" variant={"secondary"}>
                  <Clock />
                  {duration}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </CardDescription>
      </Link>
    </Card>
  )
}
