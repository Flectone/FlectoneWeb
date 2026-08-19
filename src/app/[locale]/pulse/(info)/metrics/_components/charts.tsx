"use client"

import { useTranslations } from "next-intl"
import type { PieSectorShapeProps } from "recharts/types/polar/Pie"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useCurrentTheme } from "@/hooks/use-current-theme"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Sector,
} from "recharts"
import ReactECharts from "echarts-for-react"
import * as echarts from "echarts"
import type { EChartsOption } from "echarts"
import type { TopLevelFormatterParams } from "echarts/types/dist/shared"
import { useLocale } from "next-intl"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Eye, EyeOff } from "lucide-react"
import { toast } from "@/components/ui/toast"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const baseUrl = "/api/pulse/metrics/json/"

const BITES_IN_GB = 8 * 1024 ** 3
const START_HUE = 258
const HUE_STEP = 30
const ESSENTIAL_COUNT_THRESHOLD = 8

type SortType =
  "alphabet" | "version" | "numeric" | "bit" | "quick" | "quickRevers"

type ConvertType = "gb"

interface MetricItem {
  value: string
  count: number
}

interface ChartDataItem {
  value: string
  count: number
  fill: string
  hidden: boolean
  minVisible?: 8
}

function convertBitsToGb(values: MetricItem[], locale: string): MetricItem[] {
  const groupedMap = new Map<string, number>()

  values.forEach((item) => {
    const bits = parseInt(item.value)
    if (isNaN(bits)) return

    const roundedGb = Math.ceil(bits / BITES_IN_GB)
    const key = `${roundedGb}`
    groupedMap.set(key, (groupedMap.get(key) || 0) + item.count)
  })

  return Array.from(groupedMap.entries()).map(([value, count]) => ({
    value: `${value} ${locale === "ru" ? "ГБ" : "GB"}`,
    count,
  }))
}

function sortMetricValues(
  values: MetricItem[],
  sort: SortType,
  locale: string,
  isGb: boolean
): MetricItem[] {
  const sorted = [...values]

  sorted.sort((a, b) => {
    switch (sort) {
      case "alphabet":
        return a.value.localeCompare(b.value, undefined, { numeric: true })
      case "version": {
        const partsA = a.value.split(".").map(Number)
        const partsB = b.value.split(".").map(Number)
        for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
          const numA = partsA[i] || 0
          const numB = partsB[i] || 0
          if (numA !== numB) return numA - numB
        }
        return 0
      }
      case "numeric":
        return parseFloat(a.value) - parseFloat(b.value)
      case "bit": {
        const getWeight = (v: string) => {
          const num = parseFloat(v)
          return v.includes(locale === "ru" ? "ГБ" : "GB") ? num * 1024 : num
        }
        return getWeight(a.value) - getWeight(b.value)
      }
      case "quick":
        return a.count - b.count
      case "quickRevers":
        return b.count - a.count
      default:
        return 0
    }
  })

  if (isGb && sort !== "bit") {
    return sortMetricValues(sorted, "bit", locale, isGb)
  }

  return sorted
}

function processMetricValues(
  rawValues: MetricItem[],
  sort: SortType,
  locale: string,
  convert?: ConvertType
): MetricItem[] {
  const converted =
    convert === "gb" ? convertBitsToGb(rawValues, locale) : rawValues
  return sortMetricValues(converted, sort, locale, convert === "gb")
}

function buildChartData(
  values: MetricItem[],
  showEssentials: boolean,
  colors?: "single" | "multiple",
  minVisible?: number
): ChartDataItem[] {
  return values.map((item, index) => {
    const currentHue = (START_HUE + index * HUE_STEP) % 360
    return {
      value: item.value,
      count: Number(item.count) || 0,
      fill: colors
        ? colors === "multiple"
          ? `oklch(0.7794 0.326 ${currentHue.toFixed(2)})`
          : `var(--color-primary)`
        : `var(--color-primary)`,
      hidden: !showEssentials
        ? Number(item.count) < (minVisible || ESSENTIAL_COUNT_THRESHOLD)
        : false,
    }
  })
}

