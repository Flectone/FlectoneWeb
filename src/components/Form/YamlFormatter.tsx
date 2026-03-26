'use client';

import { ReactNode, useState } from 'react';
import { Clipboard, Check } from 'lucide-react';

interface YamlFormatterProps {
    yaml: string;
    header?: ReactNode;
    hfull?: boolean
}

export function YamlFormatter({ yaml, header, hfull = true }: YamlFormatterProps) {
    const [copied, setCopied] = useState(false);

    if (!yaml) return null;

    const lines = yaml.split('\n');

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(yaml);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Не удалось скопировать:', err);
        }
    };

    return (
        <div className="relative w-full flex-col group h-full flex">
            <button
                className={`text-fd-foreground/80 ${copied ? '' : 'hover:text-fd-primary hover:bg-fd-primary-foreground'} transition absolute bottom-0 right-0 p-1.5 m-1.5 rounded-sm cursor-pointer`}
                onClick={handleCopy}
                disabled={copied}
            >
                {copied ? <Check size={1.2 + 'em'} /> : <Clipboard size={1.2 + 'em'} />}
            </button>
            <pre className="w-full bg-fd-card p-4 rounded-lg overflow-auto overflow-y-auto text-sm font-mono" style={hfull ? { height: 100 + '%' } : {}}>
                {header ?
                    <div className='bg-fd-muted w-full p-1 px-2 mb-2 rounded-xs'>
                        {header}
                    </div> : ''
                }
                {lines.map((line, lineIdx) => {
                    if (line.trim().endsWith(':') || line.includes(': ')) {
                        const [key, ...rest] = line.split(':');
                        const value = rest.join(':');

                        return (
                            <div key={lineIdx} className="leading-relaxed">
                                <span className="text-purple-400 not-dark:text-purple-600 font-bold">{key}:</span>
                                {parseLineWithColors(value)}
                            </div>
                        );
                    }

                    if (line.trim().startsWith('-')) {
                        const dashIndex = line.indexOf('-');
                        const indent = line.slice(0, dashIndex);
                        const rest = line.slice(dashIndex + 1);

                        return (
                            <div key={lineIdx} className="leading-relaxed">
                                <span>{indent}</span>
                                <span className="text-orange-400 not-dark:text-orange-500 font-bold">-</span>
                                {parseLineWithColors(rest)}
                            </div>
                        );
                    }

                    return <div key={lineIdx} className="leading-relaxed">{line}</div>;
                })}
            </pre>
        </div>
    );
}

function parseLineWithColors(line: string) {
    const parts = line.split(/(<\#[a-fA-F0-9]{6}>)/g);

    return parts.map((part, index) => {
        const hexMatch = part.match(/<\#([a-fA-F0-9]{6})>/);

        if (hexMatch) {
            const hex = `#${hexMatch[1]}`;

            return (
                <span key={index} className="font-semibold tracking-tight">
                    <span className="text-zinc-500 not-dark:text-zinc-400">&lt;</span>
                    <span style={{ color: hex }}>{hex}</span>
                    <span className="text-zinc-500 not-dark:text-zinc-400">&gt;</span>
                </span>
            );
        }

        return (
            <span key={index} className="text-fd-foreground">
                {part}
            </span>
        );
    });
}