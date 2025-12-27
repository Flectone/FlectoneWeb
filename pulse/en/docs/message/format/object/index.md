---
authors:
- TheFaser
---

# Object

::: warning WARNING

The module will only work for players using version `1.21.9` and above. For others, it will not be displayed

:::

::: warning WARNING

Heads and sprites can be colored in config files. To prevent this, you need to use a white color before them. For example: `<white><player_head></white>`

:::

Module responsible for heads and symbols in chat
![object](/object.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization-->
<!--@include: @/parts/words.md#path--> `localizations → language.yml → message.format.object`

<!--@include: @/parts/words.md#default-->

::: code-group
<<< @/files/localizations/ru_ru.yml#object
<<< @/files/localizations/en_us.yml#object
:::

### `default_symbol`

Symbol for regular `<player_head>` and `<sprite>`, if the recipient cannot see the final object (for `<player_head_or>` and `<sprite_or>` this is specified manually)

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.object`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#object

<!--@include: @/parts/enable.md-->

### `player_head`

Enables formatting of the `<player_head>` placeholder. It can be used in different ways
- `<player_head>` returns the head of the player who wrote the message
- `<player_head:Notch>` returns the head of the player whose nickname was written inside
- `<player_head:Notch:false>` returns the head of the player with the second layer disabled, whose nickname was written inside
- If the specified nickname doesn't exist, the head will have a random default skin
- `<player_head_or:...>` will return the player's head or the text specified as the first argument if the recipient cannot see heads in chat. For example, `<player_head_or:hello:Notch>` will return Notch's head, and in the console, it will be the word `hello`

::: tip NOTE

The `<player_head>` is already built into the `playerlistname` module by default and it only works for players who have the unofficial game. For licensed versions, the tab will be normal

:::

### `sprite`

Enables formatting of the `<sprite:...>` placeholder. It can be used in different ways
- `<sprite:name>`, returns an icon from the `blocks` atlas, for example `<sprite:item/diamond_sword>` (this is the same as `<sprite:blocks:item/diamond_sword>`)
- `<sprite:atlas:name>`, returns an icon from the specified atlas, for example `<sprite:gui:container/slot>`
- If the sprite is specified incorrectly, it will be an unknown texture. Using a resource pack you can create your own sprites
- `<sprite_or:...>` returns an sprite or the text specified as the first argument if the recipient cannot see sprites in chat. For example, `<sprite_or:hello:block/oak_log>` returns the oak sprite, and in the console, it will be the word `hello`

The easiest way to find atlas and sprite names is by using the [command /sprite](/docs/command/sprite/)
![command sprite](/commandsprite.png)

You can also find them in the folder created using the `F3 + S` combination inside Minecraft. There, you will find `minecraft_textures_atlas_...` files in both `.txt` and `.png` formats, which you can use to locate the appropriate sprite
::: info EXAMPLE

There is a `gui` atlas with the name `minecraft_textures_atlas_gui.png.txt`. In it you can find a line with `minecraft:container/slot	x=494	y=54	w=18	h=18`

Using these coordinates you can visually find it in the `.png` atlas (to see what it looks like). To display it inside Minecraft, you need to remove the `minecraft:` prefix

As a result, we get `<sprite:gui:container/slot>`
![object slot](/objectslot.png)

:::

### `need_extra_space`

Enables adding extra space for `<player_head>` and `<sprite>` written in config files. No space is added in player messages

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.object`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#object

<!--@include: @/parts/permission/permissionTier3.md-->