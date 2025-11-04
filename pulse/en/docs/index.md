---
title: "Documentation"
authors:
  - TheFaser
---

<div class="center-row" align="center">
    <a href="https://flectone.net/pulse/"><img src="https://flectone.net/pulse/flectonepulse.png" alt="flectone" class="hover-brightness"></a>
    <br>
    <h1> FlectonePulse — Documentation </h1>
    <p>Complete guide to setting up and using FlectonePulse</p>
</div>

## Frequently Asked Questions (FAQ)

### 1. What is FlectonePulse and what is it used for?
FlectonePulse is a plugin for Minecraft servers that allows full customization of messages, chat, commands, and integrations. It supports all popular platforms (Bukkit, Spigot, Paper, Purpur, Folia, BungeeCord, Velocity) and provides a flexible text formatting system, automatic player language detection, and integrations with Discord, Telegram, and Twitch. FlectonePulse works on all versions from 1.8.8 up to the latest

### 2. How to install FlectonePulse?

- #### Bukkit
1. Download the plugin from [Modrinth](https://modrinth.com/plugin/flectonepulse)
2. Place the plugin file in your server's `plugins` folder
3. Restart the server
4. Configure the settings in the files

- #### Fabric
1. Download the mod from [Modrinth](https://modrinth.com/plugin/flectonepulse)
2. Place the mod file in your server's `mods` folder, and also install `PacketEvents` and `Fabric-API`
3. Restart the server
4. Configure the settings in the files

| File                | Documentation Link                                                         | Explanation                                                                                                                                                                                        |
|---------------------|--------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `config.yml`        | [Configuration](/docs/config/)                                                  | Main FlectonePulse configuration, essential for proper operation. This is where the database, plugin language, proxy mode, etc., are configured.                                                   |
| `command.yml`       | [Commands](/docs/command/)                                                      | Configuration of all **custom** commands. They can be used by typing `/flectonepulse:command_name` in Minecraft.                                                                                   |
| `integration.yml`   | [Integrations](/docs/integration/)                                               | Configuration of interactions with external plugins and services.                                                                                                                                  |
| `message.yml`       | [Messages](/docs/message/)                                                    | Configuration of FlectonePulse messages (conditions for their appearance and content).<br/> **Do not confuse with message format configuration**, which is done in the `/localizations/...` files. |
| `localizations/...` | Specified in each section of the commands and messages documentation                        | This folder contains files with settings for each player language ([see language](/docs/config/language/)). This is where the **format** of messages, i.e., the text, is configured.               |
| `permission.yml`    | Specified in each section of the commands, messages, and integrations documentation            | Configuration of access permissions. By default, permissions are set so that most functions are available to all players without additional configuration.                                         |

### 3. How to configure message formatting?
FlectonePulse has a versatile text formatting system supporting various color formats, from classic codes to modern gradients.

<!--@include: @/parts/legacyColors.md-->

*For flexibility, you can use `&` or `§` as interchangeable symbols.*

```yaml
welcome-message: "<gradient:#FF0000:#00FF00>&lHello</gradient> <rainbow><player></rainbow>!"
```

![welcome message](/welcomemessage.png)

### 4. Can certain plugin features be disabled?
Yes, FlectonePulse uses a modular system. Any feature (commands, messages, or integrations) can be disabled in the `command.yml`, `message.yml`, or `integration.yml` files, respectively. After making changes, restart the plugin with the `/flectonepulse reload` command.

### 5. How does automatic language detection work?
If the `language_player` option is enabled in `config.yml`, the plugin automatically detects the player's Minecraft language and displays messages from the `localizations/...` folder in that language. If the localization is unavailable, the default language from the configuration is used. Details in the [localization documentation](/docs/config/language/).

### 6. What integrations does FlectonePulse support?
The plugin integrates with Discord, Telegram, and Twitch, allowing players to communicate across different platforms. It also supports third-party Minecraft plugins, such as preventing muted players from speaking in PlasmoVoice and SimpleVoice. Integration settings are configured in the `integration.yml` file. Details in the [integrations documentation](/docs/integration/).

### 7. How to use the `/chatsetting` command?
Type the `/chatsetting` command in the chat to configure chat and related features (e.g., color, style, notifications).

![commandchatsetting](/commandchatsetting.gif)

### 8. Does FlectonePulse support PlaceholderAPI?
Yes, FlectonePulse is fully compatible with PlaceholderAPI and MiniPlaceholders. Use placeholders in messages.

### 9. How to use the `/symbol` command?
Type the `/symbol` command in the chat to search for and use Unicode emojis.

![commandsymbol](/commandsymbol.png)

### 10. Are there chat-based mini-games?
Yes, players can use built-in mini-games such as tic-tac-toe or rock-paper-scissors.

![commandtictactoe](/commandtictactoe.png)

![commandrockpaperscissors](/commandrockpaperscissors.png)

### 11. How is FlectonePulse different from FlectoneChat?
FlectonePulse is a new project, not an improved version of FlectoneChat. FlectoneChat was an experiment, while FlectonePulse was built with past mistakes in mind, offering more features and customization.

### 12. How to enable displaying the player's name above their head?
Enable the `name_visible` setting in the `message.yml` file:

<<< @/files/message.yml#scoreboard

After making changes, run the `/flectonepulse reload` command. Details in the [configuration documentation](/docs/message/format/scoreboard/).

### 13. How to configure the player's name display?
Player name (`display`) configuration is done in the `localizations/...` files:

::: code-group
<<< @/files/localizations/ru_ru.yml#names
<<< @/files/localizations/en_us.yml#names
:::

After changes, run `/flectonepulse reload`. Details in the [localization documentation](/docs/message/format/names/).

### 14. How to configure colors in messages and the interface?
Color configuration is done in the `message.yml` file using the `fcolor` module:

<<< @/files/message.yml#fcolor

This sets default colors if the player hasn’t chosen their own in `/chatsetting` or `/chatcolor`. You can disable color changes in the respective commands. Details in the [formatting guide](/docs/message/format/color/).

::: tip TIP
It’s easier to change the 4 colors here than to replace `<fcolor:...>` in all plugin settings.
:::

### 15. How to configure the TAB (player list)?
To enable/disable TAB modules, configure the `message.yml` file:

```yaml
tab:
  enable: true
  header:
    enable: true
  footer:
    enable: true
  playerlistname:
    enable: true
```

To modify messages, edit the localization file in `localizations/...`:

```yaml
tab:
  header:
    lists:
      - - " "
        - "<fcolor:1>👾"
        - " "
      - - " "
        - "<fcolor:1>❤"
        - " "
  footer:
    lists:
      - - " "
        - "<fcolor:1>TPS <tps>, Online <online>"
        - " "
      - - " "
        - "<fcolor:1>Hello <fcolor:2><player></fcolor:2>!"
        - " "
  playerlistname:
    format: "<world_prefix>▋ <reset><vault_prefix><stream_prefix><fcolor:2><player><afk_suffix><vault_suffix>"
```

::: warning IMPORTANT
To sort the TAB by donation groups, enable [`tab_sort`](/docs/integration/luckperms/#tab-sort).
:::

After changes, run `/flectonepulse reload`. Details in the [TAB documentation](/docs/message/tab/).

### 16. What to do if errors occur?
1. Check the server console for errors and send them to the [Discord community](https://discord.com/channels/861147957365964810/1271850075064369152) for assistance.
2. Ensure you’re using the latest version of the plugin.
3. Review the documentation or get personalized technical support for boosters on [Boosty](https://boosty.to/thefaser).

### 17. How to contact the developers?
Join the [Discord community](https://discord.flectone.net/) for support and suggestions. Leave a star on [GitHub](https://github.com/Flectone/FlectonePulse) or a review on [SpigotMC](https://www.spigotmc.org/resources/flectonepulse.121618/).

### 18. When will the new version of FlectonePulse with support for the latest Minecraft version be released?
FlectonePulse likely already supports the latest Minecraft version. Experimental versions are available for download on [GitHub](https://github.com/Flectone/FlectonePulse/actions/) or in the [Discord testers channel](https://discord.com/channels/861147957365964810/1357058707011272926). If a Minecraft version is released and FlectonePulse hasn’t been updated, it’s due to waiting for the release of PacketEvents, the main library used by FlectonePulse for server interaction. Once PacketEvents is released, FlectonePulse will be updated.

::: danger CAUTION
Use test versions at your own risk. These versions are often not intended for production use and may be unstable or break previous versions of FlectonePulse.
:::

### 19. Does FlectonePulse work with proxies, and how to configure it?
FlectonePulse supports proxy servers, including BungeeCord and Velocity. The same plugin file must be installed on both the proxy and the server. Configuration files are not created on the proxy—it acts as a bridge. All settings are configured in the server files. A MySQL database connection must be set up in the `config.yml` file on the servers. Additionally, enable either the `velocity` or `bungeecord` mode. Details in the [configuration documentation](/docs/config/proxy/).

### 20. Does FlectonePulse support servers that run mods and plugins simultaneously, like Arclight or Mohist, and does it work on Fabric?

FlectonePulse has not been tested on hybrid servers supporting both mods and plugins (e.g., Arclight or Mohist), and no support is planned. The main issue lies with the Libby library used for dependency loading. Theoretically, it's possible to build FlectonePulse with all required dependencies to run on these servers, but there's no guarantee PacketEvents will function correctly. FlectonePulse does work on Fabric, but only on the latest Minecraft version due to the complexity of multi-version support.

::: info NOTE

The main issue has been fixed in recent Mohist versions, so FlectonePulse works there without major problems

:::

### 21. Is your chat plugin incompatible with FlectonePulse?

By default, `FlectonePulse` has the `mode: "PACKET"` setting for [chats](/docs/message/chat/#mode). This prevents your plugin from working correctly

::: info INFO

You can change this to `mode: "BUKKIT"` to allow other plugins to interact with chat. In rare cases, you may use `mode: "PAPER"` if your plugin uses `Paper` listeners

:::

<div align="center">
  <h3>🚀 Start using FlectonePulse today!</h3>
  <br>
  <a href="https://modrinth.com/plugin/flectonepulse"><img src="https://flectone.net/pulse/modrinth.svg" alt="modrinth" class="hover-brightness"></a>
  <a href="https://discord.flectone.net/"><img src="https://flectone.net/pulse/discord.svg" alt="discord" class="hover-brightness"></a>
</div>