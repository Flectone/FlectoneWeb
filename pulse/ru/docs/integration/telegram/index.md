---
authors:
  - TheFaser
---

# Телеграм

Интеграция с Telegram позволяет отправлять сообщения:
- из Minecraft в Telegram
- из Telegram в Minecraft

![telegram message 1](/telegrammessage1.png)
![telegram message 2](/telegrammessage2.png)
![minecraft message](/telegramminecraftmessage.png)

<!--@include: @/parts/messageTag.md-->

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → integration.telegram`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#telegram
<<< @/files/localizations/en_us.yml#telegram
:::

### `Плейсхолдеры`

Ты можешь использовать все плейсхолдеры, которые используются в начальном сообщении для майнкрафта
::: info НАПРИМЕР ДЛЯ СООБЩЕНИЯ О БЛОКИРОВКЕ
Там есть плейсхолдер `<reason>`, значит я могу использовать `<reason>` внутри телеграм сообщений
:::

Также есть плейсхолдеры, которые ТОЧНО будут заменяться в любом сообщении
- `<final_message>` сообщение, отправленное в майнкрафт
- `<final_clear_message>` сообщение, отправленное в майнкрафт без unicode-смайлов
- `<player>` ник игрока, который отправил сообщение
- `<message>` сырое сообщение, которое написал игрок
- `<plain_message>` отформатированное сообщение, которое написал игрок
- Очевидно, что все плейсхолдеры из `PlaceholderAPI` и `FlectonePulse` тоже будут работать

### `for_minecraft`

Формат сообщения, которое будет отправлено из Телеграма в Майнкрафт

### `info_channel`

Список айди каналов и их названий, для отображения какой-нибудь информации, например `TPS`

### `message_channel`

Список сообщений с форматом итогового сообщения

::: info ЕСЛИ ХОЧЕШЬ ДОБАВИТЬ ДРУГОЕ СООБЩЕНИЕ:
1. Возьми название из списка `типы сообщений`
2. Вставь в `message_channel`
```yaml
название_сообщения: "<final_message>"
```
:::

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → telegram`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#telegram

<!--@include: @/parts/enable.md-->

::: warning ПРЕДУПРЕЖДЕНИЕ
- Перед включением, вставь **токен** бота Telegram
- После включения, **ЖЕЛАТЕЛЬНО** перезагрузить сервер
:::

### `token`

[Токен](https://core.telegram.org/bots/faq#how-do-i-create-a-bot) бота для подключения. Можно использовать environment variables, например `${VALUE}`

### `channel_info`

::: details Настройка каналов с информацией
#### `enable`

Нужен ли канал информации

<!--@include: @/parts/ticker.md-->

### `message_channel`

Список типов сообщений и айди чатов в Telegram

::: info Например я хочу, чтобы из Minecraft отправлялось сообщение комманды `/ban` в Telegram
1. Копирую айди чата, в которое нужно отправить сообщение (`-1002341720267_49`)

Если бот подключён и добавлен в канал, то можно использовать команду `/id` в телеграме, чтобы узнать айди канала

2. Прописываю:
```yaml
message-channel:
  COMMAND_BAN:
    - "-1002341720267_49"
```

Чатов может быть сколько угодно, главное, чтобы к ним был доступ у бота из [секреты](/docs/secrets/telegram/). Локализацию можно не настраивать, по умолчанию сообщение будет отправляться с форматом `<final_message>`
:::

::: danger ВАЖНО

Если ваш канал является Форумом (Топиком), то айди **ГЛАВНОГО** канала нужно указывать без `_`

1. Айди моего главного канала (он всегда заканчивается на `_1`) это `-1002341720267_1`
2. Значит вписывать нужно **ТОЛЬКО** `-1002341720267`

Для других чатов из форума это правило не действует и нужно вписывать **ПОЛНЫЙ** айди

:::

<!--@include: @/parts/destination.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.telegram`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#telegram

<!--@include: @/parts/permission/permissionTier3.md-->