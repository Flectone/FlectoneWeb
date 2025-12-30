---
authors:
  - TheFaser
  - Stokmenn
---

# Tabname

[ScoreBoard value](https://ru.minecraft.wiki/w/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D1%81%D1%87%D1%91%D1%82%D0%B0_%D0%B8%D0%B3%D1%80%D0%BE%D0%B2%D1%8B%D1%85_%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B9) displayed in the TAB list  
![player list](/playerlist.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization-->
<!--@include: @/parts/words.md#path--> `localizations → language.yml → message.tabname`

<!--@include: @/parts/words.md#default-->

::: code-group
<<< @/files/localizations/ru_ru.yml#tabname
<<< @/files/localizations/en_us.yml#tabname
:::

### `format`

The message that will be shown after the nickname

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → objective.tabname`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#tabname

<!--@include: @/parts/enable.md-->

### `mode`

Mode for displaying the value, with available options

<!--@include: @/parts/objective.md-->

::: info EXAMPLE MODE `PING`  
This will return the player's ping  
![player list](/playerlist.png)
:::

<!--@include: @/parts/ticker.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.objective.tabname`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#tabname

<!--@include: @/parts/permission/permissionTier3.md-->
