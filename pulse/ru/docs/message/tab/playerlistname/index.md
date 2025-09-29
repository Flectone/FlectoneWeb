---
authors:
  - TheFaser
---

# Имя в списке

Модуль, отвечающий за имя игрока в ТАБе
![player list name](/playerlistname.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.tab.playerlistname`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#playerlistname
<<< @/files/localizations/en_us.yml#playerlistname
:::

### `format`

Сообщение в списке ТАБа

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → tab.playerlistname`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#playerlistname

<!--@include: @/parts/enable.md-->

### `proxy_mode`

Если включено, то игроки на разных серверах будут синхронизированы в одном ТАБе. Для этого требуется включение прокси режима в `FlectonePulse`

::: warning ПРЕДУПРЕЖДЕНИЕ
1. Это работает на версиях 1.19.4 и выше
2. Между серверами игроки не смогут по ТАБу узнать пинг другого игрока (он всегда будет -1, если игрок на другом сервере)
3. Для корректного отображения скинов требуется SkinsRestorer в режиме прокси
:::

<!--@include: @/parts/ticker.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.tab.playerlistname`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#playerlistname

<!--@include: @/parts/permission/permissionTier3.md-->