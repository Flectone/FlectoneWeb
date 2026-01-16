import {useTranslations} from "next-intl";
import Image from "next/image";

export default function Footer() {

  const t = useTranslations('Footer')

  return (
    <footer
      className="w-full border-t  py-4 backdrop-blur-lg transition-colors *:mx-auto *:max-w-(--fd-layout-width)">
      <div className="mx-auto w-full flex flex-col gap-4 px-4">

        <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-6">

          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Image width={32} height={32} src="/logo.png" alt="logo" className="h-6 w-auto"/>
              <span className="font-bold text-lg tracking-tight">Flectone</span>
            </div>
            <p className="text-[10px] leading-relaxed uppercase opacity-50 font-medium tracking-wider">{t('answer')}</p>
          </div>

          <div className="flex items-center gap-4 text-sm font-medium opacity-80">
            <a href="https://www.youtube.com/@thefaser" className="hover:text-fd-primary transition-colors">Youtube</a>
            <a href="https://boosty.to/thefaser" className="hover:text-fd-primary transition-colors">Boosty</a>
            <a href="https://discord.flectone.net" className="hover:text-fd-primary transition-colors">Discord</a>
            <a href="https://t.me/flectone" className="hover:text-fd-primary transition-colors">Telegram</a>
            <a href="https://github.com/Flectone" className="hover:text-fd-primary transition-colors">Github</a>
          </div>
        </div>

        <hr className="border-fd-border opacity-50"/>

        <div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-muted-foreground">
          <p>{t('date')}</p>
          <p>
            {t.rich('openSourse', {
              a: (chunks) =>
                <a
                  href="https://github.com/flectone"
                  target="_blank"
                  className="text-fd-primary font-medium hover:text-fd-muted-primary transition-colors"
                >
                  {chunks}
                </a>
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}