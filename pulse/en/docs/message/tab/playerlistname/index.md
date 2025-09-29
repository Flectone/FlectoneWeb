---
authors:
  - TheFaser
  - Stokmenn
---

# Playerlistname

Module responsible for the player's name in the TAB
![player list name](/playerlistname.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → message.tab.playerlistname`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#playerlistname
<<< @/files/localizations/en_us.yml#playerlistname
:::

### `format`

Message in the TAB list

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → tab.playerlistname`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#playerlistname

<!--@include: @/parts/enable.md-->

### `proxy_mode`

If enabled, players on different servers will be synchronized in one TAB. This requires enabling proxy mode in `FlectonePulse`

::: warning WARNING
1. This works on versions 1.19.4 and above
2. Between servers, players won't be able to see each other's ping in TAB (it will always be -1 if the player is on another server)
3. For correct skin display, SkinsRestorer in proxy mode is required
:::

<!--@include: @/parts/ticker.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.tab.playerlistname`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#playerlistname

<!--@include: @/parts/permission/permissionTier3.md-->
