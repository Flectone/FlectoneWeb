import { useState, useEffect, useRef } from 'react';

interface DropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: { value: string; label: string; fontFamily?: string }[];
    className?: string;
}

export default function Dropdown({ value, onChange, options, className }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`} ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full cursor-pointer bg-fd-card text-fd-foreground px-3 py-2 rounded-md
                            focus:outline-none focus:ring-1 focus:ring-fd-primary
                           transition-all duration-200 flex items-center justify-between"
                style={{
                    fontFamily: selectedOption?.fontFamily || 'inherit'
                }}
            >
                <span className="truncate">{selectedOption?.label || 'Выберите шрифт'}</span>

                <svg
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-fd-card border border-fd-border rounded-lg shadow-lg overflow-hidden">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full cursor-pointer text-left px-3 py-2 hover:bg-fd-muted transition-colors duration-150
                                       ${value === option.value ? 'bg-fd-primary/10 text-fd-primary' : 'text-fd-foreground'}`}
                            style={{ fontFamily: option.fontFamily || 'inherit' }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};