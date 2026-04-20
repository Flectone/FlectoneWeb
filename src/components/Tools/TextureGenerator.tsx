// components/TextureGenerator.tsx
'use client';
import { useEffect, useState, useTransition, useRef } from 'react';
import { imageToHeadSkin } from '@/lib/texture-generator';
import { FileUploader } from '@/components/Form/Input/FileUploader';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import MinecraftTab from '@/components/Assets/MinecraftTab';
import { LoaderCircle, Pause } from "lucide-react";

export const TextureGenerator = () => {
    const [actionData, setActionData] = useState<any>(null);
    const [actionError, setActionError] = useState<string | null | number>(null);
    const [previewData, setPreviewData] = useState<any>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [generatedFrames, setGeneratedFrames] = useState<any[]>([]);

    const [isProcessingPreview, startPreviewTransition] = useTransition();
    const t = useTranslations('Tools.TextureGenerator');

    const abortControllerRef = useRef<AbortController | null>(null);
    const framesAccumulatorRef = useRef<any[]>([]);

    const handleReset = () => {
        setPreviewData(null);
        setActionData(null);
        setActionError(null);
        setSelectedFile(null);
        setGeneratedFrames([]);
        framesAccumulatorRef.current = [];
    };

    const handleStop = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
    }

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
        setActionError(null);
        setActionData(null);
        setSelectedFile(file);
        setGeneratedFrames([]);
        framesAccumulatorRef.current = [];

        startPreviewTransition(async () => {
            const result = await imageToHeadSkin(file);
            if (result.imageArray) setPreviewData(result.imageArray);
            if (result.status === 422) setActionError(t('Errors.422'));
            if (result.status === 413) setActionError("Максимальный размер изображение 256 на 256 пикселей");
            if (result.status === 400) setActionError("Поврежденный или неверный файл");
        });
    };

    const handleStartGeneration = async () => {
        if (!selectedFile) return;
        setActionError(null);
        setGeneratedFrames([]);
        framesAccumulatorRef.current = [];
        setActionData(null);

        if (abortControllerRef.current) abortControllerRef.current.abort();
        abortControllerRef.current = new AbortController();

        const formData = new FormData();
        formData.append('image', selectedFile);

        try {
            const response = await fetch('/api/mineskin/generate', {
                method: 'POST',
                body: formData,
                signal: abortControllerRef.current?.signal
            });

            if (!response.ok) {
                const errorData = await response.json();
                setActionError(errorData.error || 'Server error');
                return;
            }

            const reader = response.body?.getReader();
            const decoder = new TextDecoder();
            let buffer = '';

            while (true) {
                const { done, value } = await reader!.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop() || '';
                for (const line of lines) {
                    if (line.trim()) {
                        const frame = JSON.parse(line);
                        framesAccumulatorRef.current.push(frame);
                        setGeneratedFrames(prev => [...prev, frame]);
                    }
                }
            }

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
                imageArray: finalFrames,
                filename: response.headers.get('X-Filename') || 'skin',
            });

        } catch (err: any) {
            if (err.name === 'AbortError') {
                console.log('Generation cancelled');
            } else {
                setActionError('Something went wrong during generation.');
            }
        } finally {
            if (!abortControllerRef.current?.signal.aborted) {
                abortControllerRef.current = null;
            }
        }
    };

    const displayArray = generatedFrames.length > 0 ? generatedFrames : previewData;

    type PreviewProps = {
        inputLabel?: string,
        inputActiveLabel?: string,
        inputClassName?: string
    }

    function Preview({ inputLabel, inputActiveLabel, inputClassName }: PreviewProps) {
        return (
            <div className='grid justify-center gap-y-0.5'>
                {displayArray && displayArray.map((image: any, index: number) => (
                    <img
                        key={index}
                        src={image.imageBlock}
                        alt={`block-${index}`}
                        className={`w-4 h-4 object-contain ${isProcessingPreview ? 'hidden' : ''}`}
                        style={{ gridColumnStart: image.x + 1, gridRowStart: image.y + 1 }}
                    />
                ))}
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
        )
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
                        disabled={isProcessingPreview || !selectedFile}
                        className={`
                            w-fit px-5 py-1 rounded-lg text-nowrap 
                            duration-100 cursor-pointer flex font-medium items-center
                            ${isProcessingPreview || !selectedFile
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed opacity-70'
                                : 'bg-fd-primary hover:bg-fd-muted-primary shadow-md hover:shadow-lg text-fd-primary-foreground'}
                        `}
                    >
                        {isProcessingPreview ? (
                            <span className="flex items-center justify-center gap-2">
                                {t('generation')}
                            </span>
                        ) : t('startGeneration')}
                    </button>

                    {isProcessingPreview ? (
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
}