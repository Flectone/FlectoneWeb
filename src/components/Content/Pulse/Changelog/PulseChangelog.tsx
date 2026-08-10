"use client";

import { useLocale } from "next-intl";
import React from "react";
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

export default function PulseChangelog() {
  const locale = useLocale();

  const ruData = changelogRuData as ChangelogItem[];
  const enData = changelogEnData as ChangelogItem[];

  const data = locale === "ru" ? ruData : enData;
  const anchors = Array.from(data.map((item, key) => item.version));

  function parseText(text: string) {
    return text
      .replace(
        /`([^`]*)`/g,
        "<code class='rounded-sm pr-1 bg-fd-border'>$1</code>",
      )
      .replace(
        /\[#(\d+)\]\(([^)]*)\)/,
        "<a class=' text-fd-primary! hover:text-fd-muted-primary! transition' href='$2'>#$1</a>",
      );
  }

  return (
    <div className="w-full flex flex-col gap-4 relative bg-fd-article p-8 rounded-2xl border shadow-lg">
      {data.map((item) => {
        return (
          <Version
            key={item.version}
            v={item.version}
            date={item.date}
            authors={item.authors}
            id={item.version}
            anchors={anchors}
            className="scroll-mt-20"
          >
            <Title>
              {item.warning && (
                <Callout
                  type="warn"
                  margin="none"
                  title={locale === "ru" ? "Предупреждение" : "Warning"}
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: parseText(item.warning),
                    }}
                  />
                </Callout>
              )}
            </Title>

            {SECTIONS.map(({ key, Component, ItemComponent }) => {
              const list = item[key];
              if (!list || list.length === 0) return null;

              return (
                <Component key={key}>
                  {list.map((text, idx) => (
                    <ItemComponent key={idx}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: parseText(text),
                        }}
                      />
                    </ItemComponent>
                  ))}
                </Component>
              );
            })}
          </Version>
        );
      })}
    </div>
  );
}
