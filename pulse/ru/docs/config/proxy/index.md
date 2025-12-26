---
order: 10
authors:
  - TheFaser
---

# Прокси

Используется для синхронизации нескольких серверов с помощью BungeeCord/Velocity или Redis

::: tip ИНФОРМАЦИЯ
Это работает на любой платформе, где есть FlectonePulse. Для Bukkit и Fabric серверов.
:::

[//]: # (config.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `config.yml → proxy`

<!--@include: @/parts/words.md#default-->
<<< @/files/config.yml#proxy

### `clusters`

Список кластеров, к которым должен быть подключён сервер. Используется только тогда, когда включен режим прокси.
Если список пустой, то сервер получает все сообщения с других серверов

::: info КАК ИСПОЛЬЗОВАТЬ?
Нужно вписать название кластера на всех серверах, где сообщение будет получено и отправлено
```yaml
clusters: 
   - "test_cluster"
```

Так сервера связываются между собой и сообщения будут только между этими серверами
:::

### `bungeecord`

Включает связь с `BungeeCord`

::: tip КАК ЭТО НАСТРОИТЬ?
1. Файл `FlectonePulse-bukkit.jar` нужно поставить на `BungeeCord` в папку `plugins`. Даже если у вас Fabric сервер, на `BungeeCord` нужно ставить именно `FlectonePulse-bukkit.jar`
2. На всех серверах, где должна быть связь с `BungeeCord`, должен быть включен `bungeecord: true` в FlectonePulse
3. Выбранная датабаза должна быть `MySQL` или `MariaDB` или `PostgreSQL` (т.е. серверная)
:::

### `velocity`

Включает связь с `Velocity`

::: tip КАК ЭТО НАСТРОИТЬ?
1. Файл `FlectonePulse-bukkit.jar` нужно поставить на `Velocity` в папку `plugins`. Даже если у вас Fabric сервер, на `Velocity` нужно ставить именно `FlectonePulse-bukkit.jar`
2. На всех серверах, где должна быть связь с `Velocity`, должен быть включен `velocity: true` в FlectonePulse
3. Выбранная датабаза должна быть `MySQL` или `MariaDB` или `PostgreSQL` (т.е. серверная)
:::

### `redis`

Используется в качестве коммуникаций между разными серверами. Для `user` и `password` можно использовать environment variables, например `${VALUE}`

::: details НАСТРОЙКА REDIS

#### `enable`

Включает работу `Redis`

#### `host`

Хост (айпи) сервера, на котором запущен `Redis`


#### `port`

Порт сервера, на котором запущен `Redis`

#### `ssl`

Включает использование `SSL`

#### `user`

Имя пользователя в `Redis`, если его нет, то можно оставить пустым

#### `password`

Пароль пользователя в `Redis`, если его нет, то можно оставить пустым

:::