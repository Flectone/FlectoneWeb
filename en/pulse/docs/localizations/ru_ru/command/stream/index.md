# Комманда /stream
Путь `localizations > ru_ru.yml > command.stream`

## Пояснение
Сообщения для комманды `/stream`
![command stream](/commandstream.png)

## Редактирование
```yaml
<ru_ru.command.stream>
```

### По умолчанию
```yaml
stream:
  already: "<color:#ff7171><b>⁉</b> Ты уже включил трансляцию"
  not: "<color:#ff7171><b>⁉</b> Ты не включил трансляцию"
  prefix-true: "<color:#ff4e4e>⏻</color:#ff4e4e> "
  prefix-false: ""
  url-tag: "<fcolor:2><click:open_url:\"<url>\"><hover:show_text:\"<fcolor:2><url>\"><url></hover></click>"
  format-start: "<br><color:#ff4e4e>🔔 <fcolor:1>Объявление <color:#ff4e4e>🔔<br><fcolor:1><display_name> начал трансляцию<br><urls><br>"
  format-end: "<fcolor:2>★ Спасибо за трансляцию на нашем сервере!"
```

## Параметры

- [Комманда](/docs/command/stream/)
- [Права](/docs/permission/command/stream/)

### `already`

Сообщение, если игрок, который ведёт трансляцию, пытается запустить ещё одну трансляцию

### `not`

Сообщение, если игрок, который не ведёт трансляцию, пытается закончить трансляцию

### `prefix-true`

Префикс игрока, который в данный момент ведёт трансляцию

### `prefix-false`

Префикс игрока, который имеет право вести трансляцию, но в данный момент не ведёт её

### `url-tag`

Формат каждой ссылки в оповещении

### `format-start`

Оповещение о начале трансляции

### `format-end`

Сообщение, если игрок закончил трансляцию
