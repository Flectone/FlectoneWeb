import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"
import Container from "@/components/shared/container"
import PageTemplate from "@/components/shared/page-template"
import LayoutTemplate from "@/components/shared/layout-template"

export default function LocaleNotFound() {
  const t = useTranslations("NotFound")

  return (
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
  )
}
