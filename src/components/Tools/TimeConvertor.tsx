'use client'
import { useRef, useState, useEffect } from 'react';
import TextOutput from '../Form/Output/TextOutput';
import { Slider } from '../Form/Input/Slider';
import SelectBlock from '../Form/Input/SelectBlock';

export default function TimeConvertor() {
    const [rotate, setRotate] = useState(90)
    const [isDragging, setIsDragging] = useState(false)
    const [startRotate, setStartRotate] = useState(0)
    const [startAngle, setStartAngle] = useState(0)
    const divRef = useRef<HTMLImageElement>(null)

    const normalizeAngle = (angle: number) => {
        angle = angle % 360
        if (angle < 0) angle += 360
        return angle
    }

    const getAngle = (event: any, center: any) => {
        const clientX = event.clientX || (event.touches ? event.touches[0].clientX : 0)
        const clientY = event.clientY || (event.touches ? event.touches[0].clientY : 0)
        return Math.atan2(clientY - center.y, clientX - center.x) * 180 / Math.PI
    }

    const onMouseDown = (e: any) => {
        if (!divRef.current) return
        e.stopPropagation()
        setIsDragging(true)
        const rect = divRef.current.getBoundingClientRect()
        const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        const angle = getAngle(e, center)
        setStartAngle(angle)
        setStartRotate(rotate)
    }

    const onMouseMove = (e: any) => {
        if (!isDragging || !divRef.current) return
        const rect = divRef.current.getBoundingClientRect()
        const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
        const currentAngle = getAngle(e, center)
        let delta = currentAngle - startAngle
        let newRotate = startRotate + delta
        newRotate = normalizeAngle(newRotate)
        setRotate(newRotate)
    }

    const onMouseUp = () => {
        setIsDragging(false)
    }

    useEffect(() => {
        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove)
            window.addEventListener('mouseup', onMouseUp)
            return () => {
                window.removeEventListener('mousemove', onMouseMove)
                window.removeEventListener('mouseup', onMouseUp)
            }
        }
    }, [isDragging])

    const [moon, sun] = ['/assets/moon.svg', '/assets/sun.svg']

    return (
        <div className="w-full justify-center items-start flex max-xl:flex-col-reverse gap-4">
            <div className='py-18 group rounded-2xl flex justify-center items-center border bg-fd-article w-1/2 max-xl:w-full'>
                <div className='relative w-sm h-sm max-sm:w-62 max-sm:h-62'>
                    <div className='w-sm h-sm max-sm:w-62 max-sm:h-62 border-2 rounded-full relative overflow-hidden flex items-center justify-center'>
                        <img
                            ref={divRef}
                            onMouseDown={onMouseDown}
                            style={{
                                transform: `rotate(${rotate}deg)`,
                                cursor: isDragging ? 'grabbing' : 'grab',
                                userSelect: 'none'
                            }}
                            className='w-sm h-sm max-sm:w-62 max-sm:h-62 z-50 select-none'
                            src={200 < rotate && rotate < 340 ? moon : sun}
                            draggable='false'
                        />
                        <img src="/assets/time.svg" className='absolute w-sm h-sm rounded-full' alt="" />
                    </div>

                    {Array.from({ length: 24 }).map((_, index) => {
                        const angle = (index * 360 / 24) - 180;
                        const radian = (angle * Math.PI) / 180;
                        const radius = 60;
                        const x = 50 + radius * Math.cos(radian);
                        const y = 50 + radius * Math.sin(radian);
                        const romanHours = ['XII', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
                        const hours = index + 6 > 24 ? index - 18 : index + 6
                        const hour = hours > 11 ? romanHours[hours - 12] : romanHours[hours];
                        return (
                            <div
                                key={index}
                                className={`absolute px-2 bg-fd-card rounded-sm font-[Minecraft] text-fd-muted-foreground cursor-pointer text-md hover:text-fd-foreground transform duration-75`}
                                onClick={() => setRotate(index * 15)}
                                style={{
                                    position: 'absolute',
                                    left: `${x}%`,
                                    top: `${y}%`,
                                    transform: 'translate(-50%, -50%)',
                                    textAlign: 'center',
                                }}
                            >
                                {hour}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className='flex flex-col gap-2 w-1/2 max-xl:w-full'>
                <div className='bg-fd-article gap-2 flex flex-col p-6 rounded-2xl border w-full'>
                    <p className='font-bold'>Комманда</p>
                    <TextOutput text={`/time set ${Math.ceil(Math.ceil(rotate) * 24000 / 360)}`} />
                </div>
                <div className='bg-fd-article gap-2 flex flex-col p-6 rounded-2xl border w-full'>
                    <p className='font-bold'>Угол солнца: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{Math.ceil(rotate)}°</code></p>
                    <Slider value={rotate} min={0} max={360} onChange={setRotate} />
                </div>
                <div className='bg-fd-article gap-2 flex flex-col p-6 rounded-2xl border w-full'>
                    <p className='font-bold'>Пресеты</p>
                    <SelectBlock values={[
                        { label: 'День', value: '15' },
                        { label: 'Полдень', value: '90' },
                        { label: 'Ночь', value: '210' },
                        { label: 'Полночь', value: '270' }
                    ]}
                        onChange={(value) => setRotate(parseInt(value))}
                        grid={2}
                    />
                </div>
            </div>
        </div>
    );
}