import { File, Folder, Files } from 'fumadocs-ui/components/files';
import {useTranslations} from "next-intl";

export default function Structure() {

  const t = useTranslations('Pulse.Structure')

  return (
    <div className="w-full flex items-center flex-col gap-3 h-auto">
      <h1 className='text-2xl text-center font-bold border-b border-fd-foreground w-fit px-4 pb-2'>{t.rich('title', {b: (chunks) => <b>{chunks}</b>})}</h1>
      <Files className="flex flex-col justify-start text-start p-1 w-full">
        <div className='flex h-fit w-full flex-wrap justify-around'>
          <Folder className='h-fit' name='backups'>
            <Folder className='h-fit' name='version'>
              <File name='...'/>
            </Folder>
          </Folder>
          <Folder className='h-fit' name='images'>
            <File name='...'/>
          </Folder>
          <Folder className='h-fit' name='libaries'>
            <File name='...'/>
          </Folder>
          <Folder className='h-fit' name='minecraft'>
            <Folder className='h-fit' name='version'>
              <Folder className='h-fit' name='lang'><File name='...'/></Folder>
              <Folder className='h-fit' name='sprite'><File name='...'/></Folder>
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
    </div>
  )
}
