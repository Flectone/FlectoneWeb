---
authors:
  - TheFaser
  - Stokmenn
---

# PlaceholderAPI

Integration with PlaceholderAPI:
- Allows using any [placeholders](https://github.com/PlaceholderAPI/PlaceholderAPI/wiki/Placeholders)

::: info EXAMPLE
`%server_tps%`, `%server_online%`, etc., if the corresponding module is installed via `/papi ecloud download module`
:::

- Adds its own placeholders

| Placeholder                                 | Returns                                                               |
|---------------------------------------------|-----------------------------------------------------------------------|
| `%flectonepulse_advancement%`               | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_afk%`                       | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_afk_suffix%`                | Returns [AFK suffix](/docs/command/afk/)                              |
| `%flectonepulse_auto%`                      | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_chat_name%`                 | Returns the type of selected chat, default is `default`               |
| `%flectonepulse_death%`                     | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_discord%`                   | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_fcolor_number%`             | Returns the player's [custom](/docs/message/format/fcolor/) color     |
| `%flectonepulse_fcolor_out_number%`         | Returns the player's [custom OUT](/docs/message/format/fcolor/) color |
| `%flectonepulse_fcolor_see_number%`         | Returns the player's [custom SEE](/docs/message/format/fcolor/) color |
| `%flectonepulse_greeting%`                  | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_ip%`                        | Returns the player's IP address                                       |
| `%flectonepulse_join%`                      | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_locale%`                    | Returns the player's current locale                                   |
| `%flectonepulse_online%`                    | Returns the number of players on the server                           |
| `%flectonepulse_ping%`                      | Returns the player's ping                                             |
| `%flectonepulse_player%`                    | Returns the player's regular name                                     |
| `%flectonepulse_quit%`                      | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_stream_prefix%`             | Returns the player's [stream](/docs/message/command/stream/) prefix   |
| `%flectonepulse_mute_suffix%`               | Returns the player's [mute suffix](/docs/command/mute/)              |
| `%flectonepulse_spy_status`                 | Returns string if spy mode is enabled, otherwise empty                |
| `%flectonepulse_telegram%`                  | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_tps%`                       | Returns the server's TPS                                              |
| `%flectonepulse_twitch%`                    | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_world_prefix%`              | Returns the player's [world prefix](/docs/message/format/world/)      |
| `%flectonepulse_command_ball%`              | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_ban%`               | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_broadcast%`         | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_coin%`              | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_dice%`              | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_do%`                | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_kick%`              | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_mail%`              | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_me%`                | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_mute%`              | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_poll%`              | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_reply%`             | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_rockpaperscissors%` | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_spy%`               | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_stream%`            | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_tell%`              | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_tictactoe%`         | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_translateto%`       | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_try%`               | Returns `true` if display is enabled, otherwise empty                 |
| `%flectonepulse_command_warn%`              | Returns `true` if display is enabled, otherwise empty                 |

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → placeholderapi`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#placeholderapi

<!--@include: @/parts/enable.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.placeholderapi`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#placeholderapi

<!--@include: @/parts/permission/permissionTier3.md-->

### `use`

Permission to use PlaceholderAPI placeholders in messages