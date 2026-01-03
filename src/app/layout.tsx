import { RootProvider } from 'fumadocs-ui/provider/next';
import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from "react";
import {NextIntlClientProvider, hasLocale} from 'next-intl';

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
    return (
      <html className={inter.className} suppressHydrationWarning>
          <body className="flex flex-col min-h-screen">
              <NextIntlClientProvider>
                  <RootProvider>
                      {children}
                  </RootProvider>
              </NextIntlClientProvider>
          </body>
      </html>
    );
}
