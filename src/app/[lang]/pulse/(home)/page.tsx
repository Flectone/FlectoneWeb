import Feautures from '@/components/Pulse/Features';
import WelcomeCard from '@/components/Pulse/WelcomeCard';
import { createMetadata } from "@/lib/create-metadata";
import Metric from "@/components/Metric/Metric";
import {useTranslations} from "next-intl";

export const generateMetadata = createMetadata({
  namespace: 'Pulse'
});

export default function HomePage() {
  const t = useTranslations('Pulse.Metrics');

  return (
    <div className="my-4 w-full max-w-6xl flex gap-8 flex-col justify-start items-center text-center">
      <WelcomeCard />
      <Feautures />
      <div className='flex flex-col gap-3 justify-center items-center w-full'>
        <Metric
          className="backdrop-blur-2xl py-4 bg-fd-card"
          slice={true}
          type="two-line"
          data={{
              first: { name: t('serversCount'), apiPath: 'serverCount' },
              second: { name: t('playersCount'), apiPath: 'playerCount' }
          }}
        />
      </div>
    </div>
  );
}
