import LinkButton from "../Button/LinkButton";
import Card from "../Card/Card";
import { SiBoosty } from "react-icons/si";
import { SiGithub } from "react-icons/si";
import { SiModrinth } from "react-icons/si";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function FlectoneChat() {

    const t = useTranslations('FlectoneChat');

    return (
        <div className="flex w-full max-xl:w-2xl max-md:w-full mt-6 max-xl:flex-col ">
            <Card className="mr-4 w-sm flex flex-col justify-between max-xl:w-full max-xl:my-4">
                <div>
                    <h1 className="text-2xl font-bold"><b>Flectone</b>Chat</h1>
                    <p>{t('description')}</p>
                    <h2 className="my-4">{t.rich('usePulse', {strong: (chunks) => <strong>{chunks}</strong>})}</h2>
                </div>
                <div className="flex justify-center max-lg:mt-2 max-sm:flex-col max-xl:justify-start">
                    <LinkButton mode="green" className="flex items-center mr-2 max-sm:mb-2" href="https://modrinth.com/plugin/flectonepulse"><SiModrinth  className="mr-1" size={'16px'} />FlectonePulse</LinkButton>
                    <LinkButton mode="gray" className="flex items-center" href="https://github.com/Flectone/FlectoneChat"><SiGithub className="mr-1" size={'16px'} />GitHub</LinkButton>
                </div>
            </Card>
            <Card className="w-full">
                <Image className="border-1 border-neutral-600/20 rounded-sm invert-(--invert)" src={t('imagePath')} width={5000} height={128} alt="mix" />
            </Card>
        </div>
    )
}