import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { baseOptions } from '@/lib/layout.shared';
import { notFound } from 'next/navigation';
import Image from "next/image";

export default async function Layout({
                                       children,
                                       params
                                     }: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>; // В Next.js 15+ params — это Promise
}) {
  const { lang } = await params;

  const tree = source.pageTree[lang];

  if (!tree) {
    notFound();
  }

  return (
      <DocsLayout tree={tree} {...baseOptions()}
          nav={{
              title: <h1 className='flex justify-center items-center'><Image src="/logo.png" alt="Flectone Logo" width={64} height={64} className='w-6 h-6 mr-1' /> FlectonePulse</h1>,
              url: '/pulse',
          }}
      >
        {children}
      </DocsLayout>
  );
}