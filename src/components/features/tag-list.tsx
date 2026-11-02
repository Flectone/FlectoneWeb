import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { ReactNode } from "react"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"

interface TagListProps {
  children: ReactNode
  currentTag: string
}

export default function TagList({ children, currentTag }: TagListProps) {
  const [isOpen, setIsOpen] = useState(false)
  const t = useTranslations("Header.Search")

  const tagNames: Record<string, string> = {
    minecraft: t("Minecraft.name"),
    hytale: t("Hytale.name"),
    api: t("API.name"),
    metrics: t("Metrics.name"),
  }

  return (
    <div>
      <button
        className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-fd-muted-foreground hover:bg-fd-accent"
        onClick={() => setIsOpen(!isOpen ? true : false)}
      >
        {t("filter")}
        <p className="text-fd-foreground!">{tagNames[currentTag] || ""}</p>
        <ChevronDown size={1.1 + "em"} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute left-0 z-50 mt-3 flex flex-col gap-1 rounded-2xl border-1 bg-fd-card/50 p-2 backdrop-blur-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            onClick={() => setIsOpen(false)}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}