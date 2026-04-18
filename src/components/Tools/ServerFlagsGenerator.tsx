'use client';

import {useState, useMemo, useEffect} from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Check, Download } from 'lucide-react';
import Checkbox from '../Form/Input/Checkbox';

type FlagPreset = 'none' | 'aikars' | 'zgc' | 'shenandoah' | 'velocity';
type OsTab = 'linux' | 'windows' | 'java';

const MIN_MB = 512;
const MAX_MB = 32768;
const STEP_MB = 512;

const MEMORY_TICKS = [512, 1024, 2048, 4096, 8192, 12288, 16384, 20480, 32768];

function formatMemory(mb: number): string {
    if (mb >= 1024 && mb % 1024 === 0) return `${mb / 1024} GB`;
    if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
    return `${mb} MB`;
}

function buildFlags(
    preset: FlagPreset,
    memoryMb: number,
    jar: string,
    gui: boolean,
    autoRestart: boolean,
    ignoreJavaVersion: boolean,
): Record<OsTab, string> {
    const mem = `${memoryMb}M`;
    const nogui = gui ? '' : ' --nogui';
    const isMoreThan12GB = Math.floor(memoryMb / 1024) >= 12;

    let jvmFlags: string[];

    const javaVersionFlag = ignoreJavaVersion ? '-Dpaper.ignoreJavaVersion=true' : '';

    if (preset === 'none') {
        // default flags
        jvmFlags = [
            `-Xms${mem}`, `-Xmx${mem}`,
            `--add-modules=jdk.incubator.vector`,
            `${javaVersionFlag}`,
            `-jar ${jar}${nogui}`
        ];
    } else if (preset === 'aikars') {
        // https://docs.papermc.io/paper/aikars-flags/
        jvmFlags = [
            `-Xms${mem}`, `-Xmx${mem}`,
            `--add-modules=jdk.incubator.vector`,
            `-XX:+UseG1GC`,
            `-XX:+ParallelRefProcEnabled`,
            `-XX:MaxGCPauseMillis=200`,
            `-XX:+UnlockExperimentalVMOptions`,
            `-XX:+DisableExplicitGC`,
            `-XX:+AlwaysPreTouch`,
            `-XX:G1NewSizePercent=${isMoreThan12GB ? 40 : 30}`,
            `-XX:G1MaxNewSizePercent=${isMoreThan12GB ? 50 : 40}`,
            `-XX:G1HeapRegionSize=${isMoreThan12GB ? 16 : 8}M`,
            `-XX:G1ReservePercent=${isMoreThan12GB ? 15 : 20}`,
            `-XX:G1HeapWastePercent=5`,
            `-XX:G1MixedGCCountTarget=4`,
            `-XX:InitiatingHeapOccupancyPercent=15`,
            `-XX:G1MixedGCLiveThresholdPercent=90`,
            `-XX:G1RSetUpdatingPauseTimePercent=5`,
            `-XX:SurvivorRatio=32`,
            `-XX:+PerfDisableSharedMem`,
            `-XX:MaxTenuringThreshold=1`,
            `-Dusing.aikars.flags=https://mcflags.emc.gs`,
            `-Daikars.new.flags=true`,
            `${javaVersionFlag}`,
            `-jar ${jar}${nogui}`,
        ];
    } else if (preset === 'zgc') {
        // https://obydux.github.io/Minecraft-startup-flags/
        jvmFlags = [
            `-Xms${mem}`, `-Xmx${mem}`,
            `--add-modules=jdk.incubator.vector`,
            `-XX:+UseZGC`,
            `-XX:+ZGenerational`,
            `-XX:+AlwaysPreTouch`,
            `-XX:+UseStringDeduplication`,
            `-XX:TrimNativeHeapInterval=5000`,
            `${javaVersionFlag}`,
            `-jar ${jar}${nogui}`,
        ];
    } else if (preset === 'shenandoah') {
        // https://github.com/brucethemoose/Minecraft-Performance-Flags-Benchmarks
        jvmFlags = [
            `-Xms${mem}`, `-Xmx${mem}`,
            `--add-modules=jdk.incubator.vector`,
            `-XX:+UseShenandoahGC`,
            `-XX:ShenandoahGCMode=iu`,
            `-XX:ShenandoahGuaranteedGCInterval=1000000`,
            `-XX:+AlwaysPreTouch`,
            `-XX:+DisableExplicitGC`,
            `-XX:AllocatePrefetchStyle=1`,
            `${javaVersionFlag}`,
            `-jar ${jar}${nogui}`,
        ];
    } else {
        // https://docs.papermc.io/velocity/getting-started
        jvmFlags = [
            `-Xms${mem}`, `-Xmx${mem}`,
            `-XX:+UseG1GC`,
            `-XX:G1HeapRegionSize=4M`,
            `-XX:+UnlockExperimentalVMOptions`,
            `-XX:+ParallelRefProcEnabled`,
            `-XX:+AlwaysPreTouch`,
            `-XX:MaxInlineLevel=15`,
            `${javaVersionFlag}`,
            `-jar ${jar}`,
        ];
    }

    const flagStr = jvmFlags.join(' ');
    const linux = autoRestart
        ? `#!/bin/bash\n\nwhile true; do\n\n  java ${flagStr}\n\n  echo "Server stopped. Restarting in 5s..."\n  sleep 5\ndone`
        : `#!/bin/bash\n\njava ${flagStr}`;
    const windows = autoRestart
        ? `@echo off\n\n:start\n\njava ${flagStr}\n\necho Server stopped. Restarting in 5s...\ntimeout /t 5\ngoto start`
        : `@echo off\n\njava ${flagStr}`;

    return { linux, windows, java: `java ${flagStr}` };
}

