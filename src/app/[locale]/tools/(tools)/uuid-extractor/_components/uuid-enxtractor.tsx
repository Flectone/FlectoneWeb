"use client"
import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import Container from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Copy, CornerDownLeft } from "lucide-react"
import { toast } from "@/components/ui/toast"

interface Data {
  status: number
  nickname: string
  uuid: string
  offlineUuid: string
  headSrc: string
}

export default function UuidExtractor() {
  const [nickname, setNickname] = useState("")
  const [valueLenght, setValueLenght] = useState(0)
  const [data, setData] = useState<Data>({
    status: 400,
    nickname: "player",
    uuid: "",
    offlineUuid: "",
    headSrc: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const t = useTranslations("FlectoneTools.UuidExtractor")

  async function getMinecraftInfoByNickname(
    nickname: string
  ): Promise<string | null> {
    try {
      const response = await fetch(
        `/api/mojang/info?username=${encodeURIComponent(nickname)}`
      )

      if (!response.ok) {
        console.error(`Error request: ${response.statusText}`)
        return null
      }

      const data = await response.json()
      const result = {
        status: data.status,
        uuid: data.uuid,
        offlineUuid: data.offlineUuid,
        nickname: data.nickname,
        headSrc: data.headSrc,
      }
      return JSON.stringify(result)
    } catch (error) {
      console.error("Network or parsing error:", error)
      return null
    }
  }

  async function getUUID(nick: string | void) {
    const usedNickname = nick ? nick : nickname
    if (!usedNickname.trim()) {
      setError(t("Errors.enterNickname"))
      return
    }

    setLoading(true)
    setError("")
    setData({
      status: 404,
      nickname: "player",
      uuid: "",
      offlineUuid: "",
      headSrc: "",
    })

    try {
      const res = await getMinecraftInfoByNickname(usedNickname)

      if (res && typeof res === "string") {
        try {
          const parsedData = JSON.parse(res) as Data
          setData(parsedData)
        } catch (parseError) {
          setError(t("Errors.dataError"))
          toast.add({
            type: "error",
            description: t("Errors.dataError"),
          })
          console.error(parseError)
        }
      } else {
        setError(t("Errors.playerNotFound"))
      }
    } catch (err) {
      setError(t("Errors.searchError"))
      toast.add({
        type: "error",
        description: t("Errors.searchError"),
      })
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  function randomNickname() {
    const randomNickname = Math.random().toString(36).substring(2, 7)
    setNickname(randomNickname)
    getUUID(randomNickname)
  }

  useEffect(() => {
    if (data.status === 404 && !loading) {
      toast.add({
        type: "error",
        description: t("Errors.playerNotFound"),
      })
    }
  }, [data])

  return (
    <div className="flex w-full flex-col gap-6">
      <Container className="flex flex-col gap-2">
        <div className="flex w-full items-center gap-2">
          <Field>
            <FieldLabel>{t("nicknameOrUuid")}</FieldLabel>
            <InputGroup>
              <InputGroupInput
                type="text"
                onChange={(e) => setNickname(e.target.value)}
                disabled={loading}
                value={nickname}
                onKeyDown={(e) => e.key === "Enter" && getUUID()}
                placeholder={t("placeHolder")}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement
                  setValueLenght(target.value.length)
                  target.value = target.value.replace(/[^a-zA-Z-_0-9]/g, "")
                  if (target.value.slice(0, 16)[1].length > 0) {
                    target.value = target.value.slice(0, 16)
                  }
                }}
              />
              <InputGroupAddon align="inline-end">
                <Button
                  size={"icon-xs"}
                  variant={"secondary"}
                  onClick={() => {
                    getUUID()
                  }}
                >
                  <CornerDownLeft />
                </Button>
              </InputGroupAddon>
            </InputGroup>
          </Field>
        </div>
      </Container>

      {error && (
        <div className="border-fd-muted-red bg-fd-red text-fd-red-foreground rounded-2xl border px-4 py-3">
          {error}
        </div>
      )}

      <Container
        className={`flex h-fit items-center gap-6 transition max-md:flex-col ${loading ? "opacity-40" : ""}`}
      >
        <div className="flex w-fit shrink-0 flex-col items-center gap-2">
          {data.status === 200 ? (
            <img
              src={data.headSrc}
              alt={data.nickname}
              className="h-20 w-20 rounded-sm border"
            />
          ) : (
            <span className="flex h-20 w-20 flex-col items-center justify-center gap-4 rounded-md border-2 border-dashed border-fd-card-foreground/50 font-[Minecraft]">
              <span className="flex gap-4">
                <span className="h-4 w-4 border-2 border-fd-card-foreground/50"></span>
                <span className="h-4 w-4 border-2 border-fd-card-foreground/50"></span>
              </span>
              <span className="h-2 w-12 border-2 border-fd-card-foreground/50"></span>
            </span>
          )}
          <h2 className="flex w-full items-center justify-center rounded-sm bg-fd-accent px-2 font-bold">
            {data.nickname}
          </h2>
        </div>
        <div className="flex w-full flex-col justify-end gap-2">
          {[
            [`${t("onlineUuid")}`, data.uuid],
            [`${t("offlineUuid")}`, data.offlineUuid],
          ].map((item, key) => (
            <Field key={key}>
              <FieldLabel>{item[0]}</FieldLabel>
              <InputGroup>
                <InputGroupInput type="text" disabled value={item[1]} />
                <InputGroupAddon align="inline-end">
                  <Button
                    size={"icon-xs"}
                    variant={"secondary"}
                    disabled={!item[1]}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(item[1])
                        toast.add({
                          type: "success",
                          description: t("coppied"),
                        })
                      } catch (err) {
                        console.error("Не удалось скопировать:", err)
                      }
                    }}
                  >
                    <Copy />
                  </Button>
                </InputGroupAddon>
              </InputGroup>
            </Field>
          ))}
        </div>
      </Container>
      <div className="flex justify-end">
        <Button
          onClick={randomNickname}
          disabled={loading}
          variant={"secondary"}
        >
          {t("randomUuid")}
        </Button>
      </div>
    </div>
  )
}
