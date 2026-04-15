import { CornerDownLeft, LoaderCircle, Trash } from "lucide-react";
import { ChangeEventHandler, KeyboardEventHandler, MouseEventHandler, Ref, useRef } from "react";
import { useTranslations } from "next-intl";

interface InputTextProps {
    ref?: Ref<HTMLInputElement>,
    value?: string,
    onChange?: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    onKeyDown?: KeyboardEventHandler,
    buttonClick?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    placeholder?: string,
    onlyLatin?: boolean,
    clearText?: MouseEventHandler<HTMLButtonElement>,
    textareaRef?: Ref<HTMLTextAreaElement>,
    maxLines?: number | null,
    maxCharsPerLine?: number | null
}

export default function InputText({ ref, value, onChange, onKeyDown, buttonClick, disabled, placeholder, onlyLatin, clearText, textareaRef, maxLines, maxCharsPerLine }: InputTextProps) {
    const t = useTranslations('Tools.Form.InputText')
    if (textareaRef) return (
        <div className='bg-fd-card w-full flex text-fd-foreground p-2 rounded-md border border-transparent focus-within:border-fd-primary transition-colors'>
            <textarea
                ref={textareaRef}
                id="textInput"
                value={value}
                disabled={disabled}
                onChange={onChange}
                onKeyDown={onKeyDown}
                className="cursor-text outline-none bg-transparent w-full resize-none"
                placeholder={placeholder ? placeholder : t('placeholder')}
                onInput={(e) => {
                    const target = e.target as HTMLTextAreaElement;
                    if (onlyLatin) {
                        target.value = target.value.replace(/[^a-zA-Z_0-9]/g, '');
                    }
                    if (maxLines && target.value.split('\n').length > maxLines) {
                        const lines = target.value.split('\n');
                        const truncatedLines = lines.slice(0, maxLines);
                        target.value = truncatedLines.join('\n');
                    }
                    if (maxCharsPerLine) {
                        const lines = target.value.split('\n');
                        const truncatedLines = lines.map(line => {
                            if (line.length > maxCharsPerLine) {
                                return line.slice(0, maxCharsPerLine);
                            }
                            return line;
                        });
                        target.value = truncatedLines.join('\n');
                    }
                }}
            />
            {clearText && <button
                onClick={clearText}
                disabled={disabled}
                className="cursor-pointer bg-fd-gray hover:bg-fd-muted-gray text-fd-gray-foreground transition h-fit w-fit px-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Trash className="w-[1em]" />
            </button>}
            {buttonClick && <button
                onClick={buttonClick}
                disabled={disabled}
                className="cursor-pointer bg-fd-gray hover:bg-fd-muted-gray text-fd-gray-foreground transition h-fit w-fit px-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {disabled ? <LoaderCircle className="w-[1em] animate-spin" /> : <CornerDownLeft className="w-[1em]" />}
            </button>}
        </div>
    )
    return (
        <div className='bg-fd-card w-full flex text-fd-foreground p-2 rounded-md border border-transparent focus-within:border-fd-primary transition-colors'>
            <input
                ref={ref}
                id="textInput"
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
            {clearText && <button
                onClick={clearText}
                disabled={disabled}
                className="cursor-pointer bg-fd-gray hover:bg-fd-muted-gray text-fd-gray-foreground transition h-fit w-fit px-1 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <Trash className="w-[1em]" />
            </button>}
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