import Card from "../Card/Card";
import { useTranslations } from 'next-intl';
import FeatureCard from "@/components/Card/FeatureCard";
import Image from "next/image";

export default function Projects() {
  const t = useTranslations("Projects")

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <div className="w-full flex gap-8 flex-col">
        <div className="flex gap-4 flex-col">
          <Card path='/pulse' className="w-full h-full max-md:h-fit items-center flex justify-between p-10 relative">
            <div className="animate-pulse rounded-full [animation-duration:6s] blur-2xl sm:hidden absolute -right-5 bottom-0 h-full w-1/2 bg-fd-primary/20 "></div>
            <div className='flex flex-col gap-1'>
              <h1 className='text-2xl max-md:text-xl font-bold'>Flectone<b>Pulse</b></h1>
              <p className='w-2/3 max-md:text-md'>{t('Pulse.description')}</p>
            </div>
            <Image width={700} height={400} src="/flectonepulse2.png" className="max-lg:hidden absolute right-20 w-lg mr-10 max-xl:w-md max-lg:w-sm max-md:w-xs z-50" alt='flectonepulse' />
            <div className="max-sm:hidden w-4/5 right-0 mask-[linear-gradient(to_left,white,transparent)] absolute flex items-center justify-center">
              <Image width={580} height={120} src="/features.png" alt="metrics" className="w-full" />
            </div>
          </Card>
          <FeatureCard
            link={'/tools'}
            className='w-full items-center flex p-10'
            image={'/assets/tools.svg'}
            title={<h1 className='text-2xl max-md:text-xl font-bold'>Flectone<b>Tools</b></h1>}
            description={<p className={'w-full max-md:text-md'}>{t('Tools.description')}</p>}
            imagePosition={'right'}
          />
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-2xl">Закрытые проекты</h3>
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
    </div>
  )
}