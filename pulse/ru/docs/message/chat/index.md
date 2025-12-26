---
authors:
  - TheFaser
  - Bakinu
---

# Чат

Модуль, отвечающий за отправленные сообщения игроком в чат
![chat](/chat.png)


::: info КАК ОТКЛЮЧИТЬ ЛОКАЛЬНЫЙ ЧАТ?

Внутри `message.yml` выключи `local` с помощью `enable: false`, а также сделай пустой `trigger: ""` для `global`

```yaml
chat:
  enable: true
  mode: "BUKKIT"
  priority: "NORMAL"
  types:
    local:
      enable: false # поставь false
    global:
      enable: true
      cancel: false
      range: "PROXY"
      priority: 5
      trigger: "" # сделай пусто
      null_receiver:
        enable: true
        destination:
          type: "ACTION_BAR"
          times:
            stay: 20
      destination:
        type: "CHAT"
      cooldown:
        enable: false
      sound:
        enable: false
```

:::

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.chat`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#chat
<<< @/files/localizations/en_us.yml#chat
:::

### `null_chat`

Сообщение, если в чат ничего не удалось отправить

### `null_receiver`

Сообщение, если никто не увидел сообщение игрока

### `types`

Список чатов и их формат

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → chat`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#chat

<!--@include: @/parts/enable.md-->

### `mode`

Режим обработки чата

| Тип       | Объяснение                                                                               |
|-----------|------------------------------------------------------------------------------------------|
| `PACKET`  | Сообщения чата обрабатываются через пакеты (полностью асинхронно)                        |
| `BUKKIT`  | Сообщения чата обрабатываются через `Bukkit` (асинхронно, но только в одном потоке чата) |
| `PAPER`   | Сообщения чата обрабатываются через `Paper` (асинхронно, но только в одном потоке чата)  |

::: warning ПРЕДУПРЕЖДЕНИЕ

Если тебе нужно, чтобы твой другой плагин видел сообщения чата, поставь `mode: "BUKKIT"`. В редком случае, если плагин работает через `Paper` слушатели, то нужно поставить `mode: "PAPER"`

:::

### `event_priority`

Приоритет ивента сообщения в чате. Измените это значение, если есть конфликт с другими плагинами, использующие чат

| Тип       | Объяснение                                                                      |
|-----------|---------------------------------------------------------------------------------|
| `LOWEST`  | Сообщение в чате будет обработано быстрее всех плагинов                         |
| `LOW`     | Сообщение в чате будет обработано после плагинов, у которых приоритет `LOWEST`  |
| `NORMAL`  | Сообщение в чате будет обработано после плагинов, у которых приоритет `LOW`     |
| `HIGH`    | Сообщение в чате будет обработано после плагинов, у которых приоритет `NORMAL`  |
| `HIGHEST` | Сообщение в чате будет обработано после плагинов, у которых приоритет `HIGHEST` |
| `MONITOR` | Сообщение в чате будет только просмотрено                                       |

### `types`

Список всех чатов с их настройкой. Любой чат по умолчанию выглядит так и ты можешь добавлять свои

```yaml
название_чата:
  enable: true
  cancel: true
  range: PROXY
  priority: число
  trigger: "триггер"
  null-receiver:
    enable: true
    destination:
      type: "ACTION_BAR"
      times:
        stay: 20
  destination:
    type: "CHAT"
  cooldown:
    enable: false
  sound:
    enable: false
```

### `enable`

Включает работоспособность чата

### `null_recipient`

![null recipient](/nullrecipient.png)

Включает сообщение о том, что отправленное сообщение никто не увидел

::: details НАСТРОЙКА

#### `enable`

Включает работоспособность

#### `destination`

Куда отправится сообщение

:::


### `cancel`

- Если `true`, то ивент сообщения чата отменяется для других плагинов
- Если необходимо, чтобы другой плагин, связанный с чатом (DiscordSRV например) - работал, то нужно ставить `false`
- Если `false`, то это также вызывает дублирование в консоль
  ![chat console](/chatconsole.png)

<!--@include: @/parts/range.md-->

### `priority`

Приоритет чата, который используется для выбора, когда у нескольких чатов одинаковый `trigger`. Выбирается тот, у кого приоритет больше

::: info НАПРИМЕР ЕСТЬ ЧАТЫ
```yaml
admin:
  priority: 20
  trigger: "!" // [!code highlight]
helper:
  priority: 10
  trigger: "!" // [!code highlight]
```

Если игрок имеет право на оба чата, то плагином выбран будет `admin` т.к. у него больше `priority`
:::

### `trigger`

Сообщение, с которого должно начинаться отправленное сообщение для чата

::: info ЗНАЧЕНИЕ `trigger` МОЖЕТ БЫТЬ ЛЮБЫМ:
- `!`, `admin`, `.f` и т.д.
- пустым т.е. `trigger: ""`, тогда для этого чата подходит любое сообщение
  :::

В итоговом сообщении `trigger` удаляется, т.е. если игрок отправил `!привет`, в итоге будет `привет` без `!`

<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.chat`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#chat

<!--@include: @/parts/permission/permissionTier3.md-->

### `types`

Список чатов и их прав

<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->