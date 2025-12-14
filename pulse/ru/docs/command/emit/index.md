---
authors:
  - TheFaser
---

# `/emit`

Комманда для использования любого `destination` с текстом
![command emit](/commandemit.png)

Комманда доступна по умолчанию только админам сервера и создана только для них.
Выдавать обычным игрокам её не стоит. 
Эту комманду можно использовать через консоль, другой плагин или датапак, что удобно, если вам хочется использовать инструменты от FlectonePulse (любые плейсхолдеры и теги также будут работать) 

Чтобы отобразить текст всем игрокам сразу, можно использовать `all`, например `/emit all CHAT hello world`.
У некоторых `destination` есть аргументы, которые можно изменять через `{}`. 
Эти аргументы назваются точно также, как и в конфиг файлах.

Примеры
- `/emit TheFaser ACTION_BAR{times={stay=40}} hello world`
- `/emit TheFaser BOSS_BAR{color=RED} hello world`
- `/emit TheFaser BRAND hello world`
- `/emit TheFaser CHAT hello world`
- `/emit TheFaser TITLE hello world`
- `/emit TheFaser SUBTITLE hello world`
- `/emit TheFaser TAB_FOOTER hello world`
- `/emit TheFaser TAB_HEADER hello world`
- `/emit TheFaser TEXT_SCREEN{offset_x=-0.3, offset_y=-0.2} hello world`
- `/emit TheFaser TOAST{icon="minecraft:iron_ingot", style=CHALLENGE} hello world`

Аргументы, которые пропущены, будут дефолтными и их необязательно вписывать все. Если `destination` введён неправильно, сообщение будет отправлено в обычный чат

<!--@include: @/parts/destination.md-->

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → command.emit`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#emit
<<< @/files/localizations/en_us.yml#emit
:::

### `null_player`

Сообщение, если введённый игрок не найден

### `format`

Формат сообщения, которое будет отправлено

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → emit`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#emit

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/aliases.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.emit`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#emit

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->