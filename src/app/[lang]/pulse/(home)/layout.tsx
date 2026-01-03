import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { SiBoosty, SiDiscord, SiModrinth } from 'react-icons/si';
import Image from "next/image";
import LanguageButton from "@/components/Button/LanguageButton";

export default function Layout({ children }: LayoutProps<'/[lang]/pulse'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      nav={{
          title: <h1 className='flex justify-center items-center'><Image src="/logo.png" alt="Flectone Logo" width={64} height={64} className='w-6 h-6 mr-1' /> FlectonePulse</h1>,
          url: '/pulse',
          children: <LanguageButton />
      }}
      links={[
        {
          text: 'Документация',
          url: '/pulse/docs',
          secondary: false,
        },
        {
          text: 'API',
          url: '/pulse/docs/api',
          secondary: false,
        },
        {
          text: 'Аналитика',
          url: '/pulse/metrics',
          secondary: false,
        },
        {
          type: 'icon',
          icon: <SiBoosty />,
          text: 'Boosty',
          url: 'https://boosty.to/thefaser',
          secondary: true,
        },
        {
          type: 'icon',
          icon: <SiModrinth />,
          text: 'Modrinth',
          url: 'https://modrinth.com/plugin/flectonepulse',
          secondary: true,
        },
        {
          type: 'icon',
          icon: <SiDiscord />,
          text: 'Discord',
          url: 'https://discord.flectone.net/',
          secondary: true,
        }
      ]}
    >
      <div className='flex justify-center max-xl:px-24 max-lg:px-12 max-sm:px-4'>
        {children}
      </div>
    </ HomeLayout>)
}
