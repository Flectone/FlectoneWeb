import GithubCard from "../Card/GithubCard";
import { useTranslations } from "next-intl";
export default function Members() {
    const t = useTranslations("Members")
    return (
      <div className="w-full flex-col flex gap-4">
        <h1 className='font-bold text-4xl'>{t.rich('title', {b: (chunks) => <b>{chunks}</b>})}</h1>
        <div className="flex gap-4 max-sm:flex-col">
          <GithubCard link={t('TheFaser.link')} name={t('TheFaser.name')} description={t('TheFaser.description')} avatar={t('TheFaser.avatar')} />
          <GithubCard link={t('FunnyBars.link')} name={t('FunnyBars.name')} description={t('FunnyBars.description')} avatar={t('FunnyBars.avatar')} />
        </div>
        <div className="flex gap-4 max-sm:flex-col">
          <GithubCard link={t('fxdsu.link')} name={t('fxdsu.name')} description={t('fxdsu.description')} avatar={t('fxdsu.avatar')} />
          <GithubCard link={t('vplend.link')} name={t('vplend.name')} description={t('vplend.description')} avatar={t('vplend.avatar')} />
        </div>
      </div>

    )
}