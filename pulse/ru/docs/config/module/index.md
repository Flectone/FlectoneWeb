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

### `use_paper_message_sender`

Если включено, `FlectonePulse` будет использовать `Paper`, как инструмент для отправки сообщения в чат игроку. Как это работает? Сначала плагин создаёт сообщение внутри себя и получает `FlectonePulse.Component`, этот объект преобразуется в обычную строчку `String`. Далее используется сам `Paper`, чтобы из этой строчки получить `Paper.Component` и отправить его игроку

::: warning ПРЕДУПРЕЖДЕНИЕ

Чтобы это работало, на сервере должен быть установлен `PacketEvents` отдельным плагином и ядро сервера должно быть `Paper` или его форк

:::

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#module

<!--@include: @/parts/permission/permissionTier3.md-->