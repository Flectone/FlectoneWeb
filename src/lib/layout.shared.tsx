import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SiModrinth, SiDiscord, SiBoosty } from "react-icons/si";
import LanguageButton from "@/components/Button/LanguageButton";
import Image from "next/image";

export function baseOptions(): BaseLayoutProps {
    return {
        nav: {
            title: <h1 className='flex justify-center items-center'><Image src="/logo.png" alt="Flectone Logo" width={64} height={64} className='w-6 h-6 mr-1' />Flectone</h1>,
            url: '/',
            children: <LanguageButton />
        },
        links: [
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
        ],
        githubUrl: 'https://github.com/Flectone/flectonePulse',
    };
}