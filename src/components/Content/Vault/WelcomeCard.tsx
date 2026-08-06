"use client";

import { useTranslations } from "next-intl";
import { useCurrentTheme } from "@/lib/current-theme";

export default function WelcomeCard() {
  const t = useTranslations("Vault.Main");
  const currentTheme = useCurrentTheme();

  return (
    <div className="w-full max-lg:p-8 rounded-2xl border overflow-hidden bg-fd-card/85 backdrop-blur-3xl flex px-16 py-12 justify-between items-center gap-8">
      <div
        className={`animate-bg-diagonal-up absolute right-0 top-0 bg-size-[22rem] mask-[linear-gradient(to_left,white,transparent)] w-2/3 max-md:w-2/4 h-full`}
        style={{
          backgroundImage: `url("/assets/flectonevault/flectonevault_preview_${currentTheme}.webp")`,
        }}
      ></div>
      <div className="flex flex-col">
        <h1 className="text-3xl w-2/3 max-md:w-full text-start font-bold">
          {t.rich("title", {
            b: (chunks) => <b>{chunks}</b>,
          })}
        </h1>
        <p className="w-2/3">{t("description")}</p>
      </div>
    </div>
  );
}
