import GithubCard from "../Card/GithubCard";
import { useTranslations } from "next-intl";
export default function Members() {
    const t = useTranslations("Members")
    return (
        <div className="mt-6">
            <div className="flex w-full justify-center items-center mb-6">
                <h1 className="font-extrabold text-4xl text-center">{t.rich('title', {b: (chunks) => <b>{chunks}</b>})}</h1>
            </div>
            <div className="w-2xl max-md:w-full">
                <GithubCard link={t('TheFaser.link')} name={t('TheFaser.name')} description={t('TheFaser.description')} avatar={t('TheFaser.avatar')} />
                <GithubCard link={t('FunnyBars.link')} name={t('FunnyBars.name')} description={t('FunnyBars.description')} avatar={t('FunnyBars.avatar')} />
                <GithubCard link={t('fxdsu.link')} name={t('fxdsu.name')} description={t('fxdsu.description')} avatar={t('fxdsu.avatar')} />
                <GithubCard link={t('vplend.link')} name={t('vplend.name')} description={t('vplend.description')} avatar={t('vplend.avatar')} />
            </div>
        </div>

    )
}