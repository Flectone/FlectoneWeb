'use client';
import { useState, useMemo, useEffect, useRef } from "react";
import MinecraftTab from "../Assets/MinecraftTab";
import { YamlFormatter } from "../Form/YamlFormatter";
import { Plus, Trash2, ArrowUp, ArrowDown, RotateCcw } from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { useTranslations } from "next-intl";

type AnimationStyle = 'ltr' | 'rtl';

const DEFAULT_TEXT = 'Flectone';
const DEFAULT_COLORS = ['#a6dbff', '#5faefa'];
const DEFAULT_TICKS = 1;
const DEFAULT_CHARS_PER_COLOR = 1;

export default function TextAnimation() {
    const [text, setText] = useState<string>(DEFAULT_TEXT);
    const [frameIndex, setFrameIndex] = useState<number>(0);
    const [ticks, setTicks] = useState<number>(DEFAULT_TICKS);
    const [charsPerColor, setCharsPerColor] = useState<number>(DEFAULT_CHARS_PER_COLOR);
    const [gradientLength, setGradientLength] = useState<number | null>(null);
    const [animationStyle, setAnimationStyle] = useState<AnimationStyle>('ltr');

    const [activePickerIndex, setActivePickerIndex] = useState<number | null>(null);
    const pickerRef = useRef<HTMLDivElement>(null);

    const effectiveGradientLength = (gradientLength ?? text.length * 2) || 1;
    const [pickerColors, setPickerColors] = useState<string[]>(DEFAULT_COLORS);

    const inputRef = useRef<HTMLInputElement>(null);

    const resetAll = () => {
        setText(DEFAULT_TEXT);
        setFrameIndex(0);
        setTicks(DEFAULT_TICKS);
        setCharsPerColor(DEFAULT_CHARS_PER_COLOR);
        setGradientLength(null);
        setAnimationStyle('ltr');
        setPickerColors(DEFAULT_COLORS);
        setActivePickerIndex(null);
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setActivePickerIndex(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const hexToRgb = (hex: string): [number, number, number] => {
        const sanitizedHex = hex.replace('#', '');
        const r = parseInt(sanitizedHex.substring(0, 2), 16);
        const g = parseInt(sanitizedHex.substring(2, 4), 16);
        const b = parseInt(sanitizedHex.substring(4, 6), 16);
        return [r, g, b];
    };

    const rgbToHex = (r: number, g: number, b: number): string => {
        const toHex = (c: number) => Math.round(c).toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    };

    const generateGradientArray = (colorStart: string, colorEnd: string, steps: number): string[] => {
        if (steps <= 0) return [];
        if (steps === 1) return [colorStart];

        const [r1, g1, b1] = hexToRgb(colorStart);
        const [r2, g2, b2] = hexToRgb(colorEnd);
        const gradient: string[] = [];

        for (let i = 0; i < steps; i++) {
            const t = i / (steps - 1);
            const r = r1 + (r2 - r1) * t;
            const g = g1 + (g2 - g1) * t;
            const b = b1 + (b2 - b1) * t;
            gradient.push(rgbToHex(r, g, b));
        }
        return gradient;
    };

    const baseGradient = useMemo(() => {
        if (pickerColors.length === 0) return [];
        if (pickerColors.length === 1) return Array(effectiveGradientLength).fill(pickerColors[0]);

        const fullGradient: string[] = [];
        const stepsPerSegment = Math.max(2, Math.floor(effectiveGradientLength / pickerColors.length));

        for (let i = 0; i < pickerColors.length; i++) {
            const start = pickerColors[i];
            const end = pickerColors[(i + 1) % pickerColors.length];

            const segment = generateGradientArray(start, end, stepsPerSegment);
            fullGradient.push(...segment.slice(0, -1));
        }

        while (fullGradient.length < effectiveGradientLength && fullGradient.length > 0) {
            fullGradient.push(fullGradient[fullGradient.length - 1]);
        }

        return fullGradient;
    }, [pickerColors, effectiveGradientLength]);

    const shiftArray = (arr: string[], shift: number, style: AnimationStyle) => {
        if (arr.length === 0) return [];

        let offset = shift % arr.length;

        if (style === 'rtl') {
            offset = (arr.length - offset) % arr.length;
        }

        return [...arr.slice(-offset), ...arr.slice(0, -offset)];
    };

    useEffect(() => {
        if (baseGradient.length === 0) return;

        const intervalMs = ticks * 50;
        const interval = setInterval(() => {
            setFrameIndex((prev) => (prev + 1) % baseGradient.length);
        }, intervalMs);

        return () => clearInterval(interval);
    }, [baseGradient.length, ticks]);

    const yamlOutput = useMemo(() => {
        if (!text || baseGradient.length === 0) return '';

        const frames: string[] = [];
        const totalFrames = baseGradient.length;

        for (let f = 0; f < totalFrames; f++) {
            const shiftedColors = shiftArray(baseGradient, f, animationStyle);
            let frameText = '';

            for (let i = 0; i < text.length; i++) {
                const colorIndex = Math.floor(i / charsPerColor) % shiftedColors.length;
                const color = shiftedColors[colorIndex];
                frameText += `<${color}>${text[i]}`;
            }
            frames.push(`  - "${frameText}"`);
        }

        return `${text}:\n${frames.join('\n')}`;
    }, [text, baseGradient, ticks, charsPerColor, animationStyle]);

    const animatedPreview = useMemo(() => {
        if (!text) return <span className="text-zinc-500">Введите текст ниже</span>;
        if (baseGradient.length === 0) return <span>{text}</span>;

        const shiftedColors = shiftArray(baseGradient, frameIndex, animationStyle);
        const speedInSeconds = (ticks * 50) / 1000;

        return text.split('').map((char, i) => {
            const colorIndex = Math.floor(i / charsPerColor) % shiftedColors.length;
            const color = shiftedColors[colorIndex];

            return (
                <span
                    key={i}
                    style={{
                        color: color,
                        transition: `color ${speedInSeconds}s linear`,
                    }}
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            );
        });
    }, [text, baseGradient, frameIndex, charsPerColor, animationStyle, ticks]);

    const updateColor = (index: number, newColor: string) => {
        const updated = [...pickerColors];
        updated[index] = newColor;
        setPickerColors(updated);
    };

    const addColor = () => {
        setPickerColors([...pickerColors, '#ffffff']);
    };

    const removeColor = (index: number) => {
        if (pickerColors.length > 1) {
            setPickerColors(pickerColors.filter((_, i) => i !== index));
            if (activePickerIndex === index) setActivePickerIndex(null);
        }
    };

    const moveColorUp = (index: number) => {
        if (index === 0) return;
        const updated = [...pickerColors];
        [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
        setPickerColors(updated);
        if (activePickerIndex === index) setActivePickerIndex(index - 1);
        else if (activePickerIndex === index - 1) setActivePickerIndex(index);
    };

    const moveColorDown = (index: number) => {
        if (index === pickerColors.length - 1) return;
        const updated = [...pickerColors];
        [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
        setPickerColors(updated);
        if (activePickerIndex === index) setActivePickerIndex(index + 1);
        else if (activePickerIndex === index + 1) setActivePickerIndex(index);
    };

    const t = useTranslations('Tools.TextAnimation')

    return (
        <div className="flex w-full h-fit py-4 gap-4 text-white">
            <div className="w-1/3 flex flex-col gap-4">
                <div
                    onClick={() => inputRef.current?.focus()}
                    className="w-full shadow-md bg-[url('/assets/minecraftclouds.jpg')] p-4 flex justify-center items-center rounded-2xl border grow"
                >
                    <MinecraftTab tabText={
                        <div className="relative z-0 select-none flex flex-wrap justify-center px-4">
                            {animatedPreview}
                        </div>
                    } />
                </div>
                <div className="w-full flex flex-col gap-4 bg-fd-article h-fit rounded-2xl border shadow-md p-8">
                    <div className="flex flex-col gap-1">
                        <p>{t('Settings.text')}</p>
                        <div className='bg-fd-card text-fd-foreground p-2 rounded-md border border-transparent focus-within:border-fd-primary transition-colors'>
                            <input
                                ref={inputRef}
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                className="cursor-text outline-none bg-transparent w-full"
                                placeholder="Введите текст"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p>{t('Settings.interval')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{ticks} {t('Settings.ticks')} - {ticks * 50} {t('Settings.ms')}</code></p>
                        <input
                            type="range"
                            min="1"
                            max="40"
                            step="1"
                            value={ticks}
                            onChange={(e) => setTicks(Number(e.target.value))}
                            className="w-full cursor-pointer mt-1 h-2 bg-fd-gray  text-fd-gray-foreground rounded-lg appearance-none accent-blue-600"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p>{t('Settings.gradientBlur')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{effectiveGradientLength}</code></p>
                        <input
                            type="range"
                            min="2"
                            max="50"
                            step="1"
                            value={effectiveGradientLength}
                            onChange={(e) => setGradientLength(Number(e.target.value))}
                            className="w-full cursor-pointer mt-1 h-2 bg-fd-gray  text-fd-gray-foreground rounded-lg"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p>{t('Settings.symbols')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{charsPerColor}</code></p>
                        <input
                            type="range"
                            min="1"
                            max={text.length || 1}
                            step="1"
                            value={charsPerColor}
                            onChange={(e) => setCharsPerColor(Number(e.target.value))}
                            className="w-full cursor-pointer mt-1.5 h-1.5 bg-zinc-700 rounded-lg appearance-none "
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                            <p>{t('Settings.colors')}</p>
                            <button onClick={addColor} className="text-fd-muted-foreground p-0.5 rounded-sm cursor-pointer hover:bg-fd-card transition">
                                <Plus size={1.2 + 'em'} />
                            </button>
                        </div>
                        <div className="flex flex-col gap-2 relative" ref={pickerRef}>
                            {pickerColors.map((color, idx) => (
                                <div key={idx} className="flex flex-col gap-2 bg-fd-card p-2 rounded-md relative">
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => setActivePickerIndex(activePickerIndex === idx ? null : idx)}
                                                style={{ backgroundColor: color }}
                                                className="size-6 cursor-pointer rounded-sm transition-transform"
                                            />
                                            <p className="font-bold font-mono text-sm" style={{ color: color.toLowerCase() }}>{color.toUpperCase()}</p>
                                        </div>

                                        <div className="flex items-center gap-1">
                                            <button
                                                onClick={() => moveColorUp(idx)}
                                                disabled={idx === 0}
                                                className={`transition p-1 rounded ${idx === 0 ? 'hidden' : 'cursor-pointer bg-fd-primary/20 text-fd-primary hover:bg-fd-primary/30'}`}
                                            >
                                                <ArrowUp size={'1em'} />
                                            </button>
                                            <button
                                                onClick={() => moveColorDown(idx)}
                                                disabled={idx === pickerColors.length - 1}
                                                className={`transition p-1 rounded ${idx === pickerColors.length - 1 ? 'hidden' : 'cursor-pointer bg-fd-primary/20 text-fd-primary hover:bg-fd-primary/30'}`}
                                            >
                                                <ArrowDown size={'1em'} />
                                            </button>
                                            {pickerColors.length > 1 && (
                                                <button onClick={() => removeColor(idx)} className="transition cursor-pointer bg-fd-red hover:bg-fd-muted-red text-fd-red-foreground p-1 rounded">
                                                    <Trash2 size={'1em'} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {activePickerIndex === idx && (
                                        <div className="absolute left-0 bottom-full mb-2 z-50 bg-zinc-900 border border-zinc-700 p-3 rounded-lg shadow-xl flex flex-col gap-2">
                                            <HexColorPicker
                                                color={color}
                                                onChange={(newColor) => updateColor(idx, newColor)}
                                            />
                                            <div className="flex gap-1 items-center bg-zinc-800 p-1.5 rounded-md">
                                                <span className="text-xs text-zinc-400 font-mono">HEX:</span>
                                                <input
                                                    type="text"
                                                    value={color}
                                                    onChange={(e) => updateColor(idx, e.target.value)}
                                                    className="bg-transparent text-xs font-mono outline-none w-full text-white"
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p>{t('Settings.gradientMode')}</p>
                        <div className="w-full flex gap-1">
                            <button
                                onClick={() => setAnimationStyle('ltr')}
                                className={`p-3 w-1/2 text-xs font-bold rounded-lg cursor-pointer transition-colors ${animationStyle === 'ltr' ? 'bg-fd-primary text-fd-primary-foreground' : 'bg-fd-gray hover:bg-fd-muted-gray text-fd-gray-foreground'}`}
                            >
                                {t('Settings.ltr')}
                            </button>
                            <button
                                onClick={() => setAnimationStyle('rtl')}
                                className={`p-3 w-1/2 text-xs font-bold rounded-lg cursor-pointer transition-colors ${animationStyle === 'rtl' ? 'bg-fd-primary text-fd-primary-foreground' : 'bg-fd-gray hover:bg-fd-muted-gray text-fd-gray-foreground'}`}
                            >
                                {t('Settings.rtl')}
                            </button>
                        </div>
                    </div>
                    <button
                        onClick={resetAll}
                        className="bg-fd-gray font-bold transition hover:bg-fd-muted-gray text-fd-gray-foreground cursor-pointer flex justify-center items-center gap-1 py-2 rounded-md "
                    >
                        <RotateCcw size="1.2em" />
                        {t('Settings.reset')}
                    </button>
                </div>
            </div>
            <div className="w-2/3 bg-fd-article h-full p-8 rounded-2xl border shadow-md flex flex-col gap-2">
                <div className="flex flex-col grow">
                    <YamlFormatter yaml={yamlOutput} header={<p>{t('Output.frames')}</p>} />
                </div>
                <div className="flex flex-col">
                    <YamlFormatter hfull={false} yaml={`${text}:\n  interval: ${ticks}`} header={<p>{t('Output.interval')}</p>} />
                </div>
            </div>
        </div >
    );
}