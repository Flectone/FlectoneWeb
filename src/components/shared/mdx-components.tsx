import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import { Step, Steps } from "fumadocs-ui/components/steps"
import Callout from "./callout"
import { Accordion, Accordions } from "fumadocs-ui/components/accordion"
import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock"
import * as TabsComponents from "fumadocs-ui/components/tabs"
import ZoomImage from "@/app/[locale]/pulse/docs/[[...slug]]/_components/zoom-image"

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...components,
    ...TabsComponents,
    Step,
    Steps,
    Callout,
    Accordion,
    Accordions,
    pre: ({ ref: _ref, ...props }) => (
      <CodeBlock data-line-numbers {...props}>
        <Pre className={`[&_code]:bg-fd-card!`}>{props.children}</Pre>
      </CodeBlock>
    ),
    img: (props) => {
      const { src, alt, ...rest } = props
      const imageSrc =
        typeof src === "object" && src !== null
          ? (src as unknown as { src: string }).src
          : src
      if (!imageSrc) return null

      return (
        <span className="w-full">
          <span className="flex justify-start">
            <ZoomImage
              src={imageSrc}
              alt={alt || "image"}
              {...rest}
              className="my-2! h-auto w-fit rounded-lg"
            />
          </span>
        </span>
      )
    },
  } satisfies MDXComponents
}

export const useMDXComponents = getMDXComponents

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>
}
