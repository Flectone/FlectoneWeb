# Комманда /mute
Путь `localizations > ru_ru.yml > command.mute`

## Пояснение
Сообщения для комманды `/mute`
![command mute](/commandmute.png)

## Редактирование
```yaml
<ru_ru.command.mute>
```

### По умолчанию
```yaml
mute:
  null-player: "<color:#ff7171><b>⁉</b> Игрок не найден"
  null-time: "<color:#ff7171><b>⁉</b> Невозможное время"
  reasons:
    default: "Ты был замучен на сервере"
  server: "<color:#ff7171>🔒 <fcolor:2><moderator></fcolor> выдал мут игроку <fcolor:2><player></fcolor> <fcolor:1><hover:show_text:\"<fcolor:1>Айди: <id><br>Дата: <date><br>Время: <time><br>Осталось: <time_left><br>Модератор: <moderator><br>Причина: <reason>\">[ПОДРОБНЕЕ]</hover>"
  person: "<color:#ff7171>🔒 Ты замучен, осталось <time_left>"
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

