'use client'

import {DynamicIcon, IconName} from "lucide-react/dynamic";

interface TagListItemProps {
    title: string;
    description?: string;
    icon: IconName;
    onclick?: () => void;
    isSelect: boolean;
}

export default function TagListItem({title, icon, description, onclick, isSelect}: TagListItemProps) {
    return (
        <div onClick={onclick} className={`p-2 rounded-lg cursor-pointer transition ${isSelect ? 'bg-fd-primary' : 'hover:bg-fd-accent'}`}>
            <h5 className={`flex items-center font-bold gap-1 text-sm ${isSelect ? 'text-fd-primary-foreground' : ''}`}><DynamicIcon name={icon} size={1.1+'em'}/>{title}</h5>
            <p className={`text-xs ${isSelect ? 'text-fd-primary-foreground!' : ''}`}>{description}</p>
        </div>
    )
}