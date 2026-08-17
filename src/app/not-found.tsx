import { Geist, Geist_Mono, Inter } from "next/font/google"
import { useTranslations } from "next-intl"
import "./globals.css"
import { RootProvider } from "fumadocs-ui/provider/next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import Container from "@/components/shared/container"
import PageTemplate from "@/components/shared/page-template"
import LayoutTemplate from "@/components/shared/layout-template"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function NotFound() {
  const t = useTranslations("NotFound")
  return (
    <html
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="">
        <RootProvider>
          <LayoutTemplate>
            <PageTemplate>
              <Container className="flex flex-col gap-2">
                <h1 className="text-6xl font-bold">{t("title")}</h1>
                <p>{t("description")}</p>
                <Link className="mt-2" href={"/"}>
                  <Button variant={"secondary"}>{t("button")}</Button>
                </Link>
              </Container>
            </PageTemplate>
          </LayoutTemplate>
        </RootProvider>
      </body>
    </html>
  )
}
