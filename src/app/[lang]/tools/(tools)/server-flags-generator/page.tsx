import Title from "@/components/Title/Title";
import ServerFlagsGenerator from "@/components/Tools/ServerFlagsGenerator";
import { useTranslations } from "next-intl";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
    namespace: 'Tools.ServerFlagsGenerator'
});

export default function ServerFlagsGeneratorPage() {
    const t = useTranslations('Tools.ServerFlagsGenerator');
    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-4">
            <Title text={t('title')} />
            <p>{t('description')}</p>
            <ServerFlagsGenerator />
        </div>
    );
}