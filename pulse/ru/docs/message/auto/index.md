---
authors:
  - TheFaser
---

# Автоматическое

Сообщение от сервера раз в какой-то промежуток времени
![auto](/auto.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.auto`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#auto
<<< @/files/localizations/en_us.yml#auto
:::

### `types`

Виды автоматических сообщений со списком

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → auto`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#auto

<!--@include: @/parts/enable.md-->

### `types`

Виды автоматических сообщений

::: info МОЖНО СОЗДАВАТЬ СВОИ
```yaml
  types:
    newauto:
      random: true
      destination:
        type: "CHAT"
      ticker:
        enable: true
        period: 9000
      sound:
        enable: false
```
:::

- <!--@include: @/parts/random.md-->
- <!--@include: @/parts/destination.md-->
- <!--@include: @/parts/ticker.md-->
- <!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.auto`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#auto

<!--@include: @/parts/permission/permissionTier3.md-->

### `types`

Виды автоматических сообщений и их прав на звуки

- <!--@include: @/parts/permission/sound.md-->