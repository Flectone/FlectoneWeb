import Members from "@/components/Content/Members";
import GithubCard from "@/components/Card/GithubCard";
import {useTranslations} from "next-intl";

export default function Home() {
  const t = useTranslations('Members')
  return (
    <div className="flex py-4 w-full max-w-6xl flex-col justify-center max-xl:items-center">
      <Members/>
    </div>
  );
}
