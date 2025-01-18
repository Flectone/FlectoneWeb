# Комманда /ban
Путь `localizations > ru_ru.yml > command.ban`

## Пояснение
Сообщения для комманды `/ban`
![command ban](/commandban.png)

## Редактирование
```yaml
<ru_ru.command.ban>
```

### По умолчанию
```yaml
ban:
  null-player: "<color:#ff7171><b>⁉</b> Игрок не найден"
  null-time: "<color:#ff7171><b>⁉</b> Невозможное время"
  reasons:
    default: "Ты заблокирован на этом сервере"
  server: "<color:#ff7171>🔒 <fcolor:2><moderator></fcolor> заблокировал игрока <fcolor:2><player></fcolor> <fcolor:1><hover:show_text:\"<fcolor:1>Айди: <id><br>Дата: <date><br>Время: <time><br>Осталось: <time_left><br>Модератор: <moderator><br>Причина: <reason>\">[ПОДРОБНЕЕ]</hover>"
  person: "<color:#ff7171>🔒 БАН 🔒 <fcolor:1><br><br>Дата: <date><br><br>Время: <time><br><br>Осталось: <time_left><br><br>Модератор: <moderator><br><br>Причина: <reason>"
  connection-attempt: "<color:#ff7171>🔒 Заблокированный <fcolor:2><player></fcolor> попытался подключиться <fcolor:1><hover:show_text:\"<fcolor:1>Айди: <id><br>Дата: <date><br>Время: <time><br>Осталось: <time_left><br>Модератор: <moderator><br>Причина: <reason>\">[ПОДРОБНЕЕ]</hover>"
```

## Параметры

- [Комманда](/docs/command/ban/)
- [Права](/docs/permission/command/ban/)

### `null-player`

Сообщение, если введённый игрок не найден

### `null-time`

Сообщение, если введено невозможное время

#### `reasons`

Список с ключами и значениями, где ключом является слово, а значением конкретная причина

::: tip Можно вписывать свои причины, например
```yaml
random_kek: "Random reason"
```
Тогда если я напишу `/ban player 1d random_kek`, то причиной будет `Random reason`

Если причина не указана, будет использоваться `default`
:::

#### `server`

Сообщение для всех

#### `person`

Сообщение для игрока

#### `connection-attempt`

Сообщение, если заблокированный игрок пытался подключиться

