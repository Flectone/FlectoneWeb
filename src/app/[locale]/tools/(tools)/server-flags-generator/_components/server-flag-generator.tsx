"use client"

import { useState, useMemo, useEffect } from "react"
import type { ReactNode } from "react"
import { useTranslations } from "next-intl"
import { Copy, Check, Download } from "lucide-react"
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type FlagPreset = "none" | "aikars" | "zgc" | "shenandoah" | "velocity"
type OsTab = "linux" | "windows" | "java"

const MIN_MB = 512
const MAX_MB = 32768
const STEP_MB = 512

const MEMORY_TICKS = [
  1024 * 0.5,
  1024,
  1024 * 2,
  1024 * 4,
  1024 * 8,
  1024 * 12,
  1024 * 16,
  1024 * 20,
  1024 * 24,
  1024 * 28,
  1024 * 32,
]

function toSingleValue(value: number | readonly number[]) {
  return Array.isArray(value) ? value[0] : (value as number)
}

function formatMemory(mb: number): string {
  if (mb >= 1024 && mb % 1024 === 0) return `${mb / 1024} GB`
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`
  return `${mb} MB`
}

function buildFlags(
  preset: FlagPreset,
  memoryMb: number,
  jar: string,
  gui: boolean,
  autoRestart: boolean,
  ignoreJavaVersion: boolean
): Record<OsTab, string> {
  const mem = `${memoryMb}M`
  const nogui = gui ? "" : " --nogui"
  const isMoreThan12GB = Math.floor(memoryMb / 1024) >= 12

  let jvmFlags: string[]

  const javaVersionFlag = ignoreJavaVersion
    ? "-Dpaper.ignoreJavaVersion=true"
    : ""

  if (preset === "none") {
    // default flags
    jvmFlags = [
      `-Xms${mem}`,
      `-Xmx${mem}`,
      `--add-modules=jdk.incubator.vector`,
      `${javaVersionFlag}`,
      `-jar ${jar}${nogui}`,
    ]
  } else if (preset === "aikars") {
    // https://docs.papermc.io/paper/aikars-flags/
    jvmFlags = [
      `-Xms${mem}`,
      `-Xmx${mem}`,
      `--add-modules=jdk.incubator.vector`,
      `-XX:+UseG1GC`,
      `-XX:+ParallelRefProcEnabled`,
      `-XX:MaxGCPauseMillis=200`,
      `-XX:+UnlockExperimentalVMOptions`,
      `-XX:+DisableExplicitGC`,
      `-XX:+AlwaysPreTouch`,
      `-XX:G1NewSizePercent=${isMoreThan12GB ? 40 : 30}`,
      `-XX:G1MaxNewSizePercent=${isMoreThan12GB ? 50 : 40}`,
      `-XX:G1HeapRegionSize=${isMoreThan12GB ? 16 : 8}M`,
      `-XX:G1ReservePercent=${isMoreThan12GB ? 15 : 20}`,
      `-XX:G1HeapWastePercent=5`,
      `-XX:G1MixedGCCountTarget=4`,
      `-XX:InitiatingHeapOccupancyPercent=15`,
      `-XX:G1MixedGCLiveThresholdPercent=90`,
      `-XX:G1RSetUpdatingPauseTimePercent=5`,
      `-XX:SurvivorRatio=32`,
      `-XX:+PerfDisableSharedMem`,
      `-XX:MaxTenuringThreshold=1`,
      `-Dusing.aikars.flags=https://mcflags.emc.gs`,
      `-Daikars.new.flags=true`,
      `${javaVersionFlag}`,
      `-jar ${jar}${nogui}`,
    ]
  } else if (preset === "zgc") {
    // https://obydux.github.io/Minecraft-startup-flags/
    jvmFlags = [
      `-Xms${mem}`,
      `-Xmx${mem}`,
      `--add-modules=jdk.incubator.vector`,
      `-XX:+UseZGC`,
      `-XX:+ZGenerational`,
      `-XX:+AlwaysPreTouch`,
      `-XX:+UseStringDeduplication`,
      `-XX:TrimNativeHeapInterval=5000`,
      `${javaVersionFlag}`,
      `-jar ${jar}${nogui}`,
    ]
  } else if (preset === "shenandoah") {
    // https://github.com/brucethemoose/Minecraft-Performance-Flags-Benchmarks
    jvmFlags = [
      `-Xms${mem}`,
      `-Xmx${mem}`,
      `--add-modules=jdk.incubator.vector`,
      `-XX:+UseShenandoahGC`,
      `-XX:ShenandoahGCMode=iu`,
      `-XX:ShenandoahGuaranteedGCInterval=1000000`,
      `-XX:+AlwaysPreTouch`,
      `-XX:+DisableExplicitGC`,
      `-XX:AllocatePrefetchStyle=1`,
      `${javaVersionFlag}`,
      `-jar ${jar}${nogui}`,
    ]
  } else {
    // https://docs.papermc.io/velocity/getting-started
    jvmFlags = [
      `-Xms${mem}`,
      `-Xmx${mem}`,
      `-XX:+UseG1GC`,
      `-XX:G1HeapRegionSize=4M`,
      `-XX:+UnlockExperimentalVMOptions`,
      `-XX:+ParallelRefProcEnabled`,
      `-XX:+AlwaysPreTouch`,
      `-XX:MaxInlineLevel=15`,
      `${javaVersionFlag}`,
      `-jar ${jar}`,
    ]
  }

  const flagStr = jvmFlags.join(" ")
  const linux = autoRestart
    ? `#!/bin/bash\n\nwhile true; do\n\n  java ${flagStr}\n\n  echo "Server stopped. Restarting in 5s..."\n  sleep 5\ndone`
    : `#!/bin/bash\n\njava ${flagStr}`
  const windows = autoRestart
    ? `@echo off\n\n:start\n\njava ${flagStr}\n\necho Server stopped. Restarting in 5s...\ntimeout /t 5\ngoto start`
    : `@echo off\n\njava ${flagStr}`

  return { linux, windows, java: `java ${flagStr}` }
}

