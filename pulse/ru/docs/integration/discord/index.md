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

### `null_player`

Сообщение, если введённый игрок через `custom_command` не найден

### `format_reply`

Формат сообщения для тега `<reply>`, когда сообщение является ответом на другое

### `custom_command`

Список кастомных комманд интеграции, где ключом является название комманды, а значением её формат сообщения

::: info ПРИМЕР

```yaml
custom_command:
  tps:
    content: "<tps>"
```

Комманда, чтобы получить значение `tps` на сервере. **Не забудь сделать её в inegration.yml**

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
- `<reply>` отформатированное сообщение-ответ, оно будет пустым, если основное сообщение не ответ
- Очевидно, что все плейсхолдеры из `PlaceholderAPI` и `FlectonePulse` тоже будут работать

<br>
У сообщения, которое будет отправлено из Дискорда в Майнкрафт есть свои плейсхолдеры:

| Плейсхолдер      | Что возвращает                       |
|------------------|--------------------------------------|
| `<name>`         | Глобальное имя участника в Discord   |
| `<global_name>`  | Глобальное имя участника в Discord   |
| `<nickname>`     | Никнейм участника в Discord          |
| `<display_name>` | Отображаемое имя участника в Discord |
| `<user_name>`    | Тег участника в Discord              |

### `info_channel`

Список айди каналов и их названий, для отображения какой-нибудь информации, например `TPS`

### `message_channel`

Список сообщений с их настройкой

::::: details Настройка сообщения

::: tip ИНФОРМАЦИЯ

Если параметр пустой или он не написан, то он не будет использован в итоговом сообщении

:::

#### `content`

Содержание сообщения
![discord content](/discordcontent.png)

#### `webhook_avatar`

Включение дискорд вебхука с аватаром игрока. Лучше всего использовать `https://mc-heads.net/avatar/<skin>/32.png`
![discord webhook](/discordwebhook.png)

#### `embed`

Дискорд эмбед сообщение
![discord embed](/discordembed.png)

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

:::::

::: info ИНФОРМАЦИЯ

Сообщение со всеми параметрами
![discord](https://docs.discord4j.com/img/embed-preview.png)

```yaml
название_сообщения:
  content: ""
  webhook_avatar: "https://mc-heads.net/avatar/<skin>/32.png"
  embed:
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

### `custom_command`

Список кастомных комманд интеграции, ключом является название комманды и оно может быть любым. Комманды могут быть ТОЛЬКО информационными, на сервере они ничего не выполняют и не будут выполнять

| Параметр      | Пояснение                                                                      |
|---------------|--------------------------------------------------------------------------------|
| `need_player` | Проверять ли первый аргумент комманды на имя игрока, например `!ping TheFaser` |
| `aliases`     | Список псевдонимов для использования комманды                                  |


::: info ПРИМЕР

```yaml
custom_command:
  tps:
    need_player: false
    aliases:
      - "!tps"
      - "!tickpersecond"
```

Комманда, чтобы получить значение `tps` на сервере с помощью `!tps` или `!tickpersecond`. **Не забудь сделать сообщение в локализации**

:::

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
  COMMAND_BAN: 
    - "1286666844358316083"
```

Локализацию можно не настраивать, по умолчанию сообщение будет отправляться с форматом `<final_message>`
:::

<!--@include: @/parts/destination.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.discord`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#discord

<!--@include: @/parts/permission/permissionTier3.md-->