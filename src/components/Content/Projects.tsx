import Card from "../Card/Card";
import {useTranslations} from 'next-intl';
import FeatureCard from "@/components/Card/FeatureCard";

export default function Projects() {
  const t = useTranslations("Projects")

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <div className="h-max w-full flex gap-4 flex-col">
        <div className="flex gap-4">
          <Card path='/pulse' className="w-full h-full max-md:h-fit items-center flex justify-between p-10 relative">
            <div className="animate-pulse rounded-full [animation-duration:6s] blur-2xl sm:hidden absolute -right-5 bottom-0 h-full w-1/2 bg-fd-primary/20 "></div>
            <div className='sm:hidden'>
              <h1 className='text-2xl max-md:text-xl font-bold'>Flectone<b>Pulse</b></h1>
              <p className='w-2/3 max-md:text-md'>{t('Pulse.description')}</p>
            </div>
            <h1 className='max-sm:hidden max-sm:w-1/2 max-xl:text-2xl max-md:text-xl max-sm:text-sm text-3xl w-1/3 font-bold'>{t('Pulse.description')}</h1>
            <img src="/flectonepulse2.png" className="max-sm:hidden max-xl:w-lg max-lg:w-sm max-md:w-xs w-xl z-50" alt='flectonepulse' />
            <div className="max-sm:hidden w-3/5 bottom-0 right-0 mask-[linear-gradient(to_left,white,transparent)] absolute">
              <img src="/features.png" alt="metrics" className="h-full w-full rounded-xl shadow-sm" />
            </div>
          </Card>
        </div>
        <div className="flex w-full max-xl:flex-col gap-4">
          <FeatureCard
            link={'/mix'}
            className='w-1/2 max-xl:w-full items-center flex p-10'
            image={'/mix/mix.svg'}
            title={<h1 className='text-2xl max-md:text-xl font-bold'>Flectone<b>Mix</b></h1>}
            description={<p className={'w-2/3 max-md:text-md'}>{t('Mix.description')}</p>}
            imagePosition={'right'}
          />
          <FeatureCard
            link={'/chat'}
            className='w-1/2 max-xl:w-full items-center flex p-10'
            image={t('Chat.imagePath')}
            title={<h1 className='text-2xl max-md:text-xl font-bold'>Flectone<b>Chat</b></h1>}
            description={<p className={'w-2/3 max-md:text-md'}>{t('Chat.description')}</p>}
            imagePosition={'right'}
          />
        </div>
      </div>
    </div>
  )
}