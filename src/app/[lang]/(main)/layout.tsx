import {HomeLayout} from 'fumadocs-ui/layouts/home';
import {baseOptions} from '@/lib/layout.shared';
import {SiBoosty, SiDiscord, SiModrinth} from 'react-icons/si';
import {useTranslations} from "next-intl";
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from 'fumadocs-ui/layouts/home/navbar';

export default function Layout({children}: LayoutProps<'/[lang]'>) {

  const t = useTranslations('')

  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          text: t('Header.about'),
          url: '/about',
          secondary: false,
        },
        {
          type: 'icon',
          icon: <SiBoosty/>,
          text: 'Boosty',
          url: 'https://boosty.to/thefaser',
          secondary: true,
        },
        {
          type: 'icon',
          icon: <SiModrinth/>,
          text: 'Modrinth',
          url: 'https://modrinth.com/plugin/flectonepulse',
          secondary: true,
        },
        {
          type: 'icon',
          icon: <SiDiscord/>,
          text: 'Discord',
          url: 'https://discord.flectone.net/',
          secondary: true,
        }
      ]}
    >
      <div
        className='flex justify-center min-h-[calc(100vh-56px)] items-center max-xl:px-24 max-lg:px-12 max-sm:px-4'
      >
        {children}
      </div>
    </ HomeLayout>)
}
