---
authors:
  - TheFaser
---

# LibertyBans

Интеграция с плагином `LibertyBans` проверяет мут игрока и не позволяет ему писать сообщение, а также отключает команды модерации `FlectonePulse`

::: warning ПРЕДУПРЕЖДЕНИЕ
Лучше выключить команды самому в `command.yml`, потому что не всегда команды выключаются сами
:::

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → libertybans`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#libertybans

<!--@include: @/parts/enable.md-->

### `disable_flectonepulse_ban`

Выключает команды `/ban`, `/banlist` и `/unban` в `FlectonePulse`

### `disable_flectonepulse_mute`

Выключает команды `/mute`, `/mutelist` и `/unmute` в `FlectonePulse`

### `disable_flectonepulse_warn`

Выключает команды `/warn`, `/warnlist` и `/unwarn` в `FlectonePulse`

### `disable_flectonepulse_kick`

Выключает команды `/kick` в `FlectonePulse`

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.libertybans`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#libertybans

<!--@include: @/parts/permission/permissionTier3.md-->