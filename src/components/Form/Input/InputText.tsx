import { CornerDownLeft, LoaderCircle } from "lucide-react";
import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, Ref } from "react";
import { useTranslations } from "next-intl";

interface InputTextProps {
    ref?: Ref<HTMLInputElement>,
    value?: string,
    onChange?: ChangeEventHandler<HTMLInputElement, HTMLInputElement>,
    onKeyDown?: KeyboardEventHandler,
    buttonClick?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    placeholder?: string,
    onlyLatin?: boolean,
}

export default function InputText({ ref, value, onChange, onKeyDown, buttonClick, disabled, placeholder, onlyLatin }: InputTextProps) {
    const t = useTranslations('Tools.Form.InputText')
    return (
        <div className='bg-fd-card w-full flex text-fd-foreground p-2 rounded-md border border-transparent focus-within:border-fd-primary transition-colors'>
            <input
                ref={ref}
                type="text"
                value={value}
                disabled={disabled}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="cursor-text outline-none bg-transparent w-full"
                placeholder={placeholder ? placeholder : t('placeholder')}
                onInput={onlyLatin ? (e) => {
                    const target = e.target as HTMLInputElement;
                    target.value = target.value.replace(/[^a-zA-Z_0-9]/g, '');
                } : undefined}
            />
            {buttonClick && <button
                onClick={buttonClick}
                disabled={disabled}
                className="cursor-pointer bg-fd-gray hover:bg-fd-muted-gray text-fd-gray-foreground transition h-fit w-fit px-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {disabled ? <LoaderCircle className="w-[1em] animate-spin" /> : <CornerDownLeft className="w-[1em]" />}
            </button>}
        </div>
    )
}