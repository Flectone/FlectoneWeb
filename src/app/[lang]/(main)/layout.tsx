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
import Svg from "@/components/Svg/Svg";

export default function Layout({children}: LayoutProps<'/[lang]'>) {

  const t = useTranslations('')

  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          type: 'custom',
          on: 'nav',
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>{t('Header.Projects.title')}</NavbarMenuTrigger>
              <NavbarMenuContent>
                <NavbarMenuLink href="/pulse" className='p-8'>
                  <h1 className="font-medium text-xl">FlectonePulse</h1>
                  <p>{t('Projects.Pulse.description')}</p>
                </NavbarMenuLink>
                <NavbarMenuLink href="/mix" className='p-8'>
                  <h1 className="font-medium text-xl">FlectoneMix</h1>
                  <p>{t('Projects.Mix.description')}</p>
                </NavbarMenuLink>
                <NavbarMenuLink href="/pulse" className='p-8'>
                  <h1 className="font-medium text-xl">FlectonePulse</h1>
                  <p>{t('Projects.Pulse.description')}</p>
                </NavbarMenuLink>
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
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
        className='bg-size-[3rem] bg- bg-[url(/square.svg)] not-dark:bg-[url(/squaredark.svg)] flex justify-center min-h-[calc(100vh-56px)] flex items-center max-xl:px-24 max-lg:px-12 max-sm:px-4'
      >
        {children}
      </div>
    </ HomeLayout>)
}
