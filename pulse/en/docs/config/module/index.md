---
order: 15
authors:
- TheFaser
---

# Module

Configuration of the main `FlectonePulse` module

[//]: # (config.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `config.yml → module`

<!--@include: @/parts/words.md#default-->
<<< @/files/config.yml#module

### `enable`

Enables or disables the operation of all modules

- Each module has a parent (the one above it)

::: info EXAMPLE
```yaml
house:
  door:
  chair:
```

`house` is the parent for `door` and `chair`
:::

- Each module depends on the parent's `enable`

::: info EXAMPLE
```yaml
house:
  enable: false
  door:
    enable: true
  chair:
    enable: true
```

`house` is disabled, so regardless of whether `door` and `chair` are enabled - they will also be disabled
:::

### `use_paper_message_sender`

If enabled, `FlectonePulse` will use `Paper` as a tool to send a message to the player's chat. How does it work? First, the plugin creates a message internally and obtains a `FlectonePulse.Component`, this object is converted into a regular `String`. Then, `Paper` itself is used to get a `Paper.Component` from this string and send it to the player

::: warning WARNING

For this to work, `PacketEvents` must be installed on the server as a separate plugin and the server core must be `Paper` or a fork of it

:::

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#module

<!--@include: @/parts/permission/permissionTier3.md-->