import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'takumi-js/response';
import DocsTemplate from '@/components/OGImage/DocsTemplate'

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
    (<DocsTemplate
      title={page.data.title}
      description={page.data.description}
      icon={<img  src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLW1lc3NhZ2UtY2lyY2xlLWNvZGUtaWNvbiBsdWNpZGUtbWVzc2FnZS1jaXJjbGUtY29kZSI+PHBhdGggZD0ibTEwIDktMyAzIDMgMyIvPjxwYXRoIGQ9Im0xNCAxNSAzLTMtMy0zIi8+PHBhdGggZD0iTTIuOTkyIDE2LjM0MmEyIDIgMCAwIDEgLjA5NCAxLjE2N2wtMS4wNjUgMy4yOWExIDEgMCAwIDAgMS4yMzYgMS4xNjhsMy40MTMtLjk5OGEyIDIgMCAwIDEgMS4wOTkuMDkyIDEwIDEwIDAgMSAwLTQuNzc3LTQuNzE5Ii8+PC9zdmc+"/>}
      primaryColor="hsla(210, 100%, 65%, 0.6)"
      primaryTextColor="hsl(210, 100%, 65%)"
      site="FlectonePulse"
      mutedPrimaryColor='hsla(210, 100%, 65%, 0.2)'
    />),
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