---
authors:
  - TheFaser
---

# Объект

::: warning ПРЕДУПРЕЖДЕНИЕ

Модуль будет работать только для игроков, которые играют с версии `1.21.9` и выше. Для других это не будет отображаться

:::

::: warning ПРЕДУПРЕЖДЕНИЕ

Головы и иконки могут краситься в конфиг файлах, чтобы такого не происходило, нужно использовать белый цвет перед ними. Например `<white><player_head></white>`

:::

Модуль, отвечающий за головы и символы в чате
![object](/object.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.format.object`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#object
<<< @/files/localizations/en_us.yml#object
:::

### `default_symbol`

Символ для обычных `<player_head>` и `<sprite>`, если получатель не может увидеть итоговый объект (для `<player_head_or>` и `<sprite_or>` это указывается вручную)

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.object`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#object

<!--@include: @/parts/enable.md-->

### `player_head`

Включает форматирования плейсхолдера `<player_head>`. Его можно использовать по разному
- `<player_head>` вернёт голову игрока, от которого было написано сообщение
- `<player_head:Notch>` вернёт голову игрока, ник которого был написан внутри
- `<player_head:Notch:false>` вернёт голову игрока с выключенным вторым слоем, ник которого был написан внутри
- Если указанный ник не существует, то голова будет с рандомным скином по умолчанию
- `<player_head_or:...>` вернёт голову игрока или текст, указанный первым аргументом, если получатель не может видеть головы в чате. Например `<player_head_or:hello:Notch>` вернёт голову Нотча, а в консоли будет слово `hello`

::: tip ЗАМЕЧАНИЕ

В модуль `playerlistname` уже встроен по умолчанию `<player_head>` и он работает только для игроков, которые имеют неофициальную игру. Для лицензий таб будет обычным

:::

### `sprite`

Включает форматирование плейсхолдера `<sprite:...>`. Его можно использовать по разному
- `<sprite:name>`, возвращает иконку из атласа `blocks`, например `<sprite:block/oak_log>` (это тоже самое, что и `<sprite:blocks:block/oak_log>`)
- `<sprite:atlas:name>`, возвращает иконку из написанного атласа, например `<sprite:gui:container/slot>`
- Если спрайт будет указан неверно, он будет неизвестной текстурой. С помощью ресурспака вы можете делать свои спрайты
- `<sprite_or:...>` возвращает иконку или текст, указанный первым аргументом, если получатель не может видеть иконки в чате. Например `<sprite_or:hello:block/oak_log>` возвращает иконку дуба, а в консоли будет слово `hello`

Легче всего названия атласов и иконок находить с помощью [комманды /sprite](/docs/command/sprite/)
![command sprite](/commandsprite.png)

Также это можно находить в папке, которая создаётся с помощью комбинации `F3 + S` внутри майнкрафта. Там будут файлы `minecraft_textures_atlas_...` с `.txt` и `.png` форматом, с помощью этого можно найти подходящий спрайт
::: info НАПРИМЕР

Есть атлас `gui` с названием `minecraft_textures_atlas_gui.png.txt`. В нём можно найти строчку с `minecraft:container/slot	x=494	y=54	w=18	h=18`

По этим координатам его можно визуально найти в `.png` атласе (чтобы посмотреть как он выглядит). Для того, чтобы его отобразить внутри майнкрафта, нужно убрать префикс `minecraft:`

В итоге получаем `<sprite:gui:container/slot>`
![object slot](/objectslot.png)

:::

### `need_extra_space`

Включает добавление дополнительного пробела для `<player_head>` и `<sprite>`, которые написаны в конфиг файлах. В сообщения игроков пробел не добавляется

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.object`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#object

<!--@include: @/parts/permission/permissionTier3.md-->