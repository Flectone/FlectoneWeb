"use client"
import { useRef, useState, useEffect } from "react"

import { useTranslations } from "next-intl"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group"
import { Copy } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { Slider } from "@/components/ui/slider"
import { Field, FieldContent } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

export default function TimeConvertor() {
  const [rotate, setRotate] = useState(90)
  const [isDragging, setIsDragging] = useState(false)
  const [startRotate, setStartRotate] = useState(0)
  const [startAngle, setStartAngle] = useState(0)
  const divRef = useRef<HTMLImageElement>(null)
  const t = useTranslations("FlectoneTools.TimeConvertor")

  const normalizeAngle = (angle: number) => {
    angle = angle % 360
    if (angle < 0) angle += 360
    return angle
  }

  const getAngle = (event: any, center: any) => {
    const clientX =
      event.clientX || (event.touches ? event.touches[0].clientX : 0)
    const clientY =
      event.clientY || (event.touches ? event.touches[0].clientY : 0)
    return (Math.atan2(clientY - center.y, clientX - center.x) * 180) / Math.PI
  }

  const onMouseDown = (e: any) => {
    if (!divRef.current) return
    e.stopPropagation()
    setIsDragging(true)
    const rect = divRef.current.getBoundingClientRect()
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
    const angle = getAngle(e, center)
    setStartAngle(angle)
    setStartRotate(rotate)
  }

  const onMouseMove = (e: any) => {
    if (!isDragging || !divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    const center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    }
    const currentAngle = getAngle(e, center)
    let delta = currentAngle - startAngle
    let newRotate = startRotate + delta
    newRotate = normalizeAngle(newRotate)
    setRotate(newRotate)
  }

  const onMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove)
      window.addEventListener("mouseup", onMouseUp)
      return () => {
        window.removeEventListener("mousemove", onMouseMove)
        window.removeEventListener("mouseup", onMouseUp)
      }
    }
  }, [isDragging])

  const [moon, sun] = [
    "/assets/minecraft_moon.webp",
    "/assets/minecraft_sun.webp",
  ]

  return (
    <div className="flex w-full items-start justify-center gap-6 max-xl:flex-col-reverse">
      <div className="group flex w-1/2 items-center justify-center rounded-2xl border bg-card py-18 max-xl:w-full">
        <div className="h-sm relative w-sm max-sm:h-62 max-sm:w-62">
          <div className="h-sm relative flex w-sm items-center justify-center overflow-hidden rounded-full border-2 max-sm:h-62 max-sm:w-62">
            <img
              ref={divRef}
              onMouseDown={onMouseDown}
              style={{
                transform: `rotate(${rotate}deg)`,
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
              }}
              className="h-sm z-50 w-sm select-none max-sm:h-62 max-sm:w-62"
              src={200 < rotate && rotate < 340 ? moon : sun}
              draggable="false"
            />
            <img
              src="/assets/flectonetools/flectonetools_timeconverter_cycle.webp"
              className="h-sm absolute w-sm rounded-full"
              alt=""
            />
          </div>

          {Array.from({ length: 24 }).map((_, index) => {
            const angle = (index * 360) / 24 - 180
            const radian = (angle * Math.PI) / 180
            const radius = 60
            const x = 50 + radius * Math.cos(radian)
            const y = 50 + radius * Math.sin(radian)
            const romanHours = [
              "XII",
              "I",
              "II",
              "III",
              "IV",
              "V",
              "VI",
              "VII",
              "VIII",
              "IX",
              "X",
              "XI",
              "XII",
            ]
            const hours = index + 6 > 24 ? index - 18 : index + 6
            const hour = hours > 11 ? romanHours[hours - 12] : romanHours[hours]
            return (
              <div
                key={index}
                className={`text-md absolute transform cursor-pointer rounded-sm bg-fd-card px-2 font-[Minecraft] text-fd-muted-foreground duration-75 hover:text-fd-foreground`}
                onClick={() => setRotate(index * 15)}
                style={{
                  position: "absolute",
                  left: `${x}%`,
                  top: `${y}%`,
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                {hour}
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex w-1/2 flex-col gap-6 max-xl:w-full">
        <Card className="">
          <CardHeader>
            <CardTitle>{t("command")}</CardTitle>
          </CardHeader>
          <CardContent>
            <InputGroup>
              <InputGroupInput
                disabled
                value={`/time set ${Math.ceil((Math.ceil(rotate) * 24000) / 360)}`}
              />
              <InputGroupAddon align={"inline-end"}>
                <InputGroupButton
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(
                        `/time set ${Math.ceil((Math.ceil(rotate) * 24000) / 360)}`
                      )
                      toast.add({
                        type: "success",
                        description: t("coppied"),
                      })
                    } catch (err) {
                      console.error("Не удалось скопировать:", err)
                    }
                  }}
                >
                  <Copy />
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>
              {t("sunAngle")}: <code>{Math.ceil(rotate)}°</code>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Slider
              className={"w-full"}
              value={rotate}
              min={0}
              max={360}
              step={1}
              onValueChange={(v) => {
                setRotate(Number(v))
              }}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("Presets.title")}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2">
            {(
              [
                { label: t("Presets.day"), value: 15 },
                { label: t("Presets.noon"), value: 90 },
                { label: t("Presets.night"), value: 210 },
                { label: t("Presets.midnight"), value: 270 },
              ] as const
            ).map((item, key) => (
              <Button
                onClick={() => {
                  setRotate(item.value)
                }}
                variant={rotate === item.value ? "default" : "secondary"}
                key={key}
              >
                {item.label}
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
