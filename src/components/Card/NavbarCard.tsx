"use client";

import Card from "@/components/Card/Card";
import { IconName, DynamicIcon } from "lucide-react/dynamic";
import { ReactNode } from "react";

interface NavbarCardProps {
  href: string;
  title: string;
  description: string;
  icon: IconName;
}

export default function NavbarCard({
  href,
  title,
  description,
  icon,
}: NavbarCardProps) {
  return (
    <Card path={href} className="p-4! text-sm! w-full! flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="p-1 rounded-md bg-fd-primary">
          <DynamicIcon
            strokeWidth={"3px"}
            className="text-fd-primary-foreground"
            name={icon}
            size={1.1 + "em"}
          />
        </span>
        <h2 className="font-bold">{title}</h2>
      </div>
      <p>{description}</p>
    </Card>
  );
}
