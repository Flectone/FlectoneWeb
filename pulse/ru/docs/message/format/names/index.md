---
authors:
  - TheFaser
---

# Имя

Модуль, отвечающий за имя игрока
![name tab](/nametab.png)  
![name display](/namedisplay.png)  

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.format.names`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#names
<<< @/files/localizations/en_us.yml#names
:::

### `constant`

Сообщение, которое будет форматироваться от отправителя на сервере, откуда было отправлено. Его можно использовать в любом сообщении с помощью `<constant>`

::: info ПРИМЕЧАНИЕ
Если у тебя возникают проблемы в сообщениях для `Velocity` или `BungeeCord`, то это решение твоей проблемы:

```yaml
constant: "%player_name%"
display: "<constant>"
```

:::


### `display`

Отвечает за имя игрока
![name display](/namedisplay.png)

### `entity`

Отвечает за имя сущности

### `unknown`

Отвечает за имя сущности, если его не удалось узнать

### `invisible`

Отвечает за имя игрока, если он под зельем невидимости

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.names`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#names

<!--@include: @/parts/enable.md-->

### `should_check_invisibility`

Нужно ли проверять, что игрок под зельем невидимости. Если да, то будет использовано имя `invisible`

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.names`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#names

<!--@include: @/parts/permission/permissionTier3.md-->