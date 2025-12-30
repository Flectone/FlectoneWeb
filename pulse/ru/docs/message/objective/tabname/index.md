---
authors:
  - TheFaser
---

# В табе

[ScoreBoard значение](https://ru.minecraft.wiki/w/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D1%81%D1%87%D1%91%D1%82%D0%B0_%D0%B8%D0%B3%D1%80%D0%BE%D0%B2%D1%8B%D1%85_%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B9) игрока в ТАБе
![player list](/playerlist.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.tabname`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#tabname
<<< @/files/localizations/en_us.yml#tabname
:::

### `format`

Сообщение, которое будет показано после ника

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → objective.tabname`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#tabname

<!--@include: @/parts/enable.md-->

### `mode`

Режим цифрового отображения значения из доступных

<!--@include: @/parts/objective.md-->

::: info НАПРИМЕР РЕЖИМ `PING`
Значит будет возвращаться пинг игрока
![player list](/playerlist.png)
:::

<!--@include: @/parts/ticker.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.objective.tabname`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#tabname

<!--@include: @/parts/permission/permissionTier3.md-->