'use client'
import ToolCard from "@/components/Card/ToolCard";
import { useTranslations } from "next-intl";
import MinecraftChat from "../Assets/MinecraftChat";
import { ReactNode } from "react";
import * as Icons from "lucide-react";


export default function FlectoneTools() {
    const t = useTranslations('Tools.Main');
    type IconName = keyof typeof Icons;

    interface ToolConfig {
        label: string;
        description: string;
        icon: IconName;
        path: string;
        preview: ReactNode;
    }

    const tools: ToolConfig[] = [
        {
            label: t('TextureGenerator.title'),
            description: t('TextureGenerator.description'),
            icon: "BrickWall",
            path: '/tools/texture-generator',
            preview:
                <div className="font-[Minecraft] bg-[url(/assets/minecrafttaiga.png)] bg-center h-full bg-cover">
                    <MinecraftChat prefix={<span className="h-[1em] flex items-center justify-center px-1 bg-linear-to-br from-[#3F51B5] to-[#030D48]"><h5 className="text-transparent bg-clip-text bg-linear-to-r from-[#D4E6F8] to-[#89BDD4]">prefix</h5></span>} />
                </div>
        },
        {
            label: t('TextAnimation.title'),
            description: t('TextAnimation.description'),
            icon: "TextSelect",
            path: "/tools/text-animation",
            preview:
                <div className=" text-fd-primary h-full bottom-0 p-2 flex justify-center items-center font-[Minecraft] bg-[url(/assets/minecraftlandscape.jpg)] bg-bottom border">
                    <div className="bg-black/60">
                        <h3 style={{ backgroundSize: '200% auto' }} className="px-3 text-transparent text-4xl animate-gradient-flow bg-linear-to-r from-fd-red via-fd-primary to-fd-red bg-clip-text">
                            FlectonePulse
                        </h3>
                    </div>
                </div>
        },
        {
            label: t('PrefixGenerator.title'),
            description: t('PrefixGenerator.description'),
            icon: "SquareStar",
            path: "/tools/prefix-generator",
            preview:
                <div className="font-[Minecraft] bg-[url(/assets/minecraftclouds.png)] bg-center h-full bg-cover flex items-center justify-center">
                    <span className="flex items-center justify-center px-3 bg-linear-to-br from-[#3F51B5] to-[#030D48]"><h5 className="text-transparent bg-clip-text bg-linear-to-r from-[#D4E6F8] to-[#89BDD4] text-6xl">Admin</h5></span>
                </div>
        },
        {
            label: t('UuidExtractor.title'),
            description: t('UuidExtractor.description'),
            icon: "SquareUserRound",
            path: "/tools/uuid-extractor",
            preview:
                <div className="font-[Minecraft] h-full bg-cover flex items-center justify-center">
                    <div className="w-full h-full bg-fd-primary/30 border-fd-primary/60 border-3 border-dashed flex flex-col gap-2 items-center justify-center">
                        <h2 className="text-xl">Nickname</h2>
                        <h2 className="text-xl">↓   ↓</h2>
                        <h2 className="text-xl">UUID</h2>
                    </div>
                </div>
        },
        {
            label: t('InventoryPreviewer.title'),
            description: t('InventoryPreviewer.description'),
            icon: "SquareUserRound",
            path: "/tools/inventory-previewer",
            preview:
                <div className="font-[Minecraft] bg-[url(/assets/minecraftjungle.png)] h-full bg-cover flex items-center justify-center">
                    <div className="w-full h-full bg-black/60 flex items-center justify-center p-2">
                        <img src="/assets/containers/inventory.png" alt="" className="h-full" />
                    </div>
                </div>
        },
        {
            label: t('CoordinateCalculator.title'),
            description: t('CoordinateCalculator.description'),
            icon: "SquareUserRound",
            path: "/tools/coordinate-calculator",
            preview:
                <div className="font-[Minecraft] bg-[url(/assets/minecraftnether2.png)] h-full bg-cover flex items-center justify-center">
                    <div className="w-full h-full flex-col flex items-center justify-center p-2">
                        <h2 className="text-xl bg-black/50 px-2">x: 12, y: 127, z:25</h2>
                        <h2 className="text-xl">↓   ↓</h2>
                        <h2 className="text-xl bg-black/50 px-2">x: 96, y: 127, z:200</h2>
                    </div>
                </div>
        },
        {
            label: t('ColorTextGenerator.title'),
            description: t('ColorTextGenerator.description'),
            icon: "SquareUserRound",
            path: "/tools/color-text-generator",
            preview:
                <div className="font-[Minecraft] h-full bg-cover flex items-center justify-center">
                    <div className="w-full h-full bg-fd-primary/30 border-fd-primary/60 border-3 border-dashed flex flex-col gap-2 items-center justify-center">
                        <span className="bg-linear-to-r from-red-500 via-yellow-400 to-purple-500 bg-clip-text text-transparent font-bold text-xl">
                            Text example
                        </span>
                        <span className="bg-black/40 px-2">&#8249;rainbow&#8250;Text example&#8249;/rainbow&#8250;</span>
                    </div>
                </div>
        },
        {
            label: t('ServerFlagsGenerator.title'),
            description: t('ServerFlagsGenerator.description'),
            icon: "SquareUserRound",
            path: "/tools/server-flags-generator",
            preview:
                <div className="font-[Minecraft] h-full bg-cover flex items-center justify-center">
                    <div className="relative w-full h-full bg-white/10 border-white/30 border-3 border-dashed flex flex-col gap-2 items-center justify-center">
                        <span className="text-justify absolute text-[0.6em] text-white/70">java -Xms4096M -Xmx4096M --add-modules=jdk.incubator.vector -XX:+UseG1GC -XX:+ParallelRefProcEnabled -XX:MaxGCPauseMillis=200 -XX:+UnlockExperimentalVMOptions -XX:+DisableExplicitGC -XX:+AlwaysPreTouch -XX:G1NewSizePercent=30 -XX:G1MaxNewSizePercent=40 -XX:G1HeapRegionSize=8M -XX:G1ReservePercent=20 -XX:G1HeapWastePercent=5 -XX:G1MixedGCCountTarget=4 -XX:InitiatingHeapOccupancyPercent=15 -XX:G1MixedGCLiveThresholdPercent=90 -XX:G1RSetUpdatingPauseTimePercent=5 -XX:SurvivorRatio=32 -XX:+PerfDisableSharedMem -XX:MaxTenuringThreshold=1 -Dusing.aikars.flags=https://mcflags.emc.gs -Daikars.new.flags=true  -jar server.jar --nogui</span>
                    </div>
                </div>
        },
        {
            label: t('TimeConvertor.title'),
            description: t('TimeConvertor.description'),
            icon: "SquareUserRound",
            path: "/tools/time-convertor",
            preview:
                <div className="font-[Minecraft] bg-[url(/assets/time.svg)] bg-center h-full bg-cover flex items-center justify-center">
                    <img src="/assets/sun.svg" alt="" className="h-full animate-spin [animation-duration:4s]" />
                </div>
        },
    ]

    return (
        <div className="w-full grid grid-cols-2 max-xl:grid-cols-1 gap-4">
            {tools.map((e) => (
                <ToolCard path={e.path} name={e.label} description={e.description} icon={e.icon} preview={e.preview} />
            ))}
        </div>
    )
} 