---
order: 5
authors:
- TheFaser
---

# Database

Storage for important player information

::: tip INFO
You can use environment variables in database fields, for example `${VALUE}`
:::

[//]: # (config.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `config.yml → database`

<!--@include: @/parts/words.md#default-->
<<< @/files/config.yml#database

### `type`

Type of database used, currently supported:

| Type            | Explanation                   |
|-----------------|-------------------------------|
| `SQLite`        | Local, file-based             |
| `MySQL`         | Server, requires connection   |
| `MariaDB`       | Server, requires connection   |
| `H2`            | Local, file-based             |
| `PostgreSQL`    | Server, requires connection   |

### `name`

Database name

### `host`

Address of the server where the database is located

### `port`

Connection port to the database on the server

### `user`

Username to be used for connecting to the database

### `password`

Password for connecting to the database

### `parameters`

Database connection parameters

### `prefix`

::: warning WARNING

If you change the prefix, it means new tables will be created and previous player data will not be used

:::

Database table prefix, if empty, the `fp_` prefix will be used