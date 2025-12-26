---
authors:
  - TheFaser
  - Stokmenn
  - Bakinu
---

# Chat   

A module responsible for messages sent by players in chat  
![chat](/chat.png)

::: info HOW TO DISABLE LOCAL CHAT?

In `message.yml`, disable `local` by setting `enable: false`, and also set an empty `trigger: ""` for `global`

```yaml
chat:
  enable: true
  mode: "BUKKIT"
  priority: "NORMAL"
  types:
    local:
      enable: false # set to false
    global:
      enable: true
      cancel: false
      range: "PROXY"
      priority: 5
      trigger: "" # make it empty
      null_receiver:
        enable: true
        destination:
          type: "ACTION_BAR"
          times:
            stay: 20
      destination:
        type: "CHAT"
      cooldown:
        enable: false
      sound:
        enable: false
```

:::

[//]: # (localization)  
<!--@include: @/parts/words.md#localization-->  
<!--@include: @/parts/words.md#path--> `localizations → language.yml → message.chat`  

<!--@include: @/parts/words.md#default-->  

::: code-group  
<<< @/files/localizations/ru_ru.yml#chat  
<<< @/files/localizations/en_us.yml#chat  
:::  

### `null_chat`  

Message if nothing was sent to chat  

### `null_receiver`  

Message if no one saw the player's message  

### `types`  

List of chats and their formats  

[//]: # (message.yml)  
<!--@include: @/parts/words.md#setting-->  
<!--@include: @/parts/words.md#path--> `message.yml → chat`  

<!--@include: @/parts/words.md#default-->  
<<< @/files/message.yml#chat  

<!--@include: @/parts/enable.md-->

### `mode`

Chat processing mode

| Type      | Explanation                                                                               |
|-----------|------------------------------------------------------------------------------------------|
| `PACKET`  | Chat messages are processed via packets (fully asynchronous)                              |
| `BUKKIT`  | Chat messages are processed via `Bukkit` (asynchronous, but only in a single chat thread) |
| `PAPER`   | Chat messages are processed via `Paper` (asynchronous, but only in a single chat thread)  |

::: warning WARNING

If you need another plugin to see chat messages, set `mode: "BUKKIT"`. In rare cases where a plugin relies on `Paper` listeners, use `mode: "PAPER"`

:::

### `event_priority`

The priority of a chat message event. Change this value if there is a conflict with other plugins that also use the chat

| Type      | Explanation                                                               |  
|-----------|---------------------------------------------------------------------------|  
| `LOWEST`  | The chat message will be processed before all other plugins               |  
| `LOW`     | The chat message will be processed after plugins with `LOWEST` priority   |  
| `NORMAL`  | The chat message will be processed after plugins with `LOW` priority      |  
| `HIGH`    | The chat message will be processed after plugins with `NORMAL` priority   |  
| `HIGHEST` | The chat message will be processed after plugins with `HIGH` priority     |  
| `MONITOR` | The chat message will only be observed (no modifications allowed)         |

### `types`  

List of all chats with their configuration, you can add your own. By default, any chat looks like this  

```yaml
chat_name:
  enable: true
  cancel: true
  range: PROXY
  priority: number
  trigger: "trigger"
  null-receiver:
    enable: true
    destination:
      type: "ACTION_BAR"
      times:
        stay: 20
  destination:
    type: "CHAT"
  cooldown:
    enable: false
  sound:
    enable: false
```

### `enable`  

Enables chat functionality  

### `null_recipient`

![null recipient](/nullrecipient.png)

Message if no one saw the player's message

::: details SETTINGS

#### `enable`

Enables the functionality

#### `destination`

Where the message will be sent

:::  

### `cancel`  

- If `true`, the chat event is canceled for other plugins  
- If you need another chat-related plugin (e.g., DiscordSRV) to work, set this to `false`  
- If `false`, this also causes duplication in the console  
  ![chat console](/chatconsole.png)  

<!--@include: @/parts/range.md-->  

### `priority`  

Chat priority, used for selection when mulinfole chats have the same `trigger`. The chat with the higher priority is chosen  

::: info EXAMPLE CHATS  
```yaml
admin:
  priority: 20
  trigger: "!" // [!code highlight]
helper:
  priority: 10
  trigger: "!" // [!code highlight]
```  

If a player has permission for both chats, the plugin will select `admin` because it has a higher `priority`  
:::  

### `trigger`  

The prefix that a message must start with to be sent to a specific chat  

::: info `trigger` VALUE CAN BE ANYTHING:  
- `!`, `admin`, `.f`, etc.  
- Empty, i.e., `trigger: ""`, meaning any message fits this chat  
  :::  

In the final message, `trigger` is removed. For example, if a player sends `!hello`, the result will be `hello` without `!`  

<!--@include: @/parts/destination.md-->  
<!--@include: @/parts/cooldown.md-->  
<!--@include: @/parts/sound.md-->  

[//]: # (permission.yml)  
<!--@include: @/parts/words.md#permission-->  
<!--@include: @/parts/words.md#path--> `permission.yml → message.chat`  

<!--@include: @/parts/words.md#default-->  
<<< @/files/permission.yml#chat  

<!--@include: @/parts/permission/permissionTier3.md-->  

### `types`  

List of chats and their permissions  

<!--@include: @/parts/permission/cooldown.md-->  
<!--@include: @/parts/permission/sound.md-->  
