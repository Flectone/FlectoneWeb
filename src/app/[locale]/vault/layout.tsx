import Footer from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import LayoutTemplate from "@/components/shared/layout-template"
import { Toaster } from "@/components/ui/toast"
import { getTranslations } from "next-intl/server"

export default async function FlectoneVaultLayout({
  children,
}: LayoutProps<"/[locale]/tools">) {
  const t = await getTranslations("Main.HeaderLinks")
  return (
    <LayoutTemplate>
      <Header
        title={["FlectoneTools", "/"]}
        links={[
          { label: t("pulse"), href: "/pulse" },
          { label: t("tools"), href: "/tools" },
          { label: t("vault"), href: "/vault" },
        ]}
      />
      {children}
      <Footer />
      <Toaster />
    </LayoutTemplate>
  )
}
