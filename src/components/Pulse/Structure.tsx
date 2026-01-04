import { File, Folder, Files } from 'fumadocs-ui/components/files';
import {useTranslations} from "next-intl";

export default function Structure() {

  const t = useTranslations('Pulse.Structure')

  return (
    <div className="w-full flex gap-8 h-auto max-[52rem]:flex-col-reverse">
      <div className="w-1/3 max-[52rem]:w-full flex justify-center items-center bg-linear-to-br from-fd-primary/10 rounded-xl border p-4">
        <Files className="shadow-md w-fit max-[52rem]:w-2/3">
          <Folder name="images" disabled>
          </Folder>
          <Folder name="libaries" disabled>
          </Folder>
          <Folder name="localizations" defaultOpen disabled>
            <File name="en_us.yml" />
            <File name="ru_ru.yml" />
          </Folder>
          <File name="commands.yml" />
          <File name="config.yml" />
          <File name="integration.yml" />
          <File name="message.yml" />
          <File name="permission.yml" />
        </Files>
      </div>
      <div className="text-start w-2/3 py-4 max-[52rem]:w-full max-[52rem]:py-0">
        <h1 className="text-2xl font-bold">{t.rich('title', {b: (chunks) => <b>{chunks}</b>})}</h1><br />
        <p style={{ whiteSpace: 'pre-line' }} className="text-lg">
          {t.rich('description', {
            b: (chunks) => <b>{chunks}</b>,
            br: () => <br />
          })}
        </p>
      </div>
    </div>
  )
}
