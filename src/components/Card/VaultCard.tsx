import LinkButton from "../Button/LinkButton";
import Card from "./Card";
import { LucideCalendar, Clock, Eye, CirclePlay, Map } from "lucide-react";
import { useTranslations } from "next-intl";

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

export default function VaultCard({
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

  return (
    <Card className={`${className} flex gap-4 justify-between max-sm:flex-col`}>
      <img
        src={image}
        alt="preview"
        className="w-2/5 max-xl:w-2/6 rounded-lg max-md:w-2/5 max-sm:w-full"
      />
      <div className="flex flex-col gap-4 justify-between w-3/5 max-xl:w-4/6 max-md:gap-2 max-md:w-3/5 max-sm:w-full">
        <h1 className="font-bold line-clamp-2">{title}</h1>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between text-sm!">
            <p className="flex gap-1 items-center">
              <Eye size={16 + "px"} />
              {views}
            </p>
            <p className="flex gap-1 items-center">
              <LucideCalendar size={16 + "px"} />
              {date}
            </p>
            <p className="flex gap-1 items-center">
              <Clock size={16 + "px"} />
              {duration}
            </p>
          </div>
          <div className="flex gap-2">
            <LinkButton
              target="blank"
              href={videoUrl}
              className="w-full flex justify-center gap-1 items-center"
              mode="gray"
            >
              <CirclePlay size={"1.1em"} strokeWidth={"3px"} /> {t("watch")}
            </LinkButton>
            <LinkButton
              target="blank"
              href={mapUrl}
              className="w-full flex justify-center gap-1 items-center"
              mode="blue"
            >
              <Map size={"1.1em"} strokeWidth={"3px"} /> {t("download")}
            </LinkButton>
          </div>
        </div>
      </div>
    </Card>
  );
}
