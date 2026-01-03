import { RootProvider } from 'fumadocs-ui/provider/next';
import '../globals.css';
import { Inter } from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import { defineI18nUI } from "fumadocs-ui/i18n";
import {i18n} from "@/lib/i18n";

const inter = Inter({
  subsets: ['latin'],
});

const { provider } = defineI18nUI(i18n, {
    translations: {
        ru: {
            toc: 'На этой странице',
            search: 'Поиск',
            lastUpdate: 'Последнее обновление',
            editOnGithub: 'Редактировать на GitHub',
        }
    },
});

export default async function Layout({ params, children }: {
    params: Promise<{ lang: string }>;
    children: React.ReactNode
}) {
    const { lang } = await params;

    return (
      <html className={inter.className} suppressHydrationWarning>
          <body className="flex flex-col min-h-screen">
              <NextIntlClientProvider>
                  <RootProvider i18n={provider(lang)}>
                      {children}
                  </RootProvider>
              </NextIntlClientProvider>
          </body>
      </html>
    );
}
