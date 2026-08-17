"use client"

import { useState, useEffect, ReactNode } from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeftRight,
  Container,
  ArrowRight,
  Copy,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldContent, FieldDescription } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselBreadcrumbs,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Badge } from "@/components/ui/badge"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { toast } from "@/components/ui/toast"
import { Separator } from "@/components/ui/separator"

function MinecraftIcon({ src, alt }: Readonly<{ src: string; alt: string }>) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-4 w-4 object-contain"
      style={{ imageRendering: "pixelated" }}
    />
  )
}

function CoordRow({
  label,
  values,
  placeholders,
  onChange,
}: {
  label: string
  values: string[]
  placeholders: string[]
  onChange: (index: number, value: string) => void
}) {
  return (
    <Card className="w-full shrink-0 max-lg:w-full">
      <CardHeader>
        <CardTitle>{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <Field>
          <FieldContent className="flex flex-row">
            {values.map((v, i) => (
              <Input
                key={i}
                value={v}
                onChange={(e) => onChange(i, e.target.value)}
                placeholder={placeholders[i]}
              />
            ))}
          </FieldContent>
        </Field>
      </CardContent>
    </Card>
  )
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px flex-1 bg-fd-border" />
      <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-fd-border bg-fd-card px-3 py-1.5 text-xs">
        <ArrowLeftRight className="h-3 w-3" />
        <span>{label}</span>
      </div>
      <div className="h-px flex-1 bg-fd-border" />
    </div>
  )
}

