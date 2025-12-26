---
order: 30
authors:
- TheFaser
---

# Cache

Configuring cache size and lifetime

::: warning WARNING

You MUST NOT delete any of the caches, even if you think it won't be used, a cache must be created as an object

:::

[//]: # (config.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `config.yml → cache`

<!--@include: @/parts/words.md#default-->
<<< @/files/config.yml#cache

### `types`

List of all caches used in `FlectonePulse`

| Type                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `COOLDOWN`             | For storing cooldowns applied to players when using a module. For example, chat message cooldowns or the `/me` command cooldown. This is for storage only, not for enabling cooldowns—each cooldown is enabled separately within its respective module                                                                                                                                                                                                                              |
| `DIALOG_CLICK`         | For tracking the number of clicks in custom dialogs, such as in `/chatsetting`. This allows closing the dialog for people who click in them too often, i.e., spamming                                                                                                                                                                                                                                                                                                               |
| `OFFLINE_PLAYERS`      | For storing offline players who have left the server but might return. Also stores names that could be players, for example `/tell Notch`. Obviously, `Notch` is not on the server, but to search for such a player `FlectonePulse` uses a series of operations and finally queries the database. If found, it is saved with that data; otherwise, it is stored as an unknown player. Subsequent `/tell Notch` commands will fetch it directly from the cache, bypassing all checks |
| `MODERATION`           | For storing moderation results about players. Most often used to avoid querying the database every time a player joins the server                                                                                                                                                                                                                                                                                                                                                   |
| `LEGACY_COLOR_MESSAGE` | For storing the results of formatting strings containing legacy formatting, e.g., why replace `&c` with `<red>` every time if it can be taken from the cache. This is necessary because a custom message is formatted for each player, and these messages are often the same                                                                                                                                                                                                        |
| `MENTION_MESSAGE`      | For storing the formatting results of messages for the `mention` module. This is necessary because a custom message is formatted for each player, and these messages are often the same                                                                                                                                                                                                                                                                                             |
| `SWEAR_MESSAGE`        | For storing the formatting results of messages for the `swear` module. This is necessary because a custom message is formatted for each player, and these messages are often the same                                                                                                                                                                                                                                                                                               |
| `REPLACEMENT_MESSAGE`  | For storing the formatting results of messages for the `replacement` module. This is necessary because a custom message is formatted for each player, and these messages are often the same                                                                                                                                                                                                                                                                                         |
| `REPLACEMENT_IMAGE`    | For storing formatted images for the `replacement` module                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `TRANSLATE_MESSAGE`    | For storing messages that need to be translated                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `PROFILE_PROPERTY`     | For storing player profiles with their skins, to avoid querying `SkinsRestorer` each time and creating them manually                                                                                                                                                                                                                                                                                                                                                                |

::: info PARAMETERS
#### `duration`

Lifetime of an unused object in the cache, after which it will be deleted

#### `time_unit`

Type of lifetime for an unused cache object

#### `size`

Maximum cache size

:::