function highlightLine(line: string, tab: OsTab, key: number): React.ReactNode {
    const lineNum = (
        <span className="select-none text-fd-muted-foreground/40 w-5 shrink-0 text-right text-xs leading-6">{key + 1}</span>
    );

    if (tab !== 'java') {
        if (/^(#!\/bin\/bash|@echo off)/.test(line)) {
            return (
                <div key={key} className="flex gap-3 min-w-0">
                    {lineNum}
                    <span className="text-fd-muted-foreground italic break-words min-w-0 whitespace-pre-wrap">{line}</span>
                </div>
            );
        }
        if (/^(while|do|done|echo|sleep|:start|goto|timeout)/.test(line.trim())) {
            return (
                <div key={key} className="flex gap-3 min-w-0">
                    {lineNum}
                    <span className="text-fd-orange break-words min-w-0 whitespace-pre-wrap">{line}</span>
                </div>
            );
        }
    }

    if (line.trim().startsWith('java ') || tab === 'java') {
        const tokens = line.split(/(\s+)/);
        const rendered = tokens.map((token, ti) => {
            if (token === 'java') return <span key={ti} className="text-fd-green font-semibold">{token}</span>;
            if (token.startsWith('-Xms') || token.startsWith('-Xmx')) return <span key={ti} className="text-fd-orange">{token}</span>;
            if (token.startsWith('-XX:+') || token.startsWith('-XX:-')) return <span key={ti} className="text-fd-primary">{token}</span>;
            if (token.startsWith('-XX:')) {
                const eq = token.indexOf('=');
                if (eq !== -1) {
                    return <span key={ti}><span className="text-fd-primary">{token.slice(0, eq + 1)}</span><span className="text-fd-green">{token.slice(eq + 1)}</span></span>;
                }
                return <span key={ti} className="text-fd-primary">{token}</span>;
            }
            if (token.startsWith('-D') || token.startsWith('--')) {
                const eq = token.indexOf('=');
                if (eq !== -1) {
                    return <span key={ti}><span className="text-fd-muted-foreground">{token.slice(0, eq + 1)}</span><span className="text-fd-green">{token.slice(eq + 1)}</span></span>;
                }
                return <span key={ti} className="text-fd-muted-foreground">{token}</span>;
            }
            if (token === '-jar') return <span key={ti} className="text-fd-orange">{token}</span>;
            if (token === '--nogui') return <span key={ti} className="text-fd-muted-foreground">{token}</span>;
            if (/\.jar/.test(token)) return <span key={ti} className="text-fd-green font-semibold">{token}</span>;
            return <span key={ti}>{token}</span>;
        });

        return (
            <div key={key} className="flex gap-3 min-w-0">
                {lineNum}
                <span className="break-words min-w-0 whitespace-pre-wrap">{rendered}</span>
            </div>
        );
    }

    return (
        <div key={key} className="flex gap-3 min-w-0">
            {lineNum}
            <span className="text-fd-foreground break-words min-w-0 whitespace-pre-wrap">{line || '\u00A0'}</span>
        </div>
    );
}

function CodeBlock({ code, tab, onDownload }: { code: string; tab: OsTab; onDownload: () => void }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-2">
            <div className="relative bg-fd-card rounded-xl border overflow-hidden">
                <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-lg bg-fd-muted hover:bg-fd-border transition-colors duration-100 cursor-pointer"
                >
                    {copied
                        ? <Check size="1em" className="text-fd-green" />
                        : <Copy size="1em" className="text-fd-muted-foreground" />
                    }
                </button>
                <pre className="p-4 pr-12 text-sm font-mono leading-6 text-fd-foreground overflow-x-hidden">
                    {code.split('\n').map((line, i) => highlightLine(line, tab, i))}
                </pre>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={onDownload}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-100 bg-fd-primary hover:bg-fd-muted-primary text-fd-primary-foreground shadow-sm"
                >
                    <Download size="1em" />
                    {tab === 'linux' ? 'start.sh' : tab === 'windows' ? 'start.bat' : 'flags.txt'}
                </button>
            </div>
        </div>
    );
}

