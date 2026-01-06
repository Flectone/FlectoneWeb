import defaultMdxComponents from 'fumadocs-ui/mdx';
import {Step, Steps} from 'fumadocs-ui/components/steps';
import type {MDXComponents} from 'mdx/types';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import Callout from '@/components/Pulse/Callout'

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
    ...TabsComponents,
    Steps,
    Step,
    Callout,
    h1: (props) => (
      <h1 {...props} className="border-b pb-3" />
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