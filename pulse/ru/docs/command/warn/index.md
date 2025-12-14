---
authors:
  - TheFaser
---

# `/warn`

Комманда для того, чтобы дать предупреждение игроку
![command warn](/commandwarn.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → command.warn`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#warn
<<< @/files/localizations/en_us.yml#warn
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
Тогда если я напишу `/warn player 1d random_kek`, то причиной будет `Random reason`

Если причина не указана, будет использоваться `default`
:::

### `server`

Сообщение для всех

### `person`

Сообщение для игрока

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → warn`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#warn

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/suggestOfflinePlayers.md-->

### `check_group_weight`

Будут ли проверяться группы игроков. Если игрок, на которого применяется модерация, имеет роль выше, чем отправитель комманды, то комманды не выполнится и будет ошибка `lower_weight_group`

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

### `actions`

Список, где ключом является `количество` предупреждений и значением `действие`, которое должно выполниться

::: info Например я хочу, чтобы при `10` варнов игрока банило
Тогда я должен вписать `10: ban <target> ohh`. Действие выполнится если у игрока будет `10` активных предупреждений
:::

<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.warn`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#warn

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->