function buildChartConfig(data: ChartDataItem[]): ChartConfig {
  const config: ChartConfig = {}

  data.forEach((item) => {
    if (!item.value) return
    config[item.value] = {
      label: item.value,
      color: item.fill,
    }
  })

  return config
}

function useCategoryChartData({
  path,
  sort,
  convert,
  colors = "single",
  minVisible,
}: {
  path: string
  sort: SortType
  convert?: ConvertType
  colors?: "single" | "multiple"
  minVisible: number
}) {
  const [loading, setLoading] = useState(true)
  const [rawProcessedData, setRawProcessedData] = useState<MetricItem[]>([])
  const [showEssentials, setShowEssentials] = useState(false)
  const [manualVisibility, setManualVisibility] = useState<
    Record<string, boolean>
  >({})
  const locale = useLocale()

  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      setLoading(true)
      try {
        const res = await fetch(baseUrl + path)
        if (!res.ok) throw new Error("Network response was not ok")

        const json = await res.json()
        const processed = processMetricValues(
          json.values as MetricItem[],
          sort,
          locale,
          convert
        )
        if (!cancelled) setRawProcessedData(processed)
      } catch (error) {
        console.error("Fetch error:", error)
        toast.add({ type: "error", description: String(error) })
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [path, sort, convert, locale])

  const fullData = useMemo(() => {
    const baseData = buildChartData(
      rawProcessedData,
      showEssentials,
      colors,
      minVisible
    )
    return baseData.map((item) => {
      if (manualVisibility[item.value] !== undefined) {
        return { ...item, hidden: manualVisibility[item.value] }
      }
      return item
    })
  }, [rawProcessedData, showEssentials, colors, manualVisibility])

  const toggleHidden = useCallback(
    (valueToChange: string) => {
      setManualVisibility((prev) => {
        const currentItem = fullData.find((i) => i.value === valueToChange)
        const isCurrentlyHidden = currentItem?.hidden ?? false
        return {
          ...prev,
          [valueToChange]: !isCurrentlyHidden,
        }
      })
    },
    [fullData]
  )

  const data = useMemo(
    () => fullData.filter((item) => !item.hidden),
    [fullData]
  )

  const chartConfig = useMemo(() => buildChartConfig(data), [data])
  console.log(fullData)
  return {
    loading,
    data,
    fullData,
    chartConfig,
    showEssentials,
    setShowEssentials,
    toggleHidden,
  }
}

function CategoryLegend({
  fullData,
  prefix,
  showEssentials,
  onToggleEssentials,
  onToggleValue,
}: {
  fullData: ChartDataItem[]
  prefix?: string
  showEssentials: boolean
  onToggleEssentials: () => void
  onToggleValue: (value: string) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const t = useTranslations()
  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const scrollAmount = 200
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    })
  }

  return (
    <div className="flex max-w-75 flex-1 justify-end gap-2 max-sm:w-45">
      <Button
        size="icon-xs"
        variant="secondary"
        onClick={() => handleScroll("left")}
      >
        <ChevronLeft />
      </Button>

      <div
        ref={scrollRef}
        className="no-scrollbar flex w-fit items-center gap-1 overflow-hidden scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        {fullData.map((item, key) => (
          <Button
            size="xs"
            variant="secondary"
            key={key}
            className={`line-clamp-1 flex shrink-0 cursor-pointer items-center gap-1 font-bold ${
              item.hidden ? "opacity-40" : ""
            }`}
            onClick={() => onToggleValue(item.value)}
          >
            <div
              className="h-2.5 w-2.5 rounded-xs"
              style={{ backgroundColor: item.fill }}
            />
            {item.value + (prefix ? " " + prefix : "")}
          </Button>
        ))}
      </div>

      <Button
        size="icon-xs"
        variant="secondary"
        onClick={() => handleScroll("right")}
      >
        <ChevronRight />
      </Button>

      <Tooltip>
        <TooltipTrigger
          render={
            <Button
              size="icon-xs"
              variant="secondary"
              onClick={onToggleEssentials}
            >
              {showEssentials ? <EyeOff /> : <Eye />}
            </Button>
          }
        />
        <TooltipContent side="top">
          <p>
            {showEssentials
              ? t("FlectonePulse.Metrics.labels.hideEssentials")
              : t("FlectonePulse.Metrics.labels.showEssentials")}
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}

