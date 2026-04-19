import Title from "@/components/Title/Title";
import UuidExtractor from "@/components/Tools/UuidExtractor";
import { useTranslations } from "next-intl";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
    namespace: 'Tools.UuidExtractor'
});

export default function UuidExtractorPage() {
    const t = useTranslations('Tools.UuidExtractor')
    return (
        <div className="w-full max-w-3xl flex gap-4 flex-col justify-center my-4">
            <Title text={t('title')} />
            <p>{t('description')}</p>
            <UuidExtractor />
        </div>
    )
}