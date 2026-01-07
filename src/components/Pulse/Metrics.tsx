import {useTranslations} from "next-intl";

export default function Metrics() {
  const t = useTranslations('Pulse.Metrics');
  return(
    <div className='flex flex-col gap-3 justify-center items-center'>
      <h1 className='text-2xl w-fit text-center font-bold border-b border-fd-foreground px-4 pb-2'>{t('title')}</h1>
      <div className="backdrop-blur-2xl w-full flex justify-center items-center bg-linear-to-br from-fd-primary/10 rounded-xl border p-4">
        <img src="https://flectone.net/api/pulse/metrics/svg" alt="metrics" className="not-dark:invert" />
      </div>
    </div>
  )
}