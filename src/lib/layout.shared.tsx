import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SiModrinth, SiDiscord, SiBoosty } from "react-icons/si";
import Image from 'next/image';
import LanguageButton from "@/components/Button/LanguageButton";

export function baseOptions(): BaseLayoutProps {
    return {
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