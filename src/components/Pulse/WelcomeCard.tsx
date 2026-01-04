import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import LinkButton from "../Button/LinkButton";
import {useTranslations} from "next-intl";

export default function WelcomeCard() {

    const t = useTranslations('Pulse')

    return (
        <div className='w-full max-lg:p-8 rounded-2xl bg-[url(/square.svg)] not-dark:bg-[url(/squaredark.svg)] bg-size-[36px] border overflow-hidden bg-fd-card/85 backdrop-blur-3xl flex px-16 py-4 justify-between items-center gap-8'>
            <div className='blur-2xl bg-fd-primary/20 -z-1 w-180 h-[calc(100%+2rem)] rounded-full absolute -right-[25%] animate-pulse [animation-duration:6s]'></div>
            <div className='flex flex-col gap-4'>
                <h1 className='text-4xl w-96 text-start font-bold'>{t.rich('WelcomeCard.slogan', {b: (chunks) => <b>{chunks}</b>})}</h1>
                <div className='flex gap-4'>
                    <LinkButton href='https://boosty.to/thefaser' mode='blue' className='h-8'>{t('Buttons.support')}</LinkButton>
                    <LinkButton href='/pulse/docs' mode='gray' className='h-8'>{t('Buttons.documentation')}</LinkButton>
                    <LinkButton href='https://modrinth.com/plugin/flectonepulse' mode='gray' className='h-8'>{t('Buttons.download')}</LinkButton>
                </div>
            </div>
            <CodeBlock className='p-4 text-fd-primary shadow-md max-[52rem]:hidden'>
                <Pre>
                    #  ___       ___  __  ___  __        ___      <br />
                    # |__  |    |__  /  `  |  /  \ |\ | |__       <br />
                    # |    |___ |___ \__,  |  \__/ | \| |___      <br />
                    #  __             __   ___                    <br />
                    # |__) |  | |    /__` |__                     <br />
                    # |    \__/ |___ .__/ |___   /\               <br />
                    #                           /  \              <br />
                    # __/\___  ____/\_____  ___/    \______       <br />
                    #        \/           \/                      <br />
                    #                                             <br />
                </Pre>
            </CodeBlock>
        </div>
    )
}