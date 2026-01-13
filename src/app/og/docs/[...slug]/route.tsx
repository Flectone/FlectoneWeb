import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from '@takumi-rs/image-response';
import DocsTemplate from '@/components/OGImage/DocsTemplate'
import {MessageCircleCode} from 'lucide-react'

interface RouteContext {
  params: Promise<{ slug: string[] }>;
}

const PAGE_ICON_MAP: Record<string, string | null> = {
  undefined: 'CircleQuestionMark',
  command: 'SquareTerminal',
  message: 'MessageSquare',
  integration: 'Blocks',
  config: 'FileSliders',
  api: 'Cable',
  metrics: 'ChartCandlestick',
};

const getPageIconName = (url: string): string | null => {
  const segments = url.split('/');
  const segment = segments[4];

  return PAGE_ICON_MAP[segment] || null;
};

export async function GET(req: Request, { params }: RouteContext) {
  const { slug } = await params;

  const [locale, ...pageSlugs] = slug;
  const actualSlugs = pageSlugs.slice(0, -1);

  const page = source.getPage(actualSlugs, locale);
  if (!page) notFound();

  const pageIconName = getPageIconName(page.url);

  return new ImageResponse(
    <DocsTemplate
      title={page.data.title}
      description={page.data.description}
      icon={<MessageCircleCode color="hsl(210, 100%, 65%)" size={64} />}
      pageIcon={pageIconName}
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