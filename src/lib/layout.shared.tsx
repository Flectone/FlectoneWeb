import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { SiModrinth, SiDiscord, SiBoosty } from "react-icons/si";
import Image from "next/image";
import { i18n } from '@/i18n/i18n';
import { uiTranslations } from 'fumadocs-ui/i18n';

export const translations = i18n
    .translations()
    .extend(uiTranslations())
    .add({
        ru: {
            displayName: 'Русский',
            'Search(search trigger)': 'Поиск',
            "Choose a language(language switcher)": 'Выбрать язык',
            "Choose a language(language switcher)(aria-label)": 'Выбрать язык',
            "On this page(table of contents)": 'На этой странице',
            "Last updated on(page footer)": 'Последнее обновление',
            "Edit on GitHub(edit page)": 'Редактировать на GitHub',
            "Next Page(pagination)": 'Следующая страница',
            "Previous Page(pagination)": 'Предыдущая страница',
            "Search(search dialog)": 'Поиск',
            "No results found(search dialog)": 'Ничего не найдено',

        },
        en: {
            displayName: 'English',
            'Search(search trigger)': 'Search',
        }
    })

export function baseOptions(title?: string, url?: string): BaseLayoutProps {
    return {
        nav: {
            title: <h1 className='flex justify-center items-center'><Image src="/assets/flectone_logo.png" alt="Flectone Logo" width={64} height={64} className='w-6 h-6 mr-1' />{title ? title : 'Flectone'}</h1>,
            url: url ? url : '/'
        },
        i18n: true,
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