import HeroCard from "@/components/shared/hero-card"
import {
  AnimationPreview,
  ColorTextPreview,
  CoordinatePreview,
  FlagsPreview,
  InventoryPreview,
  PrefixPreview,
  TexturePreview,
  TimePreview,
  UuidPreview,
} from "./_components/tool-preview"
import ToolCard from "./_components/tool-card"
import { useTranslations } from "next-intl"
import { IconName } from "lucide-react/dynamic"
import { ReactNode } from "react"
import PageTemplate from "@/components/shared/page-template"
import { createMetadata } from "@/lib/create-metadata"

interface ToolConfig {
  key: string
  path: string
  icon: IconName
  color: string
  preview: ReactNode
}

const TOOLS: ToolConfig[] = [
  {
    key: "TextAnimation",
    path: "/tools/text-animation",
    icon: "sparkles",
    color: "var(--color-purple-400)",
    preview: <AnimationPreview />,
  },
  {
    key: "TextureGenerator",
    path: "/tools/texture-generator",
    icon: "image",
    color: "var(--color-primary)",
    preview: <TexturePreview />,
  },
  {
    key: "PrefixGenerator",
    path: "/tools/prefix-generator",
    icon: "square-pen",
    color: "var(--color-warning)",
    preview: <PrefixPreview />,
  },
  {
    key: "ColorTextGenerator",
    path: "/tools/color-text-generator",
    icon: "palette",
    color: "var(--color-pink-500)",
    preview: <ColorTextPreview />,
  },
  {
    key: "UuidExtractor",
    path: "/tools/uuid-extractor",
    icon: "fingerprint",
    color: "var(--color-success)",
    preview: <UuidPreview />,
  },
  {
    key: "InventoryPreviewer",
    path: "/tools/inventory-viewer",
    icon: "grid-3x3",
    color: "var(--color-indigo-600)",
    preview: <InventoryPreview />,
  },
  {
    key: "CoordinateCalculator",
    path: "/tools/coordinate-calculator",
    icon: "compass",
    color: "var(--color-sky-500)",
    preview: <CoordinatePreview />,
  },
  {
    key: "ServerFlagsGenerator",
    path: "/tools/server-flags-generator",
    icon: "terminal",
    color: "var(--color-fd-foreground)",
    preview: <FlagsPreview />,
  },
  {
    key: "TimeConvertor",
    path: "/tools/time-convertor",
    icon: "timer",
    color: "var(--color-cyan-500)",
    preview: <TimePreview />,
  },
]

export const generateMetadata = createMetadata({
  namespace: "Tools.Main",
})

export default function ToolsPage() {
  const t = useTranslations("FlectoneTools.Main")

  return (
    <PageTemplate>
      <HeroCard namespace="FlectoneTools.Main" background={t("background")} />
      <div className="grid w-full grid-cols-3 gap-6 max-xl:grid-cols-2 max-md:grid-cols-1">
        {TOOLS.map((tool) => (
          <ToolCard
            key={tool.key}
            path={tool.path}
            name={t(`${tool.key}.title`)}
            description={t(`${tool.key}.description`)}
            icon={tool.icon}
            color={tool.color}
            preview={tool.preview}
          />
        ))}
      </div>
    </PageTemplate>
  )
}
