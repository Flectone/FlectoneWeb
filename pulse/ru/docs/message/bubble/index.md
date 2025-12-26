---
authors:
  - TheFaser
---

# Над головой

Модуль, отвечающий за сообщения над головой
![bubble](/bubble.gif)

Идея взята из [LightChatBubbles](https://github.com/atesin/LightChatBubbles)

### Формула длительности

```java
long duration = (countWords + handicapChars) / readSpeed * 60;
```

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.bubble`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#bubble
<<< @/files/localizations/en_us.yml#bubble
:::

### `format`

Формат сообщения над головой

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → bubble`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#bubble

<!--@include: @/parts/enable.md-->

### `max_count`

Максимальное количество сообщений над головой одновременно

### `max_length`

Максимальная длинна одного сообщения над головой. Если текст длиннее, то он будет разделён на несколько

### `elevation`

Насколько высоко над головой будет сообщение

### `distance`

Насколько далеко можно увидеть сообщение над головой у игрока

### `read_speed`

Скорость чтения слов в минуту

### `handicap_chars`

Дополнительное время для коротких сообщений

### `word_break_hint`

Символ-подсказка, который ставится когда слово разрывается на две строки

### `interaction`

Позволяет изменять расстояние между сообщениями друг от друга, иначе используется устаревший `area effect cloud`

::: warning ПРЕДУПРЕЖДЕНИЕ
Это будет использовано только для серверов, где версия `1.21.3` и выше
:::

::: details НАСТРОЙКА
#### `enable`

Включает работоспособность

#### `height`

Расстояние между каждым сообщением друг от друга
:::

### `modern`

Сообщения над головой через Text Display

::: warning ПРЕДУПРЕЖДЕНИЕ
Это будет использовано только для серверов, где версия `1.19.4` и выше
:::

::: details НАСТРОЙКА
#### `enable`

Включает работоспособность

#### `has_shadow`

Включает тень у текста

#### `see_through`

Включает прозрачность текста на фоне воды и облаков (чтобы нельзя было смотреть сквозь воду)

#### `scale`

Насколько большим будет сообщение

#### `background`

Цвет фона сообщения, он имеет прозрачность т.е. альфа-канал. [Сайт для выбора цвета](https://rgbacolorpicker.com/color-wheel-picker)

#### `billboard`

| Тип            | Пояснение                                                 |
|----------------|-----------------------------------------------------------|
| `FIXED`        | Положение не изменяется                                   |
| `VERTICAL`     | Положение изменяется относительно вертикали               |
| `HORIZONTAL`   | Положение изменяется относительно горизонтали             |
| `CENTER`       | Положение изменяется относительно горизонтали и вертикали |
:::

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.bubble`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#bubble

<!--@include: @/parts/permission/permissionTier3.md-->