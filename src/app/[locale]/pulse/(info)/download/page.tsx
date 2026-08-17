import { redirect } from "next/navigation"

export default async function DownloadPage({
  params,
}: PageProps<"/[locale]/pulse/download">) {
  const { locale } = await params

  redirect(`/${locale}/pulse#download`)
}
