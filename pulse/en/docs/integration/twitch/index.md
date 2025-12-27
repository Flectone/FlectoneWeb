---
authors:
  - TheFaser
  - Stokmenn
---

# Twitch

Integration with Twitch allows:
- sending messages from Minecraft to Twitch
- sending messages from Twitch to Minecraft
- subscribing to Twitch stream starts

![twitch message](/twitchmessage.png)
![minecraft message](/twitchminecraftmessage.png)

<!--@include: @/parts/messageTag.md-->

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → integration.twitch`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#twitch
<<< @/files/localizations/en_us.yml#twitch
:::

### `null_player`

Message if the entered player via `custom_command` is not found

### `format_reply`

Message format for the `<reply>` tag when the message is a reply to another one

### `custom_command`

List of custom integration commands, where the key is the command name and the value is its message format

::: info EXAMPLE

```yaml
custom_command:
  tps:
    content: "<tps>"
```

A command to get the `tps` value on the server. **Don't forget to create it in integration.yml**

:::

### `Placeholders`

You can use all the placeholders that are used in the initial Minecraft message
::: tip EXAMPLE FOR A BLOCK MESSAGE
There is a placeholder `<reason>`, so I can use `<reason>` inside Twitch messages
:::

There are also placeholders that WILL DEFINITELY be replaced in any message
- `<final_message>` message sent to Minecraft
- `<final_clear_message>` message sent to Minecraft without Unicode emojis
- `<player>` player’s nickname who sent message
- `<message>` raw message written by player
- `<plain_message>` formatted message written by player
- `<reply>` formatted reply message, it will be empty if the main message is not a reply
- Obviously, all placeholders from `PlaceholderAPI` and `FlectonePulse` will also work

<br>
The message that will be sent from Twitch to Minecraft has its own placeholders:

| Placeholder    | What it returns                                           |
|----------------|-----------------------------------------------------------|
| `<name>`       | The user's nickname on Twitch                             |

### `message_channel`

A list of messages with the format of the final message

::: tip IF YOU WANT TO ADD ANOTHER MESSAGE:
1. Take the name from the list of `message types`
2. Insert into `message_channel`
```yaml
message_name: "<final_message>"
```
:::

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → twitch`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#twitch

<!--@include: @/parts/enable.md-->

::: warning WARNING
- Before enabling, insert the **token** and **client ID** for Twitch
- After enabling, it is **RECOMMENDED** to restart the server, otherwise, the plugin might cause freezing
  :::

### `client_id`

[User identifier](https://twitchtokengenerator.com/). You can use environment variables, for example `${VALUE}`
![client id](/twitchclientid.png)

### `token`

[User token](https://twitchtokengenerator.com/) for connecting. You can use environment variables, for example `${VALUE}`
![token](/twitchtoken.png)

### `custom_command`

List of custom integration commands, the key is the command name and it can be anything. Commands can ONLY be informational, they do not execute anything on the server and will not perform any actions

| Parameter     | Explanation                                                                      |
|---------------|----------------------------------------------------------------------------------|
| `need_player` | Whether to check the first command argument for a player name, e.g., `!ping TheFaser` |
| `aliases`     | List of aliases for using the command                                            |

::: info EXAMPLE

```yaml
custom_command:
  tps:
    need_player: false
    aliases:
      - "!tps"
      - "!tickpersecond"
```

A command to get the `tps` value on the server using `!tps` or `!tickpersecond`. **Don't forget to create the message in localization**

:::

### `message_channel`

A list of message types and Twitch channel names

::: tip For example, I want to send a `/ban` command message from Minecraft to Twitch
1. Copy the names of the Twitch channels to send the message to (`faseri4ka`)
2. Write:
```yaml
message_channel:
  COMMAND_BAN:
    - "faseri4ka" // [!code highlight]
```

There can be any number of channels, as long as the connected account has access to them. You don't need to configure localization, by default the message will be sent with the format `<final_message>`
:::

### `follow_channel`

A list where the key is the channel name, and the value is a list of commands to be executed when the stream starts

::: tip For example, I want to track the stream start for `faseri4ka` and write `stream start https://twitch.tv/faseri4ka`
1. Copy the channel name `faseri4ka`
2. Write:
```yaml
follow_channel:
  faseri4ka:
    - "stream start https://twitch.tv/faseri4ka"
```

- Up to 10 channels can be tracked at once, as long as the connected account has access to them
- There can be any number of commands to be executed when the stream starts
:::

<!--@include: @/parts/destination.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.twitch`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#twitch

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/sound.md-->