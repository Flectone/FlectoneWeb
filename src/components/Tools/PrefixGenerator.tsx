"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import InputText from '../Form/Input/InputText';
import { Slider } from '../Form/Input/Slider';
import { ColorList } from '../Form/Input/Color/ColorList';
import SelectBlock from '../Form/Input/SelectBlock';
import { RotateCcw } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Dropdown from '../Form/Input/Dropdown';
import Checkbox from '../Form/Input/Checkbox';

const GRID_SIZE = 8;

const AVAILABLE_FONTS = [
    { value: '10px Minecraft', label: 'Minecraft Regular', family: 'Minecraft', offsetY: 9 },
    { value: '10px MinecraftBold', label: 'Minecraft Bold', family: 'MinecraftBold', offsetY: 9 },
];

export default function PrefixGenerator() {
    const t = useTranslations('Tools.PrefixGenerator')
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [text, setText] = useState('flectone');
    const [font, setFont] = useState(AVAILABLE_FONTS[0].value);
    const [fontOffset, setFontOffset] = useState(AVAILABLE_FONTS[0].offsetY);
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [paddingX, setPaddingX] = useState(0);
    const [paddingY, setPaddingY] = useState(0);
    const [bgColor, setBgColor] = useState(['#3f51b5']);
    const [textColor, setTextColor] = useState(['#B0D3EA']);
    const [useGrid, setUseGrid] = useState(true);

    const [bgGradientAngle, setBgGradientAngle] = useState(0);

    const [enableShadow, setEnableShadow] = useState(true);
    const [shadowOffsetX, setShadowOffsetX] = useState(1);
    const [shadowOffsetY, setShadowOffsetY] = useState(1);
    const [shadowColor, setShadowColor] = useState(['#000000']);
    const [shadowOpacity, setShadowOpacity] = useState(0.5);

    const [enableBorder, setEnableBorder] = useState(false);
    const [borderType, setBorderType] = useState<'foreground' | 'background'>('foreground');
    const [borderTop, setBorderTop] = useState(1);
    const [borderRight, setBorderRight] = useState(1);
    const [borderBottom, setBorderBottom] = useState(1);
    const [borderLeft, setBorderLeft] = useState(1);
    const [borderColor, setBorderColor] = useState<string[]>(['#ffffff']);
    const [useSameBorder, setUseSameBorder] = useState(true);
    const [borderGradientAngle, setBorderGradientAngle] = useState(0);

    const [textOffsetX, setTextOffsetX] = useState(0);
    const [textOffsetY, setTextOffsetY] = useState(1);

    const [gradientAngle, setGradientAngle] = useState(0);
    const userAgent = navigator.userAgent;

    function resetAll() {
        setText('flectone');
        setFont(AVAILABLE_FONTS[0].value);
        setPaddingX(0);
        setPaddingY(0);
        setBgColor(['#3f51b5']);
        setTextColor(['#B0D3EA']);
        setUseGrid(true);

        setBgGradientAngle(0);

        setEnableShadow(true);
        setShadowOffsetX(1);
        setShadowOffsetY(1);
        setShadowColor(['#000000']);
        setShadowOpacity(0.5);

        setEnableBorder(false);
        setBorderType('foreground');
        setBorderTop(1);
        setBorderRight(1);
        setBorderBottom(1);
        setBorderLeft(1);
        setBorderColor(['#ffffff']);
        setUseSameBorder(true);
        setBorderGradientAngle(0);

        setTextOffsetX(0);
        setTextOffsetY(1);

        setGradientAngle(0);
    };

    useEffect(() => {
        const loadFonts = async () => {
            try {
                const fontPromises = AVAILABLE_FONTS.map(async (fontConfig) => {
                    if (document.fonts.check(`10px ${fontConfig.family}`)) {
                        return true;
                    }

                    try {
                        await document.fonts.load(`10px "${fontConfig.family}"`);
                    } catch (e) {
                        console.warn(`Failed to load font: ${fontConfig.family}`, e);
                        await document.fonts.ready;
                    }
                });

                await Promise.all(fontPromises);
                await document.fonts.ready;
                setFontsLoaded(true);
            } catch (error) {
                console.error('Error loading fonts:', error);
                setFontsLoaded(true);
            }
        };

        loadFonts();
    }, []);

    const getDarkerColor = (hex: string, amount = 0.8) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgb(${Math.floor(r * (1 - amount))}, ${Math.floor(g * (1 - amount))}, ${Math.floor(b * (1 - amount))})`;
    };

    const getBorderColor = useCallback(() => {
        if (borderColor.length > 0 && borderColor[0]) {
            return borderColor[0];
        }
        return getDarkerColor(bgColor[0], 0.5);
    }, [borderColor, bgColor]);

    const createBorderGradient = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
        const angleRad = (borderGradientAngle * Math.PI) / 180;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);

        let startX = x;
        let startY = y;
        let endX = x + width;
        let endY = y + height;

        if (borderGradientAngle !== 0) {
            const centerX = x + width / 2;
            const centerY = y + height / 2;

            startX = centerX - (width / 2) * cos - (height / 2) * sin;
            startY = centerY - (width / 2) * sin + (height / 2) * cos;
            endX = centerX + (width / 2) * cos + (height / 2) * sin;
            endY = centerY + (width / 2) * sin - (height / 2) * cos;
        }

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);

        if (borderColor.length === 1) {
            try {
                gradient.addColorStop(0, borderColor[0]);
                gradient.addColorStop(1, borderColor[0]);
            }
            catch (err) {
                console.error(err)
            }

        } else {
            borderColor.forEach((color, index) => {
                const position = index / (borderColor.length - 1);
                gradient.addColorStop(position, color);
            });
        }

        return gradient;
    }, [borderColor, borderGradientAngle]);

    const createBackgroundGradient = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const angleRad = (bgGradientAngle * Math.PI) / 180;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);

        let startX = 0;
        let startY = 0;
        let endX = width;
        let endY = height;

        if (bgGradientAngle !== 0) {
            const centerX = width / 2;
            const centerY = height / 2;

            startX = centerX - (width / 2) * cos - (height / 2) * sin;
            startY = centerY - (width / 2) * sin + (height / 2) * cos;
            endX = centerX + (width / 2) * cos + (height / 2) * sin;
            endY = centerY + (width / 2) * sin - (height / 2) * cos;
        }

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);

        if (bgColor.length === 1) {
            try {
                gradient.addColorStop(0, bgColor[0]);
                gradient.addColorStop(1, bgColor[0]);
            }
            catch (err) {
                console.error(err)
            }
        } else {
            bgColor.forEach((color, index) => {
                const position = index / (bgColor.length - 1);
                gradient.addColorStop(position, color);
            });
        }

        return gradient;
    }, [bgColor, bgGradientAngle]);

    const createTextGradient = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, textWidth: number) => {
        const angleRad = (gradientAngle * Math.PI) / 180;
        const cos = Math.cos(angleRad);
        const sin = Math.sin(angleRad);

        const textHeight = 8;

        let startX = x;
        let startY = y;
        let endX = x + textWidth;
        let endY = y + textHeight;

        if (gradientAngle !== 0) {
            const centerX = x + textWidth / 2;
            const centerY = y + textHeight / 2;

            startX = centerX - (textWidth / 2) * cos - (textHeight / 2) * sin;
            startY = centerY - (textWidth / 2) * sin + (textHeight / 2) * cos;
            endX = centerX + (textWidth / 2) * cos + (textHeight / 2) * sin;
            endY = centerY + (textWidth / 2) * sin - (textHeight / 2) * cos;
        }

        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);

        if (textColor.length === 1) {
            try {
                gradient.addColorStop(0, textColor[0]);
                gradient.addColorStop(1, textColor[0]);
            }
            catch (err) {
                console.error(err)
            }
        } else {
            textColor.forEach((color, index) => {
                const position = index / (textColor.length - 1);
                gradient.addColorStop(position, color);
            });
        }

        return gradient;
    }, [textColor, gradientAngle]);

    const drawBorder = useCallback((ctx: CanvasRenderingContext2D, finalWidth: number, finalHeight: number) => {
        const borderGradient = createBorderGradient(ctx, 0, 0, finalWidth, finalHeight);
        const borderColorValue = borderColor.length > 1 ? borderGradient : getBorderColor();

        if (borderTop > 0) {
            ctx.fillStyle = borderColorValue;
            ctx.fillRect(0, 0, finalWidth, borderTop);
        }

        if (borderBottom > 0) {
            ctx.fillStyle = borderColorValue;
            ctx.fillRect(0, finalHeight - borderBottom, finalWidth, borderBottom);
        }

        if (borderLeft > 0) {
            ctx.fillStyle = borderColorValue;
            ctx.fillRect(0, 0, borderLeft, finalHeight);
        }

        if (borderRight > 0) {
            ctx.fillStyle = borderColorValue;
            ctx.fillRect(finalWidth - borderRight, 0, borderRight, finalHeight);
        }
    }, [borderTop, borderRight, borderBottom, borderLeft, borderColor, getBorderColor, createBorderGradient]);

    const draw = useCallback(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d');
        if (!canvas || !ctx) return;

        if (!document.fonts.check(`10px ${font.split(' ')[1]}`)) {
            setTimeout(() => draw(), 100);
            return;
        }

        ctx.imageSmoothingEnabled = false;
        (ctx as any).webkitImageSmoothingEnabled = false;
        (ctx as any).mozImageSmoothingEnabled = false;

        ctx.font = font;

        const textWidth = text.split('').reduce((sum, char) => sum + Math.ceil(ctx.measureText(char).width), 0);
        let finalWidth = Math.max(textWidth + paddingX * 2, 8);
        let finalHeight = Math.max(8 + paddingY * 2, 8);

        if (useGrid) {
            finalWidth = Math.ceil(finalWidth / GRID_SIZE) * GRID_SIZE;
            finalHeight = Math.ceil(finalHeight / GRID_SIZE) * GRID_SIZE;
        }

        canvas.width = finalWidth;
        canvas.height = finalHeight;

        ctx.font = font;

        ctx.fillStyle = createBackgroundGradient(ctx, finalWidth, finalHeight);
        ctx.fillRect(0, 0, finalWidth, finalHeight);

        if (enableBorder && borderType === 'background') {
            drawBorder(ctx, finalWidth, finalHeight);
        }

        const baseOffsetX = Math.floor((finalWidth - textWidth) / 2);
        const baseOffsetY = Math.floor((finalHeight - fontOffset) / 2);
        const offsetX = baseOffsetX + textOffsetX;
        const offsetY = baseOffsetY + textOffsetY - ((userAgent.match(/chrome|chromium|crios/i)) ? 1 : 0);

        if (enableShadow) {
            const shadowCanvas = document.createElement('canvas');
            shadowCanvas.width = finalWidth;
            shadowCanvas.height = finalHeight;
            const shadowCtx = shadowCanvas.getContext('2d')!;
            shadowCtx.imageSmoothingEnabled = false;
            shadowCtx.font = font;
            shadowCtx.textBaseline = 'top';
            shadowCtx.fillStyle = shadowColor[0];
            shadowCtx.fillText(text, offsetX + shadowOffsetX, offsetY + shadowOffsetY - 1);

            const shadowData = shadowCtx.getImageData(0, 0, finalWidth, finalHeight);
            const sd = shadowData.data;
            for (let i = 0; i < sd.length; i += 4) {
                if (sd[i + 3] > 128) {
                    sd[i + 3] = Math.round(255 * shadowOpacity);
                } else {
                    sd[i + 3] = 0;
                }
            }
            shadowCtx.putImageData(shadowData, 0, 0);
            ctx.drawImage(shadowCanvas, 0, 0);
        }

        const textCanvas = document.createElement('canvas');
        textCanvas.width = finalWidth;
        textCanvas.height = finalHeight;
        const textCtx = textCanvas.getContext('2d')!;
        textCtx.imageSmoothingEnabled = false;
        textCtx.font = font;
        textCtx.textBaseline = 'top';

        if (textColor.length > 1) {
            const gradient = createTextGradient(textCtx, offsetX, offsetY, textWidth);
            textCtx.fillStyle = gradient;
        } else {
            textCtx.fillStyle = textColor[0];
        }
        textCtx.fillText(text, offsetX, offsetY - 1);

        const textData = textCtx.getImageData(0, 0, finalWidth, finalHeight);
        const td = textData.data;
        for (let i = 0; i < td.length; i += 4) {
            td[i + 3] = td[i + 3] > 128 ? 255 : 0;
        }
        textCtx.putImageData(textData, 0, 0);
        ctx.drawImage(textCanvas, 0, 0);

        if (enableBorder && borderType === 'foreground') {
            drawBorder(ctx, finalWidth, finalHeight);
        }

    }, [text, font, paddingX, paddingY, bgColor, textColor, useGrid, enableShadow, shadowOffsetX, shadowOffsetY, shadowColor, shadowOpacity, borderTop, borderRight, borderBottom, borderLeft, getBorderColor, textOffsetX, textOffsetY, gradientAngle, createTextGradient, bgGradientAngle, createBackgroundGradient, enableBorder, borderColor, borderGradientAngle, createBorderGradient, borderType, drawBorder, fontOffset]);

    useEffect(() => {
        if (fontsLoaded) {
            draw();
        }
    }, [fontsLoaded, draw, text, font, paddingX, paddingY, bgColor, textColor, useGrid, enableShadow, shadowOffsetX, shadowOffsetY, shadowColor, shadowOpacity, borderTop, borderRight, borderBottom, borderLeft, textOffsetX, textOffsetY, gradientAngle, bgGradientAngle, enableBorder, borderColor, borderGradientAngle, borderType]);

    const canvasWidth = canvasRef.current?.width || 48;
    const canvasHeight = canvasRef.current?.height || 8;

    const MAX_CONTAINER_SIZE = 400;
    const scale = Math.min(MAX_CONTAINER_SIZE / canvasWidth, MAX_CONTAINER_SIZE / canvasHeight);
    const finalScale = Math.max(1, scale);
    const displayWidth = canvasWidth * finalScale;
    const displayHeight = canvasHeight * finalScale;

    const handleSameBorderChange = (value: number) => {
        setBorderTop(value);
        setBorderRight(value);
        setBorderBottom(value);
        setBorderLeft(value);
    };

    const handleFontChange = (fontValue: string) => {
        const selectedFont = AVAILABLE_FONTS.find(f => f.value === fontValue);
        setFont(fontValue);
        if (selectedFont) {
            setFontOffset(selectedFont.offsetY);
        }
    };

    return (
        <div className="flex gap-4 w-full max-md:flex-col">
            <div className='flex flex-col gap-4 w-1/3 max-md:w-full items-center'>
                <div className='flex gap-2 flex-col bg-fd-article border rounded-2xl p-6 w-full'>
                    <p className='font-bold'>{t('Settings.text')}</p>
                    <InputText
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                    />
                </div>
                <div className='flex gap-2 flex-col bg-fd-article border rounded-2xl p-6 w-full'>
                    <p className='font-bold'>{t('Settings.font')}</p>
                    <Dropdown
                        value={font}
                        onChange={(value) => handleFontChange(value)}
                        options={AVAILABLE_FONTS}
                    />
                </div>
                <div className='p-6 relative bg-fd-article border-2 border-dashed rounded-2xl h-fit w-full flex items-center justify-center'>
                    <div
                        id='preview'
                        className="flex items-center justify-center"
                        style={{
                            width: '100%',
                            height: 'auto',
                            minHeight: '100px'
                        }}
                    >
                        {fontsLoaded && (
                            <canvas
                                ref={canvasRef}
                                style={{
                                    imageRendering: 'pixelated',
                                    width: `${displayWidth}px`,
                                    height: `${displayHeight}px`,
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    objectFit: 'contain',
                                }}
                            />
                        )}
                    </div>
                </div>
                <div className='w-full flex justify-end'>
                    <button
                        onClick={() => {
                            const link = document.createElement('a');
                            link.download = `${text.toLowerCase()}-prefix.png`;
                            link.href = canvasRef.current?.toDataURL() || '';
                            link.click();
                        }}
                        className='w-full justify-center px-5 py-1 rounded-lg text-nowrap duration-100 cursor-pointer flex font-medium items-center bg-fd-primary hover:bg-fd-muted-primary shadow-md hover:shadow-lg text-fd-primary-foreground'
                    >
                        {t('download')}
                    </button>
                </div>
            </div>
            <div className='w-2/3 max-md:w-full flex flex-col gap-4'>
                <div className='bg-fd-article rounded-2xl p-6 flex flex-col border gap-2'>
                    <div className='flex justify-between'>
                        <p className='font-bold'>{t('Settings.padding')}</p>
                        <div className='flex items-center gap-1'>
                            <Checkbox checked={useGrid} onChange={setUseGrid} disabled={false} />
                            <p className='text-sm'>{t('Settings.grid')}</p>
                        </div>
                    </div>
                    <div className='flex w-full gap-4'>
                        <div className='w-1/2'>
                            <p>{t('Settings.horizontal')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{paddingX}px</code></p>
                            <Slider
                                value={paddingX}
                                step={useGrid ? 4 : 1}
                                min={0}
                                max={64}
                                onChange={setPaddingX}
                            />
                        </div>
                        <div className='w-1/2'>
                            <p>{t('Settings.vertical')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{paddingY}px</code></p>
                            <Slider
                                value={paddingY}
                                step={useGrid ? 4 : 1}
                                min={0}
                                max={64}
                                onChange={setPaddingY}
                            />
                        </div>
                    </div>
                </div>
                <div className='bg-fd-article rounded-2xl p-6 gap-2 flex flex-col border'>
                    <p className='font-bold'>{t('Settings.colors')}</p>
                    <div className="flex w-full gap-4">
                        <div className="flex flex-col gap-2 w-1/2">
                            <ColorList colors={textColor} onChange={setTextColor} label={t('Settings.text')} maxColors={5} />

                            {textColor.length > 1 && (
                                <div className="flex flex-col gap-2">
                                    <p>{t('Settings.gradientAngle')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{gradientAngle}°</code></p>
                                    <Slider
                                        value={gradientAngle}
                                        step={15}
                                        min={0}
                                        max={360}
                                        onChange={setGradientAngle}
                                    />
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2 w-1/2">
                            <ColorList colors={bgColor} onChange={setBgColor} label={t('Settings.background')} maxColors={5} />
                            {bgColor.length > 1 && (
                                <div className="flex flex-col gap-2">
                                    <p>{t('Settings.gradientAngle')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{bgGradientAngle}°</code></p>
                                    <Slider
                                        value={bgGradientAngle}
                                        step={15}
                                        min={0}
                                        max={360}
                                        onChange={setBgGradientAngle}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                </div>
                <div className='bg-fd-article rounded-2xl p-6 gap-2 flex flex-col border'>
                    <p className='font-bold'>{t('Settings.textOffset')}</p>
                    <div className='flex w-full gap-4'>
                        <div className='w-1/2'>
                            <p>{t('Settings.horizontal')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{textOffsetX > 0 ? '+' : ''}{textOffsetX}px</code></p>
                            <Slider
                                value={textOffsetX}
                                step={1}
                                min={-32}
                                max={32}
                                onChange={setTextOffsetX}
                            />
                        </div>
                        <div className='w-1/2'>
                            <p>{t('Settings.vertical')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{textOffsetY > 0 ? '+' : ''}{textOffsetY}px</code></p>
                            <Slider
                                value={textOffsetY}
                                step={1}
                                min={-32}
                                max={32}
                                onChange={setTextOffsetY}
                            />
                        </div>
                    </div>
                </div>
                <div className='bg-fd-article rounded-2xl p-6 gap-2 flex flex-col border'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-1'>
                            <Checkbox checked={enableShadow} onChange={setEnableShadow} disabled={false} />
                            <p className="font-semibold">{t('Settings.textShadow')}</p>
                        </div>
                    </div>
                    {enableShadow && (
                        <div className='flex flex-col gap-4'>
                            <div className='w-full flex gap-4'>
                                <div className='w-1/2'>
                                    <p>{t('Settings.horizontalOffset')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{shadowOffsetX > 0 ? '+' : ''}{shadowOffsetX}px</code></p>
                                    <Slider
                                        value={shadowOffsetX}
                                        step={1}
                                        min={-8}
                                        max={8}
                                        onChange={setShadowOffsetX}
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <p>{t('Settings.verticalOffset')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{shadowOffsetY > 0 ? '+' : ''}{shadowOffsetY}px</code></p>
                                    <Slider
                                        value={shadowOffsetY}
                                        step={1}
                                        min={-8}
                                        max={8}
                                        onChange={setShadowOffsetY}
                                    />
                                </div>
                            </div>
                            <div className='flex gap-4 w-full'>
                                <div className='w-1/2'>
                                    <ColorList
                                        colors={shadowColor}
                                        onChange={setShadowColor}
                                        label="Цвет тени"
                                        maxColors={1}
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <p>{t('Settings.shadowOpacity')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{Math.round(shadowOpacity * 100)}%</code></p>
                                    <Slider
                                        value={shadowOpacity}
                                        step={0.05}
                                        min={0}
                                        max={1}
                                        onChange={setShadowOpacity}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div className='bg-fd-article rounded-2xl p-6 gap-2 flex flex-col border'>
                    <div className="flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1">
                            <Checkbox checked={enableBorder} onChange={setEnableBorder} disabled={false} />
                            <p className="font-bold">{t('Settings.stroke')}</p>
                        </div>
                    </div>

                    {enableBorder && (
                        <div className='flex flex-col gap-4'>
                            <div className='flex w-full gap-4'>
                                <div className='w-1/2 flex flex-col gap-2'>
                                    <p>{t('Settings.display')}</p>
                                    <SelectBlock
                                        values={[
                                            { label: t('Settings.overText'), value: 'foreground' },
                                            { label: t('Settings.underText'), value: 'background' },
                                        ]}
                                        onChange={(value) => setBorderType(value)}
                                        defaultValue="foreground"
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <ColorList
                                        colors={borderColor}
                                        onChange={setBorderColor}
                                        label={t('Settings.strokeColor')}
                                        maxColors={5}
                                    />
                                    {borderColor.length > 1 && (
                                        <div className="flex flex-col gap-2 mt-2">
                                            <p>{t('Settings.gradientAngle')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{borderGradientAngle}°</code></p>
                                            <Slider
                                                value={borderGradientAngle}
                                                step={15}
                                                min={0}
                                                max={360}
                                                onChange={setBorderGradientAngle}
                                            />
                                        </div>
                                    )}
                                </div>

                            </div>

                            <div className='flex flex-col gap-2'>
                                <div className='flex justify-between'>
                                    <p>{t('Settings.thicknessStroke')}: <code className={`bg-fd-card py-0.5 px-1 rounded-sm ${useSameBorder ? '' : 'hidden'}`}>{borderTop}px</code></p>
                                    <div className="flex items-center gap-1 cursor-pointer">
                                        <Checkbox
                                            checked={useSameBorder}
                                            onChange={setUseSameBorder}
                                        />
                                        <p className="text-sm">{t('Settings.same')}</p>
                                    </div>
                                </div>
                                {useSameBorder ? (
                                    <Slider
                                        value={borderTop}
                                        step={1}
                                        min={1}
                                        max={32}
                                        onChange={handleSameBorderChange}
                                    />
                                ) : (

                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <p>{t('Settings.up')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{borderTop}px</code></p>
                                            <Slider
                                                value={borderTop}
                                                step={1}
                                                min={0}
                                                max={32}
                                                onChange={setBorderTop}
                                            />
                                        </div>
                                        <div>
                                            <p>{t('Settings.right')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{borderRight}px</code></p>
                                            <Slider
                                                value={borderRight}
                                                step={1}
                                                min={0}
                                                max={32}
                                                onChange={setBorderRight}
                                            />
                                        </div>
                                        <div>
                                            <p>{t('Settings.bottom')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{borderBottom}px</code></p>
                                            <Slider
                                                value={borderBottom}
                                                step={1}
                                                min={0}
                                                max={32}
                                                onChange={setBorderBottom}
                                            />
                                        </div>
                                        <div>
                                            <p>{t('Settings.left')}: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{borderLeft}px</code></p>
                                            <Slider
                                                value={borderLeft}
                                                step={1}
                                                min={0}
                                                max={32}
                                                onChange={setBorderLeft}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className='w-full flex justify-end'>
                    <button
                        onClick={resetAll}
                        className='w-fit gap-1 justify-center px-5 py-1 rounded-lg text-nowrap duration-100 cursor-pointer flex font-medium items-center bg-fd-gray hover:bg-fd-muted-gray shadow-md hover:shadow-lg text-fd-gray-foreground'

                    >
                        <RotateCcw size="1.2em" />
                        {t('reset')}
                    </button>
                </div>
            </div>
        </div >
    );
};