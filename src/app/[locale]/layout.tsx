import { Geist, Geist_Mono, Inter } from "next/font/google"
import { NextIntlClientProvider } from "next-intl"
import "../globals.css"
import "lucide-static/font/lucide.css"
import { ThemeProvider } from "@/components/theme-provider"
import { RootProvider } from "fumadocs-ui/provider/next"
import { cn } from "@/lib/utils"
import { translations } from "@/lib/layout.shared"
import { i18nProvider } from "fumadocs-ui/i18n"
import SearchComponent from "@/components/features/search-component"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default async function RootLayout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>
  children: React.ReactNode
}) {
  const { locale } = await params

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <NextIntlClientProvider>
          <ThemeProvider>
            <RootProvider
              search={{
                SearchDialog: SearchComponent,
              }}
              i18n={i18nProvider(translations, locale)}
            >
              {children}
            </RootProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
