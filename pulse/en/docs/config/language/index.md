---
order: 1
authors:
- TheFaser
---

# Language

Language and behavior configuration

[//]: # (config.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `config.yml → language`

<!--@include: @/parts/words.md#default-->
<<< @/files/config.yml#language

### `type`

Localization used for all plugin messages

::: warning WARNING
The selected localization must be from the `localizations` folder
:::

You can create and use your own localizations, for this:
1. Copy one localization file, for example `ru_ru.yml`
2. Rename it, preferably as in the [game](https://minecraft.wiki/w/Language)
3. Now you can change any messages inside this file

::: info EXAMPLE
I want to translate the plugin into Belarusian
1. Copy the file `ru_ru.yml`
2. Rename it to `be_by.yml`
![locale](/locale.png)
3. Done!
:::

### `by_player`

If enabled, each player's Minecraft localization will be checked and depending on that, the [message](/docs/message/) will be shown

::: tip INFO

If you change messages with `by_player` enabled, remember to do it in ALL localization files

:::

![locale](/locale.gif)

If such localization doesn't exist, the localization from `type` will be used