export default function CoordinateCalculator() {
  const t = useTranslations("FlectoneTools.CoordinateCalculator")

  const [mode, setMode] = useState<"nether" | "stronghold">("nether")
  const [lastEdited, setLastEdited] = useState<"nether" | "overworld" | null>(
    null
  )
  const [copied, setCopied] = useState<boolean>(false)
  const [nether, setNether] = useState(["", "", ""])
  const [overworld, setOverworld] = useState(["", "", ""])

  const [throw1, setThrow1] = useState(["", "", ""])
  const [throw2, setThrow2] = useState(["", "", ""])

  const [tutorialStep, setTutorialStep] = useState(1)

  const toNum = (v: string) => (v === "" || isNaN(Number(v)) ? null : Number(v))

  useEffect(() => {
    if (lastEdited !== "nether") return
    const [nx, ny, nz] = nether
    setOverworld([
      toNum(nx) !== null ? (toNum(nx)! * 8).toString() : "",
      ny,
      toNum(nz) !== null ? (toNum(nz)! * 8).toString() : "",
    ])
  }, [nether, lastEdited])

  useEffect(() => {
    if (lastEdited !== "overworld") return
    const [ox, oy, oz] = overworld
    setNether([
      toNum(ox) !== null ? (toNum(ox)! / 8).toString() : "",
      oy,
      toNum(oz) !== null ? (toNum(oz)! / 8).toString() : "",
    ])
  }, [overworld, lastEdited])

  const getIntersection = () => {
    const [x1, z1, a1] = throw1
    const [x2, z2, a2] = throw2
    const vals = [x1, z1, a1, x2, z2, a2].map(Number)
    if ([x1, z1, a1, x2, z2, a2].some((v) => v === "") || vals.some(isNaN))
      return null

    const toRad = (d: number) => d * (Math.PI / 180) + Math.PI / 2
    const [xA, zA, xB, zB] = [vals[0], vals[1], vals[3], vals[4]]
    const tan1 = Math.tan(toRad(vals[2]))
    const tan2 = Math.tan(toRad(vals[5]))
    const denom = tan2 - tan1
    if (!isFinite(denom) || Math.abs(denom) < 1e-9) return null

    const x = (zA - zB + xB * tan2 - xA * tan1) / denom
    const z = (zA * tan2 - zB * tan1 + (xB - xA) * tan1 * tan2) / denom
    if (!isFinite(x) || !isFinite(z)) return null

    return { x: x.toFixed(2), z: z.toFixed(2) }
  }

  const stronghold = getIntersection()

  const TUTORIAL = [
    {
      image: "/assets/tutorials/coordinates_1.webp",
      text: t("tutorialStep1"),
      badge: t("Step.one"),
    },
    {
      image: "/assets/tutorials/coordinates_2.webp",
      text: t("tutorialStep2"),
      badge: t("Step.two"),
    },
    {
      image: "/assets/tutorials/coordinates_final.webp",
      text: t("tutorialStep3"),
      badge: t("Step.three"),
    },
  ]

  const modeImage = {
    nether: "/assets/backgrounds/minecraft_nether_3.webp",
    stronghold: "/assets/backgrounds/minecraft_ender_portal.webp",
  }

  const MODES = [
    {
      label: t("nether"),
      icon: "/assets/icons/netherrack.webp",
      value: "nether",
    },
    {
      label: t("stronghold"),
      icon: "/assets/icons/ender_eye.webp",
      value: "stronghold",
    },
  ] as const

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="grid w-full grid-cols-2 items-stretch gap-6 max-lg:flex max-lg:flex-col">
        <div className="h-full w-full max-lg:w-full">
          <div className="flex flex-col gap-4">
            <div className="w-full overflow-hidden rounded-xl">
              <img src={modeImage[mode]} className="w-full" />
            </div>
            <ButtonGroup className="w-full">
              {MODES.map((item, key) => (
                <Button
                  onClick={() => setMode(item.value)}
                  key={key}
                  variant={mode === item.value ? "default" : "secondary"}
                  className={"w-1/2"}
                >
                  <MinecraftIcon src={item.icon} alt="" />
                  {item.label}
                </Button>
              ))}
            </ButtonGroup>
          </div>
        </div>

        <div className="h-full flex-1">
          <div className="grid h-full">
            {mode === "nether" ? (
              <div
                style={{ gridArea: "1 / 1" }}
                className={`flex h-full flex-col justify-between gap-4 ${mode !== "nether" ? "hidden" : ""}`}
              >
                <CoordRow
                  label={t("overworld")}
                  values={overworld}
                  placeholders={["X", "Y", "Z"]}
                  onChange={(i, v) => {
                    setLastEdited("overworld")
                    setOverworld((prev) =>
                      prev.map((val, idx) => (idx === i ? v : val))
                    )
                  }}
                />
                <Divider label="1 : 8" />
                <CoordRow
                  label={t("nether")}
                  values={nether}
                  placeholders={["X", "Y", "Z"]}
                  onChange={(i, v) => {
                    setLastEdited("nether")
                    setNether((prev) =>
                      prev.map((val, idx) => (idx === i ? v : val))
                    )
                  }}
                />
              </div>
            ) : (
              <div
                style={{ gridArea: "1 / 1" }}
                className={`flex h-full flex-col justify-between ${mode !== "stronghold" ? "hidden" : ""}`}
              >
                <CoordRow
                  label={t("firstThrow")}
                  values={throw1}
                  placeholders={["X", "Z", `${t("angle")} °`]}
                  onChange={(i, v) =>
                    setThrow1((prev) =>
                      prev.map((val, idx) => (idx === i ? v : val))
                    )
                  }
                />
                <Separator />
                <CoordRow
                  label={t("secondThrow")}
                  values={throw2}
                  placeholders={["X", "Z", `${t("angle")} °`]}
                  onChange={(i, v) =>
                    setThrow2((prev) =>
                      prev.map((val, idx) => (idx === i ? v : val))
                    )
                  }
                />
              </div>
            )}
          </div>
        </div>
        <Card className="col-span-2 row-start-2 w-full shrink-0 max-lg:w-full">
          <CardHeader>
            <CardTitle>{t("stronghold")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldContent className="flex w-full flex-row">
                <div className="flex w-full gap-2">
                  <InputGroup>
                    <InputGroupInput
                      type="text"
                      disabled
                      value={stronghold?.x ?? ""}
                    />
                    <InputGroupAddon align="inline-end">
                      <Button
                        size={"icon-xs"}
                        variant={"secondary"}
                        disabled={copied}
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(
                              stronghold?.x ?? ""
                            )
                            setCopied(true)
                            setTimeout(() => setCopied(false), 100)
                          } catch (err) {
                            console.error("Не удалось скопировать:", err)
                          }
                        }}
                      >
                        <Copy />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                  <InputGroup>
                    <InputGroupInput
                      type="text"
                      disabled
                      value={stronghold?.z ?? ""}
                    />
                    <InputGroupAddon align="inline-end">
                      <Button
                        size={"icon-xs"}
                        variant={"secondary"}
                        disabled={copied}
                        onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(
                              stronghold?.z ?? ""
                            )
                            setCopied(true)
                            setTimeout(() => setCopied(false), 100)
                          } catch (err) {
                            console.error("Не удалось скопировать:", err)
                          }
                        }}
                      >
                        <Copy />
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                </div>
              </FieldContent>
            </Field>
          </CardContent>
        </Card>
      </div>
      <Card className="">
        <CardHeader>
          <CardTitle>{t("tutorial")}</CardTitle>
        </CardHeader>
        <CardContent>
          <Carousel>
            <CarouselContent>
              {TUTORIAL.map((item, key) => (
                <CarouselItem
                  key={key}
                  className="flex gap-6 max-xl:flex-col-reverse"
                >
                  <Image
                    src={item.image}
                    width={600}
                    height={300}
                    className="w-full rounded-md"
                    alt=""
                  />
                  <div className="flex flex-col gap-2">
                    <Badge>{item.badge}</Badge>
                    <h2 className="text-lg font-bold">{item.text}</h2>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="mt-2 flex w-full items-center justify-center gap-2">
              <CarouselPrevious />
              <CarouselBreadcrumbs className="" />
              <CarouselNext />
            </div>
          </Carousel>
        </CardContent>
      </Card>
    </div>
  )
}
