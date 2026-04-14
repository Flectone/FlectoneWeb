'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Trash2 } from 'lucide-react';
import SelectBlock from '@/components/Form/Input/SelectBlock';
import TextOutput from '@/components/Form/Output/TextOutput';
import { HexColorPicker } from 'react-colorful';

const LEGACY_COLORS = [
    { code: '0', hex: '#000000' },
    { code: '1', hex: '#0000AA' },
    { code: '2', hex: '#00AA00' },
    { code: '3', hex: '#00AAAA' },
    { code: '4', hex: '#AA0000' },
    { code: '5', hex: '#AA00AA' },
    { code: '6', hex: '#FFAA00' },
    { code: '7', hex: '#AAAAAA' },
    { code: '8', hex: '#555555' },
    { code: '9', hex: '#5555FF' },
    { code: 'a', hex: '#55FF55' },
    { code: 'b', hex: '#55FFFF' },
    { code: 'c', hex: '#FF5555' },
    { code: 'd', hex: '#FF55FF' },
    { code: 'e', hex: '#FFFF55' },
    { code: 'f', hex: '#FFFFFF' },
];

const MM_COLOR_TO_HEX: Record<string, string> = {
    black: '#000000',
    dark_blue: '#0000AA',
    dark_green: '#00AA00',
    dark_aqua: '#00AAAA',
    dark_red: '#AA0000',
    dark_purple: '#AA00AA',
    gold: '#FFAA00',
    gray: '#AAAAAA',
    dark_gray: '#555555',
    blue: '#5555FF',
    green: '#55FF55',
    aqua: '#55FFFF',
    red: '#FF5555',
    light_purple: '#FF55FF',
    yellow: '#FFFF55',
    white: '#FFFFFF',
};

const LEGACY_CODE_TO_MM: Record<string, string> = {
    '0': 'black',
    '1': 'dark_blue',
    '2': 'dark_green',
    '3': 'dark_aqua',
    '4': 'dark_red',
    '5': 'dark_purple',
    '6': 'gold',
    '7': 'gray',
    '8': 'dark_gray',
    '9': 'blue',
    'a': 'green',
    'b': 'aqua',
    'c': 'red',
    'd': 'light_purple',
    'e': 'yellow',
    'f': 'white',
};

const OBFUSCATED_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&';

interface MiniTag {
    label: string;
    insert: string;
    cursorOffset?: number;
    description: string;
}

const MINI_TAGS: MiniTag[] = [
    { label: 'gradient',   insert: '<gradient:#ff0000:#0000ff>text</gradient>',      cursorOffset: -20, description: 'Gradient between colors' },
    { label: 'rainbow',    insert: '<rainbow>text</rainbow>',                          cursorOffset: -9,  description: 'Rainbow colored text' },
    { label: 'transition', insert: '<transition:#ff0000:#0000ff:0>text</transition>',  cursorOffset: -13, description: 'Color transition with phase' },
    { label: 'shadow',     insert: '<shadow:#000000:100>text</shadow>',                cursorOffset: -9,  description: 'Drop shadow' },
    { label: 'hover',      insert: "<hover:show_text:'tooltip'>text</hover>",          cursorOffset: -8,  description: 'Tooltip on hover' },
    { label: 'click',      insert: "<click:run_command:'/say hi'>text</click>",        cursorOffset: -8,  description: 'Action on click' },
    { label: 'insertion',  insert: "<insertion:'text'>label</insertion>",              cursorOffset: -10, description: 'Shift+click to insert text' },
    { label: 'font',       insert: '<font:minecraft:uniform>text</font>',              cursorOffset: -7,  description: 'Custom font' },
    { label: 'keybind',    insert: '<key:key.jump>',                                   cursorOffset: 0,   description: 'Displays a keybind' },
    { label: 'lang',       insert: '<lang:item.minecraft.diamond>',                    cursorOffset: 0,   description: 'Translatable text' },
    { label: 'score',      insert: '<score:playername:objective>',                     cursorOffset: 0,   description: 'Scoreboard value' },
    { label: 'selector',   insert: '<sel:@a>',                                         cursorOffset: 0,   description: 'Entity selector' },
    { label: 'nbt',        insert: '<nbt:entity:\'@s\':Health>',                       cursorOffset: 0,   description: 'NBT value' },
    { label: 'newline',    insert: '<newline>',                                        cursorOffset: 0,   description: 'Line break' },
];

type PreviewMode = 'chat' | 'sign' | 'book' | 'motd' | 'name' | 'lore' | 'kick' | 'tab' | 'text';
const PREVIEW_MODES: PreviewMode[] = ['chat', 'sign', 'book', 'motd', 'name', 'lore', 'kick', 'tab', 'text'];

interface ParsedNode {
    text: string;
    color: string | null;
    bold: boolean; italic: boolean; underline: boolean;
    strikethrough: boolean; obfuscated: boolean;
    gradient: string[] | null; gradientPhase: number;
    rainbow: boolean; rainbowPhase: number;
    transition: { colors: string[]; phase: number } | null;
    hoverText: string | null;
    clickAction: string | null; clickValue: string | null;
    newline: boolean;
}

interface ParserState {
    color: string | null;
    bold: boolean; italic: boolean; underline: boolean;
    strikethrough: boolean; obfuscated: boolean;
    gradient: string[] | null; gradientPhase: number;
    rainbow: boolean; rainbowPhase: number;
    transition: { colors: string[]; phase: number } | null;
    hoverText: string | null;
    clickAction: string | null; clickValue: string | null;
}

function emptyState(): ParserState {
    return {
        color: null, bold: false, italic: false, underline: false,
        strikethrough: false, obfuscated: false,
        gradient: null, gradientPhase: 0,
        rainbow: false, rainbowPhase: 0,
        transition: null,
        hoverText: null, clickAction: null, clickValue: null,
    };
}

function resolveColor(s: string): string | null {
    if (MM_COLOR_TO_HEX[s.toLowerCase()]) return MM_COLOR_TO_HEX[s.toLowerCase()];
    if (/^#[0-9a-fA-F]{6}$/.test(s)) return s;
    return null;
}

function parseNodes(raw: string): ParsedNode[] {
    const nodes: ParsedNode[] = [];
    const stack: Array<{ tag: string; savedState: ParserState }> = [];
    let state = emptyState();

    const re = /(?:&|§)([0-9a-fA-Fklmnor])|(?:&|§)(#[0-9a-fA-F]{6})|<\/([a-zA-Z_]+)>|<([^>]+)>|([^&§<>\n]+|[<>])|(\n)/gi;
    let m: RegExpExecArray | null;

    while ((m = re.exec(raw)) !== null) {
        if (m[1] !== undefined) {
            const code = m[1].toLowerCase();
            if (code === 'r') {
                state = emptyState();
            } else if (LEGACY_CODE_TO_MM[code]) {
                state = { ...state, color: MM_COLOR_TO_HEX[LEGACY_CODE_TO_MM[code]], gradient: null, rainbow: false, transition: null };
            } else {
                if (code === 'l') state = { ...state, bold: true };
                if (code === 'o') state = { ...state, italic: true };
                if (code === 'n') state = { ...state, underline: true };
                if (code === 'm') state = { ...state, strikethrough: true };
                if (code === 'k') state = { ...state, obfuscated: true };
            }
        } else if (m[2] !== undefined) {
            state = { ...state, color: m[2], gradient: null, rainbow: false, transition: null };
        } else if (m[3] !== undefined) {
            const tag = m[3].toLowerCase();
            const idx = [...stack].reverse().findIndex(s => s.tag === tag || s.tag.startsWith(tag + ':'));
            if (idx !== -1) {
                const ri = stack.length - 1 - idx;
                state = { ...stack[ri].savedState };
                stack.splice(ri, 1);
            }
        } else if (m[4] !== undefined) {
            const raw_tag = m[4];
            const lower = raw_tag.toLowerCase();
            const tagName = lower.split(':')[0];

            if (lower === 'newline') {
                nodes.push({ text: '\n', ...state, newline: true });
                continue;
            }

            stack.push({ tag: tagName, savedState: { ...state } });
            const next = { ...state };

            if (resolveColor(raw_tag)) {
                Object.assign(next, { color: resolveColor(raw_tag), gradient: null, rainbow: false, transition: null });
            } else if (lower.startsWith('gradient:')) {
                const parts = raw_tag.slice(9).split(':');
                const maybePhase = parseFloat(parts[parts.length - 1]);
                const hasPhase = !isNaN(maybePhase) && /^-?\d*\.?\d+$/.test(parts[parts.length - 1]);
                const colors = (hasPhase ? parts.slice(0, -1) : parts).map(p => resolveColor(p) ?? p);
                Object.assign(next, { gradient: colors, gradientPhase: hasPhase ? maybePhase : 0, color: null, rainbow: false, transition: null });
            } else if (lower.startsWith('rainbow')) {
                Object.assign(next, { rainbow: true, rainbowPhase: parseFloat(raw_tag.slice(8)) || 0, color: null, gradient: null, transition: null });
            } else if (lower.startsWith('transition:')) {
                const parts = raw_tag.slice(11).split(':');
                const maybePhase = parseFloat(parts[parts.length - 1]);
                const hasPhase = !isNaN(maybePhase);
                const colors = (hasPhase ? parts.slice(0, -1) : parts).map(p => resolveColor(p) ?? p);
                Object.assign(next, { transition: { colors, phase: hasPhase ? maybePhase : 0 }, color: null, gradient: null, rainbow: false });
            } else if (lower === 'bold') {
                next.bold = true;
            } else if (lower === 'italic') {
                next.italic = true;
            } else if (lower === 'underlined') {
                next.underline = true;
            } else if (lower === 'strikethrough') {
                next.strikethrough = true;
            } else if (lower === 'obfuscated') {
                next.obfuscated = true;
            } else if (lower === 'reset') {
                Object.assign(next, emptyState());
            } else if (lower.startsWith('hover:show_text:')) {
                next.hoverText = raw_tag.slice(16).replace(/^['"]|['"]$/g, '');
                next.underline = true;
            } else if (lower.startsWith('hover:show_item:') || lower.startsWith('hover:show_entity:')) {
                next.hoverText = raw_tag.replace(/^['"]|['"]$/g, '');
                next.underline = true;
            } else if (lower.startsWith('click:')) {
                const rest = raw_tag.slice(6);
                const ci = rest.indexOf(':');
                if (ci !== -1) {
                    next.clickAction = rest.slice(0, ci);
                    next.clickValue = rest.slice(ci + 1).replace(/^['"]|['"]$/g, '');
                    next.underline = true;
                }
            }

            state = next;
        } else if (m[5] !== undefined) {
            if (m[5]) nodes.push({ text: m[5], ...state, newline: false });
        } else if (m[6] !== undefined) {
            nodes.push({ text: '\n', ...state, newline: true });
        }
    }

    return nodes;
}

function hexToRgb(hex: string): [number, number, number] {
    const n = parseInt(hex.replace('#', ''), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function lerpColor(a: string, b: string, t: number): string {
    const [ar, ag, ab] = hexToRgb(a);
    const [br, bg, bb] = hexToRgb(b);
    return rgbToHex(Math.round(ar + (br - ar) * t), Math.round(ag + (bg - ag) * t), Math.round(ab + (bb - ab) * t));
}

function gradientColor(colors: string[], t: number): string {
    if (colors.length === 1) return colors[0];
    const scaled = t * (colors.length - 1);
    const i = Math.min(Math.floor(scaled), colors.length - 2);
    return lerpColor(colors[i], colors[i + 1], scaled - i);
}

function hslToHex(h: number): string {
    const s = 1, l = 0.5;
    const q = l * (1 + s);
    const p = 2 * l - q;
    const hue2rgb = (t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
    };
    return rgbToHex(
        Math.round(hue2rgb(h + 1/3) * 255),
        Math.round(hue2rgb(h) * 255),
        Math.round(hue2rgb(h - 1/3) * 255),
    );
}

function rainbowAt(t: number, phase = 0): string {
    return hslToHex(((t + phase) % 1 + 1) % 1);
}

function ObfuscatedSpan({ text, style }: { text: string; style?: React.CSSProperties }) {
    const random = () => text.split('').map(() => OBFUSCATED_CHARS[Math.floor(Math.random() * OBFUSCATED_CHARS.length)]);
    const [chars, setChars] = useState(random);

    useEffect(() => {
        const id = setInterval(() => setChars(random()), 50);
        return () => clearInterval(id);
    }, [text]);

    return <span style={{ ...style, fontVariantNumeric: 'tabular-nums', display: 'inline-block' }}>{chars.join('')}</span>;
}

function GradientSpan({ text, colors, phase, style }: { text: string; colors: string[]; phase: number; style?: React.CSSProperties }) {
    return (
        <span style={style}>
            {text.split('').map((ch, i) => (
                <span key={i} style={{ color: gradientColor(colors, text.length <= 1 ? 0 : (i / (text.length - 1) + phase) % 1) }}>{ch}</span>
            ))}
        </span>
    );
}

function RainbowSpan({ text, phase, style }: { text: string; phase: number; style?: React.CSSProperties }) {
    return (
        <span style={style}>
            {text.split('').map((ch, i) => (
                <span key={i} style={{ color: rainbowAt(text.length <= 1 ? 0 : i / (text.length - 1), phase) }}>{ch}</span>
            ))}
        </span>
    );
}

function HoverTooltip({ children, text }: { children: React.ReactNode; text: string }) {
    const [show, setShow] = useState(false);
    return (
        <span className="relative cursor-default" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
            {children}
            {show && (
                <span className="absolute bottom-full left-0 mb-1 z-50 pointer-events-none whitespace-nowrap">
                    <span className="block px-2 py-1 text-xs" style={{
                        background: '#100010', border: '1px solid #2d0a63',
                        boxShadow: '2px 2px 0 #2d0a63', fontFamily: 'Minecraft, monospace', color: '#fff',
                    }}>
                        <RenderedText raw={text} />
                    </span>
                </span>
            )}
        </span>
    );
}

function RenderedText({ raw, style }: { raw: string; style?: React.CSSProperties }) {
    const nodes = parseNodes(raw);
    if (!nodes.length || !raw.trim()) return <span style={{ ...style, opacity: 0.3 }}>Preview</span>;

    return (
        <span style={style}>
            {nodes.map((node, i) => {
                if (node.newline) return <br key={i} />;

                const fmt: React.CSSProperties = {
                    fontWeight: node.bold ? 'bold' : undefined,
                    fontStyle: node.italic ? 'italic' : undefined,
                    textDecoration: [node.underline && 'underline', node.strikethrough && 'line-through'].filter(Boolean).join(' ') || undefined,
                };

                let inner: React.ReactNode;
                if (node.obfuscated) inner = <ObfuscatedSpan text={node.text} style={{ ...fmt, color: node.color ?? undefined }} />;
                else if (node.gradient) inner = <GradientSpan text={node.text} colors={node.gradient} phase={node.gradientPhase} style={fmt} />;
                else if (node.rainbow) inner = <RainbowSpan text={node.text} phase={node.rainbowPhase} style={fmt} />;
                else if (node.transition) inner = <span style={{ ...fmt, color: gradientColor(node.transition.colors, node.transition.phase) }}>{node.text}</span>;
                else inner = <span style={{ ...fmt, color: node.color ?? undefined }}>{node.text}</span>;

                if (node.hoverText) inner = <HoverTooltip key={i} text={node.hoverText}>{inner}</HoverTooltip>;
                return <span key={i}>{inner}</span>;
            })}
        </span>
    );
}

function toMiniMessage(raw: string): string {
    return raw
        .replace(/(?:&|§)([0-9a-fA-F])/g, (_, c) => { const n = LEGACY_CODE_TO_MM[c.toLowerCase()]; return n ? `<${n}>` : `&${c}`; })
        .replace(/(?:&|§)(#[0-9a-fA-F]{6})/g, (_, hex) => `<${hex}>`)
        .replace(/(?:&|§)l/gi, '<bold>').replace(/(?:&|§)o/gi, '<italic>')
        .replace(/(?:&|§)n/gi, '<underlined>').replace(/(?:&|§)m/gi, '<strikethrough>')
        .replace(/(?:&|§)k/gi, '<obfuscated>').replace(/(?:&|§)r/gi, '<reset>')
        .replace(/\n/g, '<newline>');
}

function toLegacy(raw: string): string {
    const nameToCode = Object.fromEntries(Object.entries(LEGACY_CODE_TO_MM).map(([k, v]) => [v, k]));
    return raw
        .replace(/<newline>/gi, '\n')
        .replace(/<([a-z_]+)>/g, (_, tag) => {
            if (nameToCode[tag]) return `&${nameToCode[tag]}`;
            const map: Record<string, string> = { bold: '&l', italic: '&o', underlined: '&n', strikethrough: '&m', obfuscated: '&k', reset: '&r' };
            return map[tag] ?? `<${tag}>`;
        })
        .replace(/<(#[0-9a-fA-F]{6})>/g, (_, hex) => `&${hex}`);
}

function convertText(raw: string, isMini: boolean, doConvert: boolean): string {
    if (!doConvert) return raw;
    return isMini ? toMiniMessage(raw) : toLegacy(raw).replace(/\n/g, '\\n');
}

function Toggle({ enabled, onChange, label }: { enabled: boolean; onChange: (v: boolean) => void; label: string }) {
    return (
        <button onClick={() => onChange(!enabled)} className="flex items-center gap-2 cursor-pointer group shrink-0">
            <div className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${enabled ? 'bg-fd-primary' : 'bg-fd-border'}`}>
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            <span className="text-sm text-fd-muted-foreground group-hover:text-fd-foreground transition-colors whitespace-nowrap">{label}</span>
        </button>
    );
}

function ColorButton({ color, onClick }: { color: typeof LEGACY_COLORS[number]; onClick: () => void }) {
    const isLight = parseInt(color.hex.slice(1), 16) > 0x888888;
    return (
        <button
            title={`&${color.code} · ${color.hex}`}
            onClick={onClick}
            className="w-7 h-7 rounded-md border-2 border-black/30 hover:scale-110 transition-transform cursor-pointer flex items-center justify-center shrink-0"
            style={{ backgroundColor: color.hex }}
        >
            <span className="text-[8px] font-bold select-none" style={{
                color: isLight ? '#000' : '#fff',
                textShadow: isLight ? '0 0 3px rgba(255,255,255,0.4)' : '0 0 3px rgba(0,0,0,0.8)',
            }}>
                &amp;{color.code}
            </span>
        </button>
    );
}

function MagicButton({ onClick, label }: { onClick: () => void; label: string }) {
    const [chars, setChars] = useState(label.split(''));
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const start = () => {
        intervalRef.current = setInterval(() => {
            setChars(label.split('').map(() => OBFUSCATED_CHARS[Math.floor(Math.random() * OBFUSCATED_CHARS.length)]));
        }, 50);
    };

    const stop = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setChars(label.split(''));
    };

    useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current); }, []);

    return (
        <button
            onClick={onClick}
            onMouseEnter={start}
            onMouseLeave={stop}
            className="px-2 py-1 rounded-md bg-fd-card border border-fd-border hover:bg-fd-muted transition-colors text-xs cursor-pointer"
            style={{ fontVariantNumeric: 'tabular-nums', width: `100` }}
        >
            {chars.join('')}
        </button>
    );
}

function GradientButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-2 py-1 rounded-md border text-xs transition-colors ${disabled ? 'bg-fd-card/50 border-fd-border/50 cursor-not-allowed opacity-40' : 'bg-fd-card border-fd-border hover:bg-fd-muted cursor-pointer'}`}
        >
            <span style={disabled ? {} : { background: 'linear-gradient(90deg,#f00,#00f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                gradient
            </span>
        </button>
    );
}

function RainbowButton({ onClick, disabled }: { onClick: () => void; disabled?: boolean }) {
    const text = 'rainbow';
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-2 py-1 rounded-md border text-xs transition-colors ${disabled ? 'bg-fd-card/50 border-fd-border/50 cursor-not-allowed opacity-40' : 'bg-fd-card border-fd-border hover:bg-fd-muted cursor-pointer'}`}
        >
            {text.split('').map((ch, i) => (
                <span key={i} style={disabled ? {} : { color: rainbowAt(i / (text.length - 1)) }}>{ch}</span>
            ))}
        </button>
    );
}

const FAKE_PLAYERS = ['Steve', 'Alex', 'Notch', 'Herobrine', 'Jeb_', 'Dinnerbone'];
function TextareaField({ value, onChange, placeholder, rows = 3, inputRef }: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    rows?: number;
    inputRef?: React.RefObject<HTMLTextAreaElement>;
}) {
    return (
        <div className="relative">
            <textarea
                ref={inputRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className="w-full bg-fd-card border border-fd-border rounded-xl px-4 py-3 pr-10 text-sm outline-none focus:border-fd-primary resize-none font-mono transition-colors"
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute top-2.5 right-2.5 p-1 rounded-md text-fd-muted-foreground hover:text-fd-foreground hover:bg-fd-muted transition-colors cursor-pointer"
                >
                    <Trash2 className="w-3.5 h-3.5" />
                </button>
            )}
        </div>
    );
}

export default function ColorTextGenerator() {
    const t = useTranslations('Tools.ColorTextGenerator');

    const [raw, setRaw] = useState('');
    const [tabHeader, setTabHeader] = useState('');
    const [tabFooter, setTabFooter] = useState('');
    const [format, setFormat] = useState<'legacy' | 'minimessage'>('legacy');
    const [convertOutput, setConvertOutput] = useState(true);
    const [previewMode, setPreviewMode] = useState<PreviewMode>('chat');
    const [pickerColor, setPickerColor] = useState('#ff0000');
    const [showPicker, setShowPicker] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const tabHeaderRef = useRef<HTMLTextAreaElement>(null);
    const tabFooterRef = useRef<HTMLTextAreaElement>(null);

    const isMini = format === 'minimessage';

    const insertAtCursor = (text: string, cursorOffset = 0) => {
        const el = textareaRef.current;
        if (!el) return;
        const start = el.selectionStart;
        const end = el.selectionEnd;
        const val = el === tabHeaderRef.current ? tabHeader : el === tabFooterRef.current ? tabFooter : raw;
        const setter = el === tabHeaderRef.current ? setTabHeader : el === tabFooterRef.current ? setTabFooter : setRaw;
        setter(val.slice(0, start) + text + val.slice(end));
        requestAnimationFrame(() => {
            el.selectionStart = el.selectionEnd = start + text.length + cursorOffset;
            el.focus();
        });
    };

    const insert = (legacy: string, mini: string, cursorOffset = 0) =>
        insertAtCursor(isMini ? mini : legacy, cursorOffset);

    const mc: React.CSSProperties = { fontFamily: 'Minecraft, monospace', fontSize: '13px' };

    const renderPreview = () => {
        switch (previewMode) {
            case 'tab': return (
                <div className="relative w-full rounded-xl overflow-hidden border border-fd-border bg-black flex items-center justify-center" style={{ aspectRatio: '16/12' }}>
                    <img src="/assets/minecrafttaiga.png" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="relative z-10 flex flex-col items-center gap-0.5 w-72">
                        {raw.trim() && (
                            <div className="bg-black/70 px-4 py-1.5 w-full text-center border-b border-white/10">
                                <RenderedText raw={raw} style={mc} />
                            </div>
                        )}
                        <div className="bg-black/60 w-full">
                            {FAKE_PLAYERS.map((p, i) => (
                                <div key={i} className="flex items-center gap-2 px-3 py-0.5 hover:bg-white/5">
                                    <div className="w-3.5 h-3.5 bg-[#888] rounded-sm shrink-0" style={{ imageRendering: 'pixelated' }} />
                                    <span style={{ ...mc, color: '#fff' }}>{p}</span>
                                    <span style={{ ...mc, color: '#55FF55', marginLeft: 'auto', fontSize: '10px' }}>■</span>
                                </div>
                            ))}
                        </div>
                        {raw.trim() && (
                            <div className="bg-black/70 px-4 py-1.5 w-full text-center border-t border-white/10">
                                <RenderedText raw={raw} style={mc} />
                            </div>
                        )}
                    </div>
                </div>
            );
            case 'chat': return (
                <div className="relative w-full rounded-xl overflow-hidden border border-fd-border bg-black" style={{ aspectRatio: '16/12' }}>
                    <img src="/assets/minecrafttaiga.png" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                    <div className="relative z-10 w-full h-full flex flex-col justify-end p-4 gap-1">
                        <div className="flex gap-2 items-baseline">
                            <span style={{ ...mc, color: '#AAAAAA' }}>&lt;Player&gt;</span>
                            <RenderedText raw={raw} style={mc} />
                        </div>
                        <div className="w-full h-7 bg-black/60 border border-white/20 flex items-center px-2">
                            <span style={{ ...mc, color: '#AAAAAA', fontSize: '12px' }}>Press T to chat...</span>
                        </div>
                    </div>
                </div>
            );
            case 'sign': return (
                <div className="relative w-full rounded-xl overflow-hidden border border-fd-border bg-black" style={{ aspectRatio: '16/12' }}>
                    <img src="/assets/minecrafttaiga.png" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="bg-[#8B6914]/80 border-2 border-[#5c4210] px-8 py-3 rounded flex flex-col items-center gap-1">
                            <RenderedText raw={raw} style={{ ...mc, color: '#000000' }} />
                            <div className="w-full h-px bg-black/30 mt-1" />
                            <span style={{ ...mc, color: '#000000', opacity: 0.4, fontSize: '11px' }}>— — — —</span>
                        </div>
                    </div>
                </div>
            );
            case 'book': return (
                <div className="relative w-full rounded-xl overflow-hidden border border-fd-border bg-black" style={{ aspectRatio: '16/12' }}>
                    <img src="/assets/minecrafttaiga.png" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="bg-[#f0e8d0] border border-[#c8b880] px-8 py-4 rounded shadow-lg w-52">
                            <RenderedText raw={raw} style={{ ...mc, color: '#2c1810', lineHeight: '1.6' }} />
                        </div>
                    </div>
                </div>
            );
            case 'motd': return (
                <div className="relative w-full rounded-xl overflow-hidden border border-fd-border bg-[#1a1a2e]" style={{ aspectRatio: '16/12' }}>
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="bg-[#2a2a3e]/90 border border-white/10 px-8 py-4 rounded-lg flex items-center gap-3">
                            <img src="/assets/minecrafttaiga.png" className="w-12 h-12 rounded" />
                            <div className="flex flex-col gap-1">
                                <RenderedText raw={raw} style={mc} />
                                <span style={{ ...mc, color: '#AAAAAA', fontSize: '12px' }}>0/20 players</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
            case 'name': return (
                <div className="relative w-full rounded-xl overflow-hidden border border-fd-border bg-black" style={{ aspectRatio: '16/12' }}>
                    <img src="/assets/minecrafttaiga.png" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="flex flex-col items-center gap-1">
                            <div className="bg-black/70 px-2 py-0.5 rounded"><RenderedText raw={raw} style={mc} /></div>
                            <img src="/assets/minecrafttaiga.png" className="w-8 h-16 object-contain" style={{ imageRendering: 'pixelated' }} />
                        </div>
                    </div>
                </div>
            );
            case 'lore': return (
                <div className="relative w-full rounded-xl overflow-hidden border border-fd-border bg-black" style={{ aspectRatio: '16/12' }}>
                    <img src="/assets/minecrafttaiga.png" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        <div className="border border-[#2d0a63] bg-[#100010]/95 px-3 py-2 rounded flex flex-col gap-0.5" style={{ boxShadow: '0 0 8px #2d0a6380' }}>
                            <span style={{ ...mc, color: '#FFFFFF' }}>Diamond Sword</span>
                            <div className="w-full h-px bg-[#2d0a63] my-1" />
                            <RenderedText raw={raw} style={{ ...mc, color: '#BE00BE', fontSize: '12px' }} />
                            <span style={{ ...mc, color: '#AAAAAA', fontSize: '11px' }}>When in Main Hand:</span>
                            <span style={{ ...mc, color: '#AAAAAA', fontSize: '11px' }}>7 Attack Damage</span>
                        </div>
                    </div>
                </div>
            );
            case 'kick': return (
                <div className="relative w-full rounded-xl overflow-hidden border border-fd-border bg-[#3c0000]" style={{ aspectRatio: '16/12' }}>
                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center gap-3 px-8 text-center">
                        <span style={{ ...mc, color: '#FF5555', fontSize: '16px', fontWeight: 'bold' }}>Disconnected</span>
                        <div className="bg-black/40 border border-white/10 px-6 py-3 rounded">
                            <RenderedText raw={raw} style={mc} />
                        </div>
                    </div>
                </div>
            );
            default: return (
                <div className="w-full rounded-xl border border-fd-border bg-fd-card flex items-center justify-center" style={{ aspectRatio: '16/12' }}>
                    <RenderedText raw={raw} style={{ ...mc, fontSize: '16px' }} />
                </div>
            );
        }
    };

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="bg-fd-article border rounded-2xl p-6 flex flex-col gap-4">

                <div className="flex gap-4 max-lg:flex-col">

                    <div className="flex flex-col gap-4 flex-1 min-w-0">

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-sm">{t('colors')}</p>
                            <div className="flex gap-1 flex-wrap">
                                {LEGACY_COLORS.map((c) => (
                                    <ColorButton key={c.code} color={c} onClick={() => insert(`&${c.code}`, `<${LEGACY_CODE_TO_MM[c.code]}>`)} />
                                ))}
                                <div className="relative">
                                    <button
                                        title={t('addHex')}
                                        onClick={() => setShowPicker(v => !v)}
                                        className="w-7 h-7 rounded-md border-2 border-dashed border-fd-border hover:border-fd-primary hover:scale-110 transition-all cursor-pointer flex items-center justify-center bg-fd-card text-sm shrink-0"
                                    >
                                        +
                                    </button>
                                    {showPicker && (
                                        <div ref={pickerRef} className="absolute z-50 top-9 left-0 bg-fd-article border border-fd-border rounded-xl p-3 flex flex-col gap-2 shadow-xl">
                                            <HexColorPicker color={pickerColor} onChange={setPickerColor} />
                                            <div className="flex gap-2 items-center">
                                                <div className="w-8 h-8 rounded-lg border border-fd-border shrink-0" style={{ backgroundColor: pickerColor }} />
                                                <span className="text-xs font-mono">{pickerColor}</span>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => { insert(`&${pickerColor}`, `<${pickerColor}>`); setShowPicker(false); }}
                                                    className="flex-1 py-1.5 rounded-lg bg-fd-primary text-fd-primary-foreground hover:opacity-90 transition-opacity text-sm cursor-pointer"
                                                >
                                                    {t('add')}
                                                </button>
                                                <button
                                                    onClick={() => setShowPicker(false)}
                                                    className="flex-1 py-1.5 rounded-lg bg-fd-card border border-fd-border hover:bg-fd-muted transition-colors text-sm cursor-pointer"
                                                >
                                                    {t('cancel')}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-sm">{t('formats')}</p>
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1">
                                <button onClick={() => insert('&l', '<bold>')} className="px-2 py-1 rounded-md bg-fd-card border border-fd-border hover:bg-fd-muted transition-colors text-xs cursor-pointer font-bold">{t('bold')}</button>
                                <button onClick={() => insert('&o', '<italic>')} className="px-2 py-1 rounded-md bg-fd-card border border-fd-border hover:bg-fd-muted transition-colors text-xs cursor-pointer italic">{t('italic')}</button>
                                <MagicButton onClick={() => insert('&k', '<obfuscated>')} label={t('magic')} />
                                <button onClick={() => insert('&n', '<underlined>')} className="px-2 py-1 rounded-md bg-fd-card border border-fd-border hover:bg-fd-muted transition-colors text-xs cursor-pointer underline">{t('underline')}</button>
                                <button onClick={() => insert('&m', '<strikethrough>')} className="px-2 py-1 rounded-md bg-fd-card border border-fd-border hover:bg-fd-muted transition-colors text-xs cursor-pointer line-through">{t('strike')}</button>
                                <button onClick={() => insert('&r', '<reset>')} className="items-center gap-1 px-2 py-1 rounded-md bg-fd-card border border-fd-border hover:bg-fd-muted transition-colors text-xs cursor-pointer">⟳ {t('reset')}</button>
                                <button onClick={() => insert('\n', '<newline>')} className="px-2 py-1 rounded-md bg-fd-card border border-fd-border hover:bg-fd-muted transition-colors text-xs cursor-pointer">{t('newline')}</button>

                                <GradientButton disabled={!isMini} onClick={() => insertAtCursor('<gradient:#ff0000:#0000ff>text</gradient>', -20)} />
                                <RainbowButton disabled={!isMini} onClick={() => insertAtCursor('<rainbow>text</rainbow>', -9)} />

                                {MINI_TAGS.filter(tag => !['gradient', 'rainbow', 'newline'].includes(tag.label)).map(tag => (
                                    <button
                                        key={tag.label}
                                        title={tag.description}
                                        disabled={!isMini}
                                        onClick={() => isMini && insertAtCursor(tag.insert, tag.cursorOffset ?? 0)}
                                        className={`px-2 py-1 rounded-md border text-xs transition-colors ${
                                            isMini
                                                ? 'bg-fd-card border-fd-border hover:bg-fd-muted cursor-pointer'
                                                : 'bg-fd-card/50 border-fd-border/50 cursor-not-allowed opacity-40'
                                        }`}
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-sm">{t('outputFormat')}</p>
                            <div className="flex items-center gap-3">
                                <SelectBlock
                                    values={[
                                        { label: 'Legacy (&)', value: 'legacy' },
                                        { label: 'MiniMessage', value: 'minimessage' },
                                    ]}
                                    onChange={(v) => setFormat(v as 'legacy' | 'minimessage')}
                                    defaultValue="legacy"
                                />
                                <Toggle enabled={convertOutput} onChange={setConvertOutput} label={t('convertOutput')} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-sm">{t('input')}</p>
                            <TextareaField
                                value={raw}
                                onChange={setRaw}
                                placeholder={t('placeholder')}
                                inputRef={textareaRef}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-sm">{t('output')}</p>
                            <div className="font-mono">
                                <TextOutput text={convertText(raw, isMini, convertOutput)} />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 w-full xl:w-115 shrink-0">
                        <p className="font-bold text-sm">{t('preview')}</p>
                        <div className="flex-shrink-0">
                            {renderPreview()}
                        </div>
                        <div className="grid grid-cols-3 gap-1">
                        {PREVIEW_MODES.map((m) => (
                            <button
                                key={m}
                                onClick={() => setPreviewMode(m)}
                                className={`h-8 px-2 py-1 rounded-md text-xs transition-colors cursor-pointer border ${previewMode === m ? 'bg-fd-primary text-fd-primary-foreground border-fd-primary' : 'bg-fd-card border-fd-border hover:bg-fd-muted'}`}
                            >
                                {t(`previews.${m}`)}
                            </button>
                        ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}