'use client';
import { useRef, useState } from 'react';

interface FileUploaderProps {
    onFileSelect: (file: File) => void;
    isPending: boolean;
    disabled?: boolean;
    label?: string;
    activeLabel?: string;
    className?: string;
}

export function FileUploader({
    onFileSelect,
    isPending,
    disabled,
    label,
    activeLabel,
    className = ""
}: FileUploaderProps) {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e: React.DragEvent) => {
        handleDrag(e);
        setIsDragging(false);
        if (disabled || isPending) return;

        const file = e.dataTransfer.files?.[0];
        if (file) {
            syncInput(file);
            onFileSelect(file);
        }
    };

    const syncInput = (file: File) => {
        if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileInputRef.current.files = dataTransfer.files;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) onFileSelect(file);
    };

    return (
        <label
            onDragOver={(e) => { handleDrag(e); setIsDragging(true); }}
            onDragLeave={(e) => { handleDrag(e); setIsDragging(false); }}
            onDrop={handleDrop}
            htmlFor="file-input"
            className={`
                relative flex flex-col items-center justify-center
                border-2 border-dashed cursor-pointer transition-all group
                ${isDragging ? 'border-fd-primary bg-fd-accent' : 'border-fd-primary hover:border-fd-primary/50 bg-fd-primary-foreground hover:bg-fd-primary-foreground/50'}
                ${disabled || isPending ? 'opacity-50 cursor-not-allowed' : ''}
                ${className}
            `}
        >
            <div className="flex flex-col items-center gap-2 p-4 text-center">
                <p className="text-sm text-fd-primary! transition group-hover:text-fd-primary/50!">
                    {isDragging ? activeLabel : label}
                </p>
            </div>

            <input
                ref={fileInputRef}
                id="file-input"
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
                disabled={disabled || isPending}
                onChange={handleChange}
            />
        </label>
    );
}