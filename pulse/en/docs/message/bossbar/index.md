---
authors:
  - TheFaser
---

# Boss Bar

The module responsible for messages in vanilla boss bars
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

List of messages upon entering a specific boss bar, where the key is the boss bar name (e.g., `entity.minecraft.ender_dragon`)

### `types`

List of vanilla boss bar messages. The key `event.minecraft.raid.raiders_remaining` is special; it is automatically added to raid messages if necessary

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → bossbar`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#bossbar

<!--@include: @/parts/enable.md-->

### `announce`

Can be used to notify a player that they have entered the "dragon" zone (or any other). This does not affect the main boss bar, only adds functionality. It will trigger every time a player enters a boss bar zone

The key is the boss bar name (e.g., `entity.minecraft.ender_dragon`), and the value is where it will be sent

::: info EXAMPLE

I want a message "It's the dragon!" to appear in the player's chat when they enter the dragon's boss bar zone
```yaml
announce:
  entity.minecraft.ender_dragon:
    destination:
      type: "CHAT"
      sound:
        enable: false
```

You also need to add the message in localization

```yaml
announce:
  entity.minecraft.ender_dragon: "It's the dragon!"
```

:::

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.bossbar`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#bossbar

<!--@include: @/parts/permission/permissionTier3.md-->