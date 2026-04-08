import { useTranslations } from 'next-intl';
import { SiModrinth, SiSpigotmc, SiBuiltbybit, SiCurseforge } from 'react-icons/si';
import { FaCode } from "react-icons/fa";
import { TbBrandGithubFilled } from "react-icons/tb";
import { BsHexagonFill } from "react-icons/bs";
import DownloadCard from '@/components/Card/DownloadCard';
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'Metadata.Pulse.Download' });

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
  const t = useTranslations('Pulse.Download')
  return (
    <div className="my-4 w-full max-w-6xl flex gap-8 flex-col justify-center items-center text-center">
      <img className='w-102' src="/flectonepulse2.png" alt="" />
      <div className='w-full flex gap-4 max-lg:flex-col'>
        <div className='bg-fd-card shadow-xl w-full h-fit border border-fd-border/50 rounded-2xl p-4 gap-2 flex flex-col justify-center items-center'>
          <img className='w-2/3 h-26 my-2' src="https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/logos/Global-Header_MCCB-Logo_300x51.svg" alt="" />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://builtbybit.com/resources/flectonepulse.59937/' icon={<SiBuiltbybit color='var(--color-indigo-600)' size={2.3 + 'em'} />} name='BuilByBit' />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://www.curseforge.com/minecraft/bukkit-plugins/flectonepulse' icon={<SiCurseforge color='var(--color-gray-600)' size={2.3 + 'em'} />} name='CurseForge' />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://github.com/Flectone/FlectonePulse/releases/' icon={<TbBrandGithubFilled color='' size={2.3 + 'em'} />} name='Github' />
          <DownloadCard button={t('download')} release={t('devbuilds')} link='https://github.com/Flectone/FlectonePulse/actions' icon={<FaCode color='' size={2.3 + 'em'} />} name='Github Actions' />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://hangar.papermc.io/TheFaser/FlectonePulse' icon={<img className='size-[2.3em]' src='https://hangar.papermc.io/favicon/favicon-32x32.png' />} name='Hangar' />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://modrinth.com/plugin/flectonepulse' icon={<SiModrinth color='var(--color-fd-green)' size={2.3 + 'em'} />} name='Modrinth' />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://www.spigotmc.org/resources/flectonepulse.121618/' icon={<SiSpigotmc color='var(--color-fd-orange)' size={2.3 + 'em'} />} name='Spigot' />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://spigotmc.ru/resources/flectonepulse.2912/' icon={<SiSpigotmc color='var(--color-fd-orange)' size={2.3 + 'em'} />} name='SpigotRU' />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://polymart.org/resource/flectonepulse.7203' icon={<img className='size-[2.3em]' src='https://images.polymart.org/assets/icon/96.png' />} name='Polymart' />
        </div>
        <div className='bg-fd-card shadow-xl w-full h-fit border border-fd-border/50 rounded-2xl p-4 gap-2 flex flex-col justify-center items-center'>
          <img className='h-26 my-2' src="https://hytale.com/images/logo.webp" alt="" />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://curseforge.com/hytale/mods/flectonepulse' icon={<SiCurseforge color='var(--color-gray-600)' size={2.3 + 'em'} />} name='CurseForge' />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://modtale.net/mod/flectonepulse-hytale-edition-83535d1b-4837-4b01-9fd5-8307f3c007b5' icon={<BsHexagonFill color='var(--color-sky-800)' size={2.3 + 'em'} />} name='ModTale' />
          <DownloadCard button={t('download')} release={t('latestrelease')} link='https://spigotmc.ru/resources/flectonepulse-hytale-edition.4938/' icon={<SiSpigotmc color='var(--color-fd-orange)' size={2.3 + 'em'} />} name='SpigotRU' />
        </div>
      </div>
    </div>
  );
}
