import { source } from '@/lib/source';
import { notFound } from 'next/navigation';
import { ImageResponse } from 'takumi-js/response';
import DocsTemplate from '@/components/OGImage/DocsTemplate'
import fs from 'fs';
import path from 'path';

let fontRegular: ArrayBuffer | null = null;
let fontBold: ArrayBuffer | null = null;

interface RouteContext {
  params: Promise<{ slug: string[] }>;
}

function loadFonts() {
  if (!fontRegular || !fontBold) {
    fontRegular = fs.readFileSync(
        path.join(process.cwd(), 'public/fonts/InterNormal.ttf')
    ).buffer;

    fontBold = fs.readFileSync(
        path.join(process.cwd(), 'public/fonts/InterBold.ttf')
    ).buffer;
  }
  return { regular: fontRegular, bold: fontBold };
}

export async function GET(req: Request, { params }: RouteContext) {
  const { slug } = await params;

  const [locale, ...pageSlugs] = slug;
  const actualSlugs = pageSlugs.slice(0, -1);

  const page = source.getPage(actualSlugs, locale);
  if (!page) notFound();

  const { regular, bold } = loadFonts();

  return new ImageResponse(
      (<DocsTemplate
          title={page.data.title}
          description={page.data.description}
          icon={<img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IndoaXRlIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBhdGggZD0ibTEwIDktMyAzIDMgMyIvPjxwYXRoIGQ9Im0xNCAxNSAzLTMtMy0zIi8+PHBhdGggZD0iTTIuOTkyIDE2LjM0MmEyIDIgMCAwIDEgLjA5NCAxLjE2N2wtMS4wNjUgMy4yOWExIDEgMCAwIDAgMS4yMzYgMS4xNjhsMy40MTMtLjk5OGEyIDIgMCAwIDEgMS4wOTkuMDkyIDEwIDEwIDAgMSAwLTQuNzc3LTQuNzE5Ii8+PC9zdmc+" />}
          primaryColor="hsla(210, 100%, 65%, 0.6)"
          primaryTextColor="hsl(210, 100%, 65%)"
          site="FlectonePulse"
          mutedPrimaryColor='hsla(210, 100%, 65%, 0.2)'
      />),
      {
        width: 1200,
        height: 630,
        format: "webp",
        fonts: [
          {
            name: 'Inter',
            data: regular,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Inter',
            data: bold,
            weight: 700,
            style: 'normal',
          },
        ],
      },
  );
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: [page.locale ?? 'en', ...page.slugs, 'image.webp'],
  }));
}