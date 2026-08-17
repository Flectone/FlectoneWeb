"use client"

import { useEffect, useState } from "react"
import Metric from "./chart"
import { useTranslations } from "next-intl"
import Callout from "@/components/shared/callout"

const TOC_KEYS = [
  { id: "server-count", key: "serverCount" },
  { id: "server-version", key: "serverVersion" },
  { id: "cpu-cores", key: "cpuCores" },
  { id: "total-ram", key: "totalRam" },
  { id: "modules", key: "modules" },
  { id: "project-version", key: "projectVersion" },
  { id: "project-language", key: "projectLanguage" },
  { id: "server-core", key: "serverCore" },
  { id: "os-architecture", key: "osArchitecture" },
  { id: "os-name", key: "osName" },
  { id: "java-version", key: "javaVersion" },
  { id: "proxy-mode", key: "proxyMode" },
  { id: "online-mode", key: "onlineMode" },
  { id: "database-mode", key: "databaseMode" },
  { id: "location", key: "location" },
] as const

const METRICS_CONFIG = [
  {
    id: "server-count",
    titleKey: "items.serverCount",
    props: {
      type: "two-line" as const,
      slice: true,
      data: {
        first: { name: "labels.serverCount", apiPath: "serverCount" },
        second: { name: "labels.playerCount", apiPath: "playerCount" },
      },
    },
  },
  {
    id: "server-version",
    titleKey: "items.serverVersion",
    props: {
      type: "pie" as const,
      name: "labels.serverCount",
      apiPath: "field?name=serverVersion",
      sort: "quickRevers" as const,
    },
  },
  {
    id: "cpu-cores",
    titleKey: "items.cpuCores",
    props: {
      type: "pie" as const,
      suffix: "CPU",
      name: "labels.serverCount",
      apiPath: "field?name=cpuCores",
      sort: "quickRevers" as const,
    },
  },
  {
    id: "total-ram",
    titleKey: "items.totalRam",
    props: {
      type: "pie" as const,
      name: "labels.serverCount",
      apiPath: "field?name=totalRam",
      sort: "quickRevers" as const,
      convert: "gb" as const,
      suffix: "ГБ",
    },
  },
  {
    id: "modules",
    titleKey: "items.modules",
    props: {
      type: "treemap" as const,
      apiPath: "field?name=modules",
    },
  },
  {
    id: "project-version",
    titleKey: "items.projectVersion",
    props: {
      type: "pie" as const,
      sort: "quickRevers" as const,
      name: "labels.serverCount",
      apiPath: "field?name=projectVersion",
    },
  },
  {
    id: "project-language",
    titleKey: "items.projectLanguage",
    props: {
      type: "bar" as const,
      name: "labels.serverCount",
      apiPath: "field?name=projectLanguage",
      sort: "quick" as const,
    },
  },
  {
    id: "server-core",
    titleKey: "items.serverCore",
    props: {
      type: "two-pie" as const,
      sort: "quickRevers" as const,
      data: {
        first: {
          name: "labels.servers",
          apiPath: "field?name=serverCore",
        },
        second: {
          name: "labels.players",
          apiPath: "field?name=playerCountByServerCore",
        },
      },
    },
  },
  {
    id: "os-architecture",
    titleKey: "items.osArchitecture",
    props: {
      type: "pie" as const,
      sort: "quickRevers" as const,
      apiPath: "field?name=osArchitecture",
      name: "labels.serverCount",
    },
  },
  {
    id: "os-name",
    titleKey: "items.osName",
    props: {
      type: "pie" as const,
      sort: "quickRevers" as const,
      apiPath: "field?name=osName",
      name: "labels.serverCount",
    },
  },
  {
    id: "java-version",
    titleKey: "items.javaVersion",
    props: {
      type: "pie" as const,
      name: "labels.serverCount",
      apiPath: "field?name=javaVersion",
      sort: "quickRevers" as const,
    },
  },
  {
    id: "proxy-mode",
    titleKey: "items.proxyMode",
    props: {
      type: "bar" as const,
      name: "labels.serverCount",
      sort: "quick" as const,
      apiPath: "field?name=proxyMode",
    },
  },
  {
    id: "online-mode",
    titleKey: "items.onlineMode",
    props: {
      type: "bar" as const,
      name: "labels.serverCount",
      sort: "quick" as const,
      apiPath: "field?name=onlineMode",
    },
  },
  {
    id: "database-mode",
    titleKey: "items.databaseMode",
    props: {
      type: "bar" as const,
      name: "labels.serverCount",
      sort: "quick" as const,
      apiPath: "field?name=databaseMode",
    },
  },
  {
    id: "location",
    titleKey: "items.location",
    props: {
      type: "geo" as const,
      name: "labels.serverCount",
      apiPath: "field?name=location",
    },
  },
]

export default function Metrics() {
  const t = useTranslations("FlectonePulse.Metrics")

  return (
    <div className="flex w-full flex-col gap-4">
      <Callout margin="none" type="info" title={t("Callout.title")}>
        {t.rich("Callout.text", {
          a: (chunks) => (
            <a
              className="hover:text-fd-muted-primary text-fd-primary transition"
              href="/pulse/docs/config/metrics"
            >
              {chunks}
            </a>
          ),
        })}
      </Callout>
      <div className="flex w-full flex-col gap-4">
        {METRICS_CONFIG.map(({ id, titleKey, props }) => {
          const resolvedProps =
            typeof props === "object" && props !== null
              ? Object.entries(props).reduce((acc, [key, value]) => {
                  if (
                    key === "name" &&
                    typeof value === "string" &&
                    value.startsWith("labels.")
                  ) {
                    acc[key] = t(value)
                  } else if (
                    key === "data" &&
                    typeof value === "object" &&
                    value !== null
                  ) {
                    acc[key] = {
                      first: { ...value.first, name: t(value.first.name) },
                      second: { ...value.second, name: t(value.second.name) },
                    }
                  } else {
                    acc[key] = value
                  }
                  return acc
                }, {} as any)
              : props

          return (
            <div
              key={id}
              id={id}
              className="scroll-mt-20 rounded-2xl border bg-card"
            >
              <h1 className="w-full border-b p-4 font-bold">{t(titleKey)}</h1>
              <Metric className="min-h-100 rounded-xl" {...resolvedProps} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
