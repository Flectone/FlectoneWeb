import Projects from "@/components/Content/Projects";
import { getTranslations } from 'next-intl/server';

type Props = {
  params: Promise<{ locale: string }>;
};
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Metadata.Root' });

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

export default function Home() {
  return (
    <div className="flex py-4 w-full max-w-6xl flex-col justify-center max-xl:items-center">
      <Projects />
    </div>
  );
}
