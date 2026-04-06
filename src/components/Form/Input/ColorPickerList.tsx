import { useState, useRef, useEffect } from "react";
import { Plus, Trash2, ArrowUp, ArrowDown } from "lucide-react";
import { HexColorPicker } from "react-colorful";

interface ColorPickerListProps {
    label: string;
    colors: string[];
    onChange: (colors: string[]) => void;
    onColorChange?: (index: number, color: string) => void;
    maxColors?: number;
}

export function ColorPickerList({
    colors,
    onChange,
    label,
    maxColors = Infinity
}: ColorPickerListProps) {
    const [activePickerIndex, setActivePickerIndex] = useState<number | null>(null);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setActivePickerIndex(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const updateColor = (index: number, newColor: string) => {
        const updated = [...colors];
        updated[index] = newColor;
        onChange(updated);
    };

    const addColor = () => {
        if (colors.length >= maxColors) return;
        onChange([...colors, "#ffffff"]);
    };

    const removeColor = (index: number) => {
        if (colors.length > 1) {
            onChange(colors.filter((_, i) => i !== index));
            if (activePickerIndex === index) setActivePickerIndex(null);
        }
    };

    const moveColorUp = (index: number) => {
        if (index === 0) return;
        const updated = [...colors];
        [updated[index - 1], updated[index]] = [updated[index], updated[index - 1]];
        onChange(updated);
        if (activePickerIndex === index) setActivePickerIndex(index - 1);
        else if (activePickerIndex === index - 1) setActivePickerIndex(index);
    };

    const moveColorDown = (index: number) => {
        if (index === colors.length - 1) return;
        const updated = [...colors];
        [updated[index + 1], updated[index]] = [updated[index], updated[index + 1]];
        onChange(updated);
        if (activePickerIndex === index) setActivePickerIndex(index + 1);
        else if (activePickerIndex === index + 1) setActivePickerIndex(index);
    };

    const isMaxReached = colors.length >= maxColors;

    return (
        <div className="flex flex-col gap-1 relative" ref={pickerRef}>
            <div className="flex justify-between items-center">
                <p>{label}</p>
                <button
                    onClick={addColor}
                    disabled={isMaxReached}
                    className={`text-fd-muted-foreground p-0.5 rounded-sm transition ${isMaxReached
                        ? "hidden"
                        : "cursor-pointer hover:bg-fd-card"
                        }`}
                >
                    <Plus size={1.2 + "em"} />
                </button>
            </div>

            {colors.map((color, idx) => (
                <div key={idx} className="flex flex-col gap-2 bg-fd-card p-2 rounded-md relative">
                    <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setActivePickerIndex(activePickerIndex === idx ? null : idx)}
                                style={{ backgroundColor: color }}
                                className="size-6 cursor-pointer rounded-sm transition-transform"
                            />
                            <p className="font-bold font-mono text-sm" style={{ color: color.toLowerCase() }}>
                                {color.toUpperCase()}
                            </p>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => moveColorUp(idx)}
                                disabled={idx === 0}
                                className={`transition p-1 rounded ${idx === 0
                                    ? "hidden"
                                    : "cursor-pointer bg-fd-primary/20 text-fd-primary hover:bg-fd-primary/30"
                                    }`}
                            >
                                <ArrowUp size={"1em"} />
                            </button>
                            <button
                                onClick={() => moveColorDown(idx)}
                                disabled={idx === colors.length - 1}
                                className={`transition p-1 rounded ${idx === colors.length - 1
                                    ? "hidden"
                                    : "cursor-pointer bg-fd-primary/20 text-fd-primary hover:bg-fd-primary/30"
                                    }`}
                            >
                                <ArrowDown size={"1em"} />
                            </button>
                            {colors.length > 1 && (
                                <button
                                    onClick={() => removeColor(idx)}
                                    className="transition cursor-pointer bg-fd-red hover:bg-fd-muted-red text-fd-red-foreground p-1 rounded"
                                >
                                    <Trash2 size={"1em"} />
                                </button>
                            )}
                        </div>
                    </div>

                    {activePickerIndex === idx && (
                        <div className="absolute left-0 bottom-full mb-2 z-50 bg-fd-card border p-3 rounded-lg shadow-xl flex flex-col gap-2">
                            <HexColorPicker color={color} onChange={(newColor) => updateColor(idx, newColor)} />
                            <div className="flex gap-1 items-center border p-1.5 rounded-md">
                                <span className="text-xs text-fd-foreground font-mono">HEX:</span>
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => updateColor(idx, e.target.value)}
                                    className="bg-transparent text-xs font-mono outline-none w-full text-fd-foreground"
                                />
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}