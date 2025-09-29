---
authors:
  - TheFaser
---

# Твич

Интеграция с Twitch позволяет:
- отправлять сообщения из Minecraft в Twitch
- отправлять сообщения из Twitch в Minecraft
- подписываться на начало трансляции Twitch

![twitch message](/twitchmessage.png)
![minecraft message](/twitchminecraftmessage.png)

<!--@include: @/parts/messageTag.md-->

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → integration.twitch`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#twitch
<<< @/files/localizations/en_us.yml#twitch
:::

### `Плейсхолдеры`

Ты можешь использовать все плейсхолдеры, которые используются в начальном сообщении для майнкрафта
::: info НАПРИМЕР ДЛЯ СООБЩЕНИЯ О БЛОКИРОВКЕ
Там есть плейсхолдер `<reason>`, значит я могу использовать `<reason>` внутри твич сообщений
:::

Также есть плейсхолдеры, которые ТОЧНО будут заменяться в любом сообщении
- `<final_message>` сообщение, отправленное в майнкрафт
- `<final_clear_message>` сообщение, отправленное в майнкрафт без unicode-смайлов
- `<player>` ник игрока, который отправил сообщение
- `<message>` сырое сообщение, которое написал игрок
- `<plain_message>` отформатированное сообщение, которое написал игрок

Очевидно, что все плейсхолдеры из `PlaceholderAPI` и `FlectonePulse` тоже будут работать

### `for_minecraft`
- По умолчанию `<fcolor:2><name> <fcolor:1>» <fcolor:4><message>`

Формат сообщения, которое будет отправлено из Твича в Майнкрафт

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
<!--@include: @/parts/words.md#path--> `integration.yml → twitch`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#twitch

<!--@include: @/parts/enable.md-->

::: warning ПРЕДУПРЕЖДЕНИЕ
- Перед включением, вставь **токен** и **ID клиента** Twitch
- После включения, **ЖЕЛАТЕЛЬНО** перезагрузить сервер, иначе плагин может вызвать зависание
:::

### `client_id`

[Идентификатор](https://twitchtokengenerator.com/) пользователя. Можно использовать environment variables, например `${VALUE}`
![client id](/twitchclientid.png)

### `token`

[Токен](https://twitchtokengenerator.com/) пользователя для подключения. Можно использовать environment variables, например `${VALUE}`
![token](/twitchtoken.png)

### `message_channel`

Список типов сообщений и названий каналов на Twitch

::: info Например я хочу, чтобы из Minecraft отправлялось сообщение комманды `/ban` в Twitch
1. Копирую названия каналов Twitch, в которые нужно отправить сообщение (`faseri4ka`)
2. Прописываю:
```yaml
message-channel:
  COMMAND_BAN:
    - "faseri4ka"
```

Каналов может быть сколько угодно, главное, чтобы к ним был доступ у подключенного аккаунта. Локализацию можно не настраивать, по умолчанию сообщение будет отправляться с форматом `<final_message>`
:::

### `follow_channel`

Список, где ключом является имя канала, а значением список комманд, которые выполняться при старте трансляции

::: info Например я хочу отслеживать начало стрима у `faseri4ka` и писать `stream start https://twitch.tv/faseri4ka`
1. Копирую названия канала `faseri4ka`
2. Прописываю:
```yaml
follow-channel:
  faseri4ka:
    - "stream start https://twitch.tv/faseri4ka"
```

- Каналов может быть до 10 одновременно, главное, чтобы к ним был доступ у подключенного аккаунта
- Комманд, при начале трансляции, может быть сколько угодно и какие угодно
:::

<!--@include: @/parts/destination.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.twitch`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#twitch

<!--@include: @/parts/permission/permissionTier3.md-->