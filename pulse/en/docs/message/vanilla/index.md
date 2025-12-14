---
authors:
- TheFaser
---

# Vanilla

Any message from the server that a player receives
![death server](/deathserver.png) \
![task](/task.png)\
![weather](/weather.png)\
![debugstick](/debugstick.png)

## Potential issues with

### `Advancements`

Check and enable the game rule for sending advancements using `/gamerule announceAdvancements true`

### `Blaze and Caves`

For `Blaze and Caves` advancements to display correctly, you need to enable vanilla advancement display in it
![advancement1](/advancement1.png)\
![advancement2](/advancement2.png)\
![advancement3](/advancement3.png)

### `Commands`

Check and enable the game rule for sending command feedback using `/gamerule sendCommandFeedback true`


[//]: # (localization)
<!--@include: @/parts/words.md#localization-->
<!--@include: @/parts/words.md#path--> `localizations → language.yml → message.vanilla`

<!--@include: @/parts/words.md#default-->

::: code-group
<<< @/files/localizations/ru_ru.yml#vanilla
<<< @/files/localizations/en_us.yml#vanilla
:::

### `format_player`

Format for displaying players in arguments

### `format_entity`

Format for displaying mobs in arguments

### `types`

List of messages where the key is the translation key

::: tip YOU CAN ADD ANY MESSAGE
1. Take the command `/random roll 1..100`

![roll 1](/roll_1.png)

2. Its translation key will be `commands.random.roll`, which can be viewed on [this site](https://mcasset.cloud/1.21.8/assets/minecraft/lang/en_us.json)

![roll 2](/roll_2.png)

3. Write this key in `types`, replacing each `%s` argument with `<argument:0>`, `<argument:1>`, etc.

```yaml
types:
  commands.random.roll: "<fcolor:1> <argument:0> rolled <argument:1> (from <argument:2> to <argument:3>)"
```

4. After reloading with `/flectonepuse reload`, the message will be changed as we made it

![roll 3](/roll_3.png)

:::

::: info INFO

- `<argument:number:text>` returns the argument's internal text
- `<argument:number:inner_text>` returns the argument's internal text without the `[]` brackets
- `<argument:number:style>` returns the argument's internal style
- `<argument:number:hover_text>` returns the main internal hover text component
- `<argument:number:hover_text:another_number>` returns the `another_number` internal hover text component
- `<argument:number:hover_style>` returns the hover component's style
- If the message has no arguments, `<argument:number>` does not need to be written
- If the message does not have the argument specified, for example `<argument:100>`, it will be replaced with an empty string
- Arguments always follow the order specified in Minecraft's English localization. When adding another localization, the same argument order as in English must be used, but they can be rearranged. For example, `<argument:1>` can come before `<argument:0>`, this is not a problem

For example, to configure an advancement message you can do this: `<fcolor:1>🌠 <argument:0> -> «<argument:1:inner_text>» - <argument:1:hover_text:1>`

![advancement showcase](/argument_showcase.png)

:::

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → vanilla`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#vanilla

<!--@include: @/parts/enable.md-->

### `types`

List of message groups that are united by some common feature. Each parameter inside is optional

::::: details GROUP CONFIGURATION

#### `multi_message`

Whether this message is global for everyone. If enabled, it will be sent once from the sender, and all other messages will be canceled. This is not visually noticeable, but is used for proper integration with `Proxy` and external services.

::: info EXAMPLE

The message about receiving an advancement is sent to each player separately. If you enable `multi_message`, the message will be sent when the player who received the advancement receives the advancement message. Then this message will be sent to everyone on their behalf, allowing it to be correctly sent to `Proxy` and integrations

:::

#### `name`

Group name in uppercase. Used to specify these messages in integrations (e.g., in `Discord`) and in `/chatsetting` to enable/disable display

<!--@include: @/parts/range.md-->
<!--@include: @/parts/destination.md-->
<!--@include: @/parts/sound.md-->

:::::

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.vanilla`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#vanilla

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/sound.md-->