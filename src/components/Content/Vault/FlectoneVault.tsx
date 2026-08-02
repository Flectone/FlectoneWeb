"use client";

import { useEffect, useState } from "react";
import Callout from "@/components/Docs/Callout";
import { LoaderCircle } from "lucide-react";
import VaultCard from "@/components/Card/VaultCard";
import { useLocale } from "next-intl";

const SHEET_ID = "1QfA_pyIAwBlLxZAUB9wLeljEr0TKi2Ry9N5twdXg67M";

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

export default function FlectoneVault() {
  const [vaultItems, setVaultItems] = useState<VaultItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const locale = useLocale();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/sheets?sheetId=${SHEET_ID}`);

        if (!res.ok) {
          throw new Error("Error");
        }

        const result: VaultItem[] = await res.json();

        if (Array.isArray(result) && result.length > 0) {
          setVaultItems(result);
        } else {
          setVaultItems([]);
        }
      } catch (err: any) {
        console.error("Fetch data error:", err);
        setError(err.message || "Error");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);
  console.log(locale);
  return (
    <div className="">
      {loading && (
        <div className="text-fd-primary w-full flex justify-center">
          <LoaderCircle className="animate-spin" size={3 + "em"} />
        </div>
      )}
      {error && (
        <Callout type="error" title="Ошибка">
          Таблица пуста или данные не найдены.
        </Callout>
      )}
      {vaultItems && (
        <div className="grid grid-cols-2 max-lg:grid-cols-1 gap-4">
          {vaultItems.map((item, key) => (
            <VaultCard
              key={key}
              title={locale === "ru" ? item.titleRu : item.titleEn}
              videoUrl={item.videoUrl}
              image={item.image}
              date={item.date}
              duration={item.duration}
              mapUrl={item.resourcesUrl}
              viewers={item.views}
            />
          ))}
        </div>
      )}
    </div>
  );
}
