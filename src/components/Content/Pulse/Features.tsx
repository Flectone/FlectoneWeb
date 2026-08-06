import {useTranslations} from "next-intl";
import FeatureCard from "@/components/Card/FeatureCard";

export default function Feautures() {

    const t = useTranslations('Pulse.Features')

    return (
        <div className='w-full flex gap-8 max-[52rem]:flex-col'>
            <FeatureCard
                className='w-1/3 h-72 max-[52rem]:w-full max-[52rem]:h-62 max-[64rem]:h-52'
                title={t("Message.title")}
                description={t("Message.description")}
                image="/assets/flectonepulse/flectonepulse_chat.webp"
                link="/pulse/docs/message"
                glow="rightTop"
                imagePosition={'bottom'}
                imageWidth={800}
                imageHeight={600}
            />
            <FeatureCard
                className='w-1/3 h-72 max-[52rem]:w-full max-[52rem]:h-62 max-[64rem]:h-52'
                title={t("Command.title")}
                description={t("Command.description")}
                image="/assets/flectonepulse/flectonepulse_minigame.webp"
                link="/pulse/docs/command"
                glow="centerTop"
                imagePosition={'bottom'}
                imageWidth={800}
                imageHeight={600}
            />
            <FeatureCard
                className='w-1/3 h-72 max-[52rem]:w-full max-[52rem]:h-62 max-[64rem]:h-52'
                title={t("Integration.title")}
                description={t("Integration.description")}
                image="/assets/flectonepulse/flectonepulse_discord.webp"
                link="/pulse/docs/integration"
                glow="leftTop"
                imagePosition={'bottom'}
                imageWidth={800}
                imageHeight={600}
            />
        </div>
    )
}