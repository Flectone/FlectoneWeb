---
authors:
  - TheFaser
  - Stokmenn
---

# MOTD

Module responsible for the server's welcome message
![motd](/motd.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → language.yml → message.status.motd`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#motd
<<< @/files/localizations/en_us.yml#motd
:::

### `values`

List of messages to be displayed

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → status.motd`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#motd

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/random.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.status.motd`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#motd

<!--@include: @/parts/permission/permissionTier3.md-->
