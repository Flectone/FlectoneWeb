import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { SiBoosty, SiDiscord, SiModrinth } from 'react-icons/si';

export default function Layout({ children }: LayoutProps<'/[lang]/pulse'>) {
  return (
    <HomeLayout
      {...baseOptions()}
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
