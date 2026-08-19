import { useTranslations } from "next-intl"
import {
  SiModrinth,
  SiSpigotmc,
  SiBuiltbybit,
  SiCurseforge,
} from "react-icons/si"
import { FaCode } from "react-icons/fa"
import { TbBrandGithubFilled } from "react-icons/tb"
import { BsHexagonFill } from "react-icons/bs"
import DownloadCard from "./download-card"
import Title from "./title"

export default function Download() {
  const t = useTranslations("FlectonePulse.Main.Download")

  return (
    <div id="download" className="flex w-full scroll-mt-20 flex-col gap-4">
      <div className="flex w-full flex-col gap-6">
        <div className="flex h-fit w-full flex-col gap-3">
          <Title title={t.raw("minecraft")} />
          <div className="grid w-full grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://builtbybit.com/resources/flectonepulse.59937/"
              icon={<SiBuiltbybit />}
              color="var(--color-indigo-600)"
              name="BuilByBit"
            />
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://www.curseforge.com/minecraft/bukkit-plugins/flectonepulse"
              icon={<SiCurseforge />}
              color="var(--color-gray-600)"
              name="CurseForge"
            />
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://github.com/Flectone/FlectonePulse/releases/"
              icon={<TbBrandGithubFilled />}
              color="var(--color-foreground)"
              name="Github"
            />
            <DownloadCard
              button={t("download")}
              release={t("devbuilds")}
              link="https://github.com/Flectone/FlectonePulse/actions"
              icon={<FaCode />}
              color="var(--color-foreground)"
              name="Github Actions"
            />
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://hangar.papermc.io/TheFaser/FlectonePulse"
              icon={
                <img
                  src="https://hangar.papermc.io/favicon/favicon-32x32.png"
                  alt=""
                />
              }
              color="var(--color-primary)"
              name="Hangar"
            />
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://modrinth.com/plugin/flectonepulse"
              icon={<SiModrinth />}
              color="var(--color-green-400)"
              name="Modrinth"
            />
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://www.spigotmc.org/resources/flectonepulse.121618/"
              icon={<SiSpigotmc />}
              color="var(--color-orange-400)"
              name="Spigot"
            />
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://spigotmc.ru/resources/flectonepulse.2912/"
              icon={<SiSpigotmc />}
              color="var(--color-orange-400)"
              name="SpigotRU"
            />
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://polymart.org/resource/flectonepulse.7203"
              icon={<BsHexagonFill />}
              color="var(--color-purple-400)"
              name="Voxel (Polymart)"
            />
          </div>
        </div>
        <div className="flex h-fit w-full flex-col gap-3">
          <Title title={t.raw("minecraft")} />
          <div className="grid w-full grid-cols-3 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1">
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://curseforge.com/hytale/mods/flectonepulse"
              icon={<SiCurseforge />}
              color="var(--color-gray-600)"
              name="CurseForge"
            />
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://modtale.net/mod/flectonepulse-hytale-edition-83535d1b-4837-4b01-9fd5-8307f3c007b5"
              icon={<BsHexagonFill />}
              color="var(--color-sky-800)"
              name="ModTale"
            />
            <DownloadCard
              button={t("download")}
              release={t("latestrelease")}
              link="https://spigotmc.ru/resources/flectonepulse-hytale-edition.4938/"
              icon={<SiSpigotmc />}
              color="var(--color-orange-400)"
              name="SpigotRU"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
