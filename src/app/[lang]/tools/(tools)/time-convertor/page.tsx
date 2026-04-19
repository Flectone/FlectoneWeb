import Title from "@/components/Title/Title"
import TimeConvertor from "@/components/Tools/TimeConvertor"
import { useTranslations } from "next-intl"
import { createMetadata } from "@/lib/create-metadata"

export const generateMetadata = createMetadata({
    namespace: 'Tools.TimeConvertor'
});

export default function TimeConvertorPage() {
    const t = useTranslations('Tools.TimeConvertor')
    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-4">
            <Title text={t('title')} />
            <p>{t('description')}</p>
            <TimeConvertor />
        </div>
    )
}