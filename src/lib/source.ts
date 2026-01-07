import { docs } from 'fumadocs-mdx:collections/server';
import { type InferPageType, loader } from 'fumadocs-core/source';
import { lucideIconsPlugin } from 'fumadocs-core/source/lucide-icons';
import { i18n } from "@/lib/i18n"
import { icons } from 'lucide-react';
import { createElement } from 'react';

export const source = loader({
  icon(icon) {
    if (!icon) {
      return;
    }

    if (icon in icons) return createElement(icons[icon as keyof typeof icons]);
  },
  baseUrl: '/pulse/docs',
  source: docs.toFumadocsSource(),
  plugins: [lucideIconsPlugin()],
  i18n
});

// lib/source.ts
export function getPageImage(page: InferPageType<typeof source>) {
  const segments = [page.locale, ...page.slugs, 'image.png'].filter(Boolean);

  return {
    segments,
    url: `https://flectone.net/og/docs/${segments.join('/')}`,
  };
}