function highlightLine(line: string, tab: OsTab, key: number): ReactNode {
  const lineNum = (
    <span className="w-5 shrink-0 text-right text-xs leading-6 text-fd-muted-foreground/40 select-none">
      {key + 1}
    </span>
  )

  if (tab !== "java") {
    if (/^(#!\/bin\/bash|@echo off)/.test(line)) {
      return (
        <div key={key} className="flex min-w-0 gap-3">
          {lineNum}
          <span className="min-w-0 wrap-break-word whitespace-pre-wrap text-fd-muted-foreground italic">
            {line}
          </span>
        </div>
      )
    }
    if (/^(while|do|done|echo|sleep|:start|goto|timeout)/.test(line.trim())) {
      return (
        <div key={key} className="flex min-w-0 gap-3">
          {lineNum}
          <span className="text-fd-orange min-w-0 wrap-break-word whitespace-pre-wrap">
            {line}
          </span>
        </div>
      )
    }
  }

  if (line.trim().startsWith("java ") || tab === "java") {
    const tokens = line.split(/(\s+)/)
    const rendered = tokens.map((token, ti) => {
      if (token === "java")
        return (
          <span key={ti} className="text-fd-green font-semibold">
            {token}
          </span>
        )
      if (token.startsWith("-Xms") || token.startsWith("-Xmx"))
        return (
          <span key={ti} className="text-fd-orange">
            {token}
          </span>
        )
      if (token.startsWith("-XX:+") || token.startsWith("-XX:-"))
        return (
          <span key={ti} className="text-fd-primary">
            {token}
          </span>
        )
      if (token.startsWith("-XX:")) {
        const eq = token.indexOf("=")
        if (eq !== -1) {
          return (
            <span key={ti}>
              <span className="text-fd-primary">{token.slice(0, eq + 1)}</span>
              <span className="text-fd-green">{token.slice(eq + 1)}</span>
            </span>
          )
        }
        return (
          <span key={ti} className="text-fd-primary">
            {token}
          </span>
        )
      }
      if (token.startsWith("-D") || token.startsWith("--")) {
        const eq = token.indexOf("=")
        if (eq !== -1) {
          return (
            <span key={ti}>
              <span className="text-fd-muted-foreground">
                {token.slice(0, eq + 1)}
              </span>
              <span className="text-fd-green">{token.slice(eq + 1)}</span>
            </span>
          )
        }
        return (
          <span key={ti} className="text-fd-muted-foreground">
            {token}
          </span>
        )
      }
      if (token === "-jar")
        return (
          <span key={ti} className="text-fd-orange">
            {token}
          </span>
        )
      if (token === "--nogui")
        return (
          <span key={ti} className="text-fd-muted-foreground">
            {token}
          </span>
        )
      if (/\.jar/.test(token))
        return (
          <span key={ti} className="text-fd-green font-semibold">
            {token}
          </span>
        )
      return <span key={ti}>{token}</span>
    })

    return (
      <div key={key} className="flex min-w-0 gap-3">
        {lineNum}
        <span className="min-w-0 wrap-break-word whitespace-pre-wrap">
          {rendered}
        </span>
      </div>
    )
  }

  return (
    <div key={key} className="flex min-w-0 gap-3">
      {lineNum}
      <span className="min-w-0 wrap-break-word whitespace-pre-wrap text-fd-foreground">
        {line || "\u00A0"}
      </span>
    </div>
  )
}

function CodeBlock({
  code,
  tab,
  onDownload,
}: {
  code: string
  tab: OsTab
  onDownload: () => void
}) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative overflow-hidden rounded-xl border bg-fd-card">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleCopy}
          className="absolute top-3 right-3 z-10 h-fit w-fit rounded-lg p-1.5"
        >
          {copied ? (
            <Check size="1em" className="text-fd-green" />
          ) : (
            <Copy size="1em" className="text-fd-muted-foreground" />
          )}
        </Button>
        <pre className="overflow-x-hidden p-4 pr-12 font-mono text-sm leading-6 text-fd-foreground">
          {code.split("\n").map((line, i) => highlightLine(line, tab, i))}
        </pre>
      </div>
      <div className="flex justify-end">
        <Button type="button" onClick={onDownload} className="gap-1.5">
          <Download size="1em" />
          {tab === "linux"
            ? "start.sh"
            : tab === "windows"
              ? "start.bat"
              : "flags.txt"}
        </Button>
      </div>
    </div>
  )
}

