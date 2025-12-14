---
authors:
  - TheFaser
---

# `/emit`

Command to use any `destination` with text
![command emit](/commandemit.png)

This command is only available to server admins by default and was created solely for them.
It is not recommended to give it to regular players.
You can use this command through the console, another plugin, or a datapack, which is convenient if you want to use tools from FlectonePulse (any placeholders and tags will also work).

To display text to all players at once, you can use `all`, for example `/emit all CHAT hello world`.
Some `destination` types have arguments that can be changed using `{}`.
These arguments are named exactly the same as in the config files.

Examples
- `/emit TheFaser ACTION_BAR{times={stay=40}} hello world`
- `/emit TheFaser BOSS_BAR{color=RED} hello world`
- `/emit TheFaser BRAND hello world`
- `/emit TheFaser CHAT hello world`
- `/emit TheFaser TITLE hello world`
- `/emit TheFaser SUBTITLE hello world`
- `/emit TheFaser TAB_FOOTER hello world`
- `/emit TheFaser TAB_HEADER hello world`
- `/emit TheFaser TEXT_SCREEN{offset_x=-0.3, offset_y=-0.2} hello world`
- `/emit TheFaser TOAST{icon="minecraft:iron_ingot", style=CHALLENGE} hello world`

Arguments that are omitted will be default and you don't need to write them all out. If the `destination` is entered incorrectly, the message will be sent to the regular chat

<!--@include: @/parts/destination.md-->

[//]: # (localization)
<!--@include: @/parts/words.md#localization-->
<!--@include: @/parts/words.md#path--> `localizations → language.yml → command.emit`

<!--@include: @/parts/words.md#default-->

::: code-group
<<< @/files/localizations/ru_ru.yml#emit
<<< @/files/localizations/en_us.yml#emit
:::

### `null_player`

Message if the entered player is not found

### `format`

Format of the message that will be sent

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → emit`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#emit

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/aliases.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.emit`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#emit

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->