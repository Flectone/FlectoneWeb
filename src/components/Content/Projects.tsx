"use client";

import Card from "../Card/Card";
import { useTranslations } from "next-intl";
import FeatureCard from "@/components/Card/FeatureCard";
import Image from "next/image";
import { useCurrentTheme } from "@/lib/current-theme";

export default function Projects() {
  const t = useTranslations("Projects");
  const currentTheme = useCurrentTheme();

  return (
    <div className="w-full flex flex-col justify-center gap-4">
      <div className="w-full flex gap-8 flex-col">
        <div className="grid grid-cols-2 grid-rows-2 gap-4">
          <Card
            path="/pulse"
            className="col-span-2 w-full h-full max-md:h-fit items-center flex justify-between p-10 relative"
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl max-md:text-xl font-bold">
                Flectone<b>Pulse</b>
              </h1>
              <p className="w-2/3 max-md:text-md">{t("Pulse.description")}</p>
            </div>
            <div className="bg-cover bg-center max-md:w-3/5 w-4/5 absolute right-0 top-0 bg-[url('/assets/flectonepulse/flectonepulse_features.webp')] mask-[linear-gradient(to_left,white,transparent)] h-full"></div>
          </Card>
          <Card
            path="/tools"
            className="row-start-2 w-full h-full max-md:h-fit items-center flex justify-between p-10 relative"
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl max-md:text-xl font-bold">
                Flectone<b>Tools</b>
              </h1>
              <p className="w-2/3 max-md:text-md">{t("Tools.description")}</p>
            </div>
            <div
              className={`max-md:w-3/5 max-md:bg-size-[16rem] w-4/5 animate-bg-diagonal-up absolute right-0 top-0 bg-size-[22rem] mask-[linear-gradient(to_left,white,transparent)] h-full`}
              style={{
                backgroundImage: `url("/assets/backgrounds/flectonetools_background_${currentTheme}.webp")`,
              }}
            ></div>
          </Card>
          <Card
            path="/vault"
            className="row-start-2 w-full h-full max-md:h-fit items-center flex justify-between p-10 relative"
          >
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl max-md:text-xl font-bold">
                Flectone<b>Vault</b>
              </h1>
              <p className="w-2/3 max-md:text-md">{t("Vault.description")}</p>
            </div>
            <div
              className={`max-md:w-3/5 max-md:bg-size-[16rem] w-4/5 animate-bg-diagonal-up absolute right-0 top-0 bg-size-[22rem] mask-[linear-gradient(to_left,white,transparent)] h-full`}
              style={{
                backgroundImage: `url("/assets/backgrounds/flectonetools_background_${currentTheme}.webp")`,
              }}
            ></div>
          </Card>
        </div>
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-2xl">{t("closed")}</h3>
          <div className="flex w-full max-xl:flex-col gap-4">
            <FeatureCard
              link={"/mix"}
              className="w-1/2 max-xl:w-full items-center flex p-10"
              image={"/assets/flectonemix/flectonemix_preview.webp"}
              title={
                <h1 className="text-2xl max-md:text-xl font-bold">
                  Flectone<b>Mix</b>
                </h1>
              }
              description={
                <p className={"w-2/3 max-md:text-md"}>{t("Mix.description")}</p>
              }
              imagePosition={"right"}
              imageWidth={800}
              imageHeight={600}
              imageAlt={"flectonemix"}
            />
            <FeatureCard
              link={"/chat"}
              className="w-1/2 max-xl:w-full items-center flex p-10"
              image={t("Chat.imagePath")}
              title={
                <h1 className="text-2xl max-md:text-xl font-bold">
                  Flectone<b>Chat</b>
                </h1>
              }
              description={
                <p className={"w-2/3 max-md:text-md"}>
                  {t("Chat.description")}
                </p>
              }
              imagePosition={"right"}
              imageWidth={800}
              imageHeight={600}
              imageAlt={"flectonechat"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
