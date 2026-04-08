import Title from "@/components/Title/Title";
import UuidExtractor from "@/components/Tools/UuidExtractor";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'Metadata.Tools.UuidExtractor' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            locale: locale,
        }
    };
}

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