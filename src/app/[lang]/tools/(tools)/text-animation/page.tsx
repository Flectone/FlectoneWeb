import Title from "@/components/Title/Title"
import TextAnimation from "@/components/Tools/TextAnimtion"
import { useTranslations } from "next-intl"
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
    namespace: 'Tools.TextAnimation'
});

export default function TabAnimationPage() {
    const t = useTranslations('Tools.TextAnimation')
    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-4">
            <Title text={t('title')} />
            <p>{t('description')} <a target="blank" className="text-fd-primary hover:text-fd-muted-primary transition-colors duration-75" href="https://flectone.net/pulse/docs/message/format/animation">{t('fullDocs')}</a></p>
            <TextAnimation />
        </div>
    )
}