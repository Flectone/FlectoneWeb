'use client';
import { useActionState, useEffect, useState, useTransition, useRef, forwardRef, useImperativeHandle } from 'react';
import { MainSkin, imageToHeadSkin } from '@/actions/texture-generator';
import { FileUploader } from '@/components/Form/FileUploader';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';
import MinecraftTab from '@/components/Assets/MinecraftTab';

export const TextureGenerator = () => {
    const [state, formAction, isPending] = useActionState(MainSkin, null);
    const [previewData, setPreviewData] = useState<any>(null);
    const [isProcessingPreview, startTransition] = useTransition();
    const [formKey, setFormKey] = useState(0);
    const [showStateResults, setShowStateResults] = useState(true);
    const t = useTranslations('Tools.TextureGenerator');

    const handleReset = () => {
        setPreviewData(null);
        setShowStateResults(false);
        setFormKey(prev => prev + 1);
    };

    useEffect(() => {
        if (state?.success && state?.data) {
            setShowStateResults(true);
            const jsonString = JSON.stringify(state.data, null, 2);
            const blob = new Blob([jsonString], { type: 'application/json' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${state.filename}.json`;
            link.click();
            window.URL.revokeObjectURL(url);
        }

        if (state?.error) {
            setShowStateResults(true);
        }
    }, [state]);

    const handleFileSelect = (file: File) => {
        setShowStateResults(false);
        console.log('Selected file:', file);
        startTransition(async () => {
            const result = await imageToHeadSkin(file);
            if (result.imageArray) setPreviewData(result.imageArray);
            if (result.error) alert(result.error);
        });
    };

    const displayArray = (showStateResults && state?.imageArray) || previewData;
    const isBusy = isPending || isProcessingPreview;
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
                        className={`w-4 h-4 object-contain ${isPending ? 'hidden' : ''}`}
                        style={{ gridColumnStart: image.x + 1, gridRowStart: image.y + 1 }}
                    />
                ))}
                {isPending && displayArray.map((image: any, index: number) => (
                    <img
                        key={index}
                        src={image.imageBlock}
                        alt={`block-${index}`}
                        className={`w-4 h-4 object-contain opacity-0 animate-[apperance_3s_forwards]`}
                        style={{ gridColumnStart: image.x + 1, gridRowStart: image.y + 1, opacity: 0, animation: `apperance 3s forwards ${index * 3}s` }}
                    />
                ))}
                <div className={displayArray ? "hidden" : "block"}>
                    <FileUploader
                        onFileSelect={handleFileSelect}
                        isPending={isBusy}
                        label={inputLabel}
                        activeLabel={inputActiveLabel}
                        className={inputClassName}
                    />
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full gap-2">
            <form key={formKey} action={formAction} className="flex flex-col gap-4">
                <div className='flex transition-transform justify-center items-center bg-[url(/assets/minecraftclouds.jpg)] bg-top w-full p-8 rounded-2xl border-2'>
                    <MinecraftTab tabText={<Preview inputLabel={t('input')} inputClassName='w-44' inputActiveLabel={t('drag')} />} />
                </div>
                <div className='font-[Minecraft] pt-8 flex relative overflow-hidden transition-transform justify-start items-center bg-bottom bg-[url(/assets/minecraftlandscape.jpg)] w-full rounded-2xl border-2'>
                    <div className='flex flex-col pl-1 w-fit pr-16 h-fit mb-5 bg-black/60 items-start justify-end gap-2'>
                        <div className='flex gap-1 items-start'>
                            <div className='flex h-4 items-center gap-1'>
                                <Preview inputClassName='h-4' />
                                <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[1em] text-[#ABD5E3]!'>TheFaser:</p>
                                <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>hello</p>
                            </div>
                        </div>
                        <div className='flex gap-1 items-start'>
                            <div className='flex h-4 items-center gap-1'>
                                <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[1em] text-[#ABD5E3]!'>vpllll:</p>
                                <p className='text-white!'>hi</p>
                            </div>
                        </div>
                        <div className='flex gap-1 items-start'>
                            <div className='flex h-4 items-center gap-1'>
                                <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[1em] text-[#ABD5E3]!'>nopox_:</p>
                                <p className='text-white!'>hi</p>
                            </div>
                        </div>
                        <div className='flex gap-1 items-start'>
                            <div className='flex h-4 items-center gap-1'>
                                <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[1em] text-[#ABD5E3]!'>Realepi_Bars_:</p>
                                <Preview inputClassName='h-4' />
                            </div>
                        </div>
                    </div>
                    <div className='flex w-full h-4 absolute bottom-0 bg-black/60 pb-2'></div>
                </div>
                <div className='w-full flex justify-end items-center gap-2'>
                    <button
                        type='submit'
                        disabled={isBusy || !displayArray}
                        className={`
                        w-fit px-5 py-1 rounded-lg text-nowrap 
                        duration-100 cursor-pointer flex font-medium items-center
                        ${isBusy
                                ? 'bg-gray-400 text-gray-600 cursor-wait opacity-70'
                                : 'bg-fd-primary hover:bg-fd-muted-primary shadow-md hover:shadow-lg text-fd-primary-foreground'}
                    `}
                    >
                        {isBusy ? (
                            <span className="flex items-center justify-center gap-2">
                                {t('generation')}
                            </span>
                        ) : t('startGeneration')}
                    </button>
                    <button
                        disabled={isBusy}
                        onClick={handleReset}
                        className="bg-fd-gray hover:bg-fd-muted-gray text-fd-gray-foreground cursor-pointer w-fit px-3 py-1 rounded-lg text-nowrap 
                        duration-100 flex font-medium items-center "
                    >
                        <Trash className='w-[1.2em]' />
                    </button>
                </div>
                {isProcessingPreview && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center rounded-xl">
                        <span className="text-white font-bold animate-pulse">{t('previewGeneration')}</span>
                    </div>
                )}
            </form>


            {state?.error && showStateResults && (
                <div className="p-4 bg-red-500/10 border-2 border-red-500/20 text-red-600 rounded-xl text-sm font-medium">
                    {state.error}
                </div>
            )}
        </div>
    );
}