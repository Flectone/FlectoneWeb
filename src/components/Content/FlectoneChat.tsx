import LinkButton from "../Button/LinkButton";
import Card from "../Card/Card";
import {SiBoosty} from "react-icons/si";
import {SiGithub} from "react-icons/si";
import {SiModrinth} from "react-icons/si";
import Image from "next/image";
import {useTranslations} from "next-intl";
import Svg from "@/components/Svg/Svg";

export default function FlectoneChat() {

  const t = useTranslations('FlectoneChat');

  return (
    <div className="flex w-full max-xl:w-2xl max-md:w-full max-xl:flex-col ">
      <Card className="mr-4 w-sm flex flex-col justify-between max-xl:w-full max-xl:my-4">
        <div>
          <h1 className="text-2xl font-bold"><b>Flectone</b>Chat</h1>
          <p>{t('description')}</p>
          <h2 className="my-4">{t.rich('usePulse', {strong: (chunks) => <strong>{chunks}</strong>})}</h2>
        </div>
        <div className="flex gap-2 max-lg:mt-2 xl:flex-col justify-start">
          <LinkButton mode="green" className="flex items-center" href="https://modrinth.com/plugin/flectonepulse"><SiModrinth className="mr-1" size={'16px'}/>FlectonePulse</LinkButton>
          <LinkButton mode="gray" className="flex items-center" href="https://github.com/Flectone/FlectoneChat"><SiGithub className="mr-1" size={'16px'}/>GitHub</LinkButton>
        </div>
      </Card>
      <Card className="w-full">
        <Svg src={t('imagePath')} className='rounded-md border-[0.5px]'/>
      </Card>
    </div>
  )
}