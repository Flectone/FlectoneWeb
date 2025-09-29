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

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#module

<!--@include: @/parts/permission/permissionTier3.md-->