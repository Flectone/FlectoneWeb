import { notFound } from 'next/navigation';
import { getTranslations } from "next-intl/server";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'Metadata.NotFound' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            locale: locale,
            images: [
                {
                    url: t('image'),
                    width: 1200,
                    height: 630,
                    alt: 'NotFound'
                }
            ]
        }
    };
}
export default function CatchAllPage() {
    notFound();
}