import {RootProvider} from 'fumadocs-ui/provider/next';
import '../globals.css';
import 'lucide-static/font/lucide.css';
import {Inter} from 'next/font/google';
import {NextIntlClientProvider} from 'next-intl';
import {source} from "@/lib/source";
import { translations } from '@/lib/layout.shared';
import { i18nProvider } from 'fumadocs-ui/i18n';
import SearchComponent from "@/components/Search/SearchComponent";

const inter = Inter({
  subsets: ['latin'],
});

export async function generateStaticParams() {
  return source.generateParams();
}

export default async function Layout({params, children}: {
  params: Promise<{ lang: string }>;
  children: React.ReactNode
}) {
  const {lang} = await params;

  return (
    <html className={inter.className} suppressHydrationWarning>
    <body className="flex flex-col min-h-screen">
    <NextIntlClientProvider>
      <RootProvider
        search={{
          SearchDialog: SearchComponent,
        }}
        i18n={i18nProvider(translations, lang)}
      >
        {children}
      </RootProvider>
    </NextIntlClientProvider>
    </body>
    </html>
  );
}
