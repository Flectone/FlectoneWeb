---
authors:
  - TheFaser
---

# `/sprite`

Command for searching sprites from Minecraft atlases
![sprite](/commandsprite.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization-->
<!--@include: @/parts/words.md#path--> `localizations → language.yml → command.sprite`

<!--@include: @/parts/words.md#default-->

::: code-group
<<< @/files/localizations/ru_ru.yml#sprite
<<< @/files/localizations/en_us.yml#sprite
:::

### `null_atlas`

Message if the entered atlas does not exist

### `null_page`

Message if the entered page does not exist

### `download_error`

Message when downloading an atlas file from the internet fails. Atlases may differ or not exist across different versions, so this error should be considered normal

### `atlas_downloading`

Message when starting to download an atlas file from the internet

### `header`

The top part of the list message

### `line_element`

Format for each component, they will be added one after another

#### `footer`

The bottom part of the list message

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → sprite`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#sprite

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/perPage.md-->
<!--@include: @/parts/aliases.md-->

### `categories`

List of categories, i.e., available atlases

::: info INFO
- Each atlas is downloaded only once if it does not exist in the folder `FlectonePulse/minecraft/<version>/atlases/`
- Each atlas has the final format `minecraft_textures_atlas_<atlas>.png.txt`
- Each atlas is downloaded from Flectone's own web server via the link `https://flectone.net/files/r/minecraft/<version>/atlases/minecraft_textures_atlas_<atlas>.png.txt`
- Atlases do not necessarily need to be downloaded from the web server; you can place them manually in advance in the folder `FlectonePulse/minecraft/<version>/atlases/` by obtaining them using the `F3 + S` combination in Minecraft
:::

<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.sprite`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#sprite

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->