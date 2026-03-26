import Title from "@/components/Title/Title"
import TextAnimation from "@/components/Tools/TextAnimtion"
import { useTranslations } from "next-intl"
import { getTranslations } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>;
};


export async function generateMetadata({ params }: Props) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'Metadata.Tools.TextAnimation' });

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

export default function TabAnimationPage() {
    const t = useTranslations('Tools.TextAnimation')
    return (
        <div className="w-7xl flex gap-4 flex-col justify-center my-4">
            <Title text={t('title')} />
            <p>{t('description')}</p>
            <TextAnimation />
        </div>
    )
}