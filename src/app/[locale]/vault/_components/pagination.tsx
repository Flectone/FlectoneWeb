import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"

interface PaginationProps {
  pageCount: number
  page: number
  setPage: (page: number) => void
}

export default function Pagination({
  pageCount,
  page,
  setPage,
}: PaginationProps) {
  if (pageCount <= 1) return null

  const maxVisiblePages = 3

  let start = Math.max(0, page - 1)
  let end = Math.min(pageCount - 1, start + maxVisiblePages)

  if (end - start < maxVisiblePages && pageCount > maxVisiblePages) {
    start = Math.max(0, end - maxVisiblePages)
  }

  const visiblePagesCount = Math.min(pageCount - 1, end - start)
  const pages = Array.from({ length: visiblePagesCount }, (_, i) => start + i)

  return (
    <div className="flex items-center gap-1 select-none">
      <Button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        size={"icon-xs"}
        variant={"ghost"}
      >
        <ChevronLeft />
      </Button>

      <div className="flex gap-1">
        {pages.map((actualPageKey) => {
          const isActive = page === actualPageKey
          return (
            <Button
              key={actualPageKey}
              variant={isActive ? "secondary" : "ghost"}
              size={"icon-sm"}
              onClick={() => setPage(actualPageKey)}
            >
              {actualPageKey + 1}
            </Button>
          )
        })}

        {pageCount > maxVisiblePages + 1 &&
          start < pageCount - maxVisiblePages - 1 && (
            <span className="flex h-7 w-7 items-center justify-center text-fd-muted-foreground">
              ...
            </span>
          )}

        <Button
          variant={page === pageCount - 1 ? "secondary" : "ghost"}
          size={"icon-sm"}
          onClick={() => setPage(pageCount - 1)}
        >
          {pageCount}
        </Button>
      </div>

      <Button
        disabled={pageCount === page + 1}
        onClick={() => setPage(page + 1)}
        size={"icon-xs"}
        variant={"ghost"}
      >
        <ChevronRight size={"1em"} />
      </Button>
    </div>
  )
}
