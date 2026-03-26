import { TextureGenerator } from '@/components/Tools/TextureGenerator';
import Title from '@/components/Title/Title';
import { useTranslations } from 'next-intl';
import Callout from '@/components/Pulse/Callout';
import { getTranslations } from 'next-intl/server';

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'Metadata.Tools.TextureGenerator' });

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

export default function TextureGeneratorPage() {
    const t = useTranslations('Tools.TextureGenerator');

    return (
        <div className="w-7xl flex gap-4 flex-col items-center justify-center">
            <Title text={t('title')} />
            <p className='w-full'>{t('description')}</p>
            <Callout margin='none' title='' type='warn'>{t('warn')}</Callout>
            <TextureGenerator />
        </div>
    );
}