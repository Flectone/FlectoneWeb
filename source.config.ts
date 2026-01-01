import { defineDocs, defineConfig } from 'fumadocs-mdx/config';
import lastModified from 'fumadocs-mdx/plugins/last-modified';
import { z } from 'zod';

export const docs = defineDocs({
  dir: './src/pulse/content/docs',
  docs: {
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      authors: z.array(z.string()).optional(),
    }),
  },
});

export default defineConfig({
  plugins: [lastModified()],
});