export default function ServerFlagsGenerator() {
  const t = useTranslations("FlectoneTools.ServerFlagsGenerator")

  const [jar, setJar] = useState("server.jar")
  const [memoryMb, setMemoryMb] = useState(4096)
  const [preset, setPreset] = useState<FlagPreset>("aikars")
  const [gui, setGui] = useState(false)
  const [autoRestart, setAutoRestart] = useState(false)
  const [osTab, setOsTab] = useState<OsTab>("linux")
  const [ignoreJavaVersion, setIgnoreJavaVersion] = useState(false)

  const guiDisabled = preset === "velocity"
  const autoRestartDisabled = osTab === "java"
  const ignoreVersionJavaDisabled =
    preset === "none" || preset === "velocity" || osTab === "java"

  const result = useMemo(
    () =>
      buildFlags(
        preset,
        memoryMb,
        jar,
        gui,
        autoRestart && !autoRestartDisabled,
        ignoreJavaVersion
      ),
    [
      preset,
      memoryMb,
      jar,
      gui,
      autoRestart,
      autoRestartDisabled,
      ignoreJavaVersion,
    ]
  )

  useEffect(() => {
    if (guiDisabled) setGui(false)
    if (ignoreVersionJavaDisabled) setIgnoreJavaVersion(false)
  }, [preset, osTab, guiDisabled, ignoreVersionJavaDisabled])

  const handleDownload = () => {
    const ext = osTab === "linux" ? "sh" : osTab === "windows" ? "bat" : "txt"
    const blob = new Blob([result[osTab]], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `start.${ext}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const PRESETS: {
    id: FlagPreset
    label: string
    description: string
    link: string
  }[] = [
    {
      id: "none",
      label: t("Presets.None.label"),
      description: t("Presets.None.description"),
      link: t("Presets.None.link"),
    },
    {
      id: "aikars",
      label: t("Presets.Aikars.label"),
      description: t("Presets.Aikars.description"),
      link: t("Presets.Aikars.link"),
    },
    {
      id: "zgc",
      label: t("Presets.Zgc.label"),
      description: t("Presets.Zgc.description"),
      link: t("Presets.Zgc.link"),
    },
    {
      id: "shenandoah",
      label: t("Presets.Shenandoah.label"),
      description: t("Presets.Shenandoah.description"),
      link: t("Presets.Shenandoah.link"),
    },
    {
      id: "velocity",
      label: t("Presets.Velocity.label"),
      description: t("Presets.Velocity.description"),
      link: t("Presets.Velocity.link"),
    },
  ]

  const OS_TABS: { id: OsTab; label: string }[] = [
    { id: "linux", label: "Linux / Mac" },
    { id: "windows", label: "Windows" },
    { id: "java", label: "Java" },
  ]

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex gap-6 max-lg:flex-col">
        <Card className="w-1/3 shrink-0 max-lg:w-full">
          <CardHeader>
            <CardTitle>{t("filename")}</CardTitle>
          </CardHeader>
          <CardContent>
            <Field>
              <FieldContent>
                <Input
                  value={jar}
                  onChange={(e) => setJar(e.target.value)}
                  placeholder="server.jar"
                />
                <FieldDescription>{t("filenameHint")}</FieldDescription>
              </FieldContent>
            </Field>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader>
            <CardTitle>{t("options")}</CardTitle>
          </CardHeader>
          <CardContent>
            <FieldGroup className="grid grid-cols-2 gap-3">
              <Field orientation="horizontal">
                <Checkbox
                  id="gui"
                  checked={gui}
                  onCheckedChange={setGui}
                  disabled={guiDisabled}
                />
                <FieldContent className="gap-1">
                  <FieldLabel
                    htmlFor="gui"
                    className={guiDisabled ? "opacity-40" : ""}
                  >
                    GUI
                  </FieldLabel>
                  <FieldDescription>{t("guiHint")}</FieldDescription>
                </FieldContent>
              </Field>
              <Field orientation="horizontal">
                <Checkbox
                  id="auto-restart"
                  checked={autoRestart}
                  onCheckedChange={setAutoRestart}
                  disabled={autoRestartDisabled}
                />
                <FieldContent className="gap-1">
                  <FieldLabel
                    htmlFor="auto-restart"
                    className={autoRestartDisabled ? "opacity-40" : ""}
                  >
                    {t("autoRestart")}
                  </FieldLabel>
                  <FieldDescription>{t("autoRestartHint")}</FieldDescription>
                </FieldContent>
              </Field>
              <Field
                orientation="horizontal"
                className="col-span-2 row-start-2"
              >
                <Checkbox
                  id="ignore-java-version"
                  checked={ignoreJavaVersion}
                  onCheckedChange={setIgnoreJavaVersion}
                  disabled={ignoreVersionJavaDisabled}
                />
                <FieldContent className="gap-1">
                  <FieldLabel
                    htmlFor="ignore-java-version"
                    className={ignoreVersionJavaDisabled ? "opacity-40" : ""}
                  >
                    {t("ignoreJavaVersion")}
                  </FieldLabel>
                  <FieldDescription>
                    {t("ignoreJavaVersionHint")}
                  </FieldDescription>
                </FieldContent>
              </Field>
            </FieldGroup>
          </CardContent>
        </Card>
      </div>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("flags")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-full w-full flex-wrap gap-2">
            {PRESETS.map((p) => (
              <div key={p.id} className="flex w-full flex-1 flex-col gap-2">
                <Button
                  type="button"
                  variant={preset === p.id ? "default" : "outline"}
                  onClick={() => setPreset(p.id)}
                  className="h-16 w-full whitespace-normal"
                >
                  {p.label}
                </Button>
                <div className="h-full p-2 text-xs">
                  <p>
                    {p.description}{" "}
                    {p.link !== "" && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-fd-muted-primary text-fd-primary transition"
                      >
                        {t("more")}
                      </a>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>
            {t("memory")}:{" "}
            <code className="rounded-sm bg-fd-card px-1 py-0.5">
              {formatMemory(memoryMb)}
            </code>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Slider
            value={[memoryMb]}
            min={MIN_MB}
            max={MAX_MB}
            step={STEP_MB}
            onValueChange={(v) => setMemoryMb(toSingleValue(v))}
          />
          <div className="flex justify-between gap-2 max-md:flex-wrap">
            {MEMORY_TICKS.map((mb) => (
              <Button
                key={mb}
                type="button"
                variant={memoryMb === mb ? "secondary" : "ghost"}
                onClick={() => setMemoryMb(mb)}
                className={`py-2 text-xs text-nowrap max-md:w-[calc(25%-8px)] ${
                  memoryMb === mb
                    ? "font-bold text-fd-primary"
                    : "text-fd-muted-foreground"
                }`}
              >
                {formatMemory(mb)}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{t("result")}</CardTitle>
          <CardAction>
            <Tabs value={osTab} onValueChange={(v) => setOsTab(v as OsTab)}>
              <TabsList>
                {OS_TABS.map((tab) => (
                  <TabsTrigger key={tab.id} value={tab.id}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </CardAction>
        </CardHeader>
        <CardContent>
          <CodeBlock
            code={result[osTab]}
            tab={osTab}
            onDownload={handleDownload}
          />
        </CardContent>
      </Card>
    </div>
  )
}
