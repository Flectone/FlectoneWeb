import { Check } from "lucide-react";

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
}

export default function Checkbox({
    checked,
    onChange,
    disabled = false,
}: CheckboxProps) {
    const handleClick = () => {
        if (!disabled) {
            onChange(!checked);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <span
            className={`
                    w-[1em] h-[1em] cursor-pointer
                    ${checked ? 'bg-fd-primary hover:bg-fd-muted-primary' : 'bg-fd-gray hover:bg-fd-muted-gray'}
                    rounded-sm 
                    flex items-center justify-center
                    transition
                `}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            role="checkbox"
            aria-checked={checked}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
        >
            {checked && (
                <Check className=" w-[0.7em] text-fd-primary-foreground" />
            )}
        </span>
    );
}