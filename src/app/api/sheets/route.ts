import { NextResponse } from "next/server"
import { enforceRateLimit } from "@/lib/rate-limit"

const RATE_LIMIT = { name: "sheets", limit: 60, windowMs: 60_000 }

const SHEET_ID =
  process.env.VAULT_SHEET_ID ?? "1QfA_pyIAwBlLxZAUB9wLeljEr0TKi2Ry9N5twdXg67M"
const SHEET_ID_PATTERN = /^[A-Za-z0-9_-]{20,128}$/

const UPSTREAM_TIMEOUT_MS = 10000

interface SheetResponse {
  values?: string[][]
  error?: {
    message: string
  }
}

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

function extractImageUrl(
  cellValue: string = "",
  videoUrl: string = ""
): string {
  if (typeof cellValue === "string" && cellValue.trim().length > 0) {
    const directImageMatch = cellValue.match(/=IMAGE\s*\(\s*["']([^"']+)["']/i)
    if (directImageMatch && directImageMatch[1]) {
      return directImageMatch[1]
    }

    if (cellValue.includes("img.youtube.com/vi/")) {
      const ytMatch = (videoUrl || cellValue).match(
        /(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/i
      )
      if (ytMatch && ytMatch[1]) {
        return `https://img.youtube.com/vi_webp/${ytMatch[1]}/maxresdefault.webp`
      }
    }

    if (cellValue.startsWith("http://") || cellValue.startsWith("https://")) {
      return cellValue
    }
  }

  if (videoUrl) {
    const ytMatch = videoUrl.match(
      /(?:v=|youtu\.be\/|shorts\/|embed\/)([\w-]{11})/i
    )
    if (ytMatch && ytMatch[1]) {
      return `https://img.youtube.com/vi/${ytMatch[1]}/hqdefault.jpg`
    }
  }

  return ""
}

export async function GET(request: Request) {
  const limited = enforceRateLimit(request, RATE_LIMIT)
  if (limited) return limited

  const apiKey = process.env.GOOGLE_API_KEY

  if (!apiKey || !SHEET_ID_PATTERN.test(SHEET_ID)) {
    console.error("Google Sheets API is not configured")
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }

  const range = "A1:Z"
  const sheetPath = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(SHEET_ID)}/values/${encodeURIComponent(range)}`

  const urlFormulas = `${sheetPath}?key=${encodeURIComponent(apiKey)}&valueRenderOption=FORMULA`
  const urlValues = `${sheetPath}?key=${encodeURIComponent(apiKey)}`

  const REVALIDATE_TIME = 3600

  try {
    const [resFormulas, resValues] = await Promise.all([
      fetch(urlFormulas, {
        next: { revalidate: REVALIDATE_TIME },
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      }),
      fetch(urlValues, {
        next: { revalidate: REVALIDATE_TIME },
        signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      }),
    ])

    if (!resFormulas.ok || !resValues.ok) {
      console.error("Error Google Sheets API")
      return NextResponse.json(
        { error: "Error Google Sheets API" },
        { status: 400 }
      )
    }

    const dataFormulas: SheetResponse = await resFormulas.json()
    const dataValues: SheetResponse = await resValues.json()

    const rawFormulas = dataFormulas.values || []
    const rawValues = dataValues.values || []

    const rowsValues = rawValues.length > 0 ? rawValues.slice(1) : []
    const rowsFormulas = rawFormulas.length > 0 ? rawFormulas.slice(1) : []

    const formattedData: VaultItem[] = rowsValues.map((row, index) => {
      const formulaRow = rowsFormulas[index] || []
      const rawFormulaA = formulaRow[0] || ""
      const videoUrl = row[1] || ""

      return {
        image: extractImageUrl(rawFormulaA, videoUrl),
        videoUrl: videoUrl,
        resourcesUrl: row[2] || "",
        titleRu: row[3] || "",
        titleEn: row[4] || "",
        date: (row[5] === "#ERROR!" ? "--.--.--" : row[5]) || "",
        views: (row[6] === "#ERROR!" ? "-" : row[6]) || "",
        duration: (row[7] === "#ERROR!" ? "--:--" : row[7]) || "",
      }
    })

    return NextResponse.json(formattedData, {
      headers: {
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
      },
    })
  } catch (error) {
    console.error("Error request:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
