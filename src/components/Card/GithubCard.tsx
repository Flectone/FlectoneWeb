'use client'
import { ReactNode } from "react"
import Image from "next/image";
import Card from "./Card";

interface GithubCarpProps {
    className?: string;
    link?: string;
    name: string;
    description: string;
    avatar: string;
}

export default function GithubCard({ className, link, name, description, avatar }: GithubCarpProps) {
    return (
        <>
            <Card path={link} target="blank" className={`${className} gap-2 max-lg:hidden duration-100 p-4 bg-(--primary) w-full rounded-xl flex`}>
                <img src={avatar} alt={name} className="h-20 w-20 rounded-sm" />
                <div className="flex flex-col justify-center">
                    <h1 className="font-semibold">{name}</h1>
                    <p>{description}</p>
                </div>
            </Card>
            <Card path={link} target="blank" className={`${className} ${link ? 'hover:bg-(--muted-primary) cursor-pointer' : ''} gap-2 flex flex-col gitcard lg:hidden min-h-full duration-100 p-8 backdrop-blur-3xl bg-(--primary) w-full rounded-xl`}>
                <div className="flex items-center gap-2">
                    <img src={avatar} alt={name} className="max-lg:h-14 max-lg:w-14 max-sm:h-10 max-sm:w-10 rounded-sm" />
                    <h1 className="font-semibold">{name}</h1>
                </div>
                <p>{description}</p>
            </Card>
        </>

    )
}