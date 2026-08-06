"use client";
import Card from "./Card";
import { LucideCalendar, Clock, Eye, Download } from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import { SiBoosty } from "react-icons/si";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface VaultCardProps {
  title: string;
  image: string;
  date: string;
  views: string;
  videoUrl: string;
  mapUrl: string;
  duration: string;
  className?: string;
}

export function VaultCardLoading() {
  return (
    <Card className={`flex gap-0! flex-col p-0! border-[1.5px]!`}>
      <div className="relative">
        <div className="w-103.5 h-58 bg-fd-border animate-pulse"></div>
      </div>
      <div className="p-4 flex flex-col gap-4 justify-between h-full max-xl:w-4/6 max-md:gap-2 max-md:w-3/5 max-sm:w-full">
        <div className="flex gap-1 flex-col animate-pulse">
          <div className="bg-fd-border h-5.5 rounded-sm"></div>
          <div className="bg-fd-border h-5.5 rounded-sm"></div>
        </div>
        <div className="animate-pulse">
          <div className="bg-fd-border h-5 w-24 rounded-sm"></div>
        </div>
      </div>
    </Card>
  );
}

export function VaultCard({
  title,
  image,
  date,
  views,
  videoUrl,
  mapUrl,
  duration,
  className,
}: VaultCardProps) {
  const t = useTranslations("Vault.Card");

  const [youtubeIsOpen, setYoutubeIsOpen] = useState<boolean>(false);
  const [boostyIsOpen, setBoostyIsOpen] = useState<boolean>(false);

  return (
    <Card className={`${className} flex gap-0! flex-col p-0! border-[1.5px]! `}>
      <Link
        href={videoUrl}
        target="blank"
        className="relative"
        onMouseOver={() => {
          setYoutubeIsOpen(true);
        }}
        onMouseOut={() => {
          setYoutubeIsOpen(false);
        }}
      >
        <img
          src={image}
          alt="preview"
          className="w-full h-fit max-sm:w-full min-w-103.5 min-h-58 bg-fd-border"
        />
        <p className="flex gap-1 items-center absolute bottom-0 right-0 m-2 rounded-sm px-1 text-sm bg-fd-card/70 text-fd-foreground!">
          <Clock size={"14px"} />
          {duration}
        </p>
        <AnimatePresence>
          {youtubeIsOpen && (
            <motion.span
              className="absolute w-full h-full bottom-0 bg-fd-card/40 rounded-sm text-sm p-2 flex gap-1 items-end"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="flex gap-1 items-center bg-fd-card px-1 rounded-md">
                <FaYoutube />
                {t("watchYoutube")}
              </div>
            </motion.span>
          )}
        </AnimatePresence>
      </Link>
      <Link
        href={mapUrl}
        target="blank"
        className="p-4 max-sm:p-3 flex flex-col gap-4 justify-between h-full transition hover:bg-fd-border cursor-pointer"
        onMouseOver={() => {
          setBoostyIsOpen(true);
        }}
        onMouseOut={() => {
          setBoostyIsOpen(false);
        }}
      >
        <h1 className="font-bold line-clamp-2">{title}</h1>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-sm!">
            <AnimatePresence>
              {boostyIsOpen && (
                <div className="flex gap-2">
                  <motion.span
                    className="rounded-sm text-sm flex gap-1 items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <SiBoosty />
                    {t("watchBoosty")}
                  </motion.span>
                </div>
              )}
              {!boostyIsOpen && (
                <motion.div
                  className="flex gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <p className="flex gap-1 items-center">
                    <Eye size={16 + "px"} />
                    {views}
                  </p>
                  <p className="flex gap-1 items-center">
                    <LucideCalendar size={16 + "px"} />
                    {date}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
            <Download size={"1.2em"} />
          </div>
        </div>
      </Link>
    </Card>
  );
}
