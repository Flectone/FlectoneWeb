---
order: 15
authors:
- TheFaser
---

# Command

::: warning WARNING
This is not related to the commands module, to configure them go to [command](/docs/command/)
:::

[//]: # (config.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `config.yml → command`

<!--@include: @/parts/words.md#default-->
<<< @/files/config.yml#command

### `unregister_on_reload`

::: warning WARNING
Not recommended to enable on older Minecraft versions, otherwise there might be errors/warnings in the server console, but they do not affect the plugin's operation
:::

- If enabled, `FlectonePulse` will remove and re-add its own commands on `/flectonepulse reload`. This can cause drops in `tps` and `mspt` due to the large number of packets, so it's better to disable this setting if you encounter such a problem.
- If disabled, to correctly disable a command from `FlectonePulse` (in `commands.yml`) you will need to restart the server.

### `disabled_fabric`

List of commands **not** from `FlectonePulse` that should be disabled on `Fabric` server startup. This allows replacing already taken commands on `Fabric`, for example `/me` or `/ban`