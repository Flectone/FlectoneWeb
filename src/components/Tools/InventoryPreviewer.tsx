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
        { id: 'anvil',             label: t('Containers.anvil'),             icon: '/assets/icons/anvil.webp',            image: '/assets/containers/anvil.webp' },
        { id: 'barrel',            label: t('Containers.barrel'),            icon: '/assets/icons/barrel.webp',            image: '/assets/containers/barrel.webp' },
        { id: 'beacon',            label: t('Containers.beacon'),            icon: '/assets/icons/beacon.webp',            image: '/assets/containers/beacon.webp' },
        { id: 'blast_furnance',    label: t('Containers.blast_furnance'),    icon: '/assets/icons/blast_furnace.webp',     image: '/assets/containers/blast_furnance.webp' },
        { id: 'brewing_stand',     label: t('Containers.brewing_stand'),     icon: '/assets/icons/brewing_stand.webp',   image: '/assets/containers/brewing_stand.webp' },
        { id: 'cartography_table', label: t('Containers.cartography_table'), icon: '/assets/icons/cartography_table.webp', image: '/assets/containers/cartography_table.webp' },
        { id: 'chest',             label: t('Containers.chest'),             icon: '/assets/icons/chest.webp',             image: '/assets/containers/chest.webp' },
        { id: 'crafter',           label: t('Containers.crafter'),           icon: '/assets/icons/crafter.webp',          image: '/assets/containers/crafter.webp' },
        { id: 'crafting_table',    label: t('Containers.crafting_table'),    icon: '/assets/icons/crafting_table.webp',    image: '/assets/containers/crafting_table.webp' },
        { id: 'dispenser',         label: t('Containers.dispenser'),         icon: '/assets/icons/dispenser.webp',         image: '/assets/containers/dispenser.webp' },
        { id: 'donkey',            label: t('Containers.donkey'),            icon: '/assets/icons/donkey.webp',            image: '/assets/containers/donkey.webp' },
        { id: 'dropper',           label: t('Containers.dropper'),           icon: '/assets/icons/dropper.webp',           image: '/assets/containers/dropper.webp' },
        { id: 'enchanting_table',  label: t('Containers.enchanting_table'),  icon: '/assets/icons/enchanting_table.webp',  image: '/assets/containers/enchanting_table.webp' },
        { id: 'furnance',          label: t('Containers.furnance'),          icon: '/assets/icons/furnace.webp',           image: '/assets/containers/furnance.webp' },
        { id: 'grindstone',        label: t('Containers.grindstone'),        icon: '/assets/icons/grindstone.webp',        image: '/assets/containers/grindstone.webp' },
        { id: 'hopper',            label: t('Containers.hopper'),            icon: '/assets/icons/hopper.webp',           image: '/assets/containers/hopper.webp' },
        { id: 'horse',             label: t('Containers.horse'),             icon: '/assets/icons/horse.webp',             image: '/assets/containers/horse.webp' },
        { id: 'inventory',         label: t('Containers.inventory'),         icon: '/assets/icons/player_head.webp',       image: '/assets/containers/inventory.webp' },
        { id: 'large_chest',       label: t('Containers.large_chest'),       icon: '/assets/icons/large_chest.webp',       image: '/assets/containers/large_chest.webp' },
        { id: 'llama',             label: t('Containers.llama'),             icon: '/assets/icons/llama.webp',             image: '/assets/containers/llama.webp' },
        { id: 'loom',              label: t('Containers.loom'),              icon: '/assets/icons/loom.webp',              image: '/assets/containers/loom.webp' },
        { id: 'nautilus',          label: t('Containers.nautilus'),          icon: '/assets/icons/nautilus.webp',          image: '/assets/containers/nautilus.webp' },
        { id: 'shulker_box',       label: t('Containers.shulker_box'),       icon: '/assets/icons/shulker_box.webp',       image: '/assets/containers/shulker_box.webp' },
        { id: 'smithing',          label: t('Containers.smithing'),          icon: '/assets/icons/smithing_table.webp',   image: '/assets/containers/smithing.webp' },
        { id: 'smoker',            label: t('Containers.smoker'),            icon: '/assets/icons/smoker.webp',            image: '/assets/containers/smoker.webp' },
        { id: 'stonecutter',       label: t('Containers.stonecutter'),       icon: '/assets/icons/stonecutter.webp',      image: '/assets/containers/stonecutter.webp' },
        { id: 'villager',          label: t('Containers.villager'),          icon: '/assets/icons/villager.webp',          image: '/assets/containers/villager.webp' },
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
                        backgroundImage: "url('/assets/backgrounds/minecraft_forest.webp')",
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
