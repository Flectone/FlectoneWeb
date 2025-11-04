---
authors:
  - TheFaser
  - Stokmenn
---

# Telegram

Integration with Telegram allows sending messages:
- From Minecraft to Telegram
- From Telegram to Minecraft

![telegram message 1](/telegrammessage1.png)
![telegram message 2](/telegrammessage2.png)
![minecraft message](/telegramminecraftmessage.png)

<!--@include: @/parts/messageTag.md-->

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → language.yml → integration.telegram`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#telegram
<<< @/files/localizations/en_us.yml#telegram
:::

### `Placeholders`

You can use all placeholders that are used in the initial message for Minecraft
::: info EXAMPLE FOR A BAN MESSAGE
There is a placeholder `<reason>`, so I can use `<reason>` inside Telegram messages
:::

There are also placeholders that WILL DEFINITELY be replaced in any message:
- `<final_message>` message sent to Minecraft
- `<final_clear_message>` The message sent to Minecraft without unicode emojis
- `<player>` nickname of player who sent message
- `<message>` raw message written by player
- `<plain_message>` formatted message written by player
- Obviously, all placeholders from `PlaceholderAPI` and `FlectonePulse` will also work.

### `for_minecraft`

The format of the message that will be sent from Telegram to Minecraft.

| Placeholder     | Returns                                              |
|-----------------|------------------------------------------------------|
| `<name>`        | User tag in Telegram                                 |
| `<user_name>`   | User tag in Telegram                                 |
| `<first_name>`  | User first name in Telegram                          |
| `<last_name>`   | User last name in Telegram                           |
| `<chat>`        | Telegram chat name (where the message was sent from) |

### `info_channel`

List of channel IDs and their names, for displaying certain information, for example `TPS`

### `message_channel`

A list of messages with the format of the final message.

::: info IF YOU WANT TO ADD ANOTHER MESSAGE:
1. Take the name from the list of `message types`.
2. Insert it into `message_channel`:
```yaml
message_name: "<final_message>"
```
:::

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → telegram`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#telegram

<!--@include: @/parts/enable.md-->

::: warning WARNING
- Before enabling, insert the **token** of the Telegram bot.
- After enabling, it is **HIGHLY RECOMMENDED** to restart the server.
  :::

### `token`

The [token](https://core.telegram.org/bots/faq#how-do-i-create-a-bot) of the bot for connection. You can use environment variables, for example `${VALUE}`.

### `channel_info`

::: details Channel information settings
#### `enable`

Whether the information channel is needed

<!--@include: @/parts/ticker.md-->

### `message_channel`

A list of message types and chat IDs in Telegram.

::: info For example, I want messages from the `/ban` command in Minecraft to be sent to Telegram:
1. Copy the chat ID where the message should be sent (`-1002341720267_49`).

If the bot is connected and added to the channel, you can use the `/id` command in Telegram to find out the channel ID.

2. Write:
```yaml
message-channel:
  COMMAND_BAN:
    - "-1002341720267_49"
```

There can be as many chats as you want, as long as the bot has access to them from [secrets](/docs/secrets/telegram/). You don't need to configure localization, by default the message will be sent with the format `<final_message>`
:::

::: danger IMPORTANT

If your channel is a Forum (Topic), the ID of the **MAIN** channel should be specified without `_`.

1. The ID of my main channel (it always ends with `_1`) is `-1002341720267_1`.
2. Therefore, you need to enter **ONLY** `-1002341720267`.

For other chats in the forum, this rule does not apply, and you need to enter the **FULL** ID.

:::

<!--@include: @/parts/destination.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.telegram`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#telegram

<!--@include: @/parts/permission/permissionTier3.md-->