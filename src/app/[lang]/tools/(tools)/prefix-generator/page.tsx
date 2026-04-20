import Title from "@/components/Title/Title";
import PrefixGenerator from "@/components/Tools/PrefixGenerator";
import { useTranslations } from "next-intl";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
    namespace: 'Tools.PrefixGenerator'
});

export default function BadgeGeneratorPage() {
    const t = useTranslations('Tools.PrefixGenerator')
    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-4">
            <Title text={t('title')} />
            <p>{t('description')}</p>
            <PrefixGenerator />
        </div>
    )
}