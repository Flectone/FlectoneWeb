---
authors:
  - TheFaser
  - Stokmenn
---

# Scoreboard

Module responsible for proper `team` functionality and integration with:
- [Objectives](/docs/message/objective/)
- [Tab](/docs/message/tab/)

::: warning WARNING
If you experience issues with `TAB` (such as sorting problems) or other plugins using `scoreboard`, you should disable this module
:::

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.scoreboard`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#scoreboard

<!--@include: @/parts/enable.md-->

### `name-visible`

Enables player name display above heads

### `color`

Team color (if `name-visible` is enabled, names will use this color)

### `prefix`

Text displayed before player names

### `suffix`

Text displayed after player names

<!--@include: @/parts/ticker.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.scoreboard`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#scoreboard

<!--@include: @/parts/permission/permissionTier3.md-->