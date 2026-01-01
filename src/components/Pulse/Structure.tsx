import Card from "../Card/Card";
import { File, Folder, Files } from 'fumadocs-ui/components/files';

export default function Structure() {
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
        <h1 className="text-xl font-bold">Структура плагина <b>FlectonePulse</b></h1><br />
        <p>
          • Папка <b>images</b> содержит все изображения, используемые в плагине, такие как аватары и иконки.<br />
          • Папка <b>libaries</b> содержит сторонние библиотеки, необходимые для работы плагина.<br />
          • Папка <b>localizations</b> содержит файлы локализации для поддержки нескольких языков. Включает файлы <b>en_us.yml</b> и <b>ru_ru.yml</b>.<br />
          • Файл <b>commands.yml</b> содержит настройки всех команд, доступных в плагине.<br />
          • Файл <b>config.yml</b> содержит основные настройки плагина, включая параметры подключения и общие опции.<br />
          • Файл <b>integration.yml</b> содержит настройки интеграции с другими плагинами и сервисами.<br />
          • Файл <b>message.yml</b> позволяет настраивать все сообщения, отображаемые игрокам в игре.<br />
          • Файл <b>permission.yml</b> содержит настройки прав доступа для различных функций плагина.
        </p>
      </div>
    </div>
  )
}
