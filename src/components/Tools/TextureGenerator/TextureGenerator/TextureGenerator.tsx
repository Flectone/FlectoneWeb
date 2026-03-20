'use client';
import { useActionState, useEffect, useState, useTransition, useRef, forwardRef, useImperativeHandle } from 'react';
import { MainSkin, imageToHeadSkin } from '@/actions/texture-generator';
import { FileUploader } from '@/components/Form/FileUploader';
import { Trash } from 'lucide-react';
import { useTranslations } from 'next-intl';

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

    return (
        <div className="flex flex-col w-full gap-2">
            <form key={formKey} action={formAction} className="flex flex-col gap-4">
                <div className='flex transition-transform justify-center items-center bg-[url(/assets/minecraftclouds.jpg)] w-full p-8 rounded-2xl border-2'>
                    <div className='font-[Minecraft] bg-black/60 gap-2 w-fit h-fit flex flex-col justify-center items-center p-3'>
                        <div className='flex gap-1 h-[1em] items-center'>
                            <img className='w-[1em]' src="/assets/pixelheart.svg" alt="" />
                            <p className='[text-shadow:1.2px_1.2px_0px_#212F38] font-normal text-[#ABD5E3]!'>Flectone</p>
                            <img className='w-[1em]' src="/assets/pixelheart.svg" alt="" />
                        </div>
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
                                    label={t('input')}
                                    activeLabel={t('drag')}
                                    className='w-44'
                                />
                            </div>
                        </div>
                        <div className='w-full flex flex-col gap-1 '>
                            {[
                                { name: 'TheFaser', id: '4ebc9a34fb5e55be' },
                                { name: 'vpllll', id: '1ac29710d9c4e3dd' },
                                { name: 'nopox_', id: '6c1319d28eebeccd' }
                            ].map((user) => (
                                <div key={user.name} className='flex w-full bg-white/10 h-[calc(1em-1px)] items-center justify-between'>
                                    <div className='flex h-full items-center'>
                                        <img className='h-full mr-0.5' src={`https://s.namemc.com/2d/skin/face.png?id=${user.id}&scale=4`} />
                                        <span className='bg-[#96F896] [box-shadow:1.2px_1.2px_0_#303631] w-1 h-full mr-2'></span>
                                        <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[1em] text-[#ABD5E3]!'>{user.name}</p>
                                    </div>
                                    <div className='mr-0.5 ml-2 flex items-end gap-0.5'>
                                        {[0.125, 0.25, 0.375, 0.5, 0.625].map((h, i) => (
                                            <div key={i} className={`w-0.5 bg-[#01F720] [box-shadow:1.2px_1.2px_0px_#00870F]`} style={{ height: h + 'rem' }}></div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex justify-center w-full mt-1'>
                            <p className='text-[0.8em] [text-shadow:1.2px_1.2px_0px_#212F38] text-[#85CCF7]!'>
                                <b className='font-normal text-[#ABD5E3]!'>TPS</b> 20.0, <b className='font-normal text-[#ABD5E3]!'>Online</b> 3
                            </p>
                        </div>
                    </div>
                </div>
                <div className='font-[Minecraft] pt-8 flex relative overflow-hidden transition-transform justify-start items-center bg-bottom bg-[url(/assets/minecraftlandscape.jpg)] w-full rounded-2xl border-2'>
                    <div className='flex flex-col pl-1 w-1/3 h-fit mb-5 bg-black/60 items-start justify-end gap-2'>
                        <div className='flex gap-1 items-start'>
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
                            </div>
                            <div className='flex h-4 items-center'>
                                <FileUploader
                                    onFileSelect={handleFileSelect}
                                    isPending={isBusy}
                                    label=''
                                    activeLabel=''
                                    className={displayArray ? 'hidden' : 'flex h-4 -ml-1 mr-0.5'}
                                />
                                <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[1em] text-[#ABD5E3]!'>TheFaser:</p>
                                <p className='text-white! ml-1'>hello mazafaka</p>
                            </div>
                        </div>
                        <div className='flex gap-1 items-start'>
                            <div className='flex h-4 items-center'>
                                <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[1em] text-[#ABD5E3]!'>vpllll:</p>
                                <p className='text-white! ml-1'>fuck u</p>
                            </div>
                        </div>
                        <div className='flex gap-1 items-start'>
                            <div className='flex h-4 items-center'>
                                <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[1em] text-[#ABD5E3]!'>Realepi_Bars_:</p>
                                <p className='text-white! ml-1'>...</p>
                            </div>
                        </div>
                        <div className='flex gap-1 items-start'>
                            <div className='flex h-4 items-center'>
                                <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[1em] text-[#ABD5E3]!'>nopox_:</p>
                                <FileUploader
                                    onFileSelect={handleFileSelect}
                                    isPending={isBusy}
                                    label=''
                                    activeLabel=''
                                    className={displayArray ? 'hidden' : 'flex h-4 ml-1'}
                                />
                            </div>
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