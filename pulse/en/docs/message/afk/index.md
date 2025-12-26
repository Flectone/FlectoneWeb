---
authors:
  - TheFaser
  - Stokmenn
---

# AFK  

A player goes AFK if they do nothing for a certain period of time  
![afk global message](/afkglobalmessage.png)  

If a player is AFK, they receive a specific suffix  
![afk suffix](/afksuffix.png)  

[//]: # (localization)  
<!--@include: @/parts/words.md#localization-->  
<!--@include: @/parts/words.md#path--> `localizations → language.yml → message.afk`  

<!--@include: @/parts/words.md#default-->  

::: code-group  
<<< @/files/localizations/ru_ru.yml#afk  
<<< @/files/localizations/en_us.yml#afk  
:::  

### `suffix`  

The suffix assigned to a player when they go AFK  
![afksuffix](/afksuffix.png)  

### `format_true`  

Message when a player goes AFK  

### `format_false`  

Message when a player returns  

[//]: # (message.yml)  
<!--@include: @/parts/words.md#setting-->  
<!--@include: @/parts/words.md#path--> `message.yml → afk`  

<!--@include: @/parts/words.md#default-->  
<<< @/files/message.yml#afk  

<!--@include: @/parts/enable.md-->  
<!--@include: @/parts/range.md-->  

### `delay`  

How long (in [ticks](https://minecraft.wiki/w/Tick)) a player must be inactive to go AFK  

### `ignore`  

List of actions that are ignored and do not affect AFK status  

| Actions that can be ignored |  
|----------------------------|  
| Any command names          |  
| `chat` - when a player types in chat |  
| `quit` - when a player logs out |  

::: info EXAMPLE  
If I add the command `tell` to the list and a player is AFK, they can use the `tell` command without leaving AFK mode  
:::  

<!--@include: @/parts/destination.md-->  
<!--@include: @/parts/ticker.md-->  
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)  
<!--@include: @/parts/words.md#permission-->  
<!--@include: @/parts/words.md#path--> `permission.yml → message.afk`  

<!--@include: @/parts/words.md#default-->  
<<< @/files/permission.yml#afk  

<!--@include: @/parts/permission/permissionTier3.md-->  
<!--@include: @/parts/permission/cooldown.md-->  
<!--@include: @/parts/permission/sound.md-->
