# Комманда /mute
Путь `localizations > en_us.yml > command.mute`

## Пояснение
Сообщения для комманды `/mute`
![command mute](/commandmute.png)

## Редактирование
```yaml
<en_us.command.mute>
```

### По умолчанию
```yaml
mute:
  null-player: "<color:#ff7171><b>⁉</b> This player does not exist"
  null-time: "<color:#ff7171><b>⁉</b> Incorrect time"
  reasons:
    default: "You have been muted on this server"
  server: "<color:#ff7171>🔒 <fcolor:2><moderator></fcolor> was muted player <fcolor:2><player></fcolor> <fcolor:1><hover:show_text:\"<fcolor:1>ID: <id><br>Date: <date><br>Time: <time><br>Remaining time: <time_left><br>Moderator: <moderator><br>Reason: <reason>\">[INFO]</hover>"
  person: "<color:#ff7171>🔒 You are muted, <time_left> left"
```

## Параметры

- [Комманда](/docs/command/mute/)
- [Права](/docs/permission/command/mute/)

### `null-player`

Сообщение, если введённый игрок не найден

### `null-time`

Сообщение, если введено невозможное время

### `reasons`

Список с ключами и значениями, где ключом является слово, а значением конкретная причина

::: tip Можно вписывать свои причины, например
```yaml
random_kek: "Random reason"
```
Тогда если я напишу `/mute player 1d random_kek`, то причиной будет `Random reason`

Если причина не указана, будет использоваться `default`
:::

### `server`

Сообщение для всех

### `person`

Сообщение для игрока

