import LinkButton from "../Button/LinkButton";
import Card from "../Card/Card";
import {SiBoosty} from "react-icons/si";
import {SiGithub} from "react-icons/si";
import {useTranslations} from "next-intl";
import Svg from "@/components/Svg/Svg";

export default function FlectoneMix() {

  const t = useTranslations('FlectoneMix');

  return (
    <div className="flex w-full max-xl:w-2xl max-md:w-full max-xl:flex-col ">
      <Card className="mr-4 w-sm flex flex-col justify-between max-xl:w-full max-xl:my-4">
        <div>
          <h1 className="text-2xl font-bold"><b>Flectone</b>Mix</h1>
          <p>{t('description')}</p>
          <h2 className="my-1.5"><strong className="text-xl font-bold">65138</strong> {t('downloads')}</h2>
        </div>
        <div className="flex gap-2 max-lg:mt-2 xl:flex-col justify-start">
          <LinkButton mode="gray" className="flex items-center" href="https://github.com/Flectone/FlectoneMix"><SiGithub className="mr-1" size={'16px'}/>GitHub</LinkButton>
          <LinkButton mode="orange" className="flex items-center mr-2 max-sm:mb-2" href="https://boosty.to/thefaser/"><SiBoosty className="mr-1" size={'16px'}/>{t('availableOnBoosty')}</LinkButton>
        </div>
      </Card>
      <Card className="w-full">
        <Svg src='/mix/mix.svg' className='rounded-md border'/>
      </Card>
    </div>
  )
}