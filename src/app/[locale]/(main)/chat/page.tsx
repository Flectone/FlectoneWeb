import { createMetadata } from "@/lib/create-metadata"
import Container from "@/components/shared/container"
import PageTemplate from "@/components/shared/page-template"
import ThemeImage from "@/components/shared/theme-image"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { SiGithub, SiModrinth } from "react-icons/si"

export const generateMetadata = createMetadata({
  namespace: "Chat",
  path: "/chat",
})

export default function ChatPage() {
  const t = useTranslations("FlectoneChat")
  return (
    <PageTemplate>
      <div className="flex gap-6 max-xl:flex-col">
        <Container className="flex w-2/5 flex-col justify-between max-xl:w-full">
          <div>
            <h1 className="text-2xl font-bold">
              Flectone<b>Chat</b>
            </h1>
            <p>{t("description")}</p>
            <h2 className="my-4">
              {t.rich("usePulse", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </h2>
          </div>
          <div className="flex justify-start gap-2 max-lg:mt-2 xl:flex-col">
            <Link href="https://modrinth.com/plugin/flectonepulse">
              <Button variant={"secondary"} size={"sm"}>
                <SiModrinth className="mr-1" size={"16px"} />
                FlectonePulse
              </Button>
            </Link>
            <Link href="https://github.com/Flectone/FlectoneChat">
              <Button variant={"secondary"} size={"sm"}>
                <SiGithub className="mr-1" size={"16px"} />
                GitHub
              </Button>
            </Link>
          </div>
        </Container>
        <Container className="w-full">
          <ThemeImage
            width={1000}
            height={400}
            alt="flectonechat"
            src={t("imagePath")}
            className="rounded-md border-[0.5px]"
          />
        </Container>
      </div>
    </PageTemplate>
  )
}
