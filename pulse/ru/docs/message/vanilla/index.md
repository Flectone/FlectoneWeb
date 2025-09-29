---
authors:
  - TheFaser
---

# Ванилла

Любое сообщение от сервера, которое получает игрок
![death server](/deathserver.png) \
![task](/task.png)\
![weather](/weather.png)\
![debugstick](/debugstick.png)

## Возможные проблемы с

### `Достижениями`

Проверь и включи геймрул на отправление достижений с помощью `/gamerule announceAdvancements true`

### `Blaze and Caves`

Чтобы достижения из `Blaze and Caves` правильно отображались, нужно включить в нём ванильное отображение достижений
![advancement1](/advancement1.png)\
![advancement2](/advancement2.png)\
![advancement3](/advancement3.png)

### `Командами`

Проверь и включи геймрул на отправление ответов от команд с помощью `/gamerule sendCommandFeedback true`


[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.vanilla`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#vanilla
<<< @/files/localizations/en_us.yml#vanilla
:::

### `types`

Список сообщений, где ключом является ключ перевода

::: tip ТЫ МОЖЕШЬ ДОБАВИТЬ ЛЮБОЕ СООБЩЕНИЕ
1. Возьмём команду `/random roll 1..100`

![roll 1](/roll_1.png)

2. Его ключ перевода будет `commands.random.roll`, который можно посмотреть на [этом сайте](https://mcasset.cloud/1.21.8/assets/minecraft/lang/en_us.json)

![roll 2](/roll_2.png)

3. Впишем в `types` этот ключ, заменяя каждый аргумент `%s` на `<arg_0>`, `<arg_1>` и т.д.

```yaml
types:
  commands.random.roll: "<fcolor:1> <arg_0> rolled <arg_1> (from <arg_2> to <arg_3>)"
```

4. После перезагрузки с помощью `/flectonepuse reload`, сообщение будет изменяться так, как мы сделали

![roll 3](/roll_3.png)

:::

::: info ИНФОРМАЦИЯ

- Если у сообщения нет аргументов, `<arg_цифра>` писать не нужно 
- Если у сообщения не будет аргумента, который вписан, например `<arg_100>`, он будет заменён на пустоту
- Аргументы всегда идут в том порядке, в котором указаны в английской локализации майнкрафта. Если добавлять другую локализацию, то нужно использовать тотже порядок аргументов, как и в английской, но их можно менять местами. Например `<arg_1>` может идти раньше, чем `<arg_0>`, это не проблема

:::

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → vanilla`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#vanilla

<!--@include: @/parts/enable.md-->

### `types`

Список групп сообщений, которые объединены по какому-то общему признаку. Каждый параметр внутри необязателен

::::: details НАСТРОЙКА ГРУППЫ

#### `multi_message`

Является ли это сообщение глобальным для всех. Если включено, то будет отправлено 1 раз от отправителя, а все другие сообщения отменены. Визуально это никак не видно, но используется для правильной интеграцией с `Proxy` и внешними сервисами.

::: info НАПРИМЕР

Сообщение о получении достижения отправляется каждому игроку отдельно. Если включить `multi_message`, то сообщение будет отправлено тогда, когда сообщение о достижении получит сам игрок, получивший это достижение. Тогда это сообщение отправится всем от его имени, позволяя корректно отправить это на `Proxy` и в интеграции

:::

#### `name`

Название группы большими буквами. Используется, чтобы указывать эти сообщения в интеграциях (например в `Discord`) и в `/chatsetting` для включения/отключения отображения

<!--@include: @/parts/range.md-->
<!--@include: @/parts/destination.md-->
<!--@include: @/parts/sound.md-->

:::::

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.vanilla`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#vanilla

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/sound.md-->