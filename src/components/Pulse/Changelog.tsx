'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { Check, Wrench, Package, Zap } from 'lucide-react';
import { useTranslations } from "next-intl";

interface VersionProps {
    v: string;
    date?: string;
    authors?: string[];
    children: ReactNode;
}

interface GroupProps {
    children: ReactNode;
}

export function Title({ date, children }: Readonly<{ date?: string; children: ReactNode }>) {
    return (
        <>
            {children}
            {date && <time className="changelog-date">{formatDate(date)}</time>}
        </>
    );
}

export function Features({ children }: Readonly<GroupProps>) {
    const t = useTranslations('Pulse.Changelog')

    return (
        <div className="changelog-group">
            <div className="changelog-group-header">
                <Zap className="changelog-icon changelog-icon-feature" size={20} />
                <span className="changelog-label">{t('features')}</span>
            </div>
            <ul className="changelog-list">{children}</ul>
        </div>
    );
}

export function Fixes({ children }: Readonly<GroupProps>) {
    const t = useTranslations('Pulse.Changelog')

    return (
        <div className="changelog-group">
            <div className="changelog-group-header">
                <Check className="changelog-icon changelog-icon-fix" size={20} />
                <span className="changelog-label">{t('bugFixes')}</span>
            </div>
            <ul className="changelog-list">{children}</ul>
        </div>
    );
}

export function Refactors({ children }: Readonly<GroupProps>) {
    const t = useTranslations('Pulse.Changelog')

    return (
        <div className="changelog-group">
            <div className="changelog-group-header">
                <Wrench className="changelog-icon changelog-icon-refactor" size={20} />
                <span className="changelog-label">{t('refactors')}</span>
            </div>
            <ul className="changelog-list">{children}</ul>
        </div>
    );
}

export function Dependencies({ children }: Readonly<GroupProps>) {
    const t = useTranslations('Pulse.Changelog')

    return (
        <div className="changelog-group">
            <div className="changelog-group-header">
                <Package className="changelog-icon changelog-icon-deps" size={20} />
                <span className="changelog-label">{t('dependencies')}</span>
            </div>
            <ul className="changelog-list">{children}</ul>
        </div>
    );
}

export function Feature({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <li className="changelog-item">
            <span className="changelog-dot changelog-dot-feature" />
            <span>{children}</span>
        </li>
    );
}

export function Fix({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <li className="changelog-item">
            <span className="changelog-dot changelog-dot-fix" />
            <span>{children}</span>
        </li>
    );
}

export function Refactor({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <li className="changelog-item">
            <span className="changelog-dot changelog-dot-refactor" />
            <span>{children}</span>
        </li>
    );
}

export function Dependency({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <li className="changelog-item">
            <span className="changelog-dot changelog-dot-deps" />
            <span>{children}</span>
        </li>
    );
}

function formatDate(dateStr: string) {
    const userLocale = navigator.language || 'ru';

    return new Date(dateStr).toLocaleDateString(userLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export function Version({ v, date, authors = [], children }: VersionProps) {
    const t = useTranslations('Pulse.Changelog')

    return (
        <section className="changelog-version">
            <div className="changelog-timeline" />
            <div className="changelog-content">
                <div className="changelog-header">
                    <div className="changelog-meta">
                        {date && <time className="changelog-date">{formatDate(date)}</time>}
                        <div className="changelog-actions">
                            <a href="https://flectone.net/pulse/download" className="changelog-btn changelog-btn-download">
                                {t('download')}
                            </a>
                            <a href={`https://github.com/Flectone/FlectonePulse/releases/tag/v${v}`} target="_blank" rel="noopener noreferrer" className="changelog-btn">
                                {t('github')}
                            </a>
                        </div>
                    </div>
                </div>

                <div className="changelog-groups">{children}</div>

                {authors.length > 0 && (
                    <div className="changelog-authors">
                        {authors.map((username) => (
                            <a key={username} href={`https://github.com/${username}`} target="_blank" rel="noreferrer noopener" className="changelog-author">
                                <Image
                                    width={20}
                                    height={20}
                                    src={`https://github.com/${username}.png?size=40`}
                                    alt={username}
                                    className="changelog-avatar"
                                    onError={(e) => {
                                        (e.currentTarget as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`;
                                    }}
                                />
                                <span>{username}</span>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}