import LinkButton from "../Button/LinkButton";
import Card from "../Card/Card";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export default function Projects() {
    const t = useTranslations("Projects")

    return (
        <div className="w-full flex justify-center">
            <div className="w-2xl max-md:w-full h-max mt-6">
                <div className="flex w-full justify-center items-center mb-6">
                    <h1 className="font-extrabold text-4xl text-center">{t.rich('title', {b: (chunks) => <b>{chunks}</b>})}</h1>
                </div>
                <Card className="w-full h-56 max-md:h-fit  items-center flex justify-between sm:mb-4">
                    <div className="flex flex-col h-full justify-between">
                        <div>
                            <h1 className="text-2xl font-bold"><b>Flectone</b>Pulse</h1>
                            <p>{t('Pulse.description')}</p>
                        </div>
                        <LinkButton className="max-md:mt-5" href={'/pulse'}>{t('Pulse.button')}</LinkButton>
                    </div>
                    <Image className="max-md:hidden" width={160} height={160} src={"/graph.svg"} alt={"graph"} />
                </Card>
                <div className="flex w-full max-md:flex-col">
                    <Card path="mix" className="mr-4 max-sm:my-4 w-1/2 max-md:w-2/2 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">FlectonMix</h1>
                            <p>{t('Mix.description')}</p>
                        </div>
                        <Image className="border mt-2 border-neutral-600/20 rounded-sm invert-(--invert)" src={'/mix/mix.svg'} width={5000} height={128} alt="mix" />
                    </Card>
                    <Card path="/chat" className="max-md:w-2/2 w-1/2 flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl font-bold">FlectonChat</h1>
                            <p>{t('Chat.description')}</p>
                        </div>
                        <div className="">
                            <div className="text-blue-500 hover:text-red-500">
                                <Image className="border mt-2 border-neutral-600/20 rounded-sm invert-(--invert)" src={t('Chat.imagePath')} width={5000} height={128} alt="mix" />
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    )
}