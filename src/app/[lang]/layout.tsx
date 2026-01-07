import { RootProvider } from 'fumadocs-ui/provider/next';
import '../globals.css';
import { Inter } from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';

const inter = Inter({
  subsets: ['latin'],
});

const languageNames = {
    ru: {
        ru: 'Русский',
        en: 'Английский'
    },
    en: {
        ru: 'Russian',
        en: 'English'
    }
};

const myTranslations = {
    ru: {
        chooseLanguage: 'Выбрать язык',
        toc: 'На этой странице',
        search: 'Поиск',
        lastUpdate: 'Последнее обновление',
        editOnGithub: 'Редактировать на GitHub',
        nextPage: 'Следующая страница',
        previousPage: 'Предыдущая страница'
    }
};

export default async function Layout({ params, children }: {
    params: Promise<{ lang: string }>;
    children: React.ReactNode
}) {
    const { lang } = await params;

    const currentLang = (lang === 'ru' || lang === 'en' ? lang : 'en') as 'ru' | 'en';

    const localeNames = [
        {
            name: languageNames[currentLang].ru,
            locale: 'ru'
        },
        {
            name: languageNames[currentLang].en,
            locale: 'en'
        }
    ];
    return (
      <html className={inter.className} suppressHydrationWarning>
          <body className="flex flex-col min-h-screen">
              <NextIntlClientProvider>
                  <RootProvider
                      i18n={{
                          locale: lang,
                          locales: localeNames,
                          translations: myTranslations[lang as keyof typeof myTranslations]
                      }}
                  >
                      {children}
                  </RootProvider>
              </NextIntlClientProvider>
          </body>
      </html>
    );
}
