import Link from 'next/link';

export default function Footer() {
    return (
      <footer className="w-full border-t bg-fd-background py-4 backdrop-blur-lg transition-colors *:mx-auto *:max-w-(--fd-layout-width) bg-fd-background/80 ">
          <div className="mx-auto w-full flex flex-col gap-4 px-4">

              <div className="flex flex-col md:flex-row md:items-stretch justify-between gap-6">

                  <div className="flex flex-col gap-3 max-w-2xl">
                      <div className="flex items-center gap-2">
                          <img src="/logo.png" alt="logo" className="h-6 w-auto" />
                          <span className="font-bold text-lg tracking-tight">Flectone</span>
                      </div>
                      <p className="text-[10px] leading-relaxed uppercase opacity-50 font-medium tracking-wider">
                          Не является официальным сервисом Minecraft.
                          Не одобрено и не связано с компанией Mojang или Microsoft.
                      </p>
                  </div>

                  <div className="flex items-center gap-4 text-sm font-medium opacity-80">
                      <a href="https://www.youtube.com/@thefaser" className="hover:text-fd-primary transition-colors">Youtube</a>
                      <a href="https://boosty.to/thefaser" className="hover:text-fd-primary transition-colors">Boosty</a>
                      <a href="https://discord.flectone.net" className="hover:text-fd-primary transition-colors">Discord</a>
                      <a href="https://t.me/flectone" className="hover:text-fd-primary transition-colors">Telegram</a>
                      <a href="https://github.com/Flectone" className="hover:text-fd-primary transition-colors">Github</a>
                  </div>
              </div>

              <hr className="border-fd-border opacity-50" />

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-muted-foreground">
                  <p>
                      Существует с 2019 года
                  </p>
                  <p>
                      Весь код проекта имеет{' '}
                      <a
                        href="https://github.com/flectone"
                        target="_blank"
                        className="text-fd-primary font-medium hover:text-fd-muted-primary transition-colors"
                      >
                          открытый исходный код
                      </a>
                  </p>
              </div>
          </div>
      </footer>
    );
}