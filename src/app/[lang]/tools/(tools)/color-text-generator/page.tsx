import Title from "@/components/Title/Title";
import ColorTextGenerator from "@/components/Tools/ColorTextGenerator";
import { useTranslations } from "next-intl";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
    namespace: 'Tools.ColorTextGenerator'
});

export default function ColorTextGeneratorPage() {
    const t = useTranslations('Tools.ColorTextGenerator');
    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-4">
            <Title text={t('title')} />
            <p>{t('description')}</p>
            <ColorTextGenerator />
        </div>
    );
}