import Members from "@/components/Content/Members";
import GithubCard from "@/components/Card/GithubCard";
import {useTranslations} from "next-intl";

export default function Home() {
  const t = useTranslations('Members')
  return (
    <div className="w-6xl py-4">
      <Members/>
    </div>
  );
}
