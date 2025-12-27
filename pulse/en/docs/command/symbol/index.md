---
authors:
   - TheFaser
   - Stokmenn
---

# `/symbol`

Command for searching Unicode emoji
![symbol](/commandsymbol.png)

Huge thanks to @replaceitem for allowing the use of [symbol lists](https://github.com/replaceitem/symbol-chat)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → command.symbol`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#symbol
<<< @/files/localizations/en_us.yml#symbol
:::

### `null_category`

Message if the entered category does not exist

### `null_page`

Message if the entered page does not exist

### `header`

The top part of the list message

### `line_element`

Format for each component, they will be added one after another

#### `footer`

The bottom part of the list message

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → symbol`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#symbol

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/perPage.md-->
<!--@include: @/parts/aliases.md-->

### `categories`

List of categories and symbols separated by spaces

::: info WHAT CAN YOU DO WITH THIS?
1. Add your own symbols to the current ones, separated by spaces
2. Rename categories or add your own
:::

<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.symbol`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#symbol

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->
