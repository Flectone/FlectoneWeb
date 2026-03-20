'use client';
import { useRef, useState } from 'react';
import { TextureGenerator } from '@/components/Tools/TextureGenerator/TextureGenerator/TextureGenerator';
import { Trash } from 'lucide-react'
import Title from '@/components/Title/Title';
import { useTranslations } from 'next-intl';
import Callout from '@/components/Pulse/Callout/Callout';

export default function TextureGeneratorPage() {
    const t = useTranslations('Tools.TextureGenerator');

    return (
        <div className="w-7xl flex gap-4 flex-col items-center justify-center">
            <Title text={t('title')} />
            <p className='w-full'>{t('description')}</p>
            <Callout margin='none' title='' type='warn'>{t('warn')}</Callout>
            <TextureGenerator />
        </div>
    );
}