import Projects from "@/components/Content/Projects";
import { useTranslations } from "next-intl";
import Title from "@/components/Title/Title";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
  namespace: 'Root'
});

export default function Home() {

  const t = useTranslations()

  return (
    <div className="flex w-full py-6 max-w-6xl gap-4 flex-col justify-center max-xl:items-center">
      <Title text={t.rich('Projects.title', { b: (chunks) => <b>{chunks}</b> })} />
      <Projects />
    </div>
  );
}
