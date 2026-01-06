import { File, Folder, Files } from 'fumadocs-ui/components/files';
import {useTranslations} from "next-intl";

export default function Structure() {

  const t = useTranslations('Pulse.Structure')

  return (
    <div className="w-full text-start flex flex-col gap-2 h-auto max-[52rem]:flex-col-reverse">
      <p>Структура проекта</p>
      <Files className="flex flex-col justify-start text-start">

        <div className='flex h-fit w-full flex-wrap justify-between'>
          <Folder className='h-fit' name='backups'>
            <Folder className='h-fit' name='version'></Folder>
          </Folder>
          <Folder className='h-fit' name='images'>
            <File name='...'/>
          </Folder>
          <Folder className='h-fit' name='libaries'>
            <File name='...'/>
          </Folder>
          <Folder className='h-fit' name='minecraft'>
            <Folder className='h-fit' name='version'>
              <Folder className='h-fit' name='lang'></Folder>
              <Folder className='h-fit' name='sprite'></Folder>
            </Folder>
          </Folder>
          <Folder className='h-fit' name='localizations'>
            <File name='ru_ru.yml'/>
            <File name='en_us.yml'/>
          </Folder>
          <File className='h-fit' name='commands.yml'></File>
          <File className='h-fit' name='config.yml'></File>
          <File className='h-fit' name='integration.yml'></File>
          <File className='h-fit' name='message.yml'></File>
          <File className='h-fit' name='permission.yml'></File>
        </div>
      </Files>
      {/*<div className="text-start w-2/3 max-[52rem]:w-full max-[52rem]:py-0 flex flex-col justify-center">*/}
      {/*  <h1 className="text-2xl font-bold">{t.rich('title', {b: (chunks) => <b>{chunks}</b>})}</h1><br />*/}
      {/*  <p style={{ whiteSpace: 'pre-line' }} className="text-lg m-0 p-0">*/}
      {/*    {t.rich('description', {*/}
      {/*      b: (chunks) => <b>{chunks}</b>,*/}
      {/*      c: (chunks) => <b className='!text-fd-muted-primary'>{chunks}</b>*/}
      {/*    })}*/}
      {/*  </p>*/}
      {/*</div>*/}
    </div>
  )
}
