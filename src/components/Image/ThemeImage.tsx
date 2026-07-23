'use client'

import { useTheme } from 'next-themes'
import Image from "next/image";
import { useSyncExternalStore } from 'react';

interface ThemeImageProps {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
    className?: string;
}

const emptySubscribe = () => () => {};

export default function ThemeImage({src, width, height, alt, className}: ThemeImageProps) {
    const isMounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    const { resolvedTheme } = useTheme();

    const currentTheme = isMounted && resolvedTheme ? resolvedTheme : 'dark';
    const imageSrc = `${src.split('.')[0]}_${currentTheme}.webp`;

    return (
        <div>
            <Image
                src={imageSrc}
                width={width ?? 100}
                height={height ?? 100}
                alt={alt ?? 'alt'}
                className={className}/>
        </div>
    )
}
