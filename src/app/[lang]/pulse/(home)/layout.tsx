import { HomeLayout } from "fumadocs-ui/layouts/home";
import {
  NavbarMenu,
  NavbarMenuContent,
  NavbarMenuLink,
  NavbarMenuTrigger,
} from "fumadocs-ui/layouts/home/navbar";
import NavbarCard from "@/components/Card/NavbarCard";
import { baseOptions } from "@/lib/layout.shared";
import { SiBoosty, SiDiscord, SiModrinth } from "react-icons/si";
import { useTranslations } from "next-intl";
import Footer from "@/components/Footer/Footer";

export default function Layout({ children }: LayoutProps<"/[lang]/pulse">) {
  const t = useTranslations("Pulse");

  return (
    <HomeLayout
      {...baseOptions("FlectonePulse", "/")}
      links={[
        {
          type: "custom",
          on: "nav",
          children: (
            <NavbarMenu>
              <NavbarMenuTrigger>
                {t("Buttons.documentation")}
              </NavbarMenuTrigger>
              <NavbarMenuContent className="flex">
                <NavbarCard
                  title={t("Navbar.Minecraft.name")}
                  description={t("Navbar.Minecraft.description")}
                  icon="pickaxe"
                  href="/pulse/docs"
                />
                <NavbarCard
                  title={t("Navbar.Hytale.name")}
                  description={t("Navbar.Hytale.description")}
                  icon="leaf"
                  href="/pulse/docs/hytale"
                />
                <NavbarCard
                  title={t("Navbar.Api.name")}
                  description={t("Navbar.Api.description")}
                  icon="cable"
                  href="/pulse/docs/api"
                />
                <NavbarCard
                  title={t("Navbar.Metrics.name")}
                  description={t("Navbar.Metrics.description")}
                  icon="chart-candlestick"
                  href="/pulse/docs/metrics"
                />
                <NavbarCard
                  title={t("Navbar.Changelog.name")}
                  description={t("Navbar.Changelog.description")}
                  icon="arrow-down-up"
                  href="/pulse/docs/changelog"
                />
              </NavbarMenuContent>
            </NavbarMenu>
          ),
        },
        {
          text: "API",
          url: "/pulse/docs/api",
          secondary: false,
        },
        {
          text: t("Buttons.metrics"),
          url: "/pulse/docs/metrics",
          secondary: false,
        },
        {
          type: "icon",
          icon: <SiBoosty />,
          text: "Boosty",
          url: "https://boosty.to/thefaser",
          secondary: true,
        },
        {
          type: "icon",
          icon: <SiModrinth />,
          text: "Modrinth",
          url: "https://modrinth.com/plugin/flectonepulse",
          secondary: true,
        },
        {
          type: "icon",
          icon: <SiDiscord />,
          text: "Discord",
          url: "https://discord.flectone.net/",
          secondary: true,
        },
      ]}
    >
      <div className=" min-h-[calc(100vh-56px)]  flex justify-center max-xl:px-24 max-lg:px-12 max-sm:px-4">
        {children}
      </div>
      <Footer />
    </HomeLayout>
  );
}
