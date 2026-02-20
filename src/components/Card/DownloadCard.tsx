'use client'
import { ReactNode } from "react";
import LinkButton from "../Button/LinkButton";

interface DownloadCardProps {
    link: string
    button: string
    icon: ReactNode
    name: string
    color?: 'blue' | 'green'
    release: string
}

export default function DownloadCard({ link, icon, name, color = 'blue', release, button }: DownloadCardProps) {
    return (
        <span className={`flex w-full p-3 text-fd-foreground bg-fd-article/40 not-dark:bg-fd-article rounded-xl items-center justify-between`}>
            <div className={`flex items-center gap-2`}>
                {icon}
                <div className="flex flex-col items-start">
                    <h1 className={`font-bold`}>{name}</h1>
                    <p className="text-sm">{release}</p>
                </div>
            </div>
            <LinkButton className="rounded-md" href={link} mode={color}>{button}</LinkButton>
        </span>
    )
}