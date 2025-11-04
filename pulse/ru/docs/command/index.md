---
authors:
  - TheFaser
---

# Комманды

Категория, отвечающая за настройку всех комманд

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → command`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#command
<<< @/files/localizations/en_us.yml#command
:::

### `exception`

::: details Сообщения при неправильном использовании команды

#### `execution`

Сообщение, если во время выполнении команды произошла ошибка

#### `parse_unknown`

Сообщение, если введён неизвестный аргумент

#### `parse_boolean`

Сообщение, если ожидался аргумент `boolean`

#### `parse_number`

Сообщение, если ожидался аргумент `number`

#### `parse_string`

Сообщение, если ожидался аргумент `string`

#### `permission`

Сообщение, если у игрока нет прав для этой комманды

#### `syntax`

Сообщение, если введена неполная комманда
![command syntax](/commandsyntax.png)

:::

### `prompt`

::: details Форматирование подсказок

#### `message`

Подсказка для комманд, в которых вводится сообщение

#### `hard`

Подсказка для комманд, в которых спрашивается про сложность

#### `accept`

Подсказка для комманд, в которых что-то принимается или отклоняется

#### `turn`

Подсказка для комманд, в которых что-то включается или выключается

#### `type`

Подсказка для комманд, в которые вводится тип

#### `reason`

Подсказка для комманд, в которых вводится причина

#### `category`

Подсказка для комманд, в которых выбирается категория

#### `id`

Подсказка для комманд, в которых вводится айди

#### `time`

Подсказка для комманд, в которых вводится время

#### `repeat_time`

Подсказка для комманд, в которых вводится время для повторения

#### `multiple_vote`

Подсказка для комманд, в которых спрашивается про мульти голосование

#### `player`

Подсказка для комманд, в которых вводится игрок

#### `number`

Подсказка для комманд, в которых вводится число

#### `color`

Подсказка для комманд, в которых вводится цвет

#### `language`

Подсказка для комманд, в которых вводится язык

#### `url`

Подсказка для комманд, в которых вводится ссылка

#### `move`

Подсказка для комманд, в которых выбирается ход

#### `value`

Подсказка для комманд, в которых выбирает значение
:::

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#command

<!--@include: @/parts/enable.md-->

### `suggest_invisible_players`

Если включено, то всем игрокам будут показываться все другие игроки. Но если выключено, то игроку нужно отдельное право, чтобы видеть других игроков под зельем невидимости в коммандах

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#command

<!--@include: @/parts/permission/permissionTier3.md-->

### `see_invisible_players_in_suggest`

Право для того, чтобы видеть игроков под зельем невидимости в подсказках комманд