interface TwoAreaDataItem {
  date: string
  firstValue: number
  secondValue: number
}

export function TwoAreaChartComponent({
  firstAreaPath,
  secondAreaPath,
  title,
  firstAreaLabel,
  secondAreaLabel,
}: {
  firstAreaPath: string
  secondAreaPath: string
  title: string
  firstAreaLabel: string
  secondAreaLabel: string
}) {
  const chartConfig = {
    visitors: { label: title },
    firstValue: { label: firstAreaLabel, color: "var(--chart-1)" },
    secondValue: { label: secondAreaLabel, color: "var(--chart-2)" },
  } satisfies ChartConfig

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<TwoAreaDataItem[]>([])
  const locale = useLocale() === "ru" ? "ru-RU" : "en-US"

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [firstRes, secondRes] = [
          await fetch(baseUrl + firstAreaPath),
          await fetch(baseUrl + secondAreaPath),
        ]
        const [firstArray, secondArray] = (
          await Promise.all([firstRes.json(), secondRes.json()])
        ).map((data) => data.values)

        const mergedArray = firstArray.map(
          (firstItem: { value: string; count: number }) => {
            const secondItem = secondArray.find(
              (item: { value: string }) => item.value === firstItem.value
            )
            return {
              date: firstItem.value,
              firstValue: firstItem.count || 0,
              secondValue: secondItem?.count || 0,
            }
          }
        )
        setData(mergedArray.slice(1, -1))
      } catch (error) {
        console.error("Fetch error:", error)
        toast.add({ type: "error", description: String(error) })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [firstAreaPath, secondAreaPath])

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle>
          {loading ? <Skeleton className="h-6 w-25" /> : title}
        </CardTitle>
        <div className="flex gap-4">
          {(["firstValue", "secondValue"] as const).map((chart) => {
            const lastValue = data[data.length - 1]?.[chart] ?? 0
            if (loading) {
              return (
                <div key={chart} className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-7.5 w-20" />
                </div>
              )
            }
            return (
              <div key={chart} className="flex items-end gap-1">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <div
                    className="h-2 w-2 rounded-xs"
                    style={{ backgroundColor: chartConfig[chart].color }}
                  />
                  {chartConfig[chart].label}
                </span>
                <span className="text-xl leading-none font-bold">
                  {lastValue}
                </span>
              </div>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-6">
        {loading ? (
          <Skeleton className="aspect-auto h-72 w-full" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-72 w-full"
          >
            <AreaChart data={data}>
              <defs>
                <linearGradient id="fillFirstValue" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-firstValue)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-firstValue)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient
                  id="fillSecondValue"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-secondValue)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-secondValue)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString(locale, {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString(locale, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                      })
                    }
                    indicator="dot"
                  />
                }
              />
              <Area
                dataKey="firstValue"
                className="outline-none"
                type="natural"
                fill="url(#fillFirstValue)"
                stroke="var(--color-firstValue)"
                strokeWidth={2}
                stackId="a"
              />
              <Area
                dataKey="secondValue"
                className="outline-none"
                type="natural"
                fill="url(#fillSecondValue)"
                stroke="var(--color-secondValue)"
                strokeWidth={2}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

export function PieChartComponent({
  piePath,
  title,
  pieLabel,
  prefix,
  sort = "quickRevers",
  convert,
}: {
  piePath: string
  title: string
  pieLabel: string
  prefix?: string
  sort?: SortType
  convert?: ConvertType
}) {
  const {
    loading,
    data,
    fullData,
    chartConfig,
    showEssentials,
    setShowEssentials,
    toggleHidden,
  } = useCategoryChartData({
    path: piePath,
    sort,
    convert,
    colors: "multiple",
    minVisible: ESSENTIAL_COUNT_THRESHOLD,
  })

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle>
          {loading ? <Skeleton className="h-6 w-24" /> : title}
        </CardTitle>
        {loading ? (
          <Skeleton className="h-6 w-75 max-sm:w-45" />
        ) : (
          <CategoryLegend
            fullData={fullData}
            prefix={prefix}
            showEssentials={showEssentials}
            onToggleEssentials={() => setShowEssentials((v) => !v)}
            onToggleValue={toggleHidden}
          />
        )}
      </CardHeader>
      <CardContent className="px-6">
        {loading ? (
          <Skeleton className="aspect-square h-72 w-full" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square h-72"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    nameKey="value"
                    indicator="dot"
                    formatter={(value, name, item) => {
                      const itemColor =
                        item.payload?.fill ||
                        item.color ||
                        "var(--color-primary)"

                      return (
                        <div className="flex min-w-36 flex-col gap-2 font-medium">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-3 w-3 shrink-0 rounded-xs"
                              style={{ backgroundColor: itemColor }}
                            />
                            <span className="truncate">
                              {name + (prefix ? " " + prefix : "")}
                            </span>
                          </div>

                          <div className="flex w-full items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              {pieLabel}
                            </span>
                            <span className="ml-auto font-mono font-medium text-foreground">
                              {value}
                            </span>
                          </div>
                        </div>
                      )
                    }}
                  />
                }
              />
              <Pie
                innerRadius={60}
                outerRadius={120}
                data={data}
                dataKey="count"
                nameKey="value"
                shape={({
                  cx = 0,
                  cy = 0,
                  isActive,
                  ...props
                }: PieSectorShapeProps) => (
                  <g
                    style={{
                      transformOrigin: `${cx}px ${cy}px`,
                      transition:
                        "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                      transform: isActive ? "scale(1.08)" : "scale(1)",
                      cursor: "pointer",
                    }}
                  >
                    <Sector {...props} cx={cx} cy={cy} />
                  </g>
                )}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

export function TwoPieChartComponent({
  firstPiePath,
  secondPiePath,
  title,
  firstPieLabel,
  secondPieLabel,
  prefix,
  sort = "quickRevers",
  convert,
}: {
  firstPiePath: string
  secondPiePath: string
  title: string
  firstPieLabel: string
  secondPieLabel: string
  prefix?: string
  sort?: SortType
  convert?: ConvertType
}) {
  const firstChart = useCategoryChartData({
    path: firstPiePath,
    sort,
    convert,
    colors: "multiple",
    minVisible: 8,
  })
  const secondChart = useCategoryChartData({
    path: secondPiePath,
    sort,
    convert,
    colors: "multiple",
    minVisible: 8,
  })

  const loading = firstChart.loading || secondChart.loading

  const combinedFullData = useMemo(() => {
    const map = new Map<string, ChartDataItem>()

    firstChart.fullData.forEach((item) => {
      map.set(item.value, { ...item })
    })

    secondChart.fullData.forEach((item) => {
      if (!map.has(item.value)) {
        map.set(item.value, { ...item })
      } else {
        const existing = map.get(item.value)!
        map.set(item.value, {
          ...existing,
          hidden: existing.hidden && item.hidden,
        })
      }
    })

    return Array.from(map.values())
  }, [firstChart.fullData, secondChart.fullData])

  const handleToggleEssentials = useCallback(() => {
    const nextValue = !firstChart.showEssentials
    firstChart.setShowEssentials(nextValue)
    secondChart.setShowEssentials(nextValue)
  }, [firstChart, secondChart])

  const handleToggleValue = useCallback(
    (value: string) => {
      firstChart.toggleHidden(value)
      secondChart.toggleHidden(value)
    },
    [firstChart, secondChart]
  )

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle>
          {loading ? <Skeleton className="h-6 w-32" /> : title}
        </CardTitle>
        {loading ? (
          <Skeleton className="h-6 w-75 max-sm:w-45" />
        ) : (
          <CategoryLegend
            fullData={combinedFullData}
            prefix={prefix}
            showEssentials={firstChart.showEssentials}
            onToggleEssentials={handleToggleEssentials}
            onToggleValue={handleToggleValue}
          />
        )}
      </CardHeader>
      <CardContent className="px-6 py-6">
        {loading ? (
          <Skeleton className="aspect-auto h-72 w-full" />
        ) : (
          <div className="flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-6">
            <div className="flex w-full flex-col items-center justify-center space-y-2">
              <span className="text-sm font-medium text-muted-foreground">
                {firstPieLabel}
              </span>
              <ChartContainer
                config={firstChart.chartConfig}
                className="mx-auto aspect-square h-64 w-full"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        nameKey="value"
                        indicator="dot"
                        formatter={(value, name, item) => {
                          const itemColor =
                            item.payload?.fill ||
                            item.color ||
                            "var(--color-primary)"
                          return (
                            <div className="flex min-w-36 flex-col gap-2 font-medium">
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-3 w-3 shrink-0 rounded-xs"
                                  style={{ backgroundColor: itemColor }}
                                />
                                <span className="truncate">
                                  {name + (prefix ? " " + prefix : "")}
                                </span>
                              </div>
                              <div className="flex w-full items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                  {firstPieLabel}
                                </span>
                                <span className="ml-auto font-mono font-medium text-foreground">
                                  {value}
                                </span>
                              </div>
                            </div>
                          )
                        }}
                      />
                    }
                  />
                  <Pie
                    innerRadius={50}
                    outerRadius={95}
                    data={firstChart.data}
                    dataKey="count"
                    nameKey="value"
                    shape={({
                      cx = 0,
                      cy = 0,
                      isActive,
                      ...props
                    }: PieSectorShapeProps) => (
                      <g
                        style={{
                          transformOrigin: `${cx}px ${cy}px`,
                          transition:
                            "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                          transform: isActive ? "scale(1.08)" : "scale(1)",
                          cursor: "pointer",
                        }}
                      >
                        <Sector {...props} cx={cx} cy={cy} />
                      </g>
                    )}
                  />
                </PieChart>
              </ChartContainer>
            </div>

            <div className="flex w-full flex-col items-center justify-center space-y-2">
              <span className="text-sm font-medium text-muted-foreground">
                {secondPieLabel}
              </span>
              <ChartContainer
                config={secondChart.chartConfig}
                className="mx-auto aspect-square h-64 w-full"
              >
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        nameKey="value"
                        indicator="dot"
                        formatter={(value, name, item) => {
                          const itemColor =
                            item.payload?.fill ||
                            item.color ||
                            "var(--color-primary)"
                          return (
                            <div className="flex min-w-36 flex-col gap-2 font-medium">
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-3 w-3 shrink-0 rounded-xs"
                                  style={{ backgroundColor: itemColor }}
                                />
                                <span className="truncate">
                                  {name + (prefix ? " " + prefix : "")}
                                </span>
                              </div>
                              <div className="flex w-full items-center justify-between text-xs">
                                <span className="text-muted-foreground">
                                  {secondPieLabel}
                                </span>
                                <span className="ml-auto font-mono font-medium text-foreground">
                                  {value}
                                </span>
                              </div>
                            </div>
                          )
                        }}
                      />
                    }
                  />
                  <Pie
                    innerRadius={50}
                    outerRadius={95}
                    data={secondChart.data}
                    dataKey="count"
                    nameKey="value"
                    shape={({
                      cx = 0,
                      cy = 0,
                      isActive,
                      ...props
                    }: PieSectorShapeProps) => (
                      <g
                        style={{
                          transformOrigin: `${cx}px ${cy}px`,
                          transition:
                            "transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)",
                          transform: isActive ? "scale(1.08)" : "scale(1)",
                          cursor: "pointer",
                        }}
                      >
                        <Sector {...props} cx={cx} cy={cy} />
                      </g>
                    )}
                  />
                </PieChart>
              </ChartContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function BarChartComponent({
  barPath,
  title,
  barLabel,
  prefix,
  sort = "quickRevers",
  convert,
  layout = "vertical",
  minVisible,
}: {
  barPath: string
  title: string
  barLabel: string
  prefix?: string
  sort?: SortType
  convert?: ConvertType
  layout?: "vertical" | "horizontal"
  minVisible?: number
}) {
  const {
    loading,
    data,
    fullData,
    chartConfig,
    showEssentials,
    setShowEssentials,
    toggleHidden,
  } = useCategoryChartData({
    path: barPath,
    sort,
    convert,
    minVisible: ESSENTIAL_COUNT_THRESHOLD,
  })

  const isHorizontal = layout === "horizontal"

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle>
          {loading ? <Skeleton className="h-6 w-24" /> : title}
        </CardTitle>
        {loading ? (
          <Skeleton className="h-6 w-75 max-sm:w-45" />
        ) : (
          <CategoryLegend
            fullData={fullData}
            prefix={prefix}
            showEssentials={showEssentials}
            onToggleEssentials={() => setShowEssentials((v) => !v)}
            onToggleValue={toggleHidden}
          />
        )}
      </CardHeader>
      <CardContent className="px-6">
        {loading ? (
          <Skeleton className="aspect-auto h-72 w-full" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-72 w-full"
          >
            <BarChart
              data={data}
              layout={isHorizontal ? "vertical" : "horizontal"}
              margin={isHorizontal ? { left: 8 } : undefined}
            >
              <CartesianGrid
                vertical={isHorizontal}
                horizontal={!isHorizontal}
              />
              {isHorizontal ? (
                <>
                  <XAxis type="number" dataKey="count" hide />
                  <YAxis
                    type="category"
                    dataKey="value"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    width={90}
                    tickFormatter={(value) =>
                      value + (prefix ? " " + prefix : "")
                    }
                  />
                </>
              ) : (
                <XAxis
                  dataKey="value"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={0}
                  angle={data.length > 8 ? -35 : 0}
                  textAnchor={data.length > 8 ? "end" : "middle"}
                  height={data.length > 8 ? 50 : undefined}
                  tickFormatter={(value) =>
                    value + (prefix ? " " + prefix : "")
                  }
                />
              )}
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    nameKey="value"
                    indicator="dot"
                    hideLabel
                    formatter={(value, name, item) => {
                      return (
                        <div className="flex min-w-36 flex-col gap-2 font-medium">
                          <div className="flex items-center gap-2">
                            <span
                              className="h-3 w-3 shrink-0 rounded-xs"
                              style={{
                                backgroundColor: "var(--color-primary)",
                              }}
                            />
                            <span className="font-medium">
                              {item.payload?.value +
                                (prefix ? " " + prefix : "")}
                            </span>
                          </div>

                          <div className="flex w-full items-center justify-between text-xs">
                            <span className="text-muted-foreground">
                              {barLabel}
                            </span>
                            <span className="ml-auto font-mono font-medium text-foreground">
                              {value}
                            </span>
                          </div>
                        </div>
                      )
                    }}
                  />
                }
              />
              <Bar dataKey="count" radius={4}></Bar>
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}

interface TreemapDataItem {
  value: string
  count: number
}

interface TreemapNode {
  name: string
  value: number
  itemStyle: {
    color: string
    borderRadius: number
  }
}

interface TreemapInfo {
  name?: string
  value?: number
  treePathInfo?: unknown[]
}

const TREEMAP_MIN_COUNT = 10
const TREEMAP_HIGHLIGHT_RATIO = 0.5
const TREEMAP_COLOR_HIGH = "#90e498"
const TREEMAP_COLOR_LOW = "#eaca5d"

export function TreemapChartComponent({
  treemapPath,
  title,
  treemapLabel,
}: {
  treemapPath: string
  title: string
  treemapLabel: string
}) {
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<TreemapDataItem[]>([])
  const theme = useCurrentTheme()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(baseUrl + treemapPath)
        if (!res.ok) throw new Error("Network response was not ok")

        const json = await res.json()
        setChartData(json.values ?? [])
      } catch (error) {
        console.error("Fetch error:", error)
        toast.add({ type: "error", description: String(error) })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [treemapPath])

  const treemapOption = useMemo((): EChartsOption => {
    const rawValues = chartData.filter((v) => v.count > TREEMAP_MIN_COUNT)
    const maxCount = Math.max(...rawValues.map((v) => v.count), 0)
    const threshold = maxCount * TREEMAP_HIGHLIGHT_RATIO

    const formattedData: TreemapNode[] = rawValues
      .map((item) => ({
        name: item.value,
        value: item.count,
        itemStyle: {
          color:
            item.count >= threshold ? TREEMAP_COLOR_HIGH : TREEMAP_COLOR_LOW,
          borderRadius: 4,
        },
      }))
      .sort((a, b) => b.value - a.value)

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        backgroundColor: "#161616",
        borderColor: "rgba(255, 255, 255, 0.05)",
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        textStyle: {
          color: "rgba(255, 255, 255, 0.85)",
          fontFamily: "Geist Sans, Inter, sans-serif",
          fontSize: 12,
        },
        extraCssText:
          "backdrop-filter: blur(4px); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
        formatter: (params: TopLevelFormatterParams) => {
          if (Array.isArray(params)) return ""
          const info = params as TreemapInfo
          if (
            !info.name ||
            (info.treePathInfo && info.treePathInfo.length <= 1)
          ) {
            return ""
          }
          return `
      <div style="display: flex; flex-direction: column; gap: 4px; min-width: 120px;">
        <div style="font-weight: medium; font-size: 13px; color: #ffffff;">
          ${info.name}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; gap: 16px;">
          <span style="color: #a1a1aa; font-size: 12px; font-weight: medium;">${treemapLabel}</span>
          <span style="font-family: monospace; font-weight: medium; color: #f4f4f5;">${info.value}</span>
        </div>
      </div>
    `
        },
      },
      series: [
        {
          name: title,
          type: "treemap",
          data: formattedData,
          roam: true,
          breadcrumb: { show: false },
          label: {
            show: true,
            formatter: "{b}",
            fontSize: 12,
            color: "#000",
            fontWeight: 500,
          },
          itemStyle: { borderColor: "transparent", gapWidth: 4 },
          levels: [{ itemStyle: { gapWidth: 4, borderRadius: 4 } }],
        },
      ],
    } as EChartsOption
  }, [chartData, title, treemapLabel])

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle>
          {loading ? <Skeleton className="h-6 w-24" /> : title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        {loading ? (
          <Skeleton className="aspect-auto h-72 w-full" />
        ) : (
          <ReactECharts
            option={treemapOption}
            style={{ height: "26rem", width: "100%" }}
            notMerge
          />
        )}
      </CardContent>
    </Card>
  )
}

export function GeoMapChartComponent({
  geoPath,
  title,
  geoLabel,
  sort = "quickRevers",
  convert,
}: {
  geoPath: string
  title: string
  geoLabel: string
  sort?: SortType
  convert?: ConvertType
}) {
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<MetricItem[]>([])
  const [mapLoaded, setMapLoaded] = useState(false)
  const locale = useLocale()
  const theme = useCurrentTheme()

  useEffect(() => {
    let cancelled = false

    const fetchGeoAndData = async () => {
      setLoading(true)
      try {
        const mapRes = await fetch(
          "https://fastly.jsdelivr.net/npm/echarts@4.9.0/map/json/world.json"
        )
        const worldJson = await mapRes.json()
        echarts.registerMap("world", worldJson)
        if (!cancelled) setMapLoaded(true)

        const res = await fetch(baseUrl + geoPath)
        if (!res.ok) throw new Error("Network response was not ok")

        const json = await res.json()
        const filteredValues = ((json.values as MetricItem[]) || []).filter(
          (item) => item.value !== "null" && item.value !== "Unknown"
        )

        const processed = processMetricValues(
          filteredValues,
          sort,
          locale,
          convert
        )

        if (!cancelled) setChartData(processed)
      } catch (error) {
        console.error("Geo fetch error:", error)
        toast.add({ type: "error", description: String(error) })
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchGeoAndData()
    return () => {
      cancelled = true
    }
  }, [geoPath, sort, convert, locale])

  const geoOption = useMemo((): EChartsOption => {
    const maxVal = Math.max(...chartData.map((d) => d.count), 1)
    const isDark = theme === "dark"

    return {
      backgroundColor: "transparent",
      tooltip: {
        trigger: "item",
        backgroundColor: isDark ? "#161616" : "#ffffff",
        borderColor: isDark
          ? "rgba(255, 255, 255, 0.05)"
          : "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        borderRadius: 10,
        padding: 8,
        textStyle: {
          color: isDark ? "rgba(255, 255, 255, 0.85)" : "#000000",
          fontFamily: "Geist Sans, Inter, sans-serif",
          fontSize: 12,
        },
        extraCssText:
          "backdrop-filter: blur(4px); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
        formatter: (params: any) => {
          const val = params.value || 0
          return `
            <div style="display: flex; flex-direction: column; gap: 4px; min-width: 120px;">
              <div style="font-weight: 500; font-size: 13px; color: ${isDark ? "#ffffff" : "#000000"};">
                ${params.name}
              </div>
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 16px;">
                <span style="color: ${isDark ? "#a1a1aa" : "#71717a"}; font-size: 12px; font-weight: 500;">${geoLabel}</span>
                <span style="font-family: monospace; font-weight: 500; color: ${isDark ? "#f4f4f5" : "#18181b"};">${val}</span>
              </div>
            </div>
          `
        },
      },
      visualMap: {
        min: 0,
        max: maxVal,
        left: "5%",
        bottom: "5%",
        orient: "vertical",
        text: ["Max", "Min"],
        calculable: true,
        inRange: {
          color: isDark ? ["#377ded50", "#377ded"] : ["#5094ff50", "#5094ff"],
        },
        textStyle: { color: isDark ? "#999" : "#666" },
      },
      series: [
        {
          name: title,
          type: "map",
          map: "world",
          roam: true,
          label: { show: false },
          itemStyle: {
            areaColor: isDark ? "#1a1a1a" : "#f3f4f6",
            borderColor: isDark ? "#333" : "#ccc",
          },
          emphasis: {
            label: { show: false },
            itemStyle: {
              areaColor: "#1a44cd",
            },
          },
          data: chartData.map((item) => ({
            name: item.value === "The Netherlands" ? "Netherlands" : item.value,
            value: item.count,
          })),
        },
      ],
    } as EChartsOption
  }, [chartData, title, theme, geoLabel])

  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle>
          {loading ? <Skeleton className="h-6 w-32" /> : title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">
        {loading || !mapLoaded ? (
          <Skeleton className="aspect-auto h-[550px] w-full" />
        ) : (
          <ReactECharts
            option={geoOption}
            style={{ height: "550px", width: "100%" }}
            notMerge
          />
        )}
      </CardContent>
    </Card>
  )
}
