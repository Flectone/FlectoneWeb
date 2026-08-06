"use client";

import { useEffect, useState, useMemo } from "react";
import Callout from "@/components/Docs/Callout";
import { VaultCard, VaultCardLoading } from "@/components/Card/VaultCard";
import { useLocale } from "next-intl";
import Pagination from "@/components/Navigation/Pagination";
import PageSearch from "@/components/Navigation/Search";
import Sort from "@/components/Navigation/Sort";
import { useTranslations } from "next-intl";

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

const ITEMS_PER_PAGE = 18;

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

  const t = useTranslations("Vault");

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/sheets?sheetId=${SHEET_ID}`);
        if (!res.ok) throw new Error("Data error");

        const data = await res.json();
        setResult(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        console.error("Fetch data error:", err);
        setError(err instanceof Error ? err.message : "Error");
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
    <div className="flex flex-col gap-4 min-h-screen">
      <div className="flex max-sm:flex-col gap-2 justify-between">
        <div className="flex gap-2 w-full">
          <PageSearch
            value={search}
            placeholder={t("search")}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
          />

          <Sort
            options={[
              { value: "date", label: t("Sort.date") },
              { value: "views", label: t("Sort.views") },
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
        <Pagination
          pageCount={filteredChunkedItems.length}
          page={page}
          setPage={setPage}
        />
      </div>

      {loading && (
        <div className="grid grid-cols-3 max-xl:grid-cols-1 gap-4">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
            <VaultCardLoading key={index} />
          ))}
        </div>
      )}

      {error && (
        <Callout type="error" title="Ошибка">
          {error || t("error")}
        </Callout>
      )}

      {!error && currentPageItems.length > 0 && (
        <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-4">
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

      <div className="w-full flex justify-end">
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
          <div className="text-center text-muted-foreground py-8 text-fd-muted-foreground">
            Ничего не найдено по вашему запросу.
          </div>
        )}
    </div>
  );
}
