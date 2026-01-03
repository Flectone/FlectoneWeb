import Card from "../Card/Card";
import Svg from "../Svg/Svg";
import {useTranslations} from "next-intl";

export default function Feautures() {

    const t = useTranslations('Pulse.Features')

    return (
        <div className='w-full flex gap-8 max-[52rem]:flex-col'>
            <Card path='/pulse/docs/message' className='w-1/3 max-[52rem]:w-full max-[52rem]:h-92 not-dark:border h-72'>
                {/* <img
                    src='/pulse/pulsecard1.svg'
                    alt=''
                    className="not-dark:contrast-70 rounded-lg absolute right-0 bottom-0 -z-1 mask-[linear-gradient(to_top,white,transparent)] shadow-sm w-full h-auto"
                    loading="lazy"
                /> */}
                <Svg src="/pulse/pulsecard1.svg" className="text-fd-primary not-dark:contrast-70 rounded-lg absolute right-0 bottom-0 -z-1 mask-[linear-gradient(to_top,white,transparent)] shadow-sm w-full h-auto" />
                <div className='text-start flex flex-col gap-2'>
                    <h2 className='font-medium'>{t("Message.title")}</h2>
                    <p className=''>{t("Message.description")}</p>
                </div>
                <div className="animate-pulse max-[52rem]:hidden [animation-duration:6s] absolute -top-10 -right-10 w-42 h-42 -z-1 bg-fd-primary/20 blur-2xl"></div>
            </Card>
            <Card path='/pulse/docs/command' className='not-dark:border w-1/3 h-72 max-[52rem]:w-full max-[52rem]:h-92'>
                <Svg src="/pulse/pulsecard2.svg" className="text-fd-primary not-dark:contrast-70 rounded-lg absolute right-0 bottom-0 -z-1 mask-[linear-gradient(to_top,white,transparent)] shadow-sm w-full h-auto" />
                <div className='text-start flex flex-col gap-2'>
                    <h2 className='font-medium'>{t("Command.title")}</h2>
                    <p className=''>{t("Command.description")}</p>
                </div>
                <div className="animate-pulse max-[52rem]:hidden [animation-duration:6s] absolute -top-10 w-full h-42 -z-1 bg-fd-primary/20 blur-2xl"></div>
            </Card>
            <Card path='/pulse/docs/integration' className='not-dark:border w-1/3 h-72 max-[52rem]:w-full max-[52rem]:h-92'>
                <Svg src="/pulse/pulsecard3.svg" className="text-fd-primary not-dark:contrast-70 rounded-lg absolute right-0 bottom-0 -z-1 mask-[linear-gradient(to_top,white,transparent)] shadow-sm w-full h-auto" />
                <div className='text-start flex flex-col gap-2'>
                    <h2 className='font-medium'>{t("Integration.title")}</h2>
                    <p className=''>{t("Integration.description")}</p>
                </div>
                <div className="animate-pulse max-[52rem]:hidden [animation-duration:6s] absolute -top-10 -left-10 w-42 h-42 -z-1 bg-fd-primary/20 blur-2xl"></div>
            </Card>
        </div>
    )
}