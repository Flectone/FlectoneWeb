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
            <Card path={link} target="blank" className={`${className} gitcard max-sm:hidden mb-4 duration-100 p-4 backdrop-blur-3xl bg-(--primary) w-full rounded-xl flex`}>
                <Image className="" width={86} height={86} alt="avatar" src={avatar} />
                <div className="ml-4 flex flex-col justify-center">
                    <h1 className="font-semibold">{name}</h1>
                    <p>{description}</p>
                </div>
            </Card>
            <Card path={link} target="blank" className={`${className} ${link ? 'hover:bg-(--muted-primary) cursor-pointer' : ''} block gitcard sm:hidden h-fit mb-4 duration-100 p-8 backdrop-blur-3xl bg-(--primary) w-full rounded-xl`}>
                <div className="flex items-center mb-4">
                    <Image className="" width={52} height={52} alt="avatar" src={avatar} />
                    <h1 className="font-semibold ml-4">{name}</h1>
                </div>
                <p>{description}</p>
            </Card>
        </>

    )
}