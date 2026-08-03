import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownUp, ChevronDown, Funnel } from "lucide-react";
import { MouseEventHandler } from "react";
import { useTranslations } from "next-intl";

interface SortProps {
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  onClick: MouseEventHandler;
  currentSort: string;
}

export default function Sort({
  options,
  onChange,
  onClick,
  currentSort,
}: SortProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("Header.Search");

  return (
    <div className="relative flex gap-4 w-fit">
      <button
        className="flex items-center cursor-pointer bg-fd-card text-sm rounded-lg h-8 w-8 justify-center gap-2 text-fd-muted-foreground hover:bg-fd-accent"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Funnel size="1em" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute text-nowrap flex top-0 left-full z-1 ml-2 bg-fd-card h-8 p-1 gap-1 rounded-lg"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.1, ease: "easeInOut" }}
            onClick={() => setIsOpen(false)}
          >
            <button
              onClick={onClick}
              className="transition cursor-pointer px-2 text-left rounded-md text-fd-muted-foreground hover:bg-fd-accent text-xs"
            >
              <ArrowDownUp size={"1em"} />
            </button>
            {options.map((item) => (
              <button
                className={`transition cursor-pointer px-3 w-full text-left rounded-md ${currentSort === item.value ? "bg-fd-accent text-fd-foreground!" : "text-fd-muted-foreground"} hover:bg-fd-accent text-xs`}
                key={item.value}
                onClick={() => onChange(item.value)}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
