"use client"
import { useState, useMemo, useEffect, useRef } from "react"
import MinecraftTab from "@/components/assets/minecraft-tab"
import { YamlFormatter } from "@/components/features/yaml-formatter"
import {
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  RotateCcw,
  Copy,
  Check,
} from "lucide-react"
import { HexColorPicker } from "react-colorful"
import { useTranslations } from "next-intl"
import { ColorList } from "@/components/features/color-list"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Separator } from "@/components/ui/separator"

const DEFAULT_TEXT = "Flectone"
const DEFAULT_COLORS = ["#a6dbff", "#5faefa"]
const DEFAULT_TICKS = 1
const DEFAULT_CHARS_PER_COLOR = 1

export default function TextAnimation() {
  const [text, setText] = useState<string>(DEFAULT_TEXT)
  const [frameIndex, setFrameIndex] = useState<number>(0)
  const [ticks, setTicks] = useState<number>(DEFAULT_TICKS)
  const [charsPerColor, setCharsPerColor] = useState<number>(
    DEFAULT_CHARS_PER_COLOR
  )
  const [gradientLength, setGradientLength] = useState<number | null>(null)
  const [animationStyle, setAnimationStyle] = useState<"ltr" | "rtl">("ltr")
  const [copied, setCopied] = useState(false)

  const [activePickerIndex, setActivePickerIndex] = useState<number | null>(
    null
  )
  const pickerRef = useRef<HTMLDivElement>(null)

  const effectiveGradientLength = (gradientLength ?? text.length * 2) || 1
  const [pickerColors, setPickerColors] = useState<string[]>(DEFAULT_COLORS)

  const inputRef = useRef<HTMLInputElement>(null)

  const resetAll = () => {
    setText(DEFAULT_TEXT)
    setFrameIndex(0)
    setTicks(DEFAULT_TICKS)
    setCharsPerColor(DEFAULT_CHARS_PER_COLOR)
    setGradientLength(null)
    setAnimationStyle("ltr")
    setPickerColors(DEFAULT_COLORS)
    setActivePickerIndex(null)
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setActivePickerIndex(null)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const hexToRgb = (hex: string): [number, number, number] => {
    const sanitizedHex = hex.replace("#", "")
    const r = parseInt(sanitizedHex.substring(0, 2), 16)
    const g = parseInt(sanitizedHex.substring(2, 4), 16)
    const b = parseInt(sanitizedHex.substring(4, 6), 16)
    return [r, g, b]
  }

  const rgbToHex = (r: number, g: number, b: number): string => {
    const toHex = (c: number) => Math.round(c).toString(16).padStart(2, "0")
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const generateGradientArray = (
    colorStart: string,
    colorEnd: string,
    steps: number
  ): string[] => {
    if (steps <= 0) return []
    if (steps === 1) return [colorStart]

    const [r1, g1, b1] = hexToRgb(colorStart)
    const [r2, g2, b2] = hexToRgb(colorEnd)
    const gradient: string[] = []

    for (let i = 0; i < steps; i++) {
      const t = i / (steps - 1)
      const r = r1 + (r2 - r1) * t
      const g = g1 + (g2 - g1) * t
      const b = b1 + (b2 - b1) * t
      gradient.push(rgbToHex(r, g, b))
    }
    return gradient
  }

  const baseGradient = useMemo(() => {
    if (pickerColors.length === 0) return []
    if (pickerColors.length === 1)
      return Array(effectiveGradientLength).fill(pickerColors[0])

    const fullGradient: string[] = []
    const stepsPerSegment = Math.max(
      2,
      Math.floor(effectiveGradientLength / pickerColors.length)
    )

    for (let i = 0; i < pickerColors.length; i++) {
      const start = pickerColors[i]
      const end = pickerColors[(i + 1) % pickerColors.length]

      const segment = generateGradientArray(start, end, stepsPerSegment)
      fullGradient.push(...segment.slice(0, -1))
    }

    while (
      fullGradient.length < effectiveGradientLength &&
      fullGradient.length > 0
    ) {
      fullGradient.push(fullGradient[fullGradient.length - 1])
    }

    return fullGradient
  }, [pickerColors, effectiveGradientLength])

  const shiftArray = (arr: string[], shift: number, style: "ltr" | "rtl") => {
    if (arr.length === 0) return []

    let offset = shift % arr.length

    if (style === "rtl") {
      offset = (arr.length - offset) % arr.length
    }

    return [...arr.slice(-offset), ...arr.slice(0, -offset)]
  }

  useEffect(() => {
    if (baseGradient.length === 0) return

    const intervalMs = ticks * 50
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % baseGradient.length)
    }, intervalMs)

    return () => clearInterval(interval)
  }, [baseGradient.length, ticks])

  const yamlOutput = useMemo(() => {
    if (!text || baseGradient.length === 0) return ""

    const frames: string[] = []
    const totalFrames = baseGradient.length

    for (let f = 0; f < totalFrames; f++) {
      const shiftedColors = shiftArray(baseGradient, f, animationStyle)
      let frameText = ""

      for (let i = 0; i < text.length; i++) {
        const colorIndex = Math.floor(i / charsPerColor) % shiftedColors.length
        const color = shiftedColors[colorIndex]
        frameText += `<${color}>${text[i]}`
      }
      frames.push(`  - "${frameText}"`)
    }

    return `${text}:\n${frames.join("\n")}`
  }, [text, baseGradient, ticks, charsPerColor, animationStyle])

  const animatedPreview = useMemo(() => {
    if (!text)
      return <span className="text-fd-primary">Введите текст ниже</span>
    if (baseGradient.length === 0) return <span>{text}</span>

    const shiftedColors = shiftArray(baseGradient, frameIndex, animationStyle)
    const speedInSeconds = (ticks * 50) / 1000

    return text.split("").map((char, i) => {
      const colorIndex = Math.floor(i / charsPerColor) % shiftedColors.length
      const color = shiftedColors[colorIndex]

      return (
        <span
          key={i}
          className="text-[1.28em]"
          style={{
            color: color,
            transition: `color ${speedInSeconds}s linear`,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      )
    })
  }, [text, baseGradient, frameIndex, charsPerColor, animationStyle, ticks])

  const t = useTranslations("FlectoneTools.TextAnimation")

  return (
    <div className="flex h-fit w-full gap-6 text-white max-lg:flex-col">
      <div className="flex w-1/3 flex-col gap-6 max-lg:w-full">
        <div
          onClick={() => inputRef.current?.focus()}
          className="flex w-full items-center justify-center rounded-xl border bg-[url('/assets/backgrounds/minecraft_clouds.webp')] p-4"
        >
          <MinecraftTab
            tabText={
              <div className="relative z-0 flex flex-wrap justify-center px-4 select-none">
                {animatedPreview}
              </div>
            }
          />
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Настройки</CardTitle>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldContent className="gap-4">
                <FieldGroup className="gap-2">
                  <FieldLabel>{t("Settings.text")}</FieldLabel>
                  <Input
                    ref={inputRef}
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                  />
                </FieldGroup>
                <FieldGroup className="gap-2">
                  <FieldLabel>
                    {t("Settings.interval")}:{" "}
                    <code className="rounded-sm bg-fd-card px-1 py-0.5">
                      {ticks} {t("Settings.ticks")} - {ticks * 50}{" "}
                      {t("Settings.ms")}
                    </code>
                  </FieldLabel>
                  <Slider
                    value={ticks}
                    min={1}
                    max={40}
                    step={1}
                    onValueChange={(value) => {
                      setTicks(Number(value))
                    }}
                  />
                </FieldGroup>
                <FieldGroup className="gap-2">
                  <FieldLabel>
                    {t("Settings.gradientBlur")}:{" "}
                    <code className="rounded-sm bg-fd-card px-1 py-0.5">
                      {effectiveGradientLength}
                    </code>
                  </FieldLabel>
                  <Slider
                    value={Number(effectiveGradientLength)}
                    min={1}
                    max={40}
                    onValueChange={(value) => {
                      setGradientLength(Number(value))
                    }}
                  />
                </FieldGroup>
                <FieldGroup className="gap-2">
                  <FieldLabel>
                    {t("Settings.symbols")}:{" "}
                    <code className="rounded-sm bg-fd-card px-1 py-0.5">
                      {charsPerColor}
                    </code>
                  </FieldLabel>
                  <Slider
                    value={Number(charsPerColor)}
                    min={1}
                    max={40}
                    onValueChange={(value) => {
                      setCharsPerColor(Number(value))
                    }}
                  />
                </FieldGroup>
                <ColorList
                  colors={pickerColors}
                  onChange={setPickerColors}
                  label={t("Settings.colors")}
                />
                <FieldGroup className="gap-2">
                  <FieldLabel>{t("Settings.gradientMode")}</FieldLabel>
                  <ButtonGroup className="flex w-full">
                    {(
                      [
                        { label: t("Settings.ltr"), value: "ltr" },
                        { label: t("Settings.rtl"), value: "rtl" },
                      ] as const
                    ).map(
                      (item: { label: string; value: "ltr" | "rtl" }, key) => (
                        <Button
                          className={"w-1/2"}
                          variant={
                            animationStyle === item.value
                              ? "default"
                              : "secondary"
                          }
                          onClick={() => setAnimationStyle(item.value)}
                          key={key}
                        >
                          {item.label}
                        </Button>
                      )
                    )}
                  </ButtonGroup>
                </FieldGroup>
                <div className="flex w-full justify-end">
                  <Button onClick={resetAll} variant={"destructive"}>
                    <RotateCcw size="1.2em" />
                    {t("Settings.reset")}
                  </Button>
                </div>
              </FieldContent>
            </Field>
          </CardContent>
        </Card>
      </div>
      <Card className="w-2/3 flex-1 max-xl:w-full">
        <CardContent className="overflow-visible">
          <div className="flex flex-col gap-2">
            <span className="flex items-center justify-between">
              {t("Output.frames")}
              <Button
                size={"icon-xs"}
                variant={"secondary"}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(yamlOutput)
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  } catch (err) {
                    console.error("Не удалось скопировать:", err)
                  }
                }}
              >
                {!copied ? <Copy /> : <Check />}
              </Button>
            </span>
            <Separator />
            <div className="w-full overflow-auto">
              <YamlFormatter yaml={yamlOutput} />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Separator />
            <span className="flex items-center justify-between">
              {t("Output.interval")}
              <Button
                size={"icon-xs"}
                variant={"secondary"}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(
                      `${text}:\n  interval: ${ticks}`
                    )
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  } catch (err) {
                    console.error("Не удалось скопировать:", err)
                  }
                }}
              >
                {!copied ? <Copy /> : <Check />}
              </Button>
            </span>
            <Separator />
            <div className="w-full overflow-auto">
              <YamlFormatter yaml={`${text}:\n  interval: ${ticks}`} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
