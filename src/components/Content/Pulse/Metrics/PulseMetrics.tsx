"use client";

import { useEffect, useState } from "react";
import Metric from "@/components/Metric/Metric";
import { useTranslations } from "next-intl";
import Callout from "@/components/Docs/Callout";

const TOC_KEYS = [
  { id: "server-count", key: "serverCount" },
  { id: "server-version", key: "serverVersion" },
  { id: "cpu-cores", key: "cpuCores" },
  { id: "total-ram", key: "totalRam" },
  { id: "modules", key: "modules" },
  { id: "project-version", key: "projectVersion" },
  { id: "project-language", key: "projectLanguage" },
  { id: "server-core", key: "serverCore" },
  { id: "os-architecture", key: "osArchitecture" },
  { id: "os-name", key: "osName" },
  { id: "java-version", key: "javaVersion" },
  { id: "proxy-mode", key: "proxyMode" },
  { id: "online-mode", key: "onlineMode" },
  { id: "database-mode", key: "databaseMode" },
  { id: "location", key: "location" },
] as const;

export default function PulseMetrics() {
  const t = useTranslations("Pulse.Metrics");
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -60% 0px",
      },
    );

    TOC_KEYS.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="flex w-full flex-col gap-4">
      <Callout margin="none" type="info" title={t("Callout.title")}>
        {t.rich("Callout.text", {
          a: (chunks) => (
            <a
              className="text-fd-primary hover:text-fd-muted-primary transition"
              href="/pulse/docs/config/metrics"
            >
              {chunks}
            </a>
          ),
        })}
      </Callout>
      <span className="w-full border-b"></span>
      <div className="flex flex-col w-full gap-4">
        <div
          id="server-count"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.serverCount")}</h1>
          <Metric
            type="two-line"
            slice={true}
            data={{
              first: { name: t("labels.serverCount"), apiPath: "serverCount" },
              second: { name: t("labels.playerCount"), apiPath: "playerCount" },
            }}
          />
        </div>

        <div
          id="server-version"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.serverVersion")}</h1>
          <Metric
            type="pie"
            name={t("labels.serverCount")}
            apiPath="field?name=serverVersion"
            sort="quickRevers"
          />
        </div>

        <div
          id="cpu-cores"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.cpuCores")}</h1>
          <Metric
            type="pie"
            suffix="CPU"
            name={t("labels.serverCount")}
            apiPath="field?name=cpuCores"
            sort="quickRevers"
          />
        </div>

        <div
          id="total-ram"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.totalRam")}</h1>
          <Metric
            type="pie"
            name={t("labels.serverCount")}
            apiPath="field?name=totalRam"
            sort="quickRevers"
            convert="gb"
            suffix="ГБ"
          />
        </div>

        <div
          id="modules"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.modules")}</h1>
          <Metric type="treemap" apiPath="field?name=modules" />
        </div>

        <div
          id="project-version"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.projectVersion")}</h1>
          <Metric
            type="pie"
            sort="quickRevers"
            name={t("labels.serverCount")}
            apiPath="field?name=projectVersion"
          />
        </div>

        <div
          id="project-language"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.projectLanguage")}</h1>
          <Metric
            type="bar"
            name={t("labels.serverCount")}
            apiPath="field?name=projectLanguage"
            sort="quick"
          />
        </div>

        <div
          id="server-core"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.serverCore")}</h1>
          <Metric
            type="two-pie"
            sort="quickRevers"
            data={{
              first: {
                name: t("labels.servers"),
                apiPath: "field?name=serverCore",
              },
              second: {
                name: t("labels.players"),
                apiPath: "field?name=playerCountByServerCore",
              },
            }}
          />
        </div>

        <div
          id="os-architecture"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.osArchitecture")}</h1>
          <Metric
            type="pie"
            sort="quickRevers"
            apiPath="field?name=osArchitecture"
            name={t("labels.serverCount")}
          />
        </div>

        <div
          id="os-name"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.osName")}</h1>
          <Metric
            type="pie"
            sort="quickRevers"
            apiPath="field?name=osName"
            name={t("labels.serverCount")}
          />
        </div>

        <div
          id="java-version"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.javaVersion")}</h1>
          <Metric
            type="pie"
            name={t("labels.serverCount")}
            apiPath="field?name=javaVersion"
            sort="quickRevers"
          />
        </div>

        <div
          id="proxy-mode"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.proxyMode")}</h1>
          <Metric
            type="bar"
            name={t("labels.serverCount")}
            sort="quick"
            apiPath="field?name=proxyMode"
          />
        </div>

        <div
          id="online-mode"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.onlineMode")}</h1>
          <Metric
            type="bar"
            name={t("labels.serverCount")}
            sort="quick"
            apiPath="field?name=onlineMode"
          />
        </div>

        <div
          id="database-mode"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.databaseMode")}</h1>
          <Metric
            type="bar"
            name={t("labels.serverCount")}
            sort="quick"
            apiPath="field?name=databaseMode"
          />
        </div>

        <div
          id="location"
          className="bg-fd-card border rounded-2xl scroll-mt-20"
        >
          <h1 className="m-4 font-bold">{t("items.location")}</h1>
          <Metric
            type="geo"
            name={t("labels.serverCount")}
            apiPath="field?name=location"
          />
        </div>
      </div>
    </div>
  );
}
