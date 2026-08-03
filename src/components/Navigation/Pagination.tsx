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
  let start = Math.max(0, page - 2);
  let end = Math.min(pageCount, start + 5);

  if (end - start < 5) {
    start = Math.max(0, end - 5);
  }

  const pages = Array.from({ length: end - start }, (_, i) => start + i);

  if (pageCount <= 1) return null;

  return (
    <div className="flex items-center gap-1 select-none">
      <button
        disabled={page === 0}
        onClick={() => setPage(page - 1)}
        className={`text-sm cursor-pointer flex items-center justify-center w-7 h-7 transition rounded-md text-fd-muted-foreground bg-fd-card ${page === 0 ? "" : "hover:bg-fd-border"} disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <ChevronLeft size={"1em"} />
      </button>

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
