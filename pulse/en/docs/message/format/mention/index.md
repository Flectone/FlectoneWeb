---
authors:
  - TheFaser
  - Stokmenn
---

# Mention

::: warning WARNING

By default, server administrators cannot be mentioned due to the `bypass` permission

:::

This formatting allows mentioning (pinging) a user in a message. Donation groups can also be mentioned, for example `@default`
![mention](/mention.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → message.format.mention`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#mention
<<< @/files/localizations/en_us.yml#mention
:::

### `person`

Message to the player when mentioned

### `format`

Message when it is a mention of a player

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.mention`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#mention

<!--@include: @/parts/enable.md-->

### `trigger`

Symbol with which the mention message should start  
::: info EXAMPLE  
If I want to mention `Flectone`, I should write `@Flectone`  
![mention](/mention.png)
:::

### `everyone_tag`

The word that, when combined with the `trigger`, will mention all players on the server. To use this, you must have the `flectonepulse.module.message.format.mention.group.default` permission

<!--@include: @/parts/destination.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.mention`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#mention

<!--@include: @/parts/permission/permissionTier3.md-->

### `group`

Permission for mentioning a donation group, for example `@default`

::: tip INFO

Each group checks for its own permission `flectonepulse.module.message.format.mention.group.group_name`

:::

### `bypass`

Permission to ignore mentions

<!--@include: @/parts/permission/sound.md-->
