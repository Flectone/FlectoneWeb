---
authors:
  - TheFaser
---

# Под ником

::: warning ПРЕДУПРЕЖДЕНИЕ

Если в модуле `scoreboard` отображение имени выключен (`name_visible: false`), то значение под ником не будет показываться

:::

[ScoreBoard значение](https://ru.minecraft.wiki/w/%D0%A1%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D1%81%D1%87%D1%91%D1%82%D0%B0_%D0%B8%D0%B3%D1%80%D0%BE%D0%B2%D1%8B%D1%85_%D1%81%D0%BE%D0%B1%D1%8B%D1%82%D0%B8%D0%B9) игрока под его ником
![below name](/belowname.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.belowname`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#belowname
<<< @/files/localizations/en_us.yml#belowname
:::

### `format`

Сообщение, которое будет показано под ником

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → objective.belowname`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#belowname

<!--@include: @/parts/enable.md-->

### `mode`

Режим цифрового отображения значения из доступных

<!--@include: @/parts/objective.md-->

::: info НАПРИМЕР РЕЖИМ `PING`
Значит будет возвращаться пинг игрока
![below name](/belowname.png)
:::

<!--@include: @/parts/ticker.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.objective.belowname`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#belowname

<!--@include: @/parts/permission/permissionTier3.md-->