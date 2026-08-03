"use client";

import { useEffect, useState, useMemo } from "react";
import Callout from "@/components/Docs/Callout";
import { ArrowDownUp, LoaderCircle } from "lucide-react";
import VaultCard from "@/components/Card/VaultCard";
import { useLocale } from "next-intl";
import Pagination from "@/components/Navigation/Pagination";
import PageSearch from "@/components/Navigation/Search";
import Sort from "@/components/Navigation/Sort";

export interface VaultItem {
  image: string;
  videoUrl: string;
  resourcesUrl: string;
  titleRu: string;
  titleEn: string;
  date: string;
  views: string;
  duration: string;
}

const ITEMS_PER_PAGE = 10;

function getChunkedArray<T>(array: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(array.length / size) }, (_, i) =>
    array.slice(i * size, i * size + size),
  );
}

function parseViews(viewsStr: string | number): number {
  if (!viewsStr) return 0;
  const cleaned = viewsStr.toString().replace(/\D/g, "");
  return parseInt(cleaned, 10) || 0;
}

function parseDate(dateStr: string): number {
  if (!dateStr) return 0;

  const parts = dateStr.trim().split(".");
  if (parts.length !== 3) return 0;

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);
  const time = date.getTime();

  return isNaN(time) ? 0 : time;
}

export default function FlectoneVault() {
  const [result, setResult] = useState<VaultItem[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("desc");
  const [sortBy, setSortBy] = useState("date");

  const SHEET_ID = "1QfA_pyIAwBlLxZAUB9wLeljEr0TKi2Ry9N5twdXg67M";
  const locale = useLocale();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/sheets?sheetId=${SHEET_ID}`);
        if (!res.ok) throw new Error("Ошибка загрузки данных");

        const data = await res.json();
        setResult(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        console.error("Fetch data error:", err);
        setError(err instanceof Error ? err.message : "Ошибка");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredChunkedItems = useMemo(() => {
    const filtered = result.filter((item) => {
      const title = locale === "ru" ? item.titleRu : item.titleEn;
      return title?.toLowerCase().includes(search.toLowerCase());
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "date") {
        if (sortOrder === "desc") {
          return parseDate(b.date) - parseDate(a.date);
        } else {
          return parseDate(a.date) - parseDate(b.date);
        }
      }

      if (sortBy === "views") {
        if (sortOrder === "desc") {
          return parseViews(b.views) - parseViews(a.views);
        } else {
          return parseViews(a.views) - parseViews(b.views);
        }
      }

      return 0;
    });

    return getChunkedArray(sorted, ITEMS_PER_PAGE);
  }, [result, search, locale, sortBy, sortOrder]);

  const currentPageItems = filteredChunkedItems[page] || [];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex max-sm:flex-col gap-2">
        <PageSearch
          value={search}
          placeholder="Поиск"
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(0);
          }}
        />

        <Sort
          options={[
            { value: "date", label: "По дате" },
            { value: "views", label: "По просмотрам" },
          ]}
          onChange={(value) => {
            setSortBy(value);
            setPage(0);
          }}
          onClick={() => {
            setSortOrder(sortOrder === "desc" ? "asc" : "desc");
          }}
          currentSort={sortBy}
        />
      </div>

      {loading && (
        <div className="text-fd-primary w-full flex justify-center py-8">
          <LoaderCircle className="animate-spin" size="3em" />
        </div>
      )}

      {error && (
        <Callout type="error" title="Ошибка">
          {error || "Таблица пуста или данные не найдены."}
        </Callout>
      )}

      {!loading && !error && currentPageItems.length > 0 && (
        <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-4">
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

      <Pagination
        pageCount={filteredChunkedItems.length}
        page={page}
        setPage={setPage}
      />

      {!loading &&
        !error &&
        result.length > 0 &&
        currentPageItems.length === 0 && (
          <div className="text-center text-muted-foreground py-8 text-fd-muted-foreground">
            Ничего не найдено по вашему запросу.
          </div>
        )}
    </div>
  );
}
