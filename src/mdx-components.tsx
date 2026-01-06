import defaultMdxComponents from 'fumadocs-ui/mdx';
import {Step, Steps} from 'fumadocs-ui/components/steps';
import type {MDXComponents} from 'mdx/types';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import Callout from '@/components/Pulse/Callout'
import { LinkIcon } from 'lucide-react';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    ...TabsComponents,
    Steps,
    Step,
    Callout,
    h1: ({ id, children, ...props }) => (
      <h1
        id={id}
        {...props}
        className="group border-b border-fd-border pb-3 mb-8 mt-2 scroll-m-20 text-3xl font-bold flex justify-between items-center gap-2"
      >
        <a
          href={`#${id}`}
          className="no-underline font-bold"
        >
          {children}
        </a>

        <LinkIcon
          size={20}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-fd-muted-foreground"
        />
      </h1>
    ),
    img: (props) => {
      const {src, alt, ...rest} = props;
      const imageSrc = typeof src === 'object' && src !== null ? (src as { src: string }).src : src;
      if (!imageSrc) return null;

      return (
        <span className="w-full">
          <span className="flex justify-start">
            <img
              src={imageSrc}
              alt={alt || 'image'}
              {...rest}
              className="rounded-lg h-full !my-2"
              loading="lazy"
            />
          </span>
        </span>
      );
    },
  };
}