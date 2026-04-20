'use client'
import { useState } from "react"
import InputText from '@/components/Form/Input/InputText'
import TextOutput from "../Form/Output/TextOutput";
import { useTranslations } from "next-intl";

interface Data {
    status: number;
    nickname: string;
    uuid: string;
    offlineUuid: string;
    headSrc: string;
}

export default function UuidExtractor() {
    const [nickname, setNickname] = useState('')
    const [data, setData] = useState<Data>({
        status: 404,
        nickname: 'player',
        uuid: '',
        offlineUuid: '',
        headSrc: '',
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const t = useTranslations('Tools.UuidExtractor')

    async function getMinecraftInfoByNickname(
        nickname: string,
    ): Promise<string | null> {
        try {
            const response = await fetch(`/api/mojang/info?username=${nickname}`);

            if (!response.ok) {
                console.error(`Error request: ${response.statusText}`);
                return null;
            }

            const data = await response.json();
            const result = {
                status: data.status,
                uuid: data.uuid,
                offlineUuid: data.offlineUuid,
                nickname: data.nickname,
                headSrc: data.headSrc,
            };
            return JSON.stringify(result);
        } catch (error) {
            console.error("Network or parsing error:", error);
            return null;
        }
    }

    async function getUUID(nick: string | void) {
        const usedNickname = nick ? nick : nickname
        if (!usedNickname.trim()) {
            setError(t('Errors.enterNickname'));
            return;
        }

        setLoading(true);
        setError('');
        setData({
            status: 404,
            nickname: 'player',
            uuid: '',
            offlineUuid: '',
            headSrc: '',
        });

        try {
            const res = await getMinecraftInfoByNickname(usedNickname);

            if (res && typeof res === 'string') {
                try {
                    const parsedData = JSON.parse(res) as Data;
                    setData(parsedData);
                } catch (parseError) {
                    setError(t('Errors.dataError'));
                    console.error(parseError);
                }
            } else {
                setError(t('Errors.playerNotFound'));
            }
        } catch (err) {
            setError(t('Errors.searchError'));
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function randomNickname() {
        const randomNickname = Math.random().toString(36).substring(2, 7)
        setNickname(randomNickname)
        getUUID(randomNickname)
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="bg-fd-article p-6 gap-2 flex flex-col border shadow-md rounded-2xl">
                <p className="font-bold">{t('nicknameOrUuid')}</p>
                <div className="flex w-full gap-2 items-center">
                    <InputText
                        onChange={(e) => setNickname(e.target.value)}
                        value={nickname}
                        onKeyDown={(e) => e.key === 'Enter' && getUUID()}
                        buttonClick={() => { getUUID() }}
                        disabled={loading}
                        placeholder={t('placeHolder')}
                        onlyLatin={true}
                    />
                </div>
            </div>

            {error && (
                <div className="border-fd-muted-red border bg-fd-red text-fd-red-foreground px-4 py-3 rounded-2xl">
                    {error}
                </div>
            )}


            <div className={`bg-fd-article p-6 gap-2 flex h-fit border transition shadow-md rounded-2xl max-md:flex-col ${loading ? 'opacity-40' : ''}`}>
                <div className="bg-fd-card w-fit shrink-0 p-4 gap-2 rounded-md flex flex-col items-center">
                    {data.status === 200 ? (
                        <img
                            src={data.headSrc}
                            alt={data.nickname}
                            className="w-20 h-20 rounded-sm border"
                        />
                    ) : (
                        <span className="w-20 gap-4 h-20 flex-col font-[Minecraft] border-2 border-fd-card-foreground/50 border-dashed rounded-md flex justify-center items-center">
                            <span className="flex gap-4">
                                <span className="w-4 h-4 border-fd-card-foreground/50 border-2"></span>
                                <span className="w-4 h-4 border-fd-card-foreground/50 border-2"></span>

                            </span>
                            <span className="w-12 h-2 border-fd-card-foreground/50 border-2"></span>
                        </span>
                    )}
                    <h2 className="font-bold px-2 bg-fd-accent w-full rounded-sm justify-center flex items-center">{data.nickname}</h2>
                </div>
                <div className="w-full flex flex-col gap-2 justify-end">
                    <div>
                        <p>{t('onlineUuid')}:</p>
                        <TextOutput text={data.status === 200 ? data.uuid : t('Errors.playerNotFound')} />
                    </div>
                    <div>
                        <p>{t('offlineUuid')}:</p>
                        <TextOutput text={data.offlineUuid} />
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    onClick={randomNickname}
                    disabled={loading}
                    className="bg-fd-gray transition w-fit px-3 py-2 rounded-lg cursor-pointer hover:bg-fd-muted-gray"
                >
                    {t('randomUuid')}
                </button>
            </div>
        </div >
    )
}