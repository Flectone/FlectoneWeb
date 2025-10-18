---
authors:
- TheFaser
---

# Discord

Integration with Discord allows sending messages:
- from Minecraft to Discord
- from Discord to Minecraft

![discord message](/discordmessage.png)
![minecraft message](/discordminecraftmessage.png)

<!--@include: @/parts/messageTag.md-->

[//]: # (localization)
<!--@include: @/parts/words.md#localization-->
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → integration.discord`

<!--@include: @/parts/words.md#default-->

::: code-group
<<< @/files/localizations/ru_ru.yml#discord
<<< @/files/localizations/en_us.yml#discord
:::

### `Placeholders`

You can use all placeholders used in the initial message for Minecraft
::: info EXAMPLE FOR BAN MESSAGE
There is a `<reason>` placeholder, so I can use `<reason>` inside Discord messages
:::

There are also placeholders that will DEFINITELY be replaced in any message
- `<final_message>` message sent to Minecraft
- `<final_clear_message>` message sent to Minecraft without unicode emojis
- `<player>` nickname of the player who sent the message
- `<message>` raw message written by the player
- `<plain_message>` formatted message written by the player
- Obviously, all placeholders from `PlaceholderAPI` and `FlectonePulse` will also work

### `for_minecraft`

Format of the message that will be sent from Discord to Minecraft

### `info_channel`

List of channel IDs and their names, for displaying some information, for example `TPS`

### `message_channel`

List of messages with their settings

::::: details Message configuration

::: tip INFO

If a parameter is empty or not written, it will not be used in the final message

:::

#### `content`

Message content
![discord content](/discordcontent.png)

#### `webhook_avatar`

Enable Discord webhook with player's avatar. Best to use `https://mc-heads.net/avatar/<skin>/32.png`
![discord webhook](/discordwebhook.png)

#### `embed`

Discord embed message
![discord embed](/discordembed.png)

##### `color`

Color of the `embed` message

##### `title`

Title of the `embed` message

##### `url`

URL for the `embed` message

##### `author`

Author of the `embed` message

###### `name`

Name of the `embed` message author

###### `url`

URL of the `embed` message author

###### `icon_url`

URL of the `embed` message author's avatar. If you change it to your own, the URL must contain `<skin>`

##### `description`

Description of the `embed` message

##### `thumbnail`

Small image inside the `embed` message

##### `fields`

Bottom fields inside the `embed` message

###### `name`

Name of the field inside the `embed` message

###### `value`

Value of the field inside the `embed` message

###### `inline`

If enabled, the field will be placed in a column with other fields

##### `image`

Main image of the `embed` message

##### `timestamp`

If enabled, the `embed` message will include creation time

##### `footer`

Bottom part of the `embed` message

###### `text`

Text in the bottom part of the `embed` message

###### `icon_url`

Image in the bottom part of the `embed` message

:::::

::: info INFO

Message with all parameters
![discord](https://docs.discord4j.com/img/embed-preview.png)

```yaml
message_name:
  content: ""
  webhook_avatar: "https://mc-heads.net/avatar/<skin>/32.png"
  embed:
    color: ""
    title: ""
    url: ""
    author:
      name: ""
      url: ""
      icon-url: "https://mc-heads.net/avatar/<skin>/16.png"
    description: ""
    thumbnail: ""
    fields:
      - name: ""
        value: ""
        inline: false
    image: ""
    timestamp: true
    footer:
      text: ""
      icon-url: "https://mc-heads.net/avatar/<skin>/16.png"
```
:::

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → discord`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#discord

<!--@include: @/parts/enable.md-->

::: warning WARNING
- Before enabling, insert the Discord bot **token**
- After enabling, it's **RECOMMENDED** to restart the server, otherwise the plugin may cause freezing
:::

### `token`

Discord bot [token](https://discordgsm.com/guide/how-to-get-a-discord-bot-token) for connection. You can use environment variables, for example `${VALUE}`

### `presence`

![discord presence](/discordpresence.png)

::: details Bot status configuration
#### `enable`

Enables or disables custom bot status

#### `status`

| Mode            | Explanation                    |
|-----------------|--------------------------------|
| `UNKNOWN`       | -                              |
| `ONLINE`        | Online                         |
| `DO_NOT_DISTURB`| Do not disturb (Online)        |
| `IDLE`          | Online but idle                |
| `INVISIBLE`     | Invisible                      |
| `OFFLINE`       | Offline                        |

#### `activity`

Bot activity in Discord

##### `enable`

Enables or disables activity

##### `type`

| Type        | Explanation |
|-------------|-------------|
| `UNKNOWN`   | -           |
| `STREAMING` | Streaming   |
| `LISTENING` | Listening   |
| `WATCHING`  | Watching    |
| `CUSTOM`    | -           |
| `COMPETING` | Competing   |

##### `name`

Activity name

##### `url`

Activity URL

:::

### `channel_info`

![discord channel info](/discordchannelinfo.png)

::: details Information channels configuration
#### `enable`

Whether information channel is needed

<!--@include: @/parts/ticker.md-->

### `message_channel`

List of message types and [channel IDs](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) in Discord

::: info For example I want messages from Minecraft command `/ban` to be sent to Discord
1. Copy the Discord channel ID `1286666844358316083`
2. Write `COMMAND_BAN: "1286666844358316083"`

```yaml
message-channel:
COMMAND_BAN: "1286666844358316083"
```

You don't need to configure localization, by default the message will be sent with the format `<final_message>`
:::

<!--@include: @/parts/destination.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.discord`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#discord

<!--@include: @/parts/permission/permissionTier3.md-->