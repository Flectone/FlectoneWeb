"use client"

import { useEffect, useState, useMemo } from "react"
import { VaultCard, VaultCardLoading } from "./vault-card"
import { useLocale } from "next-intl"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { ButtonGroup } from "@/components/ui/button-group"
import { Button } from "@/components/ui/button"
import { ArrowDownUp } from "lucide-react"
import Pagination from "./pagination"
import { toast } from "@/components/ui/toast"
import Callout from "@/components/shared/callout"
import Link from "next/link"

export interface VaultItem {
  image: string
  videoUrl: string
  resourcesUrl: string
  titleRu: string
  titleEn: string
  date: string
  views: string
  duration: string
}

const ITEMS_PER_PAGE = 18

function getChunkedArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size)
  )
}

function parseViews(viewsStr: string | number): number {
  if (!viewsStr) return 0
  const cleaned = viewsStr.toString().replace(/\D/g, "")
  return parseInt(cleaned, 10) || 0
}

function parseDate(dateStr: string): number {
  if (!dateStr) return 0

  const parts = dateStr.trim().split(".")
  if (parts.length !== 3) return 0

  const day = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10) - 1
  const year = parseInt(parts[2], 10)

  const date = new Date(year, month, day)
  const time = date.getTime()

  return isNaN(time) ? 0 : time
}

export default function FlectoneVault() {
  const [result, setResult] = useState<VaultItem[]>([])
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState<string>("")
  const [sortOrder, setSortOrder] = useState<string>("desc")
  const [sortBy, setSortBy] = useState("date")

  const locale = useLocale()

  const t = useTranslations("FlectoneVault")

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch("/api/sheets")
        if (!res.ok) throw new Error("Data error")

        const data = await res.json()
        setResult(Array.isArray(data) ? data : [])
      } catch (err: unknown) {
        console.error("Fetch data error:", err)
        setError(err instanceof Error ? err.message : "Error")
        toast.add({
          type: "error",
          description: t("error"),
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredChunkedItems = useMemo(() => {
    const filtered = result.filter((item) => {
      const title = locale === "ru" ? item.titleRu : item.titleEn
      return title?.toLowerCase().includes(search.toLowerCase())
    })

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "date") {
        if (sortOrder === "desc") {
          return parseDate(b.date) - parseDate(a.date)
        } else {
          return parseDate(a.date) - parseDate(b.date)
        }
      }

      if (sortBy === "views") {
        if (sortOrder === "desc") {
          return parseViews(b.views) - parseViews(a.views)
        } else {
          return parseViews(a.views) - parseViews(b.views)
        }
      }

      return 0
    })

    return getChunkedArray(sorted, ITEMS_PER_PAGE)
  }, [result, search, locale, sortBy, sortOrder])

  const currentPageItems = filteredChunkedItems[page] || []

  return (
    <div className="flex min-h-screen flex-col gap-6">
      <Callout margin="none" type="info">
        <span>
          Так же можно посмотреть в виде{" "}
          <Link
            href="https://docs.google.com/spreadsheets/d/1QfA_pyIAwBlLxZAUB9wLeljEr0TKi2Ry9N5twdXg67M"
            className="border-b-2 border-primary text-foreground transition hover:border-primary/50 hover:text-muted-foreground"
          >
            таблицы
          </Link>
        </span>
      </Callout>

      <div className="flex justify-between gap-2 max-sm:flex-col">
        <div className="flex w-full gap-2 max-md:flex-col">
          <Input
            value={search}
            placeholder={t("search")}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
          />
          <div className="flex gap-2 max-md:w-full max-md:justify-between">
            <div className="flex h-9 items-center gap-2 rounded-md bg-card px-2">
              <Button
                variant={"ghost"}
                size={"icon-xs"}
                onClick={() => {
                  setSortOrder(sortOrder === "desc" ? "asc" : "desc")
                }}
              >
                <ArrowDownUp />
              </Button>
              <ButtonGroup>
                <Button
                  variant={sortBy === "date" ? "default" : "secondary"}
                  size={"xs"}
                  onClick={() => {
                    setSortBy("date")
                    setPage(0)
                  }}
                >
                  {t("Sort.date")}
                </Button>
                <Button
                  size={"xs"}
                  variant={sortBy === "views" ? "default" : "secondary"}
                  onClick={() => {
                    setSortBy("views")
                    setPage(0)
                  }}
                >
                  {t("Sort.views")}
                </Button>
              </ButtonGroup>
            </div>
            <Pagination
              pageCount={filteredChunkedItems.length}
              page={page}
              setPage={setPage}
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-1">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <VaultCardLoading key={index} />
          ))}
        </div>
      )}

      {!error && currentPageItems.length > 0 && (
        <div className="grid grid-cols-3 gap-4 max-xl:grid-cols-2 max-md:grid-cols-1">
          {currentPageItems.map((item, index) => (
            <VaultCard
              key={`${item.titleEn}-${index}`}
              title={locale === "ru" ? item.titleRu : item.titleEn}
              videoUrl={item.videoUrl}
              image={item.image}
              date={item.date}
              duration={item.duration}
              mapUrl={item.resourcesUrl}
              views={item.views}
            />
          ))}
        </div>
      )}

      <div className="flex w-full justify-end">
        <Pagination
          pageCount={filteredChunkedItems.length}
          page={page}
          setPage={setPage}
        />
      </div>

      {!loading &&
        !error &&
        result.length > 0 &&
        currentPageItems.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            {t("notFound")}
          </div>
        )}
    </div>
  )
}
