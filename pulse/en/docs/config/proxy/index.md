---
order: 10
authors:
- TheFaser
---

# Proxy

Used for synchronizing multiple servers using BungeeCord/Velocity or Redis

::: tip INFO
This works on any platform where FlectonePulse is available. For Bukkit and Fabric servers.
:::

[//]: # (config.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `config.yml → proxy`

<!--@include: @/parts/words.md#default-->
<<< @/files/config.yml#proxy

### `clusters`

List of clusters the server should connect to. Only used when proxy mode is enabled.
If the list is empty, the server receives all messages from other servers

::: info HOW TO USE?
Enter the cluster name on all servers where the message should be received and sent
```yaml
clusters:
- "test_cluster"
```

This way servers connect with each other and messages will only be between these servers
:::

### `bungeecord`

Enables connection with `BungeeCord`

::: tip HOW TO SET UP?
1. Place the `FlectonePulse-bukkit.jar` file in the `plugins` folder on `BungeeCord`. Even if you have a Fabric server, you need to use `FlectonePulse-bukkit.jar` on `BungeeCord`
2. On all servers that should connect with `BungeeCord`, enable `bungeecord: true` in FlectonePulse
3. The selected database must be `MySQL`, `MariaDB`, or `PostgreSQL` (server-based)
:::

### `velocity`

Enables connection with `Velocity`

::: tip HOW TO SET UP?
1. Place the `FlectonePulse-bukkit.jar` file in the `plugins` folder on `Velocity`. Even if you have a Fabric server, you need to use `FlectonePulse-bukkit.jar` on `Velocity`
2. On all servers that should connect with `Velocity`, enable `velocity: true` in FlectonePulse
3. The selected database must be `MySQL`, `MariaDB`, or `PostgreSQL` (server-based)
:::

### `redis`

Used for communication between different servers. For `user` and `password` you can use environment variables, for example `${VALUE}`

::: details REDIS CONFIGURATION

#### `enable`

Enables `Redis` operation

#### `host`

Host (IP) of the server where `Redis` is running

#### `port`

Port of the server where `Redis` is running

#### `ssl`

Enables `SSL` usage

#### `user`

Username in `Redis`, if none exists, can be left empty

#### `password`

User password in `Redis`, if none exists, can be left empty

:::