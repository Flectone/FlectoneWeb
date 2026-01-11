import { useTranslations } from "next-intl";
import Metric from "../Metric/Metric";

export default function Metrics() {
  const t = useTranslations('Pulse.Metrics');
  return (
    <div className='flex flex-col gap-3 justify-center items-center w-full'>
      <h1 className='text-2xl w-fit text-center font-bold border-b border-fd-foreground px-4 pb-2'>{t('title')}</h1>
      <Metric
        className="backdrop-blur-2xl py-4 bg-linear-to-br from-fd-primary/10"
        type="two-line"
        data={{
          first: { name: t('playersCount'), apiPath: 'playerCount' },
          second: { name: t('serversCount'), apiPath: 'serverCount' }
        }}
      />
    </div>
  )
}