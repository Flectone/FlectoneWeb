'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Container = {
    id: string;
    label: string;
    icon: string;
    image: string;
};

function MinecraftIcon({ src, alt }: { src: string; alt: string }) {
    return (
        <img
            src={src}
            alt={alt}
            className="w-6 h-6 object-contain"
            style={{ imageRendering: 'pixelated' }}
            onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
            }}
        />
    );
}

export default function InventoryPreviewer() {
    const t = useTranslations('Tools.InventoryPreviewer');

    const CONTAINERS: Container[] = [
        { id: 'anvil',             label: t('Containers.anvil'),             icon: '/assets/icons/anvil.webp',            image: '/assets/containers/anvil.png' },
        { id: 'barrel',            label: t('Containers.barrel'),            icon: '/assets/icons/barrel.png',            image: '/assets/containers/barrel.png' },
        { id: 'beacon',            label: t('Containers.beacon'),            icon: '/assets/icons/beacon.png',            image: '/assets/containers/beacon.png' },
        { id: 'blast_furnance',    label: t('Containers.blast_furnance'),    icon: '/assets/icons/blast_furnace.png',     image: '/assets/containers/blast_furnance.png' },
        { id: 'brewing_stand',     label: t('Containers.brewing_stand'),     icon: '/assets/icons/brewing_stand.webp',   image: '/assets/containers/brewing_stand.png' },
        { id: 'cartography_table', label: t('Containers.cartography_table'), icon: '/assets/icons/cartography_table.png', image: '/assets/containers/cartography_table.png' },
        { id: 'chest',             label: t('Containers.chest'),             icon: '/assets/icons/chest.gif',             image: '/assets/containers/chest.png' },
        { id: 'crafter',           label: t('Containers.crafter'),           icon: '/assets/icons/crafter.webp',          image: '/assets/containers/crafter.png' },
        { id: 'crafting_table',    label: t('Containers.crafting_table'),    icon: '/assets/icons/crafting_table.png',    image: '/assets/containers/crafting_table.png' },
        { id: 'dispenser',         label: t('Containers.dispenser'),         icon: '/assets/icons/dispenser.png',         image: '/assets/containers/dispenser.png' },
        { id: 'donkey',            label: t('Containers.donkey'),            icon: '/assets/icons/donkey.png',            image: '/assets/containers/donkey.png' },
        { id: 'dropper',           label: t('Containers.dropper'),           icon: '/assets/icons/dropper.png',           image: '/assets/containers/dropper.png' },
        { id: 'enchanting_table',  label: t('Containers.enchanting_table'),  icon: '/assets/icons/enchanting_table.png',  image: '/assets/containers/enchanting_table.png' },
        { id: 'furnance',          label: t('Containers.furnance'),          icon: '/assets/icons/furnace.png',           image: '/assets/containers/furnance.png' },
        { id: 'grindstone',        label: t('Containers.grindstone'),        icon: '/assets/icons/grindstone.png',        image: '/assets/containers/grindstone.png' },
        { id: 'hopper',            label: t('Containers.hopper'),            icon: '/assets/icons/hopper.png',           image: '/assets/containers/hopper.png' },
        { id: 'horse',             label: t('Containers.horse'),             icon: '/assets/icons/horse.png',             image: '/assets/containers/horse.png' },
        { id: 'inventory',         label: t('Containers.inventory'),         icon: '/assets/icons/player_head.png',       image: '/assets/containers/inventory.png' },
        { id: 'large_chest',       label: t('Containers.large_chest'),       icon: '/assets/icons/large_chest.gif',       image: '/assets/containers/large_chest.png' },
        { id: 'llama',             label: t('Containers.llama'),             icon: '/assets/icons/llama.png',             image: '/assets/containers/llama.png' },
        { id: 'loom',              label: t('Containers.loom'),              icon: '/assets/icons/loom.png',              image: '/assets/containers/loom.png' },
        { id: 'nautilus',          label: t('Containers.nautilus'),          icon: '/assets/icons/nautilus.gif',          image: '/assets/containers/nautilus.png' },
        { id: 'shulker_box',       label: t('Containers.shulker_box'),       icon: '/assets/icons/shulker_box.png',       image: '/assets/containers/shulker_box.png' },
        { id: 'smithing',          label: t('Containers.smithing'),          icon: '/assets/icons/smithing_table.webp',   image: '/assets/containers/smithing.png' },
        { id: 'smoker',            label: t('Containers.smoker'),            icon: '/assets/icons/smoker.png',            image: '/assets/containers/smoker.png' },
        { id: 'stonecutter',       label: t('Containers.stonecutter'),       icon: '/assets/icons/stonecutter.webp',      image: '/assets/containers/stonecutter.png' },
        { id: 'villager',          label: t('Containers.villager'),          icon: '/assets/icons/villager.png',          image: '/assets/containers/villager.png' },
    ];

    const [selected, setSelected] = useState<Container>(CONTAINERS[0]);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    return (
        <div className="flex gap-4 w-full max-lg:flex-col">
            <div className="flex-1 flex flex-col gap-4">
                <div
                    className="relative w-full rounded-2xl border-2 overflow-hidden flex items-center justify-center"
                    style={{
                        minHeight: '680px',
                        backgroundImage: "url('/assets/minecraftjungle2.png')",
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    <div className="absolute inset-0 bg-black/40" />

                    <div className="relative z-10 flex items-center justify-center p-8 w-full h-full">
                        <img
                            key={selected.id}
                            src={selected.image}
                            alt={selected.label}
                            className="object-contain drop-shadow-2xl"
                            style={{
                                imageRendering: 'pixelated',
                                maxHeight: '560px',
                                maxWidth: '100%',
                                width: 'auto',
                                height: 'auto',
                            }}
                        />
                    </div>

                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/10">
                        <MinecraftIcon src={selected.icon} alt={selected.label} />
                        <span className="font-bold text-white text-base">{selected.label}</span>
                    </div>
                </div>
            </div>

            <div className="w-96 max-lg:w-full flex flex-col gap-4">
                <div className="bg-fd-article border rounded-2xl p-6 flex flex-col gap-3">
                    <p className="font-bold text-base">{t('container')}</p>

                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen((v) => !v)}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border bg-fd-card text-fd-foreground text-base cursor-pointer hover:bg-fd-muted transition-colors duration-100 justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <MinecraftIcon src={selected.icon} alt={selected.label} />
                                <span>{selected.label}</span>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className={`transition-transform duration-150 flex-shrink-0 ${dropdownOpen ? 'rotate-180' : ''}`}
                            >
                                <polyline points="6 9 12 15 18 9" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div className="absolute z-50 mt-1 w-full rounded-xl border bg-fd-card shadow-xl overflow-hidden">
                                <div className="max-h-80 overflow-y-auto">
                                    {CONTAINERS.map((container) => (
                                        <button
                                            key={container.id}
                                            onClick={() => {
                                                setSelected(container);
                                                setDropdownOpen(false);
                                            }}
                                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-base text-left cursor-pointer transition-colors duration-75 hover:bg-fd-muted ${
                                                selected.id === container.id
                                                    ? 'bg-fd-primary/15 text-fd-primary'
                                                    : 'text-fd-foreground'
                                            }`}
                                        >
                                            <MinecraftIcon src={container.icon} alt={container.label} />
                                            <span>{container.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-fd-article border rounded-2xl p-6 flex flex-col gap-3">
                    <p className="font-bold text-base">{t('allContainers')}</p>
                    <div className="grid grid-cols-5 gap-2">
                        {CONTAINERS.map((container) => (
                            <button
                                key={container.id}
                                onClick={() => setSelected(container)}
                                title={container.label}
                                className={`flex items-center justify-center p-2.5 rounded-xl border cursor-pointer transition-all duration-100 hover:border-fd-primary/50 hover:bg-fd-muted ${
                                    selected.id === container.id
                                        ? 'border-fd-primary bg-fd-primary/10'
                                        : 'border-fd-border bg-fd-card'
                                }`}
                            >
                                <img
                                    src={container.icon}
                                    alt={container.label}
                                    className="w-9 h-9 object-contain"
                                    style={{ imageRendering: 'pixelated' }}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.opacity = '0.2';
                                    }}
                                />
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
