---
authors:
  - TheFaser
---

# Афк

Игрок становится АФК, если ничего не делает какой-то промежуток времени
![afk global message](/afkglobalmessage.png)

Если человек АФК, то ему выдаётся определённый суффикс
![afk suffix](/afksuffix.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.afk`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#afk
<<< @/files/localizations/en_us.yml#afk
:::

### `suffix`

Суффикс, который выдаётся игроку, если он встал в АФК
![afksuffix](/afksuffix.png)

### `format_true`

Сообщение, если игрок отошёл

### `format_false`

Сообщение, если игрок вернулся

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → afk`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#afk

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/range.md-->

### `delay`

Сколько времени в [тиках](https://ru.minecraft.wiki/w/%D0%A2%D0%B0%D0%BA%D1%82) игрок ничего не должен делать, чтобы встать в АФК

### `ignore`

Список действий, которые игнорируются и не влияют на режим АФК

| Действия, которые можно игнорировать |
|--------------------------------------|
| Любые названия комманд               |
| `chat` - когда игрок пишет в чат     |
| `quit` - когда игрок выходит         |

::: info НАПРИМЕР
Если я впишу в список комманду `tell` и игрок будет в режиме АФК, то он сможет использовать комманду `tell` и его не выкинет с режима АФК
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