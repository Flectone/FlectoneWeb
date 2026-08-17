'use client'

import { ReactNode } from "react"

interface MinecraftChatProps {
    message?: ReactNode,
    prefix?: ReactNode,
    addString?: ReactNode
}

export default function MinecraftChat({ message, prefix, addString }: MinecraftChatProps) {
    return (
        <div className='font-[Minecraft] h-full pt-8 flex relative transition-transform justify-start items-end w-full'>
            <div className='flex flex-col pl-1 w-3/4 pr-6 h-fit mb-5 bg-black/60 items-start justify-end gap-2'>
                <div className='flex items-end gap-1'>
                    {prefix}
                    <div className='flex items-center gap-1 h-3.5'>
                        <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>TheFaser:</p>
                        <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>hello</p>
                    </div>
                </div>
                <div className='flex items-end gap-1'>
                    <div className='flex items-center gap-1 h-3.5'>
                        <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>vpllll:</p>
                        <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>hello</p>
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
                        <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>hi</p>
                    </div>
                    {message}
                </div>
                {addString && (
                    addString
                )}
            </div>
            <div className='flex w-full h-4 absolute bottom-0 bg-black/60 pb-2'></div>
        </div >
    )
}