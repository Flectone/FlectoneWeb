import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { notFound } from 'next/navigation';

// 1. Делаем функцию async
export default async function Layout({
                                       children,
                                       params
                                     }: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // В Next.js 15+ params — это Promise
}) {
  const { lang } = await params;

  // 2. Достаем дерево именно для текущего языка
  const tree = source.pageTree[lang];

  if (!tree) {
    notFound();
  }

  return (
      <DocsLayout tree={tree} {...baseOptions()}>
        {children}
      </DocsLayout>
  );
}