'use client'

import Image from "next/image";
import {useCurrentTheme} from "@/lib/current-theme";

interface ThemeImageProps {
    src: string;
    width?: number;
    height?: number;
    alt?: string;
    className?: string;
}


export default function ThemeImage({src, width, height, alt, className}: ThemeImageProps) {


    const currentTheme = useCurrentTheme();
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
