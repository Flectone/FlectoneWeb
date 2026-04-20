import Title from "@/components/Title/Title";
import InventoryPreviewer from "@/components/Tools/InventoryPreviewer";
import { useTranslations } from "next-intl";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
    namespace: 'Tools.InventoryPreviewer'
});

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