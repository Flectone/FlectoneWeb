'use client'
import ToolCard from "@/components/Card/ToolCard";
import { useTranslations } from "next-intl";
import {IconName} from "lucide-react/dynamic";

export default function FlectoneTools() {
    const t = useTranslations('Tools.Main');

    interface ToolConfig {
        label: string;
        description: string;
        icon: IconName;
        path: string;
    }

    const tools: ToolConfig[] = [
        {
            label: t('TextureGenerator.title'),
            description: t('TextureGenerator.description'),
            path: '/tools/texture-generator',
            icon: 'image'
        },
        {
            label: t('TextAnimation.title'),
            description: t('TextAnimation.description'),
            path: "/tools/text-animation",
            icon: 'sparkles'
        },
        {
            label: t('PrefixGenerator.title'),
            description: t('PrefixGenerator.description'),
            path: "/tools/prefix-generator",
            icon: 'square-pen'
        },
        {
            label: t('UuidExtractor.title'),
            description: t('UuidExtractor.description'),
            path: "/tools/uuid-extractor",
            icon: 'fingerprint'
        },
        {
            label: t('InventoryPreviewer.title'),
            description: t('InventoryPreviewer.description'),
            path: "/tools/inventory-previewer",
            icon: 'grid-3x3'
        },
        {
            label: t('CoordinateCalculator.title'),
            description: t('CoordinateCalculator.description'),
            path: "/tools/coordinate-calculator",
            icon: 'compass'
        },
        {
            label: t('ColorTextGenerator.title'),
            description: t('ColorTextGenerator.description'),
            path: "/tools/color-text-generator",
            icon: 'palette'
        },
        {
            label: t('ServerFlagsGenerator.title'),
            description: t('ServerFlagsGenerator.description'),
            path: "/tools/server-flags-generator",
            icon: 'terminal'
        },
        {
            label: t('TimeConvertor.title'),
            description: t('TimeConvertor.description'),
            path: "/tools/time-convertor",
            icon: 'timer'
        },
    ]

    return (
        <div className="w-full grid grid-cols-3 max-xl:grid-cols-1 gap-4">
            {tools.map((tool, key) => (
                <ToolCard
                    key={key}
                    path={tool.path}
                    name={tool.label}
                    description={tool.description}
                    icon={tool.icon}
                />
            ))}
        </div>
    )
}