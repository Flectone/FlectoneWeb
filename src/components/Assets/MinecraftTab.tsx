import { ReactNode } from "react"

interface MinecraftTabProps {
    tabText: ReactNode
}

export default function MinecraftTab({ tabText }: MinecraftTabProps) {
    return (
        <div className='font-[Minecraft] bg-black/60 gap-2 w-fit h-fit flex flex-col justify-center items-center p-3'>
            {tabText}
            <div className='w-full flex flex-col gap-1'>
                {[
                    { name: 'TheFaser', id: '4ebc9a34fb5e55be' },
                    { name: 'vpllll', id: '1ac29710d9c4e3dd' },
                    { name: 'nopox_', id: '6c1319d28eebeccd' },
                    { name: 'Realepi_Bars_', id: 'df64f2e4705dfd18' }
                ].map((user) => (
                    <div key={user.name} className='flex w-full bg-white/10 h-[calc(1em-1px)] items-center justify-between'>
                        <div className='flex h-full items-center'>
                            <img className='h-full mr-0.5' src={`https://s.namemc.com/2d/skin/face.png?id=${user.id}&scale=4`} />
                            <span className='bg-[#96F896] [box-shadow:1.2px_1.2px_0_#303631] w-1 h-full mr-2'></span>
                            <p className='text-[1em] [text-shadow:1.2px_1.2px_0px_#212F38] text-[#85CCF7]!'>{user.name}</p>
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
    )
}