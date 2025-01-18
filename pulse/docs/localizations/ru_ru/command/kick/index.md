# Комманда /kick
Путь `localizations > ru_ru.yml > command.kick`

## Пояснение
Сообщения для комманды `/kick`
![command kick](/commandkick.png)

## Редактирование
```yaml
<ru_ru.command.kick>
```

### По умолчанию
```yaml
kick:
  null-player: "<color:#ff7171><b>⁉</b> Игрок не найден"
  reasons:
    default: "Исключён модератором"
  server: "<color:#ff7171>🔒 <fcolor:2><moderator></fcolor> исключил <fcolor:2><player></fcolor> <fcolor:1><hover:show_text:\"<fcolor:1>Айди: <id><br>Дата: <date><br>Модератор: <moderator><br>Причина: <reason>\">[ПОДРОБНЕЕ]</hover>"
  person: "<color:#ff7171>🔒 КИК 🔒 <fcolor:1><br><br>Айди: <id><br><br>Дата: <date><br><br>Модератор: <moderator><br><br>Причина: <reason>"
```

## Параметры

- [Комманда](/docs/command/kick/)
- [Права](/docs/permission/command/kick/)

### `null-player`

Сообщение, если введённый игрок не найден

#### `reasons`

Список с ключами и значениями, где ключом является слово, а значением конкретная причина

::: tip Можно вписывать свои причины, например
```yaml
random_kek: "Random reason"
```
Тогда если я напишу `/kick player random_kek`, то причиной будет `Random reason`

Если причина не указана, будет использоваться `default`

:::

### `server`

Сообщение для всех

### `person`

Сообщение для игрока

