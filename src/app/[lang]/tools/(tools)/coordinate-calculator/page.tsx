import Title from "@/components/Title/Title";
import CoordinateCalculator from "@/components/Tools/CoordinateCalculator";
import { useTranslations } from "next-intl";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
    namespace: 'Tools.CoordinateCalculator'
});

export default function CoordinateCalculatorPage() {
    const t = useTranslations('Tools.CoordinateCalculator');
    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-4">
            <Title text={t('title')} />
            <p>{t('description')}</p>
            <CoordinateCalculator />
        </div>
    );
}