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

### `types`

List of messages where the key is the translation key

::: tip YOU CAN ADD ANY MESSAGE
1. Take the command `/random roll 1..100`

![roll 1](/roll_1.png)

2. Its translation key will be `commands.random.roll`, which can be viewed on [this site](https://mcasset.cloud/1.21.8/assets/minecraft/lang/en_us.json)

![roll 2](/roll_2.png)

3. Write this key in `types`, replacing each `%s` argument with `<arg_0>`, `<arg_1>`, etc.

```yaml
types:
  commands.random.roll: "<fcolor:1> <arg_0> rolled <arg_1> (from <arg_2> to <arg_3>)"
```

4. After reloading with `/flectonepuse reload`, the message will be changed as we made it

![roll 3](/roll_3.png)

:::

::: info INFO

- If the message has no arguments, you don't need to write `<arg_number>`
- If the message doesn't have an argument that is written, for example `<arg_100>`, it will be replaced with empty
- Arguments always go in the order specified in the English Minecraft localization. If adding another localization, you need to use the same argument order as in English, but you can rearrange them. For example `<arg_1>` can come before `<arg_0>`, this is not a problem

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