function MemorySlider({ value, onChange }: { value: number; onChange: (mb: number) => void }) {
    return (
        <div className="flex flex-col gap-3">
            <p className="font-bold">
                Память: <code className="bg-fd-card py-0.5 px-1 rounded-sm">{formatMemory(value)}</code>
            </p>
            <input
                type="range"
                min={MIN_MB}
                max={MAX_MB}
                step={STEP_MB}
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="w-full"
            />
            <div className="flex justify-between">
                {MEMORY_TICKS.map((mb) => (
                    <button
                        key={mb}
                        onClick={() => onChange(mb)}
                        className={`text-xs cursor-pointer transition-colors duration-75 ${
                            value === mb
                                ? 'text-fd-primary font-bold'
                                : 'text-fd-muted-foreground hover:text-fd-foreground'
                        }`}
                    >
                        {formatMemory(mb)}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default function ServerFlagsGenerator() {
    const t = useTranslations('Tools.ServerFlagsGenerator');

    const [jar, setJar] = useState('server.jar');
    const [memoryMb, setMemoryMb] = useState(4096);
    const [preset, setPreset] = useState<FlagPreset>('aikars');
    const [gui, setGui] = useState(false);
    const [autoRestart, setAutoRestart] = useState(false);
    const [osTab, setOsTab] = useState<OsTab>('linux');
    const [ignoreJavaVersion, setIgnoreJavaVersion] = useState(false);

    const guiDisabled = preset === 'velocity';
    const autoRestartDisabled = osTab === 'java';
    const ignoreVersionJavaDisabled = preset === 'none' || preset === 'velocity' || osTab === 'java';

    const result = useMemo(
        () => buildFlags(preset, memoryMb, jar, gui, autoRestart && !autoRestartDisabled, ignoreJavaVersion),
        [preset, memoryMb, jar, gui, autoRestart, autoRestartDisabled, ignoreJavaVersion],
    );

    useEffect(() => {
        if (guiDisabled) setGui(false);
        if (ignoreVersionJavaDisabled) setIgnoreJavaVersion(false);
    }, [preset, osTab, guiDisabled, ignoreVersionJavaDisabled]);

    const handleDownload = () => {
        const ext = osTab === 'linux' ? 'sh' : osTab === 'windows' ? 'bat' : 'txt';
        const blob = new Blob([result[osTab]], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `start.${ext}`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const PRESETS: { id: FlagPreset; label: string }[] = [
        { id: 'none',       label: 'None' },
        { id: 'aikars',     label: "Aikar's Flags" },
        { id: 'zgc',        label: 'ZGC (Java 21+)' },
        { id: 'shenandoah', label: 'Shenandoah' },
        { id: 'velocity',   label: 'Velocity / Proxy' },
    ];

    const OS_TABS: { id: OsTab; label: string }[] = [
        { id: 'linux',   label: 'Linux / Mac' },
        { id: 'windows', label: 'Windows' },
        { id: 'java',    label: 'Java' },
    ];

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="bg-fd-article border rounded-2xl p-6 flex flex-col gap-6">
                <div className="flex gap-6 max-md:flex-col">
                    <div className="flex flex-col gap-2 w-52 max-md:w-full shrink-0">
                        <p className="font-bold">{t('filename')}</p>
                        <div className="flex items-center bg-fd-card border rounded-xl px-4 py-2.5">
                            <input
                                type="text"
                                value={jar}
                                onChange={(e) => setJar(e.target.value)}
                                className="bg-transparent w-full text-fd-foreground text-base outline-none"
                                placeholder="server.jar"
                            />
                        </div>
                        <p className="text-xs">{t('filenameHint')}</p>
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                        <p className="font-bold">{t('flags')}</p>
                        <div className="grid grid-cols-5 gap-2 h-full max-sm:grid-cols-2">
                            {PRESETS.map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setPreset(p.id)}
                                    className={`px-3 py-2 rounded-xl border cursor-pointer text-sm font-medium transition-all duration-100 h-full min-h-10 ${
                                        preset === p.id
                                            ? 'border-fd-primary bg-fd-primary/10 text-fd-primary'
                                            : 'border-fd-border bg-fd-card text-fd-muted-foreground hover:bg-fd-muted hover:text-fd-foreground'
                                    }`}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 shrink-0">
                        <p className="font-bold">{t('options')}</p>
                        <div className="flex flex-col gap-3">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={gui} onChange={setGui} disabled={guiDisabled} />
                                <div>
                                    <p className={`text-sm font-medium text-fd-foreground ${guiDisabled ? 'opacity-40' : ''}`}>GUI</p>
                                    <p className="text-xs">{t('guiHint')}</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={autoRestart} onChange={setAutoRestart} disabled={autoRestartDisabled} />
                                <div>
                                    <p className={`text-sm font-medium text-fd-foreground ${autoRestartDisabled ? 'opacity-40' : ''}`}>{t('autoRestart')}</p>
                                    <p className="text-xs">{t('autoRestartHint')}</p>
                                </div>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <Checkbox checked={ignoreJavaVersion} onChange={setIgnoreJavaVersion} disabled={ignoreVersionJavaDisabled} />
                                <div>
                                    <p className={`text-sm font-medium text-fd-foreground" ${ignoreVersionJavaDisabled ? 'opacity-40' : ''}`}>{t('ignoreJavaVersion')}</p>
                                    <p className="text-xs">{t('ignoreJavaVersionHint')}</p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className="border-t border-fd-border pt-4">
                    <MemorySlider value={memoryMb} onChange={setMemoryMb} />
                </div>
            </div>

            <div className="bg-fd-article border rounded-2xl p-6 flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <p className="font-bold">{t('result')}</p>
                    <div className="flex gap-1 bg-fd-card rounded-xl p-1 border">
                        {OS_TABS.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setOsTab(tab.id)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition-all duration-100 ${
                                    osTab === tab.id
                                        ? 'bg-fd-primary text-fd-primary-foreground shadow-sm'
                                        : 'text-fd-muted-foreground hover:text-fd-foreground'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>
                <CodeBlock code={result[osTab]} tab={osTab} onDownload={handleDownload} />
            </div>
        </div>
    );
}