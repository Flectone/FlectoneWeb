---
authors:
  - TheFaser
---

# Босс бар

Модуль, отвечающий за сообщения в ванильных боссбарах
![bossbar raid](/bossbar_raid.png)
![bossbar wither](/bossbar_wither.png)
![bossbar enderdragon](/bossbar_enderdragon.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.bossbar`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#bossbar
<<< @/files/localizations/en_us.yml#bossbar
:::

### `announce`

Список сообщений при входе в определённый боссбар, где ключом является название боссбара (например `entity.minecraft.ender_dragon`)

### `types`

Список сообщений ванильных боссбаров. Ключ `event.minecraft.raid.raiders_remaining` особенный, он добавляется автоматически к сообщениям рейда, если это необходимо


[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → bossbar`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#bossbar

<!--@include: @/parts/enable.md-->

### `announce`

Может быть использовано для того, чтобы оповестить игрока, что он вошёл в зону "дракона" (или любую другую). Это не влияет на основной боссбар, а только дополняет функционал. Будет срабатывать каждый раз, когда игрок входит в зону боссбара

Ключом является название боссбара (например `entity.minecraft.ender_dragon`), а значением то, куда будет отправлено

::: info ПРИМЕР

Я хочу, чтобы игроку писало сообщение в чат "Это дракон!", когда игрок входит в зону боссбара дракона
```yaml
announce:
  entity.minecraft.ender_dragon:
    destination:
      type: "CHAT"
      sound:
        enable: false
```

В локализации нужно также добавить сообщение

```yaml
announce:
  entity.minecraft.ender_dragon: "Это дракон!"
```

:::


[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.bossbar`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#bossbar

<!--@include: @/parts/permission/permissionTier3.md-->