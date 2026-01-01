import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import type { MDXComponents } from 'mdx/types';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    ...TabsComponents,
    Steps,
    Step,
    img: (props) => {
      const { src, alt, ...rest } = props;
      const imageSrc = typeof src === 'object' && src !== null ? (src as any).src : src;
      if (!imageSrc) return null;
      return (
        <span className="mt-2 flex justify-center items-center bg-linear-to-br from-fd-primary/10 rounded-xl border p-4">
          <span className="relative max-w-125 w-full block">
            <img
              src={imageSrc}
              alt={alt || 'image'}
              {...rest}
              className="rounded-lg shadow-md w-full h-auto"
              loading="lazy"
            />
          </span>
        </span>
      );
    },
  };
}