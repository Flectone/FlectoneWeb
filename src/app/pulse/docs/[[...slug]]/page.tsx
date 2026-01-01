import { getPageImage, source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  EditOnGitHub,
  PageLastUpdate,
} from 'fumadocs-ui/layouts/docs/page';
import { notFound } from 'next/navigation';
import { getMDXComponents } from '@/mdx-components';
import type { Metadata } from 'next';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { Authors } from '@/components/Pulse/Authos';

export default async function Page(props: PageProps<'/pulse/docs/[[...slug]]'>) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) notFound();
  const path = page.path;
  const MDX = page.data.body;
  console.log(page.data.authors)
  return (
    <DocsPage toc={page.data.toc}
      tableOfContent={{
        footer: page.data.authors ? (
          <Authors ids={page.data.authors} />
        ) : null
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
        <div className='flex justify-between items-center'>
          {page.data.lastModified && (
            <PageLastUpdate date={page.data.lastModified} />
          )}
          <EditOnGitHub
            href={`https://github.com/Flectone/FlectoneWeb/edit/master/src/content/docs/${page.path}`}
          >
            Редактировать на GitHub
          </EditOnGitHub>
        </div>
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<'/pulse/docs/[[...slug]]'>,
): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: getPageImage(page).url,
    },
  };
}
