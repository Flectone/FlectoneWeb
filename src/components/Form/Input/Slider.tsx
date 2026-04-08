interface SliderProps {
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: number) => void;
}

export function Slider({
    value,
    min,
    max,
    step = 1,
    onChange,
}: SliderProps) {
    return (
        <div className="flex flex-col gap-1">
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full cursor-pointer mt-1 h-2 bg-fd-gray text-fd-gray-foreground rounded-lg appearance-none accent-blue-600"
            />
        </div>
    );
}