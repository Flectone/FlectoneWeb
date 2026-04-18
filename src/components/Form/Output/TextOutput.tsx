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
        <div className="bg-fd-card flex items-start justify-between gap-2 px-2 py-2 rounded-md w-full">
            <p className="wrap-break-word whitespace-normal overflow-hidden">
                {text}
            </p>
            <button
                className={`text-fd-gray-foreground/40 p-1 rounded-md ${copied ? '' : 'hover:text-fd-gray-foreground/70'} transition cursor-pointer shrink-0`}
                onClick={handleCopy}
                disabled={copied}
            >
                {copied ? <Check size={16} /> : <Clipboard size={16} />}
            </button>
        </div>
    )
}