import Members from "@/components/Content/Members";
import Title from "@/components/Title/Title";
import { useTranslations } from "next-intl";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
  namespace: 'About'
});

export default function Home() {
  const t = useTranslations();

  return (
    <div className="flex py-6 w-full max-w-6xl flex-col justify-center max-xl:items-center gap-4">
      <Title text={t.rich('Members.title', { b: (chunks) => <b>{chunks}</b> })} />
      <Members />
    </div>
  );
}
