import { source } from "@/lib/source"
import { DocsLayout } from "fumadocs-ui/layouts/docs"
import { baseOptions } from "@/lib/layout.shared"
import { ReactNode } from "react"

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ locale: string }>
  children: ReactNode
}) {
  const { locale } = await params
  return (
    <DocsLayout
      tree={source.getPageTree(locale)}
      {...baseOptions(locale)}
      sidebar={{
        tabs: {
          transform: (option, node) => ({
            ...option,
            title: <span className="text-fd-foreground">{node.name}</span>,
            icon: (
              <div className="text-fd-primary [&_svg]:size-full">
                {node.icon}
              </div>
            ),
          }),
        },
      }}
    >
      {children}
    </DocsLayout>
  )
}
