---
authors:
  - TheFaser
---

# LibertyBans

Integration with `LibertyBans` checks if a player is muted and prevents them from sending messages, as well as disables moderation commands in `FlectonePulse`

::: warning WARNING  
It's better to manually disable these commands in `command.yml`, as they may not always be disabled automatically
:::

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->  
<!--@include: @/parts/words.md#path--> `integration.yml → libertybans`  

<!--@include: @/parts/words.md#default-->  
<<< @/files/integration.yml#libertybans

<!--@include: @/parts/enable.md-->  

### `disable_flectonepulse_ban`
Disables the `/ban`, `/banlist`, and `/unban` commands in `FlectonePulse`

### `disable_flectonepulse_mute`
Disables the `/mute`, `/mutelist`, and `/unmute` commands in `FlectonePulse`

### `disable_flectonepulse_warn`
Disables the `/warn`, `/warnlist`, and `/unwarn` commands in `FlectonePulse`

### `disable_flectonepulse_kick`
Disables the `/kick` command in `FlectonePulse`

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->  
<!--@include: @/parts/words.md#path--> `permission.yml → integration.libertybans`  

<!--@include: @/parts/words.md#default-->  
<<< @/files/permission.yml#libertybans

<!--@include: @/parts/permission/permissionTier3.md-->