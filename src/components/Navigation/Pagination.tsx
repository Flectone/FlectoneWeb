import { ChevronRight, ChevronLeft } from "lucide-react";

interface PaginationProps {
  pageCount: number;
  page: number;
  setPage: (page: number) => void;
}

export default function Pagination({
  pageCount,
  page,
  setPage,
}: PaginationProps) {
  if (pageCount <= 1) return null;

  const maxVisiblePages = 3;

  let start = Math.max(0, page - 1);
  let end = Math.min(pageCount - 1, start + maxVisiblePages);

  if (end - start < maxVisiblePages && pageCount > maxVisiblePages) {
    start = Math.max(0, end - maxVisiblePages);
  }

  const visiblePagesCount = Math.min(pageCount - 1, end - start);
  const pages = Array.from({ length: visiblePagesCount }, (_, i) => start + i);

  return (
    <div className="flex items-center gap-1 select-none">
      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        className={`text-sm cursor-pointer flex items-center justify-center w-7 h-7 transition rounded-md text-fd-muted-foreground bg-fd-card ${page === 0 ? "" : "hover:bg-fd-border"} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronLeft size={"1em"} />
      </button>

      <div className="flex gap-1">
        {pages.map((actualPageKey) => {
          const isActive = page === actualPageKey;
          return (
            <div
              key={actualPageKey}
              className={`text-sm cursor-pointer flex items-center justify-center w-7 h-7 transition rounded-md
              ${
                isActive
                  ? "bg-fd-primary text-fd-primary-foreground font-medium"
                  : "text-fd-muted-foreground bg-fd-card hover:bg-fd-border"
              }`}
              onClick={() => setPage(actualPageKey)}
            >
              {actualPageKey + 1}
            </div>
          );
        })}

        {pageCount > maxVisiblePages + 1 &&
          start < pageCount - maxVisiblePages - 1 && (
            <span className="w-7 h-7 flex items-center justify-center text-fd-muted-foreground">
              ...
            </span>
          )}

        <div
          className={`text-sm cursor-pointer flex items-center justify-center w-7 h-7 transition rounded-md
              ${
                page === pageCount - 1
                  ? "bg-fd-primary text-fd-primary-foreground font-medium"
                  : "text-fd-muted-foreground bg-fd-card hover:bg-fd-border"
              }`}
          onClick={() => setPage(pageCount - 1)}
        >
          {pageCount}
        </div>
      </div>

      <button
        disabled={page === pageCount - 1}
        onClick={() => setPage(page + 1)}
        className={`text-sm cursor-pointer flex items-center justify-center w-7 h-7 transition rounded-md text-fd-muted-foreground bg-fd-card ${page === pageCount - 1 ? "" : "hover:bg-fd-border"} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronRight size={"1em"} />
      </button>
    </div>
  );
}
