"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Container from "@/components/shared/container"

export interface ModuleImage {
  src: string
  width: number
  height: number
}

interface ModuleCardProps {
  className?: string
  title: string
  description: string
  images: ModuleImage[]
  link: string
  layout?: "vertical" | "horizontal" | "horizontal-reverse"
  delay?: number
}

const INTERVAL = 5000

export default function ModuleCard({
  className = "",
  title,
  description,
  images,
  link,
  layout = "vertical",
  delay = 0,
}: ModuleCardProps) {
  const horizontal = layout !== "vertical"
  const reverse = layout === "horizontal-reverse"

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (images.length < 2 || paused) return

    let interval: ReturnType<typeof setInterval>

    const timeout = setTimeout(() => {
      setCurrent((index) => (index + 1) % images.length)
      interval = setInterval(() => {
        setCurrent((index) => (index + 1) % images.length)
      }, INTERVAL)
    }, INTERVAL + delay)

    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
  }, [images.length, paused, delay])

  return (
    <Container
      href={link}
      className={cn(
        "flex gap-6 rounded-xl border bg-card p-6 transition hover:bg-muted-card max-sm:gap-4",
        horizontal ? "items-stretch max-md:flex-col" : "flex-col",
        horizontal && reverse && "flex-row-reverse",
        className
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2 text-start",
          horizontal ? "w-2/5 justify-center max-md:w-full" : ""
        )}
      >
        <h2 className="text-xl font-bold max-sm:text-lg">{title}</h2>
        <p>{description}</p>
      </div>

      <div
        className={cn(
          "relative overflow-hidden rounded-md bg-background",
          horizontal
            ? "min-h-64 flex-1 max-md:h-56 max-md:w-full"
            : "mt-auto h-56 w-full max-sm:h-48"
        )}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {images.map((image, index) => (
          <span
            key={image.src}
            className={cn(
              "absolute inset-0 flex items-center justify-center p-4 duration-500 max-sm:p-3",
              index === current ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              src={image.src}
              alt={title}
              width={image.width}
              height={image.height}
              sizes="(max-width: 768px) 100vw, 700px"
              className="h-auto max-h-full w-auto max-w-full rounded-md"
            />
          </span>
        ))}

        {images.length > 1 && (
          <span className="absolute right-3 bottom-3 flex gap-1">
            {images.map((image, index) => (
              <span
                key={image.src}
                className={`size-1.5 rounded-full duration-100 ${index === current ? "bg-primary" : "bg-border"}`}
              />
            ))}
          </span>
        )}
      </div>
    </Container>
  )
}
