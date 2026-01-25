import Members from "@/components/Content/Members";
import { getTranslations } from 'next-intl/server';
import Title from "@/components/Title/Title";
import {useTranslations} from "next-intl";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Metadata.About' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale,
    }
  };
}
export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex py-6 w-full max-w-6xl flex-col justify-center max-xl:items-center gap-4">
      <Title text={t.rich('Members.title', {b: (chunks) => <b>{chunks}</b>})}/>
      <Members/>
    </div>
  );
}
