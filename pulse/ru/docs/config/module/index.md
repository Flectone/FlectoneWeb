---
order: 15
authors:
  - TheFaser
---

# Модуль

Настройка самого главного модуля `FlectonePulse`

[//]: # (config.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `config.yml → module`

<!--@include: @/parts/words.md#default-->
<<< @/files/config.yml#module

### `enable`

Включает или выключает работу всех модулей

- Каждый модуль имеет родителя (тот, кто выше находится)

::: info НАПРИМЕР
```yaml
house:
  door:
  chair:
```

`house` является родителем для `door` и `chair`
:::

- Каждый модуль зависит от `enable` родителя

::: info НАПРИМЕР
```yaml
house:
  enable: false
  door:
    enable: true
  chair:
    enable: true
```

`house` выключен, значит внезависимости от того, включены ли `door` и `chair` - они тоже будут выключены
:::

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#module

<!--@include: @/parts/permission/permissionTier3.md-->