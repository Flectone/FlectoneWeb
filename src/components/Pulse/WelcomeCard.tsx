import LinkButton from "../Button/LinkButton";
import {useTranslations} from "next-intl";
import Image from "next/image";

export default function WelcomeCard() {

  const t = useTranslations('Pulse')

  return (
    <div
      className='w-full max-lg:p-8 rounded-2xl bg-[url(/square.svg)] not-dark:bg-[url(/squaredark.svg)] bg-size-[36px] border overflow-hidden bg-fd-card/85 backdrop-blur-3xl flex px-16 py-12 justify-between items-center gap-8'>
      <div
        className='blur-2xl bg-fd-primary/20 -z-1 w-180 h-[calc(100%+2rem)] rounded-full absolute -right-[20%] animate-pulse [animation-duration:6s]'></div>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl w-2/3 max-md:w-full text-start font-bold'>{t.rich('WelcomeCard.slogan', {
          b: (chunks) => <b>{chunks}</b>
        })}</h1>
        <div className='flex gap-4 max-sm:flex-col'>
          <LinkButton href='https://boosty.to/thefaser' mode='blue' className='h-8'>{t('Buttons.support')}</LinkButton>
          <LinkButton href='/pulse/docs' mode='gray' className='h-8'>{t('Buttons.documentation')}</LinkButton>
          <LinkButton href='https://modrinth.com/plugin/flectonepulse' mode='gray' className='h-8'>{t('Buttons.download')}</LinkButton>
        </div>
      </div>
      <Image className='max-lg:hidden w-85 rounded-xl' src={'/flectonepulse2.png'} alt={'flectonepulse'} width={1000}
             height={1000}/>
    </div>
  )
}