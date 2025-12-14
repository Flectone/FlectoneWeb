---
authors:
  - TheFaser
  - Stokmenn
---

# `/warn`

Command to give a warning to a player
![command warn](/commandwarn.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → command.warn`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#warn
<<< @/files/localizations/en_us.yml#warn
:::

### `null_player`

Message when the player cannot be found

### `null_time`

Message when an invalid time is entered

### `lower_weight_group`

Message if the command is executed by a player with a group weight lower than the player being moderated

### `reasons`

A list with keys and values, where the key is a word and the value is a specific reason

::: info You can write your own reasons, for example:
```yaml
random_kek: "Random reason"
```
So if you write `/warn player 1d random_kek`, the reason will be `Random reason`.

If no reason is specified, the `default` reason will be used.
:::

### `server`

Message for everyone

### `person`

Message for the player

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → warn`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#warn

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/suggestOfflinePlayers.md-->

### `check_group_weight`

Whether to check players' group weights. If the player being moderated has a higher role than the command sender, the command will not execute and the `lower_weight_group` error will be shown

<!--@include: @/parts/range.md-->

### `time_limits`

Time limits based on the sender's group. The key is the group weight, and the value is the maximum moderation time in milliseconds (`1` second = `1000` milliseconds)

::: info EXAMPLE

```yaml
 time_limits:
    20: 35000
    50: 100000
```

- If a player has a group weight of `10`, the command will NOT be executed
- If a player has a group weight of `20`, the maximum time will be `35000`
- If a player has a group weight of `40`, the maximum time will also be `35000`
- If a player has a group weight of `50` or higher, it will be `100000`

For unlimited time, use the value `-1`

:::

<!--@include: @/parts/aliases.md-->

### `actions`

A list where the key is the `number` of warnings, and the value is the `action` to be performed

::: info For example, if you want to ban the player at `10` warnings:
You should write `10: ban <target> ohh`. This action will be performed if the player has `10` active warnings.
:::

<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.warn`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#warn

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->