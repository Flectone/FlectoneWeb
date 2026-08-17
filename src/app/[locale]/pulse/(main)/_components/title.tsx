import { useTranslations } from "next-intl"

export default function Title({
  titleKey,
  descriptionKey,
}: {
  titleKey: string
  descriptionKey: string
}) {
  const t = useTranslations()

  return (
    <div className="flex w-full flex-col gap-1">
      <h2 className="text-2xl font-bold">
        {t.rich(titleKey, { b: (chunks) => <b>{chunks}</b> })}
      </h2>
      <p>{t(descriptionKey)}</p>
    </div>
  )
}
