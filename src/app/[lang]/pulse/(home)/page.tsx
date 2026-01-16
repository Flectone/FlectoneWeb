import Structure from '@/components/Pulse/Structure';
import Feautures from '@/components/Pulse/Features';
import WelcomeCard from '@/components/Pulse/WelcomeCard';
import { getTranslations } from "next-intl/server";
import Metrics from '@/components/Pulse/Metrics';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Metadata.Pulse' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
    }
  };
}

export default function HomePage() {
  return (
    <div className="my-4 w-full max-w-6xl flex gap-8 flex-col justify-start items-center text-center">
      <WelcomeCard />
      <Feautures />
      <Structure />
      <Metrics />
    </div>
  );
}
