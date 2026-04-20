'use client';
import { useEffect, useState, useTransition, useRef, useMemo } from 'react';
import { FileUploader } from '@/components/Form/Input/FileUploader';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import MinecraftTab from '@/components/Assets/MinecraftTab';
import { LoaderCircle, Pause } from "lucide-react";
import '@/app/globals.css'

export const TextureGenerator = () => {
    const [actionData, setActionData] = useState<any>(null);
    const [actionError, setActionError] = useState<string | null | number>(null);
    const [previewData, setPreviewData] = useState<any[]| null>(null);
    const [filename, setFilename] = useState<string>('skin');
    const [generatedFrames, setGeneratedFrames] = useState<any[]>([]);
    const [isGenerating, setIsGenerating] = useState(false);
    const [latestKey, setLatestKey] = useState<string | null>(null);
    const [gridSize, setGridSize] = useState<{ cols: number; rows: number } | null>(null);

    const [isProcessingPreview, startPreviewTransition] = useTransition();
    const t = useTranslations('Tools.TextureGenerator');

    const framesAccumulatorRef = useRef<any[]>([]);
    const animatedKeysRef = useRef<Set<string>>(new Set());
    const pendingItemsRef = useRef<any[]>([]);
    const isStoppedRef = useRef(false);

    const handleReset = () => {
        isStoppedRef.current = true;
        setPreviewData(null);
        setActionData(null);
        setActionError(null);
        setFilename('skin');
        setGeneratedFrames([]);
        setLatestKey(null);
        setGridSize(null);
        setIsGenerating(false);
        framesAccumulatorRef.current = [];
        animatedKeysRef.current = new Set();
        pendingItemsRef.current = [];
    };

    const handleStop = () => {
        isStoppedRef.current = true;
        setIsGenerating(false);
    };

    useEffect(() => {
        if (actionData?.success && actionData?.data) {
            const jsonString = JSON.stringify(actionData.data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${actionData.filename || 'skin'}.json`;
            link.click();
            window.URL.revokeObjectURL(url);
        }
    }, [actionData]);

    const handleFileSelect = (file: File) => {
        isStoppedRef.current = true;
        setActionError(null);
        setActionData(null);
        setGeneratedFrames([]);
        setLatestKey(null);
        setGridSize(null);
        setIsGenerating(false);
        framesAccumulatorRef.current = [];
        animatedKeysRef.current = new Set();
        pendingItemsRef.current = [];

        startPreviewTransition(async () => {
            const formData = new FormData();
            formData.append('image', file);
            const res = await fetch('/api/mineskin/generate', { method: 'POST', body: formData });
            if (!res.ok) {
                const err = await res.json();
                if (err.status === 422) setActionError(t('Errors.422'));
                else if (err.status === 413) setActionError("Максимальный размер изображение 256 на 256 пикселей");
                else setActionError("Поврежденный или неверный файл");
                return;
            }
            const result = await res.json();
            if (result.imageArray) {
                setPreviewData(result.imageArray);
                setFilename(result.filename || 'skin');
                const maxX = Math.max(...result.imageArray.map((i: any) => i.x));
                const maxY = Math.max(...result.imageArray.map((i: any) => i.y));
                setGridSize({ cols: maxX + 1, rows: maxY + 1 });
            }
        });
    };

    const runGeneration = async (items: any[]) => {
        setIsGenerating(true);
        isStoppedRef.current = false;

        for (let i = 0; i < items.length; i++) {
            if (isStoppedRef.current) {
                pendingItemsRef.current = items.slice(i);
                setIsGenerating(false);
                return;
            }

            const item = items[i];

            try {
                const formData = new FormData();
                formData.append('skin', item.skin);

                const res = await fetch('/api/mineskin/generate', { method: 'POST', body: formData });

                if (isStoppedRef.current) {
                    pendingItemsRef.current = items.slice(i);
                    setIsGenerating(false);
                    return;
                }

                const data = await res.json();

                if (data.success) {
                    const frame = { x: item.x, y: item.y, imageBlock: item.imageBlock };
                    const key = `${frame.x}-${frame.y}`;
                    framesAccumulatorRef.current.push(frame);
                    setGeneratedFrames(prev => [...prev, frame]);
                    setLatestKey(key);
                    setTimeout(() => { animatedKeysRef.current.add(key); }, 500);

                    if (data.delay && !isStoppedRef.current) {
                        await new Promise<void>(resolve => {
                            const timeout = setTimeout(resolve, data.delay);
                            const check = setInterval(() => {
                                if (isStoppedRef.current) {
                                    clearTimeout(timeout);
                                    clearInterval(check);
                                    resolve();
                                }
                            }, 100);
                        });
                    }
                }
            } catch (err: any) {
                console.error(`Frame error ${item.x}:${item.y}:`, err);
            }
        }

        if (!isStoppedRef.current) {
            pendingItemsRef.current = [];
            const finalFrames = framesAccumulatorRef.current;
            setActionData({
                success: true,
                data: {
                    lastModified: Date.now(),
                    frames: finalFrames.map((f: any) => ({
                        x: f.x,
                        y: f.y,
                        value: f.imageBlock.split(',')[1]
                    }))
                },
                filename,
            });
        }

        setIsGenerating(false);
    };

    const handleStartGeneration = async () => {
        if (!previewData) return;
        setActionError(null);

        if (pendingItemsRef.current.length > 0) {
            await runGeneration(pendingItemsRef.current);
            return;
        }

        setGeneratedFrames([]);
        setLatestKey(null);
        framesAccumulatorRef.current = [];
        animatedKeysRef.current = new Set();
        setActionData(null);
        pendingItemsRef.current = [];
        await runGeneration(previewData);
    };

    const displayArray = useMemo(() => {
        const source = generatedFrames.length > 0 ? generatedFrames : previewData;
        if (!source) return null;
        const seen = new Set<string>();
        return source.filter((image: any) => {
            const key = `${image.x}-${image.y}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }, [generatedFrames, previewData]);

    const isPaused = !isGenerating && pendingItemsRef.current.length > 0;

    type PreviewProps = {
        inputLabel?: string;
        inputActiveLabel?: string;
        inputClassName?: string;
    };

    function Preview({ inputLabel, inputActiveLabel, inputClassName }: PreviewProps) {
        return (
            <div
                className='grid justify-center gap-y-0.5'
                style={gridSize ? {
                    gridTemplateColumns: `repeat(${gridSize.cols}, 1rem)`,
                    gridTemplateRows: `repeat(${gridSize.rows}, 1rem)`,
                } : undefined}
            >
                {displayArray && displayArray.map((image: any, index: number) => {
                    const key = `${image.x}-${image.y}`;
                    const isNew = generatedFrames.length > 0 && key === latestKey && !animatedKeysRef.current.has(key);
                    return (
                        <img
                            key={key}
                            src={image.imageBlock}
                            alt={`block-${index}`}
                            className={`w-4 h-4 object-contain ${isProcessingPreview ? 'hidden' : ''}`}
                            style={{
                                gridColumnStart: image.x + 1,
                                gridRowStart: image.y + 1,
                                animation: isNew ? 'blockFadeIn 0.4s ease-out forwards' : undefined,
                            }}
                        />
                    );
                })}
                {!displayArray && (
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        isPending={isProcessingPreview}
                        label={inputLabel}
                        activeLabel={inputActiveLabel}
                        className={inputClassName}
                    />
                )}
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full gap-4 relative">
            <div className="flex flex-col gap-4">
                <div className='font-[Minecraft] bg-[url("/assets/minecraftjungle.png")] bg-center bg-cover pt-4 relative flex flex-col rounded-2xl border-2 overflow-hidden'>
                    <div className='w-full h-fit flex justify-center pb-12'>
                        <MinecraftTab tabText={isProcessingPreview ? <LoaderCircle className='size-[0.8em] animate-spin text-fd-primary' /> : <Preview inputLabel={t('input')} inputClassName='w-44' inputActiveLabel={t('drag')} />} />
                    </div>
                    <div className='w-full'>
                        <div className='flex flex-col pl-1 w-fit pr-16 h-fit mb-5 bg-black/60 items-start justify-end gap-2'>
                            <div className='flex items-end gap-1'>
                                {isProcessingPreview ? <LoaderCircle className='size-[0.8em] animate-spin text-fd-primary' /> : <Preview inputClassName='py-1.5' />}
                                <div className='flex items-center gap-1 h-3.5'>
                                    <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>TheFaser:</p>
                                    <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>hello</p>
                                </div>
                            </div>
                            <div className='flex items-end gap-1'>
                                <div className='flex items-center gap-1 h-3.5'>
                                    <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>vpllll:</p>
                                    <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>hi</p>
                                </div>
                            </div>
                            <div className='flex items-end gap-1'>
                                <div className='flex items-center gap-1 h-3.5'>
                                    <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>Terrona:</p>
                                    <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>qq</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-1'>
                                <div className='flex items-center gap-1 h-3.5'>
                                    <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>Realepi_Bars_:</p>
                                </div>
                                {isProcessingPreview ? <LoaderCircle className='size-[0.8em] animate-spin text-fd-primary' /> : <Preview inputClassName='py-1.5' />}
                            </div>
                        </div>
                        <div className='flex w-full h-4 absolute bottom-0 bg-black/60 pb-2'></div>
                    </div>
                </div>

                <div className='w-full flex justify-end items-center gap-2'>
                    <button
                        type='button'
                        onClick={handleStartGeneration}
                        disabled={isProcessingPreview || isGenerating || (!previewData && !isPaused)}
                        className={`
                            w-fit px-5 py-1 rounded-lg text-nowrap
                            duration-100 cursor-pointer flex font-medium items-center
                            ${isProcessingPreview || isGenerating || (!previewData && !isPaused)
                            ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-70'
                            : 'bg-fd-primary hover:bg-fd-muted-primary shadow-md hover:shadow-lg text-fd-primary-foreground'}
                        `}
                    >
                        {isGenerating
                            ? <span className="flex items-center justify-center gap-2">{t('generation')}</span>
                            : isPaused ? t('resume') : t('startGeneration')
                        }
                    </button>

                    {isGenerating ? (
                        <button
                            type='button'
                            onClick={handleStop}
                            className="bg-fd-red hover:bg-fd-muted-red text-fd-red-foreground cursor-pointer w-fit px-3 py-1 rounded-lg text-nowrap duration-100 flex font-medium items-center"
                        >
                            <Pause className='w-[1.2em]' />
                        </button>
                    ) : (
                        <button
                            type='button'
                            disabled={isProcessingPreview}
                            onClick={handleReset}
                            className="bg-fd-gray hover:bg-fd-muted-gray text-fd-gray-foreground cursor-pointer w-fit px-3 py-1 rounded-lg text-nowrap duration-100 flex font-medium items-center"
                        >
                            <Trash className='w-[1.2em]' />
                        </button>
                    )}
                </div>
            </div>

            {actionError && (
                <div className="p-4 bg-red-500/10 border-2 border-red-500/20 text-red-600 rounded-xl text-sm font-medium">
                    {actionError}
                </div>
            )}
        </div>
    );
};