"use client"

import React, { useCallback, useEffect, useRef, useState } from "react"
import { ColorList } from "@/components/features/color-list"
import { RotateCcw } from "lucide-react"
import { useTranslations } from "next-intl"
import {
  Field,
  FieldContent,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"

const GRID_SIZE = 8

function toSingleValue(value: number | readonly number[]) {
  return Array.isArray(value) ? value[0] : (value as number)
}

const AVAILABLE_FONTS = [
  {
    value: "10px Minecraft",
    label: "Minecraft Regular",
    family: "Minecraft",
    offsetY: 9,
  },
  {
    value: "10px MinecraftBold",
    label: "Minecraft Bold",
    family: "MinecraftBold",
    offsetY: 9,
  },
]

function completeHexColor(hexInput: string) {
  let cleanHex = hexInput.replace(/[^0-9A-Fa-f]/g, "")
  if (cleanHex.length === 0) {
    return "#000000"
  }
  if (cleanHex.length === 3) {
    return (
      "#" +
      cleanHex
        .split("")
        .map((char) => char + char)
        .join("")
    )
  }
  while (cleanHex.length < 6) {
    cleanHex += cleanHex
  }
  return "#" + cleanHex.substring(0, 6).toLowerCase()
}

export default function PrefixGenerator() {
  const t = useTranslations("FlectoneTools.PrefixGenerator")
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [text, setText] = useState("flectone")
  const [font, setFont] = useState(AVAILABLE_FONTS[0].value)
  const [fontOffset, setFontOffset] = useState(AVAILABLE_FONTS[0].offsetY)
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [paddingX, setPaddingX] = useState(0)
  const [paddingY, setPaddingY] = useState(0)
  const [bgColor, setBgColor] = useState(["#3f51b5"])
  const [textColor, setTextColor] = useState(["#B0D3EA"])
  const [useGrid, setUseGrid] = useState(true)

  const [bgGradientAngle, setBgGradientAngle] = useState(0)

  const [enableShadow, setEnableShadow] = useState(true)
  const [shadowOffsetX, setShadowOffsetX] = useState(1)
  const [shadowOffsetY, setShadowOffsetY] = useState(1)
  const [shadowColor, setShadowColor] = useState(["#000000"])
  const [shadowOpacity, setShadowOpacity] = useState(0.5)

  const [enableBorder, setEnableBorder] = useState(false)
  const [borderType, setBorderType] = useState<"foreground" | "background">(
    "foreground"
  )
  const [borderTop, setBorderTop] = useState(1)
  const [borderRight, setBorderRight] = useState(1)
  const [borderBottom, setBorderBottom] = useState(1)
  const [borderLeft, setBorderLeft] = useState(1)
  const [borderColor, setBorderColor] = useState<string[]>(["#ffffff"])
  const [useSameBorder, setUseSameBorder] = useState(true)
  const [borderGradientAngle, setBorderGradientAngle] = useState(0)

  const [textOffsetX, setTextOffsetX] = useState(0)
  const [textOffsetY, setTextOffsetY] = useState(1)

  const [gradientAngle, setGradientAngle] = useState(0)
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : ""

  function resetAll() {
    setText("flectone")
    setFont(AVAILABLE_FONTS[0].value)
    setFontOffset(AVAILABLE_FONTS[0].offsetY)
    setPaddingX(0)
    setPaddingY(0)
    setBgColor(["#3f51b5"])
    setTextColor(["#B0D3EA"])
    setUseGrid(true)

    setBgGradientAngle(0)

    setEnableShadow(true)
    setShadowOffsetX(1)
    setShadowOffsetY(1)
    setShadowColor(["#000000"])
    setShadowOpacity(0.5)

    setEnableBorder(false)
    setBorderType("foreground")
    setBorderTop(1)
    setBorderRight(1)
    setBorderBottom(1)
    setBorderLeft(1)
    setBorderColor(["#ffffff"])
    setUseSameBorder(true)
    setBorderGradientAngle(0)

    setTextOffsetX(0)
    setTextOffsetY(1)

    setGradientAngle(0)
  }

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const fontPromises = AVAILABLE_FONTS.map(async (fontConfig) => {
          if (document.fonts.check(`10px ${fontConfig.family}`)) {
            return true
          }
          try {
            await document.fonts.load(`10px "${fontConfig.family}"`)
          } catch (e) {
            console.warn(`Failed to load font: ${fontConfig.family}`, e)
            await document.fonts.ready
          }
        })

        await Promise.all(fontPromises)
        await document.fonts.ready
        setFontsLoaded(true)
      } catch (error) {
        console.error("Error loading fonts:", error)
        setFontsLoaded(true)
      }
    }

    loadFonts()
  }, [])

  const getDarkerColor = (hex: string, amount = 0.8) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${Math.floor(r * (1 - amount))}, ${Math.floor(g * (1 - amount))}, ${Math.floor(b * (1 - amount))})`
  }

  const getBorderColor = useCallback(() => {
    if (borderColor.length > 0 && borderColor[0]) {
      return borderColor[0]
    }
    return getDarkerColor(bgColor[0], 0.5)
  }, [borderColor, bgColor])

  const createBorderGradient = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number
    ) => {
      const angleRad = (borderGradientAngle * Math.PI) / 180
      const cos = Math.cos(angleRad)
      const sin = Math.sin(angleRad)

      let startX = x
      let startY = y
      let endX = x + width
      let endY = y + height

      if (borderGradientAngle !== 0) {
        const centerX = x + width / 2
        const centerY = y + height / 2

        startX = centerX - (width / 2) * cos - (height / 2) * sin
        startY = centerY - (width / 2) * sin + (height / 2) * cos
        endX = centerX + (width / 2) * cos + (height / 2) * sin
        endY = centerY + (width / 2) * sin - (height / 2) * cos
      }

      const gradient = ctx.createLinearGradient(startX, startY, endX, endY)

      if (borderColor.length === 1) {
        try {
          gradient.addColorStop(0, borderColor[0])
          gradient.addColorStop(1, borderColor[0])
        } catch (err) {
          console.error(err)
        }
      } else {
        borderColor.forEach((color, index) => {
          const position = index / (borderColor.length - 1)
          gradient.addColorStop(position, completeHexColor(color))
        })
      }

      return gradient
    },
    [borderColor, borderGradientAngle]
  )

  const createBackgroundGradient = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const angleRad = (bgGradientAngle * Math.PI) / 180
      const cos = Math.cos(angleRad)
      const sin = Math.sin(angleRad)

      let startX = 0
      let startY = 0
      let endX = width
      let endY = height

      if (bgGradientAngle !== 0) {
        const centerX = width / 2
        const centerY = height / 2

        startX = centerX - (width / 2) * cos - (height / 2) * sin
        startY = centerY - (width / 2) * sin + (height / 2) * cos
        endX = centerX + (width / 2) * cos + (height / 2) * sin
        endY = centerY + (width / 2) * sin - (height / 2) * cos
      }

      const gradient = ctx.createLinearGradient(startX, startY, endX, endY)

      if (bgColor.length === 1) {
        try {
          gradient.addColorStop(0, bgColor[0])
          gradient.addColorStop(1, bgColor[0])
        } catch (err) {
          console.error(err)
        }
      } else {
        bgColor.forEach((color, index) => {
          const position = index / (bgColor.length - 1)
          gradient.addColorStop(position, completeHexColor(color))
        })
      }

      return gradient
    },
    [bgColor, bgGradientAngle]
  )

  const createTextGradient = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      textWidth: number
    ) => {
      const angleRad = (gradientAngle * Math.PI) / 180
      const cos = Math.cos(angleRad)
      const sin = Math.sin(angleRad)

      const textHeight = 8

      let startX = x
      let startY = y
      let endX = x + textWidth
      let endY = y + textHeight

      if (gradientAngle !== 0) {
        const centerX = x + textWidth / 2
        const centerY = y + textHeight / 2

        startX = centerX - (textWidth / 2) * cos - (textHeight / 2) * sin
        startY = centerY - (textWidth / 2) * sin + (textHeight / 2) * cos
        endX = centerX + (textWidth / 2) * cos + (textHeight / 2) * sin
        endY = centerY + (textWidth / 2) * sin - (textHeight / 2) * cos
      }

      const gradient = ctx.createLinearGradient(startX, startY, endX, endY)

      if (textColor.length === 1) {
        try {
          gradient.addColorStop(0, textColor[0])
          gradient.addColorStop(1, textColor[0])
        } catch (err) {
          console.error(err)
        }
      } else {
        textColor.forEach((color, index) => {
          const position = index / (textColor.length - 1)
          gradient.addColorStop(position, completeHexColor(color))
        })
      }

      return gradient
    },
    [textColor, gradientAngle]
  )

  const drawBorder = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      finalWidth: number,
      finalHeight: number
    ) => {
      const borderGradient = createBorderGradient(
        ctx,
        0,
        0,
        finalWidth,
        finalHeight
      )
      const borderColorValue =
        borderColor.length > 1 ? borderGradient : getBorderColor()

      if (borderTop > 0) {
        ctx.fillStyle = borderColorValue
        ctx.fillRect(0, 0, finalWidth, borderTop)
      }

      if (borderBottom > 0) {
        ctx.fillStyle = borderColorValue
        ctx.fillRect(0, finalHeight - borderBottom, finalWidth, borderBottom)
      }

      if (borderLeft > 0) {
        ctx.fillStyle = borderColorValue
        ctx.fillRect(0, 0, borderLeft, finalHeight)
      }

      if (borderRight > 0) {
        ctx.fillStyle = borderColorValue
        ctx.fillRect(finalWidth - borderRight, 0, borderRight, finalHeight)
      }
    },
    [
      borderTop,
      borderRight,
      borderBottom,
      borderLeft,
      borderColor,
      getBorderColor,
      createBorderGradient,
    ]
  )

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    if (!document.fonts.check(`10px ${font.split(" ")[1]}`)) {
      setTimeout(() => draw(), 100)
      return
    }

    ctx.imageSmoothingEnabled = false
    ;(ctx as any).webkitImageSmoothingEnabled = false
    ;(ctx as any).mozImageSmoothingEnabled = false

    ctx.font = font

    const textWidth = text
      .split("")
      .reduce((sum, char) => sum + Math.ceil(ctx.measureText(char).width), 0)
    let finalWidth = Math.max(textWidth + paddingX * 2, 8)
    let finalHeight = Math.max(8 + paddingY * 2, 8)

    if (useGrid) {
      finalWidth = Math.ceil(finalWidth / GRID_SIZE) * GRID_SIZE
      finalHeight = Math.ceil(finalHeight / GRID_SIZE) * GRID_SIZE
    }

    canvas.width = finalWidth
    canvas.height = finalHeight

    ctx.font = font

    ctx.fillStyle = createBackgroundGradient(ctx, finalWidth, finalHeight)
    ctx.fillRect(0, 0, finalWidth, finalHeight)

    if (enableBorder && borderType === "background") {
      drawBorder(ctx, finalWidth, finalHeight)
    }

    const baseOffsetX = Math.floor((finalWidth - textWidth) / 2)
    const baseOffsetY = Math.floor((finalHeight - fontOffset) / 2)
    const offsetX = baseOffsetX + textOffsetX
    const offsetY =
      baseOffsetY +
      textOffsetY -
      (userAgent.match(/chrome|chromium|crios/i) ? 1 : 0)

    if (enableShadow) {
      const shadowCanvas = document.createElement("canvas")
      shadowCanvas.width = finalWidth
      shadowCanvas.height = finalHeight
      const shadowCtx = shadowCanvas.getContext("2d")!
      shadowCtx.imageSmoothingEnabled = false
      shadowCtx.font = font
      shadowCtx.textBaseline = "top"
      shadowCtx.fillStyle = shadowColor[0]
      shadowCtx.fillText(
        text,
        offsetX + shadowOffsetX,
        offsetY + shadowOffsetY - 1
      )

      const shadowData = shadowCtx.getImageData(0, 0, finalWidth, finalHeight)
      const sd = shadowData.data
      for (let i = 0; i < sd.length; i += 4) {
        if (sd[i + 3] > 128) {
          sd[i + 3] = Math.round(255 * shadowOpacity)
        } else {
          sd[i + 3] = 0
        }
      }
      shadowCtx.putImageData(shadowData, 0, 0)
      ctx.drawImage(shadowCanvas, 0, 0)
    }

    const textCanvas = document.createElement("canvas")
    textCanvas.width = finalWidth
    textCanvas.height = finalHeight
    const textCtx = textCanvas.getContext("2d")!
    textCtx.imageSmoothingEnabled = false
    textCtx.font = font
    textCtx.textBaseline = "top"

    if (textColor.length > 1) {
      const gradient = createTextGradient(textCtx, offsetX, offsetY, textWidth)
      textCtx.fillStyle = gradient
    } else {
      textCtx.fillStyle = textColor[0]
    }
    textCtx.fillText(text, offsetX, offsetY - 1)

    const textData = textCtx.getImageData(0, 0, finalWidth, finalHeight)
    const td = textData.data
    for (let i = 0; i < td.length; i += 4) {
      td[i + 3] = td[i + 3] > 128 ? 255 : 0
    }
    textCtx.putImageData(textData, 0, 0)
    ctx.drawImage(textCanvas, 0, 0)

    if (enableBorder && borderType === "foreground") {
      drawBorder(ctx, finalWidth, finalHeight)
    }
  }, [
    text,
    font,
    paddingX,
    paddingY,
    bgColor,
    textColor,
    useGrid,
    enableShadow,
    shadowOffsetX,
    shadowOffsetY,
    shadowColor,
    shadowOpacity,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    getBorderColor,
    textOffsetX,
    textOffsetY,
    gradientAngle,
    createTextGradient,
    bgGradientAngle,
    createBackgroundGradient,
    enableBorder,
    borderColor,
    borderGradientAngle,
    createBorderGradient,
    borderType,
    drawBorder,
    fontOffset,
  ])

  useEffect(() => {
    if (fontsLoaded) {
      draw()
    }
  }, [
    fontsLoaded,
    draw,
    text,
    font,
    paddingX,
    paddingY,
    bgColor,
    textColor,
    useGrid,
    enableShadow,
    shadowOffsetX,
    shadowOffsetY,
    shadowColor,
    shadowOpacity,
    borderTop,
    borderRight,
    borderBottom,
    borderLeft,
    textOffsetX,
    textOffsetY,
    gradientAngle,
    bgGradientAngle,
    enableBorder,
    borderColor,
    borderGradientAngle,
    borderType,
  ])

  const canvasWidth = canvasRef.current?.width || 48
  const canvasHeight = canvasRef.current?.height || 8

  const MAX_CONTAINER_SIZE = 400
  const scale = Math.min(
    MAX_CONTAINER_SIZE / canvasWidth,
    MAX_CONTAINER_SIZE / canvasHeight
  )
  const finalScale = Math.max(1, scale)
  const displayWidth = canvasWidth * finalScale
  const displayHeight = canvasHeight * finalScale

  const handleSameBorderChange = (value: number) => {
    setBorderTop(value)
    setBorderRight(value)
    setBorderBottom(value)
    setBorderLeft(value)
  }

  const handleFontChange = (fontValue: string) => {
    const selectedFont = AVAILABLE_FONTS.find((f) => f.value === fontValue)
    setFont(fontValue)
    if (selectedFont) {
      setFontOffset(selectedFont.offsetY)
    }
  }

  return (
    <div className="flex w-full gap-4 max-md:flex-col">
      <div className="flex w-1/3 flex-col items-center gap-4 max-md:w-full">
        <Card className="w-full">
          <CardContent>
            <Field>
              <FieldLabel>{t("Settings.text")}</FieldLabel>
              <FieldContent>
                <Input onChange={(e) => setText(e.target.value)} value={text} />
              </FieldContent>
            </Field>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardContent>
            <Field>
              <FieldLabel>{t("Settings.font")}</FieldLabel>
              <FieldContent>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button
                        className={"flex justify-start"}
                        variant="outline"
                      />
                    }
                  >
                    {
                      AVAILABLE_FONTS.filter((item) => item.value === font)[0]
                        .label
                    }
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {AVAILABLE_FONTS.map((item, key) => (
                      <DropdownMenuItem
                        key={key}
                        onClick={() => handleFontChange(item.value)}
                      >
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </FieldContent>
            </Field>
          </CardContent>
        </Card>

        <div className="relative flex h-fit w-full items-center justify-center rounded-2xl border-2 border-dashed bg-card p-6">
          <div
            id="preview"
            className="flex items-center justify-center"
            style={{
              width: "100%",
              height: "auto",
              minHeight: "100px",
            }}
          >
            {fontsLoaded && (
              <canvas
                ref={canvasRef}
                style={{
                  imageRendering: "pixelated",
                  width: `${displayWidth}px`,
                  height: `${displayHeight}px`,
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            )}
          </div>
        </div>
        <div className="flex w-full justify-end">
          <Button
            onClick={() => {
              const link = document.createElement("a")
              link.download = `${text.toLowerCase()}-prefix.png`
              link.href = canvasRef.current?.toDataURL() || ""
              link.click()
            }}
            className={"w-full"}
          >
            {t("download")}
          </Button>
        </div>
      </div>

      <div className="flex w-2/3 flex-col gap-4 max-md:w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("Settings.padding")}</CardTitle>
            <CardAction>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="use-grid"
                  checked={useGrid}
                  onCheckedChange={setUseGrid}
                />
                <FieldLabel htmlFor="use-grid" className="text-sm font-normal">
                  {t("Settings.grid")}
                </FieldLabel>
              </div>
            </CardAction>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>
                  {t("Settings.horizontal")}:{" "}
                  <code className="rounded-sm bg-fd-card px-1 py-0.5">
                    {paddingX}px
                  </code>
                </FieldLabel>
                <FieldContent>
                  <Slider
                    value={[paddingX]}
                    step={useGrid ? 4 : 1}
                    min={0}
                    max={64}
                    onValueChange={(v) => setPaddingX(toSingleValue(v))}
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel>
                  {t("Settings.vertical")}:{" "}
                  <code className="rounded-sm bg-fd-card px-1 py-0.5">
                    {paddingY}px
                  </code>
                </FieldLabel>
                <FieldContent>
                  <Slider
                    value={[paddingY]}
                    step={useGrid ? 4 : 1}
                    min={0}
                    max={64}
                    onValueChange={(v) => setPaddingY(toSingleValue(v))}
                  />
                </FieldContent>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("Settings.colors")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex w-full gap-4 max-md:flex-col">
              <div className="flex w-1/2 flex-col gap-2 max-md:w-full">
                <ColorList
                  colors={textColor}
                  onChange={setTextColor}
                  label={t("Settings.text")}
                  maxColors={5}
                />
                {textColor.length > 1 && (
                  <Field>
                    <FieldLabel>
                      {t("Settings.gradientAngle")}:{" "}
                      <code className="rounded-sm bg-fd-card px-1 py-0.5">
                        {gradientAngle}°
                      </code>
                    </FieldLabel>
                    <FieldContent>
                      <Slider
                        value={[gradientAngle]}
                        step={15}
                        min={0}
                        max={360}
                        onValueChange={(v) =>
                          setGradientAngle(toSingleValue(v))
                        }
                      />
                    </FieldContent>
                  </Field>
                )}
              </div>
              <div className="flex w-1/2 flex-col gap-2 max-md:w-full">
                <ColorList
                  colors={bgColor}
                  onChange={setBgColor}
                  label={t("Settings.background")}
                  maxColors={5}
                />
                {bgColor.length > 1 && (
                  <Field>
                    <FieldLabel>
                      {t("Settings.gradientAngle")}:{" "}
                      <code className="rounded-sm bg-fd-card px-1 py-0.5">
                        {bgGradientAngle}°
                      </code>
                    </FieldLabel>
                    <FieldContent>
                      <Slider
                        value={[bgGradientAngle]}
                        step={15}
                        min={0}
                        max={360}
                        onValueChange={(v) =>
                          setBgGradientAngle(toSingleValue(v))
                        }
                      />
                    </FieldContent>
                  </Field>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <CardTitle>{t("Settings.textOffset")}</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>
                  {t("Settings.horizontal")}:{" "}
                  <code className="rounded-sm bg-fd-card px-1 py-0.5">
                    {textOffsetX > 0 ? "+" : ""}
                    {textOffsetX}px
                  </code>
                </FieldLabel>
                <FieldContent>
                  <Slider
                    value={[textOffsetX]}
                    step={1}
                    min={-32}
                    max={32}
                    onValueChange={(v) => setTextOffsetX(toSingleValue(v))}
                  />
                </FieldContent>
              </Field>
              <Field>
                <FieldLabel>
                  {t("Settings.vertical")}:{" "}
                  <code className="rounded-sm bg-fd-card px-1 py-0.5">
                    {textOffsetY > 0 ? "+" : ""}
                    {textOffsetY}px
                  </code>
                </FieldLabel>
                <FieldContent>
                  <Slider
                    value={[textOffsetY]}
                    step={1}
                    min={-32}
                    max={32}
                    onValueChange={(v) => setTextOffsetY(toSingleValue(v))}
                  />
                </FieldContent>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Checkbox
                id="enable-shadow"
                checked={enableShadow}
                onCheckedChange={setEnableShadow}
              />
              <CardTitle>
                <label htmlFor="enable-shadow" className="cursor-pointer">
                  {t("Settings.textShadow")}
                </label>
              </CardTitle>
            </div>
          </CardHeader>
          {enableShadow && (
            <CardContent className="flex flex-col gap-4">
              <FieldGroup className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel>
                    {t("Settings.horizontalOffset")}:{" "}
                    <code className="rounded-sm bg-fd-card px-1 py-0.5">
                      {shadowOffsetX > 0 ? "+" : ""}
                      {shadowOffsetX}px
                    </code>
                  </FieldLabel>
                  <FieldContent>
                    <Slider
                      value={[shadowOffsetX]}
                      step={1}
                      min={-8}
                      max={8}
                      onValueChange={(v) => setShadowOffsetX(toSingleValue(v))}
                    />
                  </FieldContent>
                </Field>
                <Field>
                  <FieldLabel>
                    {t("Settings.verticalOffset")}:{" "}
                    <code className="rounded-sm bg-fd-card px-1 py-0.5">
                      {shadowOffsetY > 0 ? "+" : ""}
                      {shadowOffsetY}px
                    </code>
                  </FieldLabel>
                  <FieldContent>
                    <Slider
                      value={[shadowOffsetY]}
                      step={1}
                      min={-8}
                      max={8}
                      onValueChange={(v) => setShadowOffsetY(toSingleValue(v))}
                    />
                  </FieldContent>
                </Field>
              </FieldGroup>
              <div className="flex w-full gap-4 max-md:flex-col">
                <div className="w-1/2 max-md:w-full">
                  <ColorList
                    colors={shadowColor}
                    onChange={setShadowColor}
                    label={t("Settings.shadowColor")}
                    maxColors={1}
                  />
                </div>
                <div className="w-1/2 max-md:w-full">
                  <Field>
                    <FieldLabel>
                      {t("Settings.shadowOpacity")}:{" "}
                      <code className="rounded-sm bg-fd-card px-1 py-0.5">
                        {Math.round(shadowOpacity * 100)}%
                      </code>
                    </FieldLabel>
                    <FieldContent>
                      <Slider
                        value={[shadowOpacity]}
                        step={0.05}
                        min={0}
                        max={1}
                        onValueChange={(v) =>
                          setShadowOpacity(toSingleValue(v))
                        }
                      />
                    </FieldContent>
                  </Field>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        <Card className="w-full">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Checkbox
                id="enable-border"
                checked={enableBorder}
                onCheckedChange={setEnableBorder}
              />
              <CardTitle>
                <label htmlFor="enable-border" className="cursor-pointer">
                  {t("Settings.stroke")}
                </label>
              </CardTitle>
            </div>
          </CardHeader>
          {enableBorder && (
            <CardContent className="flex flex-col gap-4">
              <div className="flex w-full gap-4 max-md:flex-col">
                <Field className="w-1/2 max-md:w-full">
                  <FieldLabel>{t("Settings.display")}</FieldLabel>
                  <FieldContent className="">
                    <ButtonGroup className="w-full">
                      <Button
                        className={"w-1/2"}
                        onClick={() => {
                          setBorderType("foreground")
                        }}
                        variant={
                          borderType === "foreground" ? "default" : "secondary"
                        }
                      >
                        {t("Settings.overText")}
                      </Button>
                      <Button
                        className={"w-1/2"}
                        onClick={() => {
                          setBorderType("background")
                        }}
                        variant={
                          borderType === "background" ? "default" : "secondary"
                        }
                      >
                        {t("Settings.underText")}
                      </Button>
                    </ButtonGroup>
                  </FieldContent>
                </Field>
                <div className="w-1/2 max-md:w-full">
                  <ColorList
                    colors={borderColor}
                    onChange={setBorderColor}
                    label={t("Settings.strokeColor")}
                    maxColors={5}
                  />
                  {borderColor.length > 1 && (
                    <Field className="mt-2">
                      <FieldLabel>
                        {t("Settings.gradientAngle")}:{" "}
                        <code className="rounded-sm bg-fd-card px-1 py-0.5">
                          {borderGradientAngle}°
                        </code>
                      </FieldLabel>
                      <FieldContent>
                        <Slider
                          value={[borderGradientAngle]}
                          step={15}
                          min={0}
                          max={360}
                          onValueChange={(v) =>
                            setBorderGradientAngle(toSingleValue(v))
                          }
                        />
                      </FieldContent>
                    </Field>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <FieldLabel>
                    {t("Settings.thicknessStroke")}
                    {useSameBorder && (
                      <>
                        :{" "}
                        <code className="rounded-sm bg-fd-card px-1 py-0.5">
                          {borderTop}px
                        </code>
                      </>
                    )}
                  </FieldLabel>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="same-border"
                      checked={useSameBorder}
                      onCheckedChange={setUseSameBorder}
                    />
                    <FieldLabel
                      htmlFor="same-border"
                      className="text-sm font-normal"
                    >
                      {t("Settings.same")}
                    </FieldLabel>
                  </div>
                </div>

                {useSameBorder ? (
                  <Slider
                    value={[borderTop]}
                    step={1}
                    min={1}
                    max={32}
                    onValueChange={(v) =>
                      handleSameBorderChange(toSingleValue(v))
                    }
                  />
                ) : (
                  <FieldGroup className="grid grid-cols-2 gap-4">
                    <Field>
                      <FieldLabel>
                        {t("Settings.up")}:{" "}
                        <code className="rounded-sm bg-fd-card px-1 py-0.5">
                          {borderTop}px
                        </code>
                      </FieldLabel>
                      <FieldContent>
                        <Slider
                          value={[borderTop]}
                          step={1}
                          min={0}
                          max={32}
                          onValueChange={(v) => setBorderTop(toSingleValue(v))}
                        />
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>
                        {t("Settings.right")}:{" "}
                        <code className="rounded-sm bg-fd-card px-1 py-0.5">
                          {borderRight}px
                        </code>
                      </FieldLabel>
                      <FieldContent>
                        <Slider
                          value={[borderRight]}
                          step={1}
                          min={0}
                          max={32}
                          onValueChange={(v) =>
                            setBorderRight(toSingleValue(v))
                          }
                        />
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>
                        {t("Settings.bottom")}:{" "}
                        <code className="rounded-sm bg-fd-card px-1 py-0.5">
                          {borderBottom}px
                        </code>
                      </FieldLabel>
                      <FieldContent>
                        <Slider
                          value={[borderBottom]}
                          step={1}
                          min={0}
                          max={32}
                          onValueChange={(v) =>
                            setBorderBottom(toSingleValue(v))
                          }
                        />
                      </FieldContent>
                    </Field>
                    <Field>
                      <FieldLabel>
                        {t("Settings.left")}:{" "}
                        <code className="rounded-sm bg-fd-card px-1 py-0.5">
                          {borderLeft}px
                        </code>
                      </FieldLabel>
                      <FieldContent>
                        <Slider
                          value={[borderLeft]}
                          step={1}
                          min={0}
                          max={32}
                          onValueChange={(v) => setBorderLeft(toSingleValue(v))}
                        />
                      </FieldContent>
                    </Field>
                  </FieldGroup>
                )}
              </div>
            </CardContent>
          )}
        </Card>

        <div className="flex w-full justify-end">
          <Button variant={"destructive"} onClick={resetAll}>
            <RotateCcw />
            {t("reset")}
          </Button>
        </div>
      </div>
    </div>
  )
}
