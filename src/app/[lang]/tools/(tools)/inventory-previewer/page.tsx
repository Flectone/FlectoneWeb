import Title from "@/components/Title/Title";
import InventoryPreviewer from "@/components/Tools/InventoryPreviewer";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

type Props = {
    params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: 'Metadata.Tools.InventoryPreviewer' });

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

export default function InventoryPreviewerPage() {
    const t = useTranslations('Tools.InventoryPreviewer')
    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-4">
            <Title text={t('title')} />
            <p>{t('description')}</p>
            <InventoryPreviewer />
        </div>
    )
}