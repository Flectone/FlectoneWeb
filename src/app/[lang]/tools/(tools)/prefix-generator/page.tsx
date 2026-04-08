import Title from "@/components/Title/Title";
import PrefixGenerator from "@/components/Tools/PrefixGenerator";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'Metadata.Tools.PrefixGenerator' });

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