'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import InputText from '@/components/Form/Input/InputText';
import SelectBlock from '@/components/Form/Input/SelectBlock';
import TextOutput from '@/components/Form/Output/TextOutput';
import { ChevronLeft, ChevronRight, ArrowLeftRight } from 'lucide-react';

function MinecraftIcon({ src, alt }: Readonly<{ src: string; alt: string }>) {
    return (
        <img
            src={src}
            alt={alt}
            className="w-4 h-4 object-contain"
            style={{ imageRendering: 'pixelated' }}
        />
    );
}

function CoordRow({label, values, placeholders, onChange,}: { label: string; values: string[]; placeholders: string[]; onChange: (index: number, value: string) => void; }) {
    return (
        <div className="flex flex-col gap-2">
            <p className="font-bold">{label}</p>
            <div className="flex gap-2">
                {values.map((v, i) => (
                    <InputText
                        key={i}
                        value={v}
                        onChange={(e) => onChange(i, e.target.value)}
                        placeholder={placeholders[i]}
                    />
                ))}
            </div>
        </div>
    );
}

function Divider({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-3 mt-3">
            <div className="h-px flex-1 bg-fd-border" />
            <div className="flex items-center gap-1.5 text-xs bg-fd-card border border-fd-border px-3 py-1.5 rounded-full shrink-0">
                <ArrowLeftRight className="w-3 h-3" />
                <span>{label}</span>
            </div>
            <div className="h-px flex-1 bg-fd-border" />
        </div>
    );
}

export default function CoordinateCalculator() {
    const t = useTranslations('Tools.CoordinateCalculator');

    const [mode, setMode] = useState<'nether' | 'stronghold'>('nether');
    const [lastEdited, setLastEdited] = useState<'nether' | 'overworld' | null>(null);

    const [nether, setNether] = useState(['', '', '']);
    const [overworld, setOverworld] = useState(['', '', '']);

    const [throw1, setThrow1] = useState(['', '', '']);
    const [throw2, setThrow2] = useState(['', '', '']);

    const [tutorialStep, setTutorialStep] = useState(1);

    const toNum = (v: string) => (v === '' || isNaN(Number(v)) ? null : Number(v));

    useEffect(() => {
        if (lastEdited !== 'nether') return;
        const [nx, ny, nz] = nether;
        setOverworld([
            toNum(nx) !== null ? (toNum(nx)! * 8).toString() : '',
            ny,
            toNum(nz) !== null ? (toNum(nz)! * 8).toString() : '',
        ]);
    }, [nether, lastEdited]);

    useEffect(() => {
        if (lastEdited !== 'overworld') return;
        const [ox, oy, oz] = overworld;
        setNether([
            toNum(ox) !== null ? (toNum(ox)! / 8).toString() : '',
            oy,
            toNum(oz) !== null ? (toNum(oz)! / 8).toString() : '',
        ]);
    }, [overworld, lastEdited]);

    const getIntersection = () => {
        const [x1, z1, a1] = throw1;
        const [x2, z2, a2] = throw2;
        const vals = [x1, z1, a1, x2, z2, a2].map(Number);
        if ([x1, z1, a1, x2, z2, a2].some((v) => v === '') || vals.some(isNaN)) return null;

        const toRad = (d: number) => d * (Math.PI / 180) + Math.PI / 2;
        const [xA, zA, xB, zB] = [vals[0], vals[1], vals[3], vals[4]];
        const tan1 = Math.tan(toRad(vals[2]));
        const tan2 = Math.tan(toRad(vals[5]));
        const denom = tan2 - tan1;
        if (!isFinite(denom) || Math.abs(denom) < 1e-9) return null;

        const x = (zA - zB + xB * tan2 - xA * tan1) / denom;
        const z = (zA * tan2 - zB * tan1 + (xB - xA) * tan1 * tan2) / denom;
        if (!isFinite(x) || !isFinite(z)) return null;

        return { x: x.toFixed(2), z: z.toFixed(2) };
    };

    const stronghold = getIntersection();

    const tutorialImages = [
        '/assets/tutorials/coordinates_1.png',
        '/assets/tutorials/coordinates_2.png',
        '/assets/tutorials/coordinates_final.png',
    ];

    const modeImage = {
        nether: '/assets/minecraftnether3.jpg',
        stronghold: '/assets/minecraftenderportal.jpg',
    };

    return (
        <div className="flex flex-col w-full">
            <div className="flex gap-4 w-full max-lg:flex-col items-stretch">
                <div className="w-[420px] max-lg:w-full">
                    <div className="bg-fd-article border rounded-2xl overflow-hidden flex flex-col h-full">
                        <div className="relative w-full h-64">
                            <img
                                src={modeImage[mode]}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </div>
                        <div className="p-4 border-t border-fd-border">
                            <SelectBlock
                                values={[
                                    {
                                        label: (
                                            <span className="flex items-center gap-2">
                                                <MinecraftIcon src="/assets/icons/netherrack.webp" alt="" />
                                                {t('nether')}
                                            </span>
                                        ),
                                        value: 'nether',
                                    },
                                    {
                                        label: (
                                            <span className="flex items-center gap-2">
                                                <MinecraftIcon src="/assets/icons/ender_eye.webp" alt="" />
                                                {t('stronghold')}
                                            </span>
                                        ),
                                        value: 'stronghold',
                                    },
                                ]}
                                onChange={(value) => setMode(value as 'nether' | 'stronghold')}
                                defaultValue="nether"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1">
                    <div className="bg-fd-article border rounded-2xl p-6 h-full">
                        <div className="grid h-full">
                            <div
                                style={{ gridArea: '1 / 1' }}
                                className={`flex flex-col justify-center gap-4 ${mode !== 'nether' ? 'invisible pointer-events-none select-none' : ''}`}
                            >
                                <CoordRow
                                    label={t('overworld')}
                                    values={overworld}
                                    placeholders={['X', 'Y', 'Z']}
                                    onChange={(i, v) => {
                                        setLastEdited('overworld');
                                        setOverworld((prev) => prev.map((val, idx) => (idx === i ? v : val)));
                                    }}
                                />
                                <Divider label="1 : 8" />
                                <CoordRow
                                    label={t('nether')}
                                    values={nether}
                                    placeholders={['X', 'Y', 'Z']}
                                    onChange={(i, v) => {
                                        setLastEdited('nether');
                                        setNether((prev) => prev.map((val, idx) => (idx === i ? v : val)));
                                    }}
                                />
                            </div>

                            <div
                                style={{ gridArea: '1 / 1' }}
                                className={`flex flex-col gap-4 ${mode !== 'stronghold' ? 'invisible pointer-events-none select-none' : ''}`}
                            >
                                <CoordRow
                                    label={t('firstThrow')}
                                    values={throw1}
                                    placeholders={['X', 'Z', `${t('angle')} °`]}
                                    onChange={(i, v) => setThrow1((prev) => prev.map((val, idx) => (idx === i ? v : val)))}
                                />
                                <CoordRow
                                    label={t('secondThrow')}
                                    values={throw2}
                                    placeholders={['X', 'Z', `${t('angle')} °`]}
                                    onChange={(i, v) => setThrow2((prev) => prev.map((val, idx) => (idx === i ? v : val)))}
                                />
                                <div className="flex flex-col gap-2">
                                    <p className="font-bold">{t('stronghold')}</p>
                                    <div className="flex gap-2">
                                        <TextOutput text={stronghold?.x ?? ''} />
                                        <TextOutput text={stronghold?.z ?? ''} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`grid transition-[grid-template-rows] duration-300 ${mode === 'stronghold' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                <div className="overflow-hidden">
                    <div className="mt-4 bg-fd-article border rounded-2xl p-4 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <p className="font-bold">{t('tutorial')}</p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setTutorialStep((s) => Math.max(1, s - 1))}
                                    disabled={tutorialStep === 1}
                                    className="p-1.5 rounded-md border border-fd-border bg-fd-card hover:bg-fd-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <span className="text-sm text-fd-muted-foreground">{tutorialStep} / {tutorialImages.length}</span>
                                <button
                                    onClick={() => setTutorialStep((s) => Math.min(tutorialImages.length, s + 1))}
                                    disabled={tutorialStep === tutorialImages.length}
                                    className="p-1.5 rounded-md border border-fd-border bg-fd-card hover:bg-fd-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                        <div className="w-full rounded-lg overflow-hidden border border-fd-border">
                            <img
                                src={tutorialImages[tutorialStep - 1]}
                                alt={`Step ${tutorialStep}`}
                                className="w-full h-auto object-contain"
                                style={{ imageRendering: 'pixelated' }}
                            />
                        </div>
                        <p className="text-sm text-fd-muted-foreground">
                            {t(`tutorialStep${tutorialStep}`)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}