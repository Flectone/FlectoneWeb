"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Check, Wrench, Package, Zap, Bug } from "lucide-react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import LinkButton from "../Button/LinkButton";

interface VersionProps {
  v: string;
  className?: string;
  id?: string;
  date?: string;
  authors?: string[];
  children: ReactNode;
}

interface GroupProps {
  children: ReactNode;
}

export function Title({
  date,
  children,
}: Readonly<{ date?: string; children: ReactNode }>) {
  return (
    <>
      {children}
      {date && <time className="changelog-date">{formatDate(date)}</time>}
    </>
  );
}

export function Features({ children }: Readonly<GroupProps>) {
  const t = useTranslations("Pulse.Changelog");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 text-lg font-bold items-center">
        <Zap
          className="text-fd-green"
          size={20}
          fill="var(--color-fd-green)"
          strokeWidth={1}
        />
        <span className="">{t("features")}</span>
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

export function Fixes({ children }: Readonly<GroupProps>) {
  const t = useTranslations("Pulse.Changelog");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 text-lg font-bold items-center">
        <Bug className="text-fd-red" size={20} fill="var(--color-fd-red)" />
        <span className="">{t("bugFixes")}</span>
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

export function Refactors({ children }: Readonly<GroupProps>) {
  const t = useTranslations("Pulse.Changelog");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 text-lg font-bold items-center">
        <Wrench
          className="text-fd-warning"
          size={20}
          strokeWidth={1}
          fill="var(--color-fd-warning)"
        />
        <span className="">{t("refactors")}</span>
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

export function Dependencies({ children }: Readonly<GroupProps>) {
  const t = useTranslations("Pulse.Changelog");

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1 text-lg font-bold items-center">
        <Package className="text-fd-primary" size={20} />
        <span className="">{t("dependencies")}</span>
      </div>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

export function Feature({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <li className="flex items-center gap-1 text-md text-fd-muted-foreground">
      <span className="w-5 h-5 flex items-center shrink-0 justify-center">
        <span className="border-fd-green border-3 rounded-full" />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Fix({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <li className="flex items-center gap-1 text-md text-fd-muted-foreground">
      <span className="w-5 h-5 flex items-center shrink-0 justify-center">
        <span className="border-fd-error border-3 rounded-full" />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Refactor({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <li className="flex items-center gap-1 text-md text-fd-muted-foreground">
      <span className="w-5 h-5 flex items-center shrink-0 justify-center">
        <span className="border-fd-warning border-3 rounded-full" />
      </span>
      <span>{children}</span>
    </li>
  );
}

export function Dependency({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <li className="flex items-center gap-1 text-md text-fd-muted-foreground">
      <span className="w-5 h-5 flex items-center shrink-0 justify-center">
        <span className="border-fd-primary border-3 rounded-full" />
      </span>
      <span>{children}</span>
    </li>
  );
}

function formatDate(dateStr: string) {
  const localeValue = useLocale();
  const userLocale = localeValue == "en" ? "en-US" : "ru-RU";

  return new Date(dateStr).toLocaleDateString(userLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function Version({
  v,
  date,
  authors = [],
  children,
  id,
  className,
}: VersionProps) {
  const t = useTranslations("Pulse.Changelog");

  return (
    <section className={`${className} border-l-2 pb-8`} id={id}>
      <div className="relative flex flex-col gap-4">
        <div className="border-2 border-fd-primary rounded-full w-fit absolute -left-3.25 top-1 backdrop-blur-3xl">
          <div className="border-5 rounded-full border-fd-primary m-1.25"></div>
        </div>
        <div className="flex gap-2 items-center ml-8">
          {date && (
            <time className="text-fd-muted-foreground text-sm">
              {formatDate(date)}
            </time>
          )}
          <div className="flex gap-2">
            <LinkButton href="/pulse/download" className="">
              {t("download")}
            </LinkButton>
            <LinkButton
              href={`https://github.com/Flectone/FlectonePulse/releases/tag/v${v}`}
              target="_blank"
              mode="gray"
              className=""
            >
              {t("github")}
            </LinkButton>
          </div>
        </div>

        <div className="ml-8 flex flex-col gap-4">{children}</div>

        {authors.length > 0 && (
          <div className="ml-8 flex gap-2">
            {authors.map((username) => (
              <a
                key={username}
                href={`https://github.com/${username}`}
                target="_blank"
                rel=""
                className="flex items-center gap-1 text-sm text-fd-muted-foreground hover:text-fd-foreground transition"
              >
                <Image
                  width={20}
                  height={20}
                  src={`https://github.com/${username}.png?size=40`}
                  alt={username}
                  className="rounded-full"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src =
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=random`;
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
