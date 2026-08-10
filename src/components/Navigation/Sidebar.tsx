"use client";

import { useEffect, useState } from "react";

interface SidebarProps {
  anchors: string[];
}

export default function Sidebar({ anchors }: SidebarProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    anchors.forEach((item) => {
      const element = document.getElementById(`${item}`);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [anchors]);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "instant" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <aside className="max-lg:hidden shrink-0">
      <div className="sticky top-22 max-h-[calc(100vh-6rem)] overflow-y-auto py-1 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        <nav className="relative flex flex-col border-l border-fd-border/40 pl-3 pr-8 space-y-1.5">
          {anchors.map((item) => {
            const sectionId = item;
            const isActive = activeId === sectionId;

            return (
              <a
                key={item}
                href={`#${sectionId}`}
                onClick={(e) => scrollToSection(e, sectionId)}
                className={`group relative text-sm transition-colors duration-200 block py-0.5 ${
                  isActive
                    ? "text-fd-primary"
                    : "text-fd-muted-foreground hover:text-fd-foreground"
                }`}
              >
                {isActive && (
                  <span className="absolute -left-3.25 top-0 bottom-0 w-0.5 bg-fd-primary rounded-full" />
                )}
                v{item}
              </a>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
