"use client"

interface YamlFormatterProps {
  yaml: string
  className?: string
}

export function YamlFormatter({ yaml, className }: YamlFormatterProps) {
  if (!yaml) return null

  const lines = yaml.split("\n")

  return (
    <pre className="text-sm">
      {lines.map((line, lineIdx) => {
        if (line.trim().endsWith(":") || line.includes(": ")) {
          const [key, ...rest] = line.split(":")
          const value = rest.join(":")

          return (
            <div key={lineIdx} className="leading-relaxed">
              <span className="font-bold text-purple-400 not-dark:text-purple-600">
                {key}:
              </span>
              {parseLineWithColors(value)}
            </div>
          )
        }

        if (line.trim().startsWith("-")) {
          const dashIndex = line.indexOf("-")
          const indent = line.slice(0, dashIndex)
          const rest = line.slice(dashIndex + 1)

          return (
            <div key={lineIdx} className="leading-relaxed">
              <span>{indent}</span>
              <span className="font-bold text-orange-400 not-dark:text-orange-500">
                -
              </span>
              {parseLineWithColors(rest)}
            </div>
          )
        }

        return (
          <div key={lineIdx} className="leading-relaxed">
            {line}
          </div>
        )
      })}
    </pre>
  )
}

function parseLineWithColors(line: string) {
  const parts = line.split(/(<\#[a-fA-F0-9]{6}>)/g)

  return parts.map((part, index) => {
    const hexMatch = part.match(/<\#([a-fA-F0-9]{6})>/)

    if (hexMatch) {
      const hex = `#${hexMatch[1]}`

      return (
        <span key={index} className="font-semibold tracking-tight">
          <span className="text-zinc-500 not-dark:text-zinc-400">&lt;</span>
          <span style={{ color: hex }}>{hex}</span>
          <span className="text-zinc-500 not-dark:text-zinc-400">&gt;</span>
        </span>
      )
    }

    return (
      <span key={index} className="text-fd-foreground">
        {part}
      </span>
    )
  })
}
