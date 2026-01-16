import Projects from "@/components/Content/Projects";
import { getTranslations } from 'next-intl/server';
import {useTranslations} from "next-intl";
import Title from "@/components/Title/Title";

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

  const t = useTranslations()

  return (
    <div className="flex w-full py-6 max-w-6xl gap-4 flex-col justify-center max-xl:items-center">
      <Title text={t.rich('Projects.title', {b: (chunks) => <b>{chunks}</b>})}/>
      <Projects />
    </div>
  );
}
