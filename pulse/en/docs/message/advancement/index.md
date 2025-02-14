# Advancement

Server message when a player earns an advancement
![task](/task.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization-->
<!--@include: @/parts/words.md#path--> `localizations → language.yml → message.advancement`

<!--@include: @/parts/words.md#default-->

::: code-group
<<< @/files/localizations/ru_ru.yml#advancement
<<< @/files/localizations/en_us.yml#advancement
:::

### `task`

Message when obtaining a regular advancement  
![task](/task.png)

### `goal`

Message when achieving a goal  
![goal](/goal.png)

### `challenge`

Message when completing a challenge  
![challenge](/challenge.png)

### `revoke`

Message when using `/advancement revoke`

### `grant`

Message when using `/advancement grant`

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → advancement`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#advancement

<!--@include: @/parts/enable.md-->

### `revoke`

Enables customizing the message for the `/advancement revoke` command

### `grant`

Enables customizing the message for the `/advancement grant` command

<!--@include: @/parts/range.md-->
<!--@include: @/parts/destination.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.advancement`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#advancement

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/sound.md-->
