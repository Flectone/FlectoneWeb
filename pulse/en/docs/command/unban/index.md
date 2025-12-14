---
authors:
  - TheFaser
  - Stokmenn
---

# `/unban`

Command to unban a player
![command unban](/commandunban.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → command.unban`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#unban
<<< @/files/localizations/en_us.yml#unban
:::

### `null_player`

Message when the player cannot be found

### `not_banned`

Message when the player is not banned

### `lower_weight_group`

Message if the command is executed by a player with a group weight lower than the player being moderated

### `format`

Message when the player is unbanned

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → unban`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#unban

<!--@include: @/parts/enable.md-->

### `check_group_weight`

Whether to check players' group weights. If the player being moderated has a higher role than the command sender, the command will not execute and the `lower_weight_group` error will be shown

<!--@include: @/parts/range.md-->
<!--@include: @/parts/aliases.md-->
<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.unban`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#unban

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->