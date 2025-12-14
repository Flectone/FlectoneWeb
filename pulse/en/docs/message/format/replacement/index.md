---
authors:
  - TheFaser
  - Stokmenn
---

# Replacement

Used to replace triggers with specific values

![ping](/ping.png)


![tps](/tps.png)


![online](/online.png)


![coords](/coords.png)


![stats](/stats.png)


![skin](/skin.png)


![item](/item.png)

::: warning WARNING

`PacketEvents` currently does not support properly displaying detailed item information on hover. The item will have an "empty" description without enchantments. To solve this issue, you can enable [use_paper_message_sender](/docs/config/module/#use_paper_message_sender), but this is a workaround

:::


![url](/url.png)


![image](/image.png)


![spoiler](/spoiler.png)


![bold](/bold.png)


![italic](/italic.png)


![underline](/underline.png)


![obfuscated](/obfuscated.png)


![strikethrough](/strikethrough.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → language.yml → message.format.replacement`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#replacement
<<< @/files/localizations/en_us.yml#replacement
:::

### `spoiler_symbol`

Character that will replace each letter in words marked as `spoiler`

### `values`

A list of messages where the key is the name and the value is what will be displayed instead of the trigger

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.replacement`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#replacement

<!--@include: @/parts/enable.md-->

### `triggers`

List of all available triggers where the key is the name and the value is the `trigger` itself in regex format

::: warning WARNING

If you're adding a new trigger, make sure to also add it to the localization file (i.e. specify what it should be replaced with)

:::

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.replacement`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#replacement

<!--@include: @/parts/permission/permissionTier3.md-->
