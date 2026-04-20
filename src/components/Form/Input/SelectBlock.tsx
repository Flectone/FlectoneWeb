import { useState, ReactNode } from "react";

interface SelectBlockProps<T extends string = string> {
    values: {
        label: string | ReactNode,
        value: T
    }[],
    onChange?: (value: T) => void,
    defaultValue?: T,
    grid?: number
}

export default function SelectBlock<T extends string = string>({
    values,
    onChange,
    defaultValue,
    grid
}: SelectBlockProps<T>) {
    const [activeValue, setActiveValue] = useState<T>(defaultValue || values[0]?.value);

    const handleClick = (value: T) => {
        setActiveValue(value);
        onChange?.(value);
    };

    return (
        <div className={`w-full ${grid ? `grid grid-cols-${grid}` : 'flex'} gap-1`}>
            {values.map((item) => (
                <button
                    key={item.value}
                    onClick={() => handleClick(item.value)}
                    className={`p-3 w-full text-xs font-bold rounded-lg cursor-pointer transition-colors ${activeValue === item.value
                        ? 'bg-fd-primary text-fd-primary-foreground'
                        : 'bg-fd-gray hover:bg-fd-muted-gray text-fd-gray-foreground'
                        }`}
                >
                    {item.label}
                </button>
            ))}
        </div>
    )
}
