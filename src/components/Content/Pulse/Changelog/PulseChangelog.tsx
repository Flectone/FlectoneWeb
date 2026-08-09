"use client";

import { useLocale } from "next-intl";
import React, { useEffect, useState } from "react";
import { createMetadata } from "@/lib/create-metadata";
import HeaderCard from "@/components/Card/HeaderCard";
import {
  Version,
  Title,
  Features,
  Feature,
  Fixes,
  Fix,
  Refactors,
  Refactor,
  Dependencies,
  Dependency,
} from "@/components/Docs/Changelog";
import Callout from "@/components/Docs/Callout";

import changelogRuData from "@/data/changelog-ru.json";
import changelogEnData from "@/data/changelog-en.json";

export interface ChangelogItem {
  version: string;
  date: string;
  authors: string[];
  warning?: string | null;
  features?: string[];
  refactors?: string[];
  fixes?: string[];
  dependencies?: string[];
}

interface SectionConfig {
  key: Extract<
    keyof ChangelogItem,
    "features" | "refactors" | "fixes" | "dependencies"
  >;
  title: string;
  Component: React.ComponentType<{ children: React.ReactNode }>;
  ItemComponent: React.ComponentType<{ children: React.ReactNode }>;
}

const SECTIONS: SectionConfig[] = [
  {
    key: "features",
    title: "Features",
    Component: Features,
    ItemComponent: Feature,
  },
  {
    key: "refactors",
    title: "Refactors",
    Component: Refactors,
    ItemComponent: Refactor,
  },
  {
    key: "fixes",
    title: "Fixes",
    Component: Fixes,
    ItemComponent: Fix,
  },
  {
    key: "dependencies",
    title: "Dependencies",
    Component: Dependencies,
    ItemComponent: Dependency,
  },
];

export default function MetricsPage() {
  const locale = useLocale();
  const [activeId, setActiveId] = useState<string>("");

  const ruData = changelogRuData as ChangelogItem[];
  const enData = changelogEnData as ChangelogItem[];

  const data = locale === "ru" ? ruData : enData;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    data.forEach((item) => {
      const element = document.getElementById(`v-${item.version}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [data]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="w-full flex gap-4">
      <div className="">
        {data.map((item) => {
          const sectionId = `v-${item.version}`;
          return (
            <Version
              key={item.version}
              v={item.version}
              date={item.date}
              authors={item.authors}
              id={sectionId}
              className="scroll-mt-20"
            >
              <Title>
                <h1 className="font-bold text-2xl">
                  {locale === "ru" ? "Версия" : "Version"} {item.version}
                </h1>
                {item.warning && (
                  <Callout
                    type="warn"
                    title={locale === "ru" ? "Предупреждение" : "Warning"}
                  >
                    {item.warning}
                  </Callout>
                )}
              </Title>

              {SECTIONS.map(({ key, Component, ItemComponent }) => {
                const list = item[key];
                if (!list || list.length === 0) return null;

                return (
                  <Component key={key}>
                    {list.map((text, idx) => (
                      <ItemComponent key={idx}>{text}</ItemComponent>
                    ))}
                  </Component>
                );
              })}
            </Version>
          );
        })}
      </div>

      <div className="max-lg:hidden">
        <div className="custom-scrollbar sticky top-20 bg-fd-card border rounded-2xl p-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <nav className="flex flex-col space-y-1">
            {data.map((item) => {
              const sectionId = `v-${item.version}`;
              const isActive = activeId === sectionId;

              return (
                <a
                  key={item.version}
                  href={`#${sectionId}`}
                  onClick={(e) => scrollToSection(e, sectionId)}
                  className={`text-xs px-3 py-2 rounded-lg font-medium transition-all ${
                    isActive
                      ? "bg-fd-primary text-fd-primary-foreground font-bold"
                      : "text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
                  }`}
                >
                  v{item.version}
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}
