---
authors:
  - TheFaser
---

# PlaceholderAPI

Интеграция с плагином PlaceholderAPI:
- Позволяет использовать любые [плейсхолдеры](https://github.com/PlaceholderAPI/PlaceholderAPI/wiki/Placeholders)

::: info НАПРИМЕР
`%server_tps%`, `%server_online%` и т.д., если установлен соответствующий модуль с помощью `/papi ecloud download модуль`
:::

- Добавляет свои плейсхолдеры

| Плейсхолдер                                  | Что возвращает                                                       |
|----------------------------------------------|----------------------------------------------------------------------|
| `%flectonepulse_advancement%`                | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_afk%`                        | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_afk_suffix%`                 | Возвращает [AFK суффикс](/docs/command/afk/)                         |
| `%flectonepulse_auto%`                       | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_chat_name%`                  | Возвращает тип выбранного чата, по умолчанию `default`               |
| `%flectonepulse_death%`                      | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_discord%`                    | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_fcolor_number%`              | Возвращает [кастомный цвет](/docs/message/format/fcolor/) игрока     |
| `%flectonepulse_fcolor_out_number%`          | Возвращает [кастомный цвет OUT](/docs/message/format/fcolor/) игрока |
| `%flectonepulse_fcolor_see_number%`          | Возвращает [кастомный цвет SEE](/docs/message/format/fcolor/) игрока |
| `%flectonepulse_greeting%`                   | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_ip%`                         | Возвращает IP-адрес игрока                                           |
| `%flectonepulse_join%`                       | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_locale%`                     | Возвращает текущую локаль игрока                                     |
| `%flectonepulse_online%`                     | Возвращает количество игроков на сервере                             |
| `%flectonepulse_ping%`                       | Возвращает пинг игрока                                               |
| `%flectonepulse_player%`                     | Возвращает обычное имя игрока                                        |
| `%flectonepulse_quit%`                       | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_stream_prefix%`              | Возвращает [стрим префикс](/docs/message/command/stream/) игрока     |
| `%flectonepulse_spy_status`                  | Возвращает строку, если включен режим слежки, иначе пусто            |
| `%flectonepulse_telegram%`                   | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_tps%`                        | Возвращает TPS сервера                                               |
| `%flectonepulse_twitch%`                     | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_world_prefix%`               | Возвращает [префикс мира](/docs/message/format/world/) игрока        |
| `%flectonepulse_command_ball%`               | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_ban%`                | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_broadcast%`          | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_coin%`               | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_dice%`               | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_do%`                 | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_kick%`               | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_mail%`               | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_me%`                 | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_mute%`               | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_poll%`               | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_reply%`              | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_rockpaperscissors%`  | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_spy%`                | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_stream%`             | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_tell%`               | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_tictactoe%`          | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_translateto%`        | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_try%`                | Возвращает `true` если отображение включено, иначе пусто             |
| `%flectonepulse_command_warn%`               | Возвращает `true` если отображение включено, иначе пусто             |

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

Право для использования плейсхолдеров из PlaceholderAPI в сообщении