---
authors:
  - TheFaser
---

# `/flectonepulse`

Главная комманда плагина `FlectonePulse`
![command flectonepulse](/commandflectonepulse.png)

::: warning ПРЕДУПРЕЖДЕНИЕ

На старых версиях (1.9 и 1.10 точно) было замечено, что игроков при перезагрузки может кикать с сервера, но на работу плагина это не влияет

:::

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → command.flectonepulse`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#flectonepulse
<<< @/files/localizations/en_us.yml#flectonepulse
:::

### `format_false`

Сообщение при возникновении ошибки

### `format_true`

Формат сообщения, которое будет отправлено при перезагрузке всего `FlectonePulse`

### `format_web_starting`

Формат сообщения, которое будет отправлено при старте веб-сервера

### `format_editor`

Формат сообщения, которое будет отправлено при успешном запуске веб-сервера

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → flectonepulse`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#flectonepulse

<!--@include: @/parts/enable.md-->

### `execute_in_main_thread`

Будет ли выполняться вся перезагрузка в главном потоке сервера

::: info ИНФОРМАЦИЯ

Это может решить проблемы на `Bukkit`, `Spigot`, `Mohist` или других старых/нестандартных ядрах при перезагрузке

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