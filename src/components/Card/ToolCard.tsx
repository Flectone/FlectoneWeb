'use client'
import Card from "./Card"
import {DynamicIcon, IconName} from "lucide-react/dynamic";

interface ToolCardProps {
    name: string,
    description: string,
    icon: IconName,
    path: string,
}

export default function ToolCard({ name, description, icon, path }: ToolCardProps) {
    return (
        <Card
            className="flex w-full gap-2 relative h-full"
            path={path}
        >
            <div className="w-full pr-4">
                <h2 className="font-bold text-xl flex gap-1 items-center w-full">
                    <DynamicIcon className="text-fd-primary" size={1.1+'em'} name={icon}/>
                    {name}
                </h2>
                <p className="">{description}</p>
            </div>
        </Card>
    )
}