"use client"

import { useLocale } from "next-intl"
import React from "react"
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
} from "./changelog-component"
import Callout from "@/components/shared/callout"

import changelogRuData from "@/data/changelog-ru.json"
import changelogEnData from "@/data/changelog-en.json"
import parse from "html-react-parser"

export interface ChangelogItem {
  version: string
  date: string
  authors: string[]
  warning?: string | null
  features?: string[]
  refactors?: string[]
  fixes?: string[]
  dependencies?: string[]
}

interface SectionConfig {
  key: Extract<
    keyof ChangelogItem,
    "features" | "refactors" | "fixes" | "dependencies"
  >
  title: string
  Component: React.ComponentType<{ children: React.ReactNode }>
  ItemComponent: React.ComponentType<{ children: React.ReactNode }>
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
]

export default function Changelog() {
  const locale = useLocale()

  const ruData = changelogRuData as ChangelogItem[]
  const enData = changelogEnData as ChangelogItem[]

  const data = locale === "ru" ? ruData : enData
  const anchors = Array.from(data.map((item, key) => item.version))

  return (
    <div className="relative flex w-full flex-col gap-4 rounded-xl border bg-card p-8">
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
                  {parse(item.warning)}
                </Callout>
              )}
            </Title>

            {SECTIONS.map(({ key, Component, ItemComponent }) => {
              const list = item[key]
              if (!list || list.length === 0) return null

              return (
                <Component key={key}>
                  {list.map((text, idx) => (
                    <ItemComponent key={idx}>{parse(text)}</ItemComponent>
                  ))}
                </Component>
              )
            })}
          </Version>
        )
      })}
    </div>
  )
}
