'use client'
import Image from "next/image"
import HeaderBlock from "@/components/Header/HeaderBlock"
import HeaderButton from "@/components/Button/HeaderButton"
import { useTranslations } from 'next-intl';
import LanguageButton from "../Button/LanguageButton"
import ThemeButton from "../Button/ThemeButton"

export default function Header() {
    const t = useTranslations('Header');
    return (
        <div className="w-full flex justify-center">
            <div className="mt-4 grid grid-cols-3 w-full max-xl:w-2xl max-md:w-full grid-rows-1 gap-0 max-sm:hidden">
                <HeaderBlock className="justify-self-start px-2">
                    <Image width={26} height={26} alt="logo" src={'/logo.png'} />
                    <h1 className="ml-1 font-medium">Flectone</h1>
                </HeaderBlock>
                <HeaderBlock className="justify-self-center">
                    <HeaderButton mode="gray" path="/" className="my-1 mr-0.5">
                        {t('home')}
                    </HeaderButton>
                    <HeaderButton mode="gray" path="/about" className="my-1 ml-0.5">
                        {t('about')}
                    </HeaderButton>
                </HeaderBlock>
                <HeaderBlock className="justify-self-end px-1">
                    <div className="mr-1 flex">
                        <LanguageButton />
                    </div>
                    <div>
                        <ThemeButton />
                    </div>
                </HeaderBlock>
            </div>

            <div className="mt-4 w-max max-xl:w-2xl max-md:w-full sm:hidden">
                <HeaderBlock className="">
                    <HeaderButton mode="gray" path="/" className="my-1 mr-0.5">
                        {t('home')}
                    </HeaderButton>
                    <HeaderButton mode="gray" path="/about" className="my-1 ml-0.5">
                        {t('about')}
                    </HeaderButton>
                </HeaderBlock>
                <div className="flex w-full mt-2 justify-between">
                    <HeaderBlock className="px-2">
                        <Image width={26} height={26} alt="logo" src={'/logo.png'} />
                        <h1 className="ml-1 font-medium">Flectone</h1>
                    </HeaderBlock>

                    <HeaderBlock className="p-1">
                        <div className="mr-1 flex">
                            <LanguageButton />
                        </div>
                        <div>
                            <ThemeButton />
                        </div>
                    </HeaderBlock>
                </div>
            </div>
        </div>
    )
}