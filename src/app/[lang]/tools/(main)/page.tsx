import Card from "@/components/Card/Card";
import Title from "@/components/Title/Title";
import { Hammer, BrickWall, TextSelect, SquareStar, SquareUserRound } from "lucide-react";
import MinecraftTab from "@/components/Assets/MinecraftTab";
import { useTranslations } from "next-intl";
import { createMetadata } from "@/lib/create-metadata";

export const generateMetadata = createMetadata({
    namespace: 'Tools.Main'
});


export default function ToolsPage() {
    const t = useTranslations('Tools.Main');

    return (
        <div className="w-full max-w-7xl flex gap-4 flex-col justify-center my-4">
            <div className="flex flex-col w-full gap-2 justify-center">
                <div className="flex gap-2 items-center">
                    <div className="p-1.5 flex rounded-lg bg-fd-primary-foreground border-fd-primary text-fd-primary border-4">
                        <Hammer className="" size={1.75 + 'em'} fill="var(--color-fd-primary)" strokeWidth={1 + 'px'} />
                    </div>
                    <Title text={t('title')} />
                </div>
                <p className="w-full">{t('description')}</p>
            </div>
            <div className="w-full grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 gap-4">
                <Card className="w-full h-72 max-[52rem]:w-full max-[52rem]:h-62 max-[64rem]:h-52 not-dark:border duration-100 p-6 max-sm:p-4 backdrop-blur-3xl 
                                rounded-2xl bg-fd-card overflow-hidden border shadow-md
                                hover:bg-fd-border cursor-pointer" path="/tools/texture-generator">
                    <div className="">
                        <h2 className="font-bold text-2xl flex gap-1 items-center"><BrickWall className=" text-fd-primary" />{t('TextureGenerator.title')}</h2>
                        <p className="">{t('TextureGenerator.description')}</p>
                    </div>
                    <div className="w-full h-4/7 right-0 bottom-0 mask-[linear-gradient(to_top,white,transparent)] text-fd-primary rounded-lg absolute -z-1 flex justify-start items-center font-[Minecraft] bg-[url(/assets/minecrafttaiga.png)] bg-center border">
                        <div className='flex flex-col pl-1 pb-px w-fit pr-16 h-fit mb-5 bg-black/60 items-start justify-end gap-2'>
                            <div className='flex items-end gap-1'>
                                <div className='flex items-center gap-1 h-3.5'>
                                    <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>vpllll:</p>
                                    <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>hi</p>
                                </div>
                            </div>
                            <div className='flex items-end gap-1'>
                                <div className='flex items-center gap-1 h-3.5'>
                                    <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>Terrona:</p>
                                    <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>qq</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-1'>
                                <div className='flex items-center gap-1 h-3.5'>
                                    <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>Realepi_Bars_:</p>
                                    <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>qq</p>
                                </div>
                            </div>
                            <div className='flex items-end gap-1'>
                                <div className='flex items-center gap-1 h-3.5'>
                                    <span className="h-[1em] flex items-center justify-center px-1 bg-linear-to-br from-[#3F51B5] to-[#030D48]"><h5 className="text-transparent bg-clip-text bg-linear-to-r from-[#D4E6F8] to-[#89BDD4]">prefix</h5></span>
                                    <p className='[text-shadow:1.2px_1.2px_0px_#212F38] text-[#ABD5E3]!'>TheFaser:</p>
                                    <p className='text-white! [text-shadow:1.2px_1.2px_0px_#252525]'>hello</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full h-4 absolute bottom-0 bg-black/60 pb-2'></div>
                    </div>
                </Card>
                <Card className="w-full h-72 max-[52rem]:w-full max-[52rem]:h-62 max-[64rem]:h-52 not-dark:border duration-100 p-6 max-sm:p-4 backdrop-blur-3xl 
                                rounded-2xl bg-fd-card overflow-hidden border shadow-md
                                hover:bg-fd-border cursor-pointer" path="/tools/text-animation">
                    <div className="">
                        <h2 className="font-bold text-2xl flex gap-1 items-center"><TextSelect className=" text-fd-primary" />{t('TextAnimation.title')}</h2>
                        <p className="">{t('TextAnimation.description')}</p>
                    </div>
                    <div className="w-full h-4/7 right-0 bottom-0 mask-[linear-gradient(to_top,white,transparent)] text-fd-primary rounded-lg absolute -z-1 p-2 flex justify-center items-center font-[Minecraft] bg-[url(/assets/minecraftlandscape.jpg)] bg-bottom border">
                        <div className="bg-black/60">
                            <h3 style={{ backgroundSize: '200% auto' }} className="px-3 text-transparent text-4xl animate-gradient-flow bg-linear-to-r from-fd-red via-fd-primary to-fd-red bg-clip-text">
                                FlectonePulse
                            </h3>
                        </div>
                    </div>
                </Card>
                <Card className="w-full h-72 max-[52rem]:w-full max-[52rem]:h-62 max-[64rem]:h-52 not-dark:border duration-100 p-6 max-sm:p-4 backdrop-blur-3xl 
                                rounded-2xl bg-fd-card overflow-hidden border shadow-md
                                hover:bg-fd-border cursor-pointer" path="/tools/prefix-generator">
                    <div className="">
                        <h2 className="font-bold text-2xl flex gap-1 items-center"><SquareStar className=" text-fd-primary" />{t('PrefixGenerator.title')}</h2>
                        <p className="">{t('PrefixGenerator.description')}</p>
                    </div>
                    <div className="w-full h-4/7 right-0 bottom-0 mask-[linear-gradient(to_top,white,transparent)] text-fd-primary rounded-lg absolute -z-1 p-2 flex justify-center items-center font-[Minecraft] bg-[url(/assets/minecraftclouds.png)] bg-bottom border">
                        <span className="flex items-center justify-center px-3 bg-linear-to-br from-[#3F51B5] to-[#030D48]"><h5 className="text-transparent bg-clip-text bg-linear-to-r from-[#D4E6F8] to-[#89BDD4] text-6xl">Admin</h5></span>
                    </div>
                </Card>
                <Card className="w-full h-72 max-[52rem]:w-full max-[52rem]:h-62 max-[64rem]:h-52 not-dark:border duration-100 p-6 max-sm:p-4 backdrop-blur-3xl 
                                rounded-2xl bg-fd-card overflow-hidden border shadow-md
                                hover:bg-fd-border cursor-pointer" path="/tools/uuid-extractor">
                    <div className="">
                        <h2 className="font-bold text-2xl flex gap-1 items-center"><SquareUserRound className=" text-fd-primary" />{t('UuidExtractor.title')}</h2>
                        <p className="">{t('UuidExtractor.description')}</p>
                    </div>
                    <div className="w-full h-4/7 right-0 bottom-0 mask-[linear-gradient(to_top,white,transparent)] text-fd-primary/60 rounded-lg absolute -z-1 p-2 flex justify-center items-center font-[Minecraft] bg-bottom border">
                        <div className="w-full h-full bg-fd-primary/30 rounded-md border-fd-primary/60 border-3 border-dashed flex flex-col gap-2 items-center justify-center">
                            <h2 className="text-xl">Nickname</h2>
                            <h2 className="text-xl">↓   ↓</h2>
                            <h2 className="text-xl">UUID</h2>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    )
}