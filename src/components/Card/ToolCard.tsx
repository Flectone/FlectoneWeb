'use client'
import { ReactNode } from "react"
import Card from "./Card"
import * as Icons from "lucide-react";
import { LucideIcon } from "lucide-react";

type IconName = keyof typeof Icons;

interface ToolCardProps {
    preview: ReactNode,
    name: string,
    description: string,
    icon: IconName,
    path: string
}

export default function ToolCard({ preview, name, description, icon, path }: ToolCardProps) {
    const Icon = Icons[icon] as LucideIcon | undefined;
    if (!Icon) return null;

    return (
        <Card
            className="flex w-full gap-2"
            path={path}
        >
            <div className="w-1/2 pr-4">
                <span className="gap-1 flex items-start justify-between w-full">
                    <h2 className="font-bold text-xl">{name}</h2>
                </span>
                <p className="">{description}</p>
            </div>
            <div className="w-1/2 absolute right-0 top-0 h-full rounded-r-2xl">
                {preview}
            </div>
        </Card>
    )
}