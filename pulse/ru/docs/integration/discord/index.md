---
authors:
  - TheFaser
---

# Дискорд

Интеграция с Discord позволяет отправлять сообщения:
- из Minecraft в Discord
- из Discord в Minecraft

![discord message](/discordmessage.png)
![minecraft message](/discordminecraftmessage.png)

<!--@include: @/parts/messageTag.md-->

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → integration.discord`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#discord
<<< @/files/localizations/en_us.yml#discord
:::

### `Плейсхолдеры`

Ты можешь использовать все плейсхолдеры, которые используются в начальном сообщении для майнкрафта
::: info НАПРИМЕР ДЛЯ СООБЩЕНИЯ О БЛОКИРОВКЕ
Там есть плейсхолдер `<reason>`, значит я могу использовать `<reason>` внутри дискорд сообщений
:::

Также есть плейсхолдеры, которые ТОЧНО будут заменяться в любом сообщении
- `<final_message>` сообщение, отправленное в майнкрафт
- `<final_clear_message>` сообщение, отправленное в майнкрафт без unicode-смайлов
- `<player>` ник игрока, который отправил сообщение
- `<message>` сырое сообщение, которое написал игрок
- `<plain_message>` отформатированное сообщение, которое написал игрок

Очевидно, что все плейсхолдеры из `PlaceholderAPI` и `FlectonePulse` тоже будут работать

### `for_minecraft`

Формат сообщения, которое будет отправлено из Дискорда в Майнкрафт

### `info_channel`

Список айди каналов и их названий

### `message_channel`

Список сообщений с их настройкой

::: details Настройка сообщения

![discord](https://docs.discord4j.com/img/embed-preview.png)

Если параметр пустой, то он не будет использован в итоговом сообщении

#### `content`

Содержание обычного сообщения от лица бота дискорда
![discord content](/discordcontent.png)

#### `webhook`

Дискорд вебхук
![discord webhook](/discordwebhook.png)


##### `enable`

Если включено, то сообщение будет являться вебхуком

##### `avatar`

Ссылка для создания аватарки игрока. Если будешь менять на свою, то ссылка должна содержать `<skin>`

##### `content`

Содержание сообщения вебхука

#### `embed`

Дискорд эмбед сообщение
![discord embed](/discordembed.png)

##### `enable`

Если включено, то сообщение будет содержать `embed`

##### `color`

Цвет `embed` сообщения

##### `title`

Название `embed` сообщения

##### `url`

Ссылка для `embed` сообщения

##### `author`

Автор `embed` сообщения

###### `name`

Название автора `embed` сообщения

###### `url`

Ссылка на автора `embed` сообщения

###### `icon_url`

Ссылка на аватарку автора `embed` сообщения. Если будешь менять на свою, то ссылка должна содержать `<skin>`

##### `description`

Описание `embed` сообщения

##### `thumbnail`

Маленькое изображение внутри `embed` сообщения

##### `fields`

Нижние поля внутри `embed` сообщения

###### `name`

Название поля внутри `embed` сообщения

###### `value`

Значение поля внутри `embed` сообщения

###### `inline`

Если включено, то поле будет расположен в столбик с другими полями

##### `image`

Главное изображение `embed` сообщения

##### `timestamp`

Если включено, то `embed` сообщение будет включать время создания

##### `footer`

Нижняя часть `embed` сообщения

###### `text`

Текст в нижней части `embed` сообщения

###### `icon_url`

Изображение в нижней части `embed` сообщения

:::

::: info ЕСЛИ ХОЧЕШЬ ДОБАВИТЬ ДРУГОЕ СООБЩЕНИЕ:
1. Возьми название из списка `типы сообщений`
2. Вставь в `message_channel`
```yaml
название_сообщения:
  content: ""
  webhook:
    enable: false
    avatar: "https://mc-heads.net/avatar/<skin>/32.png"
    content: ""
  embed:
    enable: false
    color: ""
    title: ""
    url: ""
    author:
      name: ""
      url: ""
      icon-url: "https://mc-heads.net/avatar/<skin>/16.png"
    description: ""
    thumbnail: ""
    fields:
      - name: ""
        value: ""
        inline: false
    image: ""
    timestamp: true
    footer:
      text: ""
      icon-url: "https://mc-heads.net/avatar/<skin>/16.png"
```
:::

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → discord`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#discord

<!--@include: @/parts/enable.md-->

::: warning ПРЕДУПРЕЖДЕНИЕ
- Перед включением, вставь **токен** бота Discord
- После включения, **ЖЕЛАТЕЛЬНО** перезагрузить сервер, иначе плагин может вызвать зависание
:::

### `token`

[Токен](https://discordgsm.com/guide/how-to-get-a-discord-bot-token) дискорд бота для подключения. Можно использовать environment variables, например `${VALUE}`

### `presence`

![discord presence](/discordpresence.png)

::: details Настройка статуса бота
#### `enable`

Включает или выключает кастомный статус бота

#### `status`

| Режим            | Пояснение                       |
|------------------|---------------------------------|
| `UNKNOWN`        | -                               |
| `ONLINE`         | В сети                          |
| `DO_NOT_DISTURB` | В сети, с режимом не беспокоить |
| `IDLE`           | В сети, но отошёл               |
| `INVISIBLE`      | Невидимый                       |
| `OFFLINE`        | Не в сети                       |

#### `activity`

Активность бота в дискорде

##### `enable`

Включает или выключает активность

##### `type`

| Тип         | Пояснение   |
|-------------|-------------|
| `UNKNOWN`   | -           |
| `STREAMING` | Стримит     |
| `LISTENING` | Слушает     |
| `WATCHING`  | Смотрит     |
| `CUSTOM`    | -           |
| `COMPETING` | Соревнуется |

##### `name`

Название активности

##### `url`

Ссылка на активности

:::

### `channel_info`

![discord channel info](/discordchannelinfo.png)

::: details Настройка каналов с информацией
#### `enable`

Нужен ли канал информации

<!--@include: @/parts/ticker.md-->

### `message_channel`

Список типов сообщений и [ID каналов](https://support.discord.com/hc/ru/articles/206346498-%D0%93%D0%B4%D0%B5-%D0%BC%D0%BD%D0%B5-%D0%BD%D0%B0%D0%B9%D1%82%D0%B8-ID-%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%B0-%D1%81%D0%BE%D0%BE%D0%B1%D1%89%D0%B5%D0%BD%D0%B8%D1%8F) в Discord

::: info Например я хочу, чтобы из Minecraft отправлялось сообщение комманды `/ban` в Discord
1. Копирую ID канала в дискорде `1286666844358316083`
2. Прописываю `COMMAND_BAN: "1286666844358316083"`

```yaml
message-channel:
  COMMAND_BAN: "1286666844358316083" // [!code highlight]
```
:::

<!--@include: @/parts/destination.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.discord`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#discord

<!--@include: @/parts/permission/permissionTier3.md-->