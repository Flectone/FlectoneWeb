---
authors:
  - TheFaser
---

# Удаление

Это форматирование заменяет `<delete>` и позволяет удалять сообщения в чате
![delete](/delete.gif)

::: warning ПРЕДУПРЕЖДЕНИЕ

При большом количестве игроков может вызывать немного больше потребление памяти из-за хранения сообщений. По примерным расчётам 100 игроков = 5-10 мбайт

:::

::: warning ПРЕДУПРЕЖДЕНИЕ

Этот модуль несовместим с плагином InteractiveChat

:::

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.format.moderation.delete`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#delete
<<< @/files/localizations/en_us.yml#delete
:::

### `placeholder`

Плейсхолдер, которым заменяется каждый `<delete>`, если у игрока есть права на удаление сообщения, иначе будет пусто

### `format`

Формат сообщения, которое будет отправлено при удалении

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.moderation.delete`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#delete

<!--@include: @/parts/enable.md-->

### `history_length`

Сколько максимально сообщений будет храниться в истории у каждого игрока

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.moderation.delete`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#delete

<!--@include: @/parts/permission/permissionTier3.md-->