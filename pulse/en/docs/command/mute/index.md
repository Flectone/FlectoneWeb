---
authors:
  - TheFaser
  - Stokmenn
---

# `/mute`

Command to mute a player
![command mute](/commandmute.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization-->
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → command.mute`

<!--@include: @/parts/words.md#default-->

::: code-group
<<< @/files/localizations/ru_ru.yml#mute
<<< @/files/localizations/en_us.yml#mute
:::

### `null_player`

Message when the specified player is not found

### `null_time`

Message when the time provided is invalid

### `lower_weight_group`

Message if the command is executed by a player with a group weight lower than the player being moderated

### `suffix`

Format of the suffix that will be displayed if the player has an active mute, otherwise it will be empty

### `reasons`

A list with keys and values, where the key is the word and the value is the specific reason

::: info YOU CAN ADD YOUR OWN REASONS
```yaml
random_kek: "Random reason"
```
Then, if you type `/mute player 1d random_kek`, the reason will be `Random reason`.

If no reason is specified, `default` will be used.
:::

### `server`

Message to everyone

### `person`

Message to the muted player

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → mute`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#mute

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/suggestOfflinePlayers.md-->

### `check_group_weight`

Whether to check players' group weights If the player being moderated has a higher role than the command sender, the command will not execute and the `lower_weight_group` error will be shown

<!--@include: @/parts/range.md-->

### `time_limits`

Time limits based on the sender's group The key is the group weight, and the value is the maximum moderation time in milliseconds (`1` second = `1000` milliseconds)

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
<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.mute`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#mute

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->