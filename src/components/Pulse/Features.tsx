import Card from "../Card/Card";
import Svg from "../Svg/Svg";
import {useTranslations} from "next-intl";
import FeatureCard from "@/components/Card/FeatureCard";

export default function Feautures() {

    const t = useTranslations('Pulse.Features')

    return (
        <div className='w-full flex gap-8 max-[52rem]:flex-col'>
            <FeatureCard
                title={t("Message.title")}
                description={t("Message.description")}
                image="/pulse/pulsecard1.svg"
                link="/pulse/docs/message"
                glowPosition="rightTop"
            />
            <FeatureCard
                title={t("Command.title")}
                description={t("Command.description")}
                image="/pulse/pulsecard2.svg"
                link="/pulse/docs/command"
                glowPosition="centerTop"
            />
            <FeatureCard
                title={t("Integration.title")}
                description={t("Integration.description")}
                image="/pulse/pulsecard3.svg"
                link="/pulse/docs/integration"
                glowPosition="leftTop"
            />
        </div>
    )
}