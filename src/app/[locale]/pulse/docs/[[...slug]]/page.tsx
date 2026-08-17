import { source } from "@/lib/source"
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page"
import { notFound } from "next/navigation"
import { getMDXComponents } from "@/components/shared/mdx-components"
import type { Metadata } from "next"
import { createRelativeLink } from "fumadocs-ui/mdx"
import { getPageImage } from "@/lib/source"
import LastUpdate from "./_components/last-update"
import gitDates from "@/pulse/git-dates.json"
import EditOnGitHub from "./_components/edit-on-github"
import { Authors } from "./_components/authors"

export function getGitLastModified(filePath: string): Date | null {
  const iso = (gitDates as Record<string, string>)[filePath]
  return iso ? new Date(iso) : null
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug?: string[] }>
}) {
  const { slug, locale } = await params
  const page = source.getPage(slug, locale)
  if (!page) notFound()

  const filePath = `src/pulse/content/docs/${page.path}`
  const lastModified = getGitLastModified(filePath)

  const MDX = page.data.body

  const filteredToc = page.data.toc.filter((item) => item.depth <= 3)
  return (
    <DocsPage
      toc={filteredToc}
      tableOfContent={{
        footer: page.data.authors ? <Authors ids={page.data.authors} /> : null,
      }}
      className="mt-6 mb-5 rounded-xl border bg-article px-6! py-8! max-sm:border-0 max-sm:bg-background max-sm:px-4! max-sm:py-2!"
    >
      <div className="border-b">
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription className="mb-3!">
          {page.data.description}
        </DocsDescription>
      </div>

      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
      <div className="bottom-0 flex items-center justify-between">
        {lastModified && <LastUpdate date={lastModified} />}
        <EditOnGitHub
          href={`https://github.com/Flectone/FlectoneWeb/edit/master/${filePath}`}
        />
      </div>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams("slug", "locale")
}

export async function generateMetadata(
  props: PageProps<"/[locale]/pulse/docs/[[...slug]]">
): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug, params.locale)
  if (!page) notFound()

  return {
    title: page.data.title + " | FlectonePulse",
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  }
}
