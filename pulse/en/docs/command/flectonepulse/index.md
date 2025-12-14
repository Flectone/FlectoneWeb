---
authors:
  - TheFaser
  - Stokmenn
---

# `/flectonepulse`

Main command of the `FlectonePulse` plugin
![command flectonepulse](/commandflectonepulse.png)

::: warning WARNING

On older versions (1.9 and 1.10 for sure) it was noticed that players might get kicked from the server during a reload but this does not affect the plugin

:::

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → language.yml → command.flectonepulse`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#flectonepulse
<<< @/files/localizations/en_us.yml#flectonepulse
:::

### `format_false`

Message displayed when an error occurs

### `format_true`

Message format sent when `FlectonePulse` is fully reloaded

### `format_web_starting`

Message format sent when the web server starts

### `format_editor`

Message format sent when the web server has successfully started

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → flectonepulse`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#flectonepulse

<!--@include: @/parts/enable.md-->

### `execute_in_main_thread`

Whether the entire reload will be executed in the server's main thread

::: info INFORMATION

This can resolve issues on `Bukkit`, `Spigot`, `Mohist`, or other older/non-standard cores during reload

:::

<!--@include: @/parts/aliases.md-->
<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.flectonepulse`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#flectonepulse

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->