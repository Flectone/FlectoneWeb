import Container from "@/components/shared/container"
import PageTemplate from "@/components/shared/page-template"
import ThemeImage from "@/components/shared/theme-image"
import { Button } from "@/components/ui/button"
import { createMetadata } from "@/lib/create-metadata"
import { useTranslations } from "next-intl"
import Link from "next/link"
import { SiBoosty, SiGithub } from "react-icons/si"

export const generateMetadata = createMetadata({
  namespace: "Mix",
})

export default function MixPage() {
  const t = useTranslations("FlectoneMix")
  return (
    <PageTemplate className="flex w-full max-w-6xl flex-col justify-center py-4 max-xl:items-center">
      <div className="flex gap-6 max-xl:flex-col">
        <Container className="flex w-2/5 flex-col justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              Flectone<b>Mix</b>
            </h1>
            <p>{t("description")}</p>
            <h2 className="my-1.5">
              <strong className="text-xl font-bold">65138</strong>{" "}
              {t("downloads")}
            </h2>
          </div>
          <div className="flex justify-start gap-2 max-lg:mt-2 xl:flex-col">
            <Link href="https://github.com/Flectone/FlectoneMix">
              <Button variant={"secondary"} size={"sm"}>
                <SiGithub className="mr-1" size={"16px"} />
                GitHub
              </Button>
            </Link>
            <Link href="https://boosty.to/thefaser/">
              <Button variant={"secondary"} size={"sm"}>
                <SiBoosty className="mr-1" size={"16px"} />
                {t("availableOnBoosty")}
              </Button>
            </Link>
          </div>
        </Container>
        <Container className="w-full">
          <ThemeImage
            width={1000}
            height={400}
            alt="flectonemix"
            src="/assets/flectonemix/flectonemix_preview.webp"
            className="w-full rounded-md border"
          />
        </Container>
      </div>
    </PageTemplate>
  )
}
