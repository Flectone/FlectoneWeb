import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from '@takumi-rs/image-response';
import { generate as DefaultImage } from 'fumadocs-ui/og';
import DocsTemplate from '@/components/OGImage/DocsTemplate'
import {MessageCircleCode} from 'lucide-react'

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
    <DocsTemplate
      title={page.data.title}
      description={page.data.description}
      icon={<MessageCircleCode color="hsl(210, 100%, 65%)" size={64} />}
      pageIcon={page.data.icon ? page.data.icon : null}
      primaryColor="hsla(210, 100%, 65%, 0.6)"
      primaryTextColor="hsl(210, 100%, 65%)"
      site="FlectonePulse"
      mutedPrimaryColor='hsla(210, 100%, 65%, 0.2)'
    />,
    {
      width: 1200,
      height: 630,
      format: "webp",
    },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: [page.locale ?? 'en', ...page.slugs, 'image.webp'],
  }));
}