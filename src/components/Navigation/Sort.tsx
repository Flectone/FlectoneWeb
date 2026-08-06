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
    <div className="relative flex gap-2 w-fit">
      <div
        className="text-nowrap flex bg-fd-card h-8 p-1 gap-1 rounded-lg"
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
      </div>
    </div>
  );
}
