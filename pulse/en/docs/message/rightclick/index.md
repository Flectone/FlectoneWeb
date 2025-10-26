---
authors:
  - TheFaser
  - Stokmenn
---

# Right Click 

A module where **Right Click** on a player creates a message above the player's inventory
![right click](/rightclick.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → language.yml → message.rightclick`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#rightclick
<<< @/files/localizations/en_us.yml#rightclick
:::

### `format`

The message that will be sent to the player who right-clicked on another player

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → rightclick`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#rightclick

<!--@include: @/parts/enable.md-->

### `should_check_sneaking`

Whether to check if the player is pressing shift during right-click

### `hide_name_when_invisible`

Whether to hide the nickname of a player who is invisible

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
