// source.config.ts
import { defineDocs, defineConfig } from "fumadocs-mdx/config";
import lastModified from "fumadocs-mdx/plugins/last-modified";
import { z } from "zod";
var docs = defineDocs({
  dir: "./src/content/docs",
  docs: {
    schema: z.object({
      title: z.string(),
      description: z.string().optional(),
      authors: z.array(z.string()).optional()
    })
  }
});
var source_config_default = defineConfig({
  plugins: [lastModified()]
});
export {
  source_config_default as default,
  docs
};
