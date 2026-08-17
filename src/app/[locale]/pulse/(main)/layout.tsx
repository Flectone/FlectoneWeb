import Footer from "@/components/shared/footer"
import { Header } from "@/components/shared/header"
import LayoutTemplate from "@/components/shared/layout-template"
import { getTranslations } from "next-intl/server"

export default async function Layout({
  children,
}: LayoutProps<"/[locale]/pulse">) {
  const t = await getTranslations("FlectonePulse.HeaderLinks")
  return (
    <LayoutTemplate>
      <Header
        title={["FlectonePulse", "/"]}
        links={[
          { label: t("documentation"), href: "/pulse/docs" },
          { label: t("analytics"), href: "/pulse/metrics" },
          { label: t("changelog"), href: "/pulse/changelog" },
          { label: t("download"), href: "/pulse#download" },
        ]}
      />
      {children}
      <Footer />
    </LayoutTemplate>
  )
}
