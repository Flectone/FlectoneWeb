import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { Authors } from '@/components/Pulse/Authos';
import EditOnGitHub from '@/components/Pulse/EditOnGitHub'
import gitDates from '@/pulse/git-dates.json';
import LastUpdate from '@/components/Pulse/LastUpdate';

export default async function Page(props: PageProps<'/[lang]/pulse/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);

  if (!page) notFound();

  const filePath = `src/pulse/content/docs/${page.path}`;
  const lastModified = getGitLastModified(filePath);

  const MDX = page.data.body;
  const filteredToc = page.data.toc.filter((item) => item.depth <= 3);
  return (
    <DocsPage toc={filteredToc}
      tableOfContent={{

        footer: page.data.authors ? (
          <Authors ids={page.data.authors} />
        ) : null
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className='!mb-0'>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
        <div className='flex justify-between items-center'>
          {lastModified && <LastUpdate date={lastModified} />}
          <EditOnGitHub
              href={`https://github.com/Flectone/FlectoneWeb/edit/master/${filePath}`}
          />
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export function getGitLastModified(filePath: string): Date | null {
  const iso = (gitDates as Record<string, string>)[filePath];
  return iso ? new Date(iso) : null;
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/[lang]/pulse/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();

  return {
    title: page.data.title + " | FlectonePulse",
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
