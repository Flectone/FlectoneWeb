'use client'
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

interface TextOutputProps {
    text: string,

}

export default function TextOutput({ text }: TextOutputProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Не удалось скопировать:', err);
        }
    };

    return (
        <div className="bg-fd-card flex items-center justify-between gap-2 px-3 py-2 rounded-md w-full">
            <p>{text}</p>
            <button
                className={`text-fd-gray-foreground p-1 bg-fd-gray ${copied ? '' : 'hover:bg-fd-muted-gray'} transition rounded-sm cursor-pointer`}
                onClick={handleCopy}
                disabled={copied}
            >
                {copied ? <Check size={1 + 'em'} /> : <Clipboard size={1 + 'em'} />}
            </button>
        </div>
    )
}