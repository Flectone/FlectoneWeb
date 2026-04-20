'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Plus } from 'lucide-react';
import SelectBlock from '@/components/Form/Input/SelectBlock';
import TextOutput from '@/components/Form/Output/TextOutput';
import { HexColorPicker } from 'react-colorful';
import InputText from '../Form/Input/InputText';
import MinecraftChat from '../Assets/MinecraftChat';
import MinecraftTab from '../Assets/MinecraftTab';
import Checkbox from '../Form/Input/Checkbox';

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
}

const MINI_TAGS: MiniTag[] = [
    { label: 'gradient', insert: '<gradient:#ff0000:#0000ff>text</gradient>', cursorOffset: -15 },
    { label: 'rainbow', insert: '<rainbow>text</rainbow>', cursorOffset: -14 },
    { label: 'transition', insert: '<transition:#ff0000:#0000ff:0>text</transition>', cursorOffset: -17 },
    { label: 'shadow', insert: '<shadow:#000000:100>text</shadow>', cursorOffset: -13 },
    { label: 'hover', insert: "<hover:show_text:'tooltip'>text</hover>", cursorOffset: -12 },
    { label: 'click', insert: "<click:run_command:'/say hi'>text</click>", cursorOffset: -12 },
    { label: 'insertion', insert: "<insertion:'text'>label</insertion>", cursorOffset: -17 },
    { label: 'font', insert: '<font:minecraft:uniform>text</font>', cursorOffset: -11 },
    { label: 'keybind', insert: '<key:key.jump>', cursorOffset: 0 },
    { label: 'lang', insert: '<lang:item.minecraft.diamond>', cursorOffset: 0 },
    { label: 'score', insert: '<score:playername:objective>', cursorOffset: 0 },
    { label: 'selector', insert: '<selector:@s>', cursorOffset: 0 },
    { label: 'nbt', insert: '<nbt:entity:\'@s\':Health>', cursorOffset: 0 },
    { label: 'newline', insert: '<newline>', cursorOffset: 0 },
];

const KNOWN_TAGS = new Set([
    ...MINI_TAGS.map(t => t.label.toLowerCase()),
    'bold', 'italic', 'underlined', 'strikethrough', 'obfuscated', 'reset',
    'newline', 'rainbow', 'gradient', 'transition', 'hover', 'click',
    'key', 'lang', 'score', 'selector', 'nbt', 'font', 'insertion', 'shadow'
]);

type PreviewMode = 'chat' | 'sign' | 'book' | 'motd' | 'name' | 'lore' | 'kick' | 'tab';
const PREVIEW_MODES: PreviewMode[] = ['chat', 'sign', 'book', 'motd', 'name', 'lore', 'kick', 'tab'];

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

            if (!KNOWN_TAGS.has(tagName) && resolveColor(raw_tag) === null) {
                nodes.push({ text: `<${raw_tag}>`, ...state, newline: false });
                continue;
            }

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
                const maybePhase = Number.parseFloat(parts.at(-1) as string);
                const hasPhase = !Number.isNaN(maybePhase) && /^-?\d*\.?\d+$/.test(parts.at(-1) as string);
                const colors = (hasPhase ? parts.slice(0, -1) : parts).map(p => resolveColor(p) ?? p);
                Object.assign(next, { gradient: colors, gradientPhase: hasPhase ? maybePhase : 0, color: null, rainbow: false, transition: null });
            } else if (lower.startsWith('rainbow')) {
                Object.assign(next, { rainbow: true, rainbowPhase: parseFloat(raw_tag.slice(8)) || 0, color: null, gradient: null, transition: null });
            } else if (lower.startsWith('transition:')) {
                const parts = raw_tag.slice(11).split(':');
                const maybePhase = Number.parseFloat(parts.at(-1) as string);
                const hasPhase = !Number.isNaN(maybePhase);
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
                next.hoverText = raw_tag.slice(16).replaceAll(/^['"]|['"]$/g, '');
                next.underline = true;
            } else if (lower.startsWith('hover:show_item:') || lower.startsWith('hover:show_entity:')) {
                next.hoverText = raw_tag.replaceAll(/^['"]|['"]$/g, '');
                next.underline = true;
            } else if (lower.startsWith('click:')) {
                const rest = raw_tag.slice(6);
                const ci = rest.indexOf(':');
                if (ci !== -1) {
                    next.clickAction = rest.slice(0, ci);
                    next.clickValue = rest.slice(ci + 1).replaceAll(/^['"]|['"]$/g, '');
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
    const n = Number.parseInt(hex.replace('#', ''), 16);
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
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };
    return rgbToHex(
        Math.round(hue2rgb(h + 1 / 3) * 255),
        Math.round(hue2rgb(h) * 255),
        Math.round(hue2rgb(h - 1 / 3) * 255),
    );
}

function rainbowAt(t: number, phase = 0): string {
    return hslToHex(((t + phase) % 1 + 1) % 1);
}

function ObfuscatedSpan({ text, style }: Readonly<{ text: string; style?: React.CSSProperties }>) {
    const random = () => text.split('').map(() => OBFUSCATED_CHARS[Math.floor(Math.random() * OBFUSCATED_CHARS.length)]);
    const [chars, setChars] = useState(random);

    useEffect(() => {
        const id = setInterval(() => setChars(random()), 50);
        return () => clearInterval(id);
    }, [random, text]);

    return <span style={{ ...style, fontVariantNumeric: 'tabular-nums', display: 'inline-block' }}>{chars.join('')}</span>;
}

function GradientSpan({ text, colors, phase, style }: Readonly<{
    text: string;
    colors: string[];
    phase: number;
    style?: React.CSSProperties
}>) {
    return (
        <span style={style}>
            {text.split('').map((ch, i) => (
                <span key={i} style={{ color: gradientColor(colors, text.length <= 1 ? 0 : (i / (text.length - 1) + phase) % 1) }}>{ch}</span>
            ))}
        </span>
    );
}

function RainbowSpan({ text, phase, style }: Readonly<{ text: string; phase: number; style?: React.CSSProperties }>) {
    return (
        <span style={style}>
            {text.split('').map((ch, i) => (
                <span key={i} style={{ color: rainbowAt(text.length <= 1 ? 0 : i / (text.length - 1), phase) }}>{ch}</span>
            ))}
        </span>
    );
}

function HoverTooltip({ children, text }: Readonly<{ children: React.ReactNode; text: string }>) {
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

function RenderedText({ raw, style, isSignMode = false }: Readonly<{ raw: string; style?: React.CSSProperties; isSignMode?: boolean }>) {
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
        .replaceAll(/[&§]([0-9a-fA-F])/g, (_, c) => { const n = LEGACY_CODE_TO_MM[c.toLowerCase()]; return n ? `<${n}>` : `&${c}`; })
        .replaceAll(/[&§](#[0-9a-fA-F]{6})/g, (_, hex) => `<${hex}>`)
        .replaceAll(/[&§]l/gi, '<bold>')
        .replaceAll(/[&§]o/gi, '<italic>')
        .replaceAll(/[&§]n/gi, '<underlined>')
        .replaceAll(/[&§]m/gi, '<strikethrough>')
        .replaceAll(/[&§]k/gi, '<obfuscated>')
        .replaceAll(/[&§]r/gi, '<reset>')
        .replaceAll('\n', '<newline>');
}

function toLegacy(raw: string): string {
    const nameToCode = Object.fromEntries(Object.entries(LEGACY_CODE_TO_MM).map(([k, v]) => [v, k]));
    return raw
        .replaceAll(/<newline>/gi, '\n')
        .replaceAll(/<([a-z_]+)>/g, (_, tag) => {
            if (nameToCode[tag]) return `&${nameToCode[tag]}`;
            const map: Record<string, string> = { bold: '&l', italic: '&o', underlined: '&n', strikethrough: '&m', obfuscated: '&k', reset: '&r' };
            return map[tag] ?? `<${tag}>`;
        })
        .replaceAll(/<(#[0-9a-fA-F]{6})>/g, (_, hex) => `&${hex}`);
}

function convertText(raw: string, isMini: boolean, doConvert: boolean): string {
    if (!doConvert) return raw;
    return isMini ? toMiniMessage(raw) : toLegacy(raw).replace(/\n/g, '\\n');
}

function ColorButton({ color, onClick }: Readonly<{ color: typeof LEGACY_COLORS[number]; onClick: () => void }>) {
    const isLight = Number.parseInt(color.hex.slice(1), 16) > 0x555555;
    const [isHover, setIsHover] = useState(false);
    return (
        <button
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            title={`&${color.code} · ${color.hex}`}
            onClick={onClick}
            className={`w-7 h-7 transition hover:bg-[color-mix(in_srgb,${color.hex},white_40%)] rounded-md border border-black/30 cursor-pointer flex items-center justify-center shrink-0`}
            style={{ backgroundColor: isHover ? `color-mix(${color.hex}, black 20%)` : color.hex, }}
        >
            <p className='text-xs font-mono' style={{ color: `color-mix(${color.hex}, ${isLight ? 'black 50%' : 'white 90%'})` }}>{color.code.length > 1 ? '' : `&${color.code}`}</p>
        </button>
    );
}

function MagicButton({ onClick, label }: Readonly<{ onClick: () => void; label: string }>) {
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
            className="px-2 py-1 rounded-md bg-fd-gray border border-fd-border hover:bg-fd-muted-gray transition-colors text-xs cursor-pointer"
            style={{ fontVariantNumeric: 'tabular-nums', width: `100` }}
        >
            {chars.join('')}
        </button>
    );
}

function GradientButton({ onClick, disabled }: Readonly<{ onClick: () => void; disabled?: boolean }>) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-2 py-1 rounded-md border text-xs transition-colors ${disabled ? 'bg-fd-gray border-fd-border/50 cursor-not-allowed opacity-40' : 'bg-fd-gray border-fd-border hover:bg-fd-muted-gray cursor-pointer'}`}
        >
            <span style={disabled ? {} : { background: 'linear-gradient(90deg,#f00,#00f)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                gradient
            </span>
        </button>
    );
}

function RainbowButton({ onClick, disabled }: Readonly<{ onClick: () => void; disabled?: boolean }>) {
    const text = 'rainbow';
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`px-2 py-1 rounded-md border text-xs transition-colors ${disabled ? 'bg-fd-gray border-fd-border/50 cursor-not-allowed opacity-40' : 'bg-fd-gray border-fd-border hover:bg-fd-muted-gray cursor-pointer'}`}
        >
            {text.split('').map((ch, i) => (
                <span key={i} style={disabled ? {} : { color: rainbowAt(i / (text.length - 1)) }}>{ch}</span>
            ))}
        </button>
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
    const [maxLines, setMaxLines] = useState<number>()
    const [maxCharsPerLine, setMaxCharsPerLine] = useState<number>()
    const pickerRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const tabHeaderRef = useRef<HTMLTextAreaElement>(null);
    const tabFooterRef = useRef<HTMLTextAreaElement>(null);

    let lines = raw.split('\n');

    useEffect(() => {
        if (maxCharsPerLine) {
            lines = lines.map(line => line.slice(0, maxCharsPerLine));
        }

        if (maxLines && lines.length > maxLines) {
            lines = lines.slice(0, maxLines);
        }

        const processed = lines.join('\n');
        if (processed !== raw) {
            setRaw(processed);
        }
    }, [maxLines, maxCharsPerLine]);


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

    const mc: React.CSSProperties = { fontFamily: 'Minecraft, monospace', fontSize: '1em' };

    const renderPreview = () => {
        switch (previewMode) {
            case 'tab': return (
                <div className="h-70 flex items-center justify-center bg-[url('/assets/minecrafttaiga.png')]  bg-center bg-cover overflow-hidden border rounded-lg">
                    <MinecraftTab tabText={
                        <div className='flex items-start gap-1'>
                            <div className='flex items-center gap-1'>
                                <RenderedText raw={raw} style={{ ...mc, color: '#FFFFFF', fontSize: '1.2em', marginBottom: '6px', textAlign: 'center' }} />
                            </div>
                        </div>}
                    />
                </div>
            );
            case 'chat': return (
                <div className="h-70 bg-[url('/assets/minecrafttaiga.png')] bg-center bg-cover overflow-hidden border rounded-lg">
                    <MinecraftChat addString={
                        <div className='flex items-start gap-1'>
                            <div className='flex items-start gap-1'>
                                <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>
                                    MISQZY:&#160;
                                    <RenderedText raw={raw} style={{
                                        ...mc,
                                        color: '#FFFFFF',
                                        textWrap: 'wrap',
                                        wordBreak: 'break-word',
                                        overflowWrap: 'break-word'
                                    }} />
                                </p>

                            </div>
                        </div>}
                    />
                </div>

            );
            case 'sign': return (
                <div className="h-70 relative w-full rounded-lg flex justify-center items-center overflow-hidden border border-fd-border bg-black">
                    <img src="/assets/minecrafttaiga.png" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                    <div className="relative z-10 w-48 h-24 flex items-start justify-center">
                        <img src="/assets/containers/sign.png" className="absolute -z-1" />
                        <RenderedText isSignMode raw={raw} style={{ ...mc, color: '#000000', fontSize: '1.2em', lineHeight: '1', textAlign: 'center', marginTop: '4px' }} />
                    </div>
                </div>
            );
            case 'book': return (
                <div className="h-70 relative w-full rounded-lg flex justify-center items-center overflow-hidden border border-fd-border bg-black">
                    <img src="/assets/minecrafttaiga.png" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                    <div className="relative z-10 w-48 h-59 flex items-start justify-start">
                        <img src="/assets/containers/book.webp" className="absolute -z-1 w-48" />
                        <RenderedText raw={raw} style={{ ...mc, color: '#2c1810', lineHeight: '1', marginLeft: '18px', marginTop: '32px' }} />
                    </div>
                </div>
            );
            case 'motd': return (
                <div className="h-70 font-[Minecraft] as relative w-full p-6 rounded-lg flex justify-center items-center overflow-hidden border border-fd-border bg-black">
                    <img src="/assets/dirt.webp" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="z-10 flex items-center bg-black/60 p-1 w-full">
                        <div className='flex items-center w-10 h-full shrink-0'>
                            <img src="/assets/server-icon.svg" className='w-full' alt="" />
                        </div>
                        <div className='px-1 gap-1 flex flex-col justify-center w-full h-full text-[1em]'>
                            <div className='flex items-center justify-between w-full'>
                                <p className='text-white! leading-3'>Server Name</p>
                                <p className='text-white/50! leading-3'>0/6</p>
                            </div>
                            <div className='leading-3 h-6 flex justify start flex-col'>
                                <RenderedText raw={raw} style={{ ...mc, color: '#606060', lineHeight: '12px' }} />
                            </div>
                        </div>
                    </div>
                </div>
            );
            case 'name': return (
                <div className="h-70 relative w-full rounded-lg flex justify-center items-center overflow-hidden border border-fd-border bg-black">
                    <img src="/assets/minecrafttaiga.png" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="relative z-10 flex items-center justify-center bg-black/50 text-[2em] px-1">
                        <RenderedText raw={raw} style={{ ...mc, color: '#Fff', lineHeight: '1' }} />
                        <img className='absolute top-10 max-w-45' src="/assets/player.png" />
                    </div>
                </div>
            );
            case 'lore': return (
                <div className="h-70 relative w-full rounded-lg overflow-hidden border border-fd-border bg-black">
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
                <div className="h-70 relative w-full font-[Minecraft] rounded-lg overflow-hidden border">
                    <img src="/assets/dirt.webp" className="absolute inset-0 w-full h-full object-cover" />
                    <div className="relative gap-4 z-10 w-full h-full flex flex-col items-center justify-center px-8 text-center">
                        <span className='text-white/50 [text-shadow:2px_2px_0px_#212121] leading-[1em]'>Connection Lost</span>
                        <RenderedText raw={raw} style={{ ...mc, color: '#ffffff', lineHeight: '1em', textAlign: 'center' }} />
                        <div className='border-black border'>
                            <div className='bg-[#858585] [text-shadow:2px_2px_0px_#505050] text-white py-0.5 px-6 shadow-[inset_-2px_-4px_0px_1px_rgba(0,0,0,0.1)] border'>
                                Back to server list
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (showPicker && pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setShowPicker(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showPicker]);

    return (
        <div className="flex flex-col w-full gap-4">
            <div className="flex flex-col gap-4">
                <div className="flex gap-4 max-lg:flex-col">
                    <div className="flex flex-col gap-4 flex-1 min-w-0  bg-fd-article border p-6 rounded-2xl">
                        <div className="flex flex-col gap-2">
                            <p className="font-bold">{t('settings')}</p>
                            <p className="">{t('colors')}</p>
                            <div className="flex gap-1 flex-wrap">
                                {LEGACY_COLORS.map((c) => (
                                    <ColorButton key={c.code} color={c} onClick={() => insert(`&${c.code}`, `<${LEGACY_CODE_TO_MM[c.code]}>`)} />
                                ))}
                                <div className="relative">
                                    <button
                                        title={t('addHex')}
                                        onClick={() => { setShowPicker(true) }}
                                        className="w-7 h-7 rounded-md border-2 border-dashed hover:bg-fd-muted-gray border-fd-border bg-fd-gray transition cursor-pointer flex items-center justify-center text-sm shrink-0"
                                    >
                                        <Plus size={'1em'} />
                                    </button>
                                    {showPicker && (
                                        <div ref={pickerRef} className="absolute left-0 top-full mt-2 z-50 bg-fd-card border p-3 rounded-lg shadow-xl flex flex-col gap-2">
                                            <HexColorPicker color={pickerColor} onChange={setPickerColor} />
                                            <div className='flex gap-2 items-center h-fit'>
                                                <span className='h-7 w-7 shrink-0 rounded-sm border' style={{ backgroundColor: pickerColor }}></span>
                                                <div className="flex gap-1 items-center border rounded-md h-7 px-1.5">
                                                    <span className="text-xs text-fd-foreground font-mono">HEX:</span>
                                                    <input
                                                        type="text"
                                                        value={pickerColor}
                                                        onChange={(e) => setPickerColor(e.target.value)}
                                                        className="bg-transparent text-xs font-mono outline-none w-full text-fd-foreground"
                                                    />
                                                </div>
                                                <button className='w-7 h-7 cursor-pointer hover:bg-fd-muted-gray transition rounded-sm bg-fd-gray shrink-0 flex items-center justify-center' onClick={() => { insert(`&${pickerColor}`, `<${pickerColor}>`); setShowPicker(false); LEGACY_COLORS.push({ code: pickerColor, hex: pickerColor }) }}>
                                                    <Plus size={'1.2em'} />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="">{t('formats')}</p>
                            <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-1">
                                <button onClick={() => insert('&l', '<bold>')} className="px-2 py-1 rounded-md bg-fd-gray border border-fd-border hover:bg-fd-muted-gray transition-colors text-xs cursor-pointer font-bold">{t('bold')}</button>
                                <button onClick={() => insert('&o', '<italic>')} className="px-2 py-1 rounded-md bg-fd-gray border border-fd-border hover:bg-fd-muted-gray transition-colors text-xs cursor-pointer italic">{t('italic')}</button>
                                <MagicButton onClick={() => insert('&k', '<obfuscated>')} label={t('magic')} />
                                <button onClick={() => insert('&n', '<underlined>')} className="px-2 py-1 rounded-md bg-fd-gray border border-fd-border hover:bg-fd-muted-gray transition-colors text-xs cursor-pointer underline">{t('underline')}</button>
                                <button onClick={() => insert('&m', '<strikethrough>')} className="px-2 py-1 rounded-md bg-fd-gray border border-fd-border hover:bg-fd-muted-gray transition-colors text-xs cursor-pointer line-through">{t('strike')}</button>
                                <button onClick={() => insert('&r', '<reset>')} className="items-center gap-1 px-2 py-1 rounded-md bg-fd-gray border border-fd-border hover:bg-fd-muted-gray transition-colors text-xs cursor-pointer">⟳ {t('reset')}</button>
                                <button onClick={() => insert('\n', '<newline>')} className="px-2 py-1 rounded-md bg-fd-gray border border-fd-border hover:bg-fd-muted-gray transition-colors text-xs cursor-pointer">{t('newline')}</button>

                                <GradientButton disabled={!isMini} onClick={() => insertAtCursor('<gradient:#ff0000:#0000ff>text</gradient>', -15)} />
                                <RainbowButton disabled={!isMini} onClick={() => insertAtCursor('<rainbow>text</rainbow>', -14)} />

                                {MINI_TAGS.filter(tag => !['gradient', 'rainbow', 'newline'].includes(tag.label)).map(tag => (
                                    <button
                                        key={tag.label}
                                        disabled={!isMini}
                                        onClick={() => isMini && insertAtCursor(tag.insert, tag.cursorOffset ?? 220)}
                                        className={`px-2 py-1 rounded-md border text-xs transition-colors ${isMini
                                            ? 'bg-fd-gray border-fd-border hover:bg-fd-muted-gray cursor-pointer'
                                            : 'bg-fd-gray border-fd-border/50 cursor-not-allowed opacity-40'
                                            }`}
                                    >
                                        {tag.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="">{t('outputFormat')}</p>
                            <div className="flex items-center gap-3">
                                <SelectBlock
                                    values={[
                                        { label: 'Legacy (&)', value: 'legacy' },
                                        { label: 'MiniMessage', value: 'minimessage' },
                                    ]}
                                    onChange={(v) => setFormat(v)}
                                    defaultValue="legacy"
                                />
                            </div>
                        </div>
                        <div className='flex gap-1 items-center'>
                            <Checkbox checked={convertOutput} onChange={setConvertOutput} />
                            <p>{t('convertOutput')}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="">{t('input')}</p>
                            <InputText
                                value={raw}
                                onChange={(e) => (setRaw(e.target.value))}
                                placeholder={t('placeholder')}
                                textareaRef={textareaRef}
                                clearText={() => (setRaw(''))}
                                maxLines={previewMode === 'sign' ? 4 : previewMode === 'book' ? 11 : previewMode === 'motd' ? 2 : previewMode === 'name' ? 1 : null}
                                maxCharsPerLine={previewMode === 'sign' ? 16 : previewMode === 'book' ? 16 : previewMode === 'motd' ? 29 : previewMode === 'name' ? 16 : null}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <p className="">{t('output')}</p>
                            <div className="font-mono">
                                <TextOutput text={convertText(raw, isMini, convertOutput)} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 w-1/3 max-lg:w-full bg-fd-article border p-6 rounded-2xl">
                        <p className="font-bold">{t('preview')}</p>
                        <div className="shrink-0">
                            {renderPreview()}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <p>{t('display')}</p>
                            <div className="grid grid-cols-2 gap-1">
                                {PREVIEW_MODES.map((m) => (
                                    <button
                                        key={m}
                                        onClick={() => {
                                            setPreviewMode(m)
                                            setMaxLines(m === 'sign' ? 4 : m === 'book' ? 11 : m === 'motd' ? 2 : m === 'name' ? 1 : undefined)
                                            setMaxCharsPerLine(m === 'sign' ? 16 : m === 'book' ? 16 : m === 'motd' ? 29 : m === 'name' ? 16 : undefined)
                                        }}
                                        className={`p-3 w-full text-xs font-bold rounded-lg cursor-pointer transition-colors ${previewMode === m
                                            ? 'bg-fd-primary text-fd-primary-foreground'
                                            : 'bg-fd-gray hover:bg-fd-muted-gray text-fd-gray-foreground'
                                            }`}
                                    >
                                        {t(`previews.${m}`)}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}