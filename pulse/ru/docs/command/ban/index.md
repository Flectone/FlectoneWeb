---
authors:
  - TheFaser
---

# `/ban`

Комманда для того, чтобы заблокировать игрока
![command ban](/commandban.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → command.ban`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#ban
<<< @/files/localizations/en_us.yml#ban
:::

### `null_player`

Сообщение, если введённый игрок не найден

### `null_time`

Сообщение, если введено невозможное время

### `lower_weight_group`

Сообщение, если комманда исполняется от игрока с группой ниже, чем у игрока на которого применяется модерация

### `reasons`

Список с ключами и значениями, где ключом является слово, а значением конкретная причина

::: info Можно вписывать свои причины, например
```yaml
random_kek: "Random reason"
```
Тогда если я напишу `/ban player 1d random_kek`, то причиной будет `Random reason`

Если причина не указана, будет использоваться `default`
:::

### `server`

Сообщение для всех

### `person`

Сообщение для игрока

### `connection_attempt`

Сообщение, если заблокированный игрок пытался подключиться

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → ban`
<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#ban

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/suggestOfflinePlayers.md-->

### `check_group_weight`

Будут ли проверяться группы игроков. Если игрок, на которого применяется модерация, имеет роль выше, чем отправитель комманды, то комманда не выполнится и будет ошибка `lower_weight_group`

### `show_connection_attempts`

Если включено, то будет показывать сообщение, что заблокированный игрок пытался подключиться
![command ban connect](/commandbanconnect.png)

<!--@include: @/parts/range.md-->

### `time_limits`

Лимиты по времени в зависимости от группы отправителя. Ключом является вес группы, а значением - максимальное количество времени модерации в милисекундах (`1` секунда = `1000` милисекунд)

::: info ПРИМЕР

```yaml
 time_limits:
    20: 35000
    50: 100000
```

- Если игрок имеет вес группы `10`, команда НЕ будет выполнена
- Если игрок имеет вес группы `20`, максимальное количество времени будет `35000`
- Если игрок имеет вес группы `40`, максимальное количество времени также будет `35000`
- Если игрок имеет вес группы `50` и выше, то будет `100000`

Для безграничного времени нужно использовать значение `-1`

:::

<!--@include: @/parts/aliases.md-->
<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.ban`
<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#ban

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->