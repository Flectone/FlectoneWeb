---
authors:
  - TheFaser
---

# Упоминание

::: warning ПРЕДУПРЕЖДЕНИЕ

По умолчанию администраторов сервера нельзя упоминать из-за права `bypass`

:::

Это форматирование позволяет упоминать (пинговать) человека в сообщении. Также можно упоминать и донатные группы, например `@default`
![mention](/mention.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.format.mention`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#mention
<<< @/files/localizations/en_us.yml#mention
:::

### `person`

Сообщение игроку при упоминании

### `format`

Сообщение, если это упоминание игрока

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.mention`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#mention

<!--@include: @/parts/enable.md-->

### `trigger`

Символ, с которого должно начинаться сообщение упоминания
::: info НАПРИМЕР
Если я хочу упомянуть `Flectone`, то я должен написать `@Flectone`
![mention](/mention.png)
:::

### `everyone_tag`

Слово, которое в сочетании с `trigger` будет упоминать всех игроков на сервере. Чтобы это использовать, необходимо иметь право `flectonepulse.module.message.format.mention.group.default`

<!--@include: @/parts/destination.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.mention`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#mention

<!--@include: @/parts/permission/permissionTier3.md-->

### `group`

Право для упоминания донатной группы, например `@default`

::: tip ИНФОРМАЦИЯ

Для каждой группы проверяется своё право `flectonepulse.module.message.format.mention.group.название_группы`

:::

### `bypass`

Право для игнорирования упоминания

<!--@include: @/parts/permission/sound.md-->