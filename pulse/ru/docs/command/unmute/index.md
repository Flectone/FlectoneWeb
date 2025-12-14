---
authors:
  - TheFaser
---

# `/unmute`

Комманда для того, чтобы размутить игрока
![command unmute](/commandunmute.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → command.unmute`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#unmute
<<< @/files/localizations/en_us.yml#unmute
:::

### `null_player`

Сообщение, если введённый игрок не найден

### `not_muted`

Сообщение, если введённый игрок не замучен

### `lower_weight_group`

Сообщение, если комманда исполняется от игрока с группой ниже, чем у игрока на которого применяется модерация

### `format`

Сообщение при размуте

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → unmute`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#unmute

<!--@include: @/parts/enable.md-->

### `check_group_weight`

Будут ли проверяться группы игроков. Если игрок, на которого применяется модерация, имеет роль выше, чем отправитель комманды, то комманда не выполнится и будет ошибка `lower_weight_group`

<!--@include: @/parts/range.md-->
<!--@include: @/parts/aliases.md-->
<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.unmute`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#unmute

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->

