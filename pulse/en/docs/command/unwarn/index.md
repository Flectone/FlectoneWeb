---
authors:
  - TheFaser
  - Stokmenn
---

# `/unwarn`

Command to remove a warning from a player
![command unwarn](/commandunwarn.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → command.unwarn`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#unwarn
<<< @/files/localizations/en_us.yml#unwarn
:::

### `null_player`

Message when the player cannot be found

### `not_warned`

Message when the player does not have a warning

### `lower_weight_group`

Message if the command is executed by a player with a group weight lower than the player being moderated

### `format`

Message when the warning is removed

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → unwarn`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#unwarn

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
<!--@include: @/parts/words.md#path--> `permission.yml → command.unwarn`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#unwarn

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->