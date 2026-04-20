import Title from "@/components/Title/Title";
import { Hammer, BrickWall, TextSelect, SquareStar, SquareUserRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { createMetadata } from "@/lib/create-metadata";
import FlectoneTools from "@/components/Content/FlectoneTools";

export const generateMetadata = createMetadata({
    namespace: 'Tools.Main'
});


export default function ToolsPage() {
    const t = useTranslations('Tools.Main');

    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-8">
            <div className="flex flex-col w-full gap-2 justify-center">
                <div className="flex gap-2 items-center">
                    <div className="p-1.5 flex rounded-lg bg-fd-primary-foreground border-fd-primary text-fd-primary border-4">
                        <Hammer className="" size={1.75 + 'em'} fill="var(--color-fd-primary)" strokeWidth={1 + 'px'} />
                    </div>
                    <Title text={t('title')} />
                </div>
                <p className="w-full">{t('description')}</p>
            </div>
            <span className="border-b"></span>
            <FlectoneTools />
        </div>
    )
}