import { useTranslations } from "next-intl"
import './globals.css';
import { RootProvider } from "fumadocs-ui/provider/next";
import LinkButton from "@/components/Button/LinkButton";

export default function NotFound() {
    const t = useTranslations("NotFound");
    return (
        <html suppressHydrationWarning>
            <body>
                <RootProvider>
                    <div className="flex flex-col w-screen h-screen items-center justify-center gap-4">
                        <div className="max-md:w-sm max-sm:w-xs border bg-fd-card w-md h-fit p-4 gap-2 flex flex-col justify-center items-center rounded-2xl shadow-md">
                            <h1 className="text-6xl font-bold">{t("title")}</h1>
                            <p className="text-fd-muted text-lg">{t("description")}</p>
                        </div>
                        <LinkButton href="/" mode="gray" className="w-md max-sm:w-xs max-md:w-sm justify-center">{t("button")}</LinkButton>
                    </div>
                </RootProvider>
            </body>
        </html>

    )
}