import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'next/og';
import { generate as DefaultImage } from 'fumadocs-ui/og';

interface RouteContext {
  params: Promise<{ slug: string[] }>;
}

export async function GET(req: Request, { params }: RouteContext) {
  const { slug } = await params;

  const [locale, ...pageSlugs] = slug;
  const actualSlugs = pageSlugs.slice(0, -1);

  const page = source.getPage(actualSlugs, locale);
  if (!page) notFound();

  return new ImageResponse(
    <DefaultImage
      title={page.data.title}
      description={page.data.description}
      site="FlectonePulse"
      primaryTextColor='#72C1F3'
      primaryColor='#083D5E'
    />,
    {
      width: 1200,
      height: 630,
    }
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: [page.locale ?? 'en', ...page.slugs, 'image.png'],
  }));
}