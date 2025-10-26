---
authors:
  - TheFaser
---

# Правое нажатие

Модуль, при котором **ПКМ** по игроку создаёт сообщение над инвентарём игрока
![right click](/rightclick.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.rightclick`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#rightclick
<<< @/files/localizations/en_us.yml#rightclick
:::

### `format`

Сообщение, которое будет отправлено игроку, нажавшему на другого игрока

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → rightclick`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#rightclick

<!--@include: @/parts/enable.md-->

### `should_check_sneaking`

Нужно ли проверять, что игрок нажимает шифт, во время ПКМ

### `hide_name_when_invisible`

Нужно ли скрывать ник игрока, который находится в невидимости

<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.rightclick`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#rightclick

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->