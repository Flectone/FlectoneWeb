# Комманда /spy
Путь `localizations > ru_ru.yml > command.spy`

## Пояснение
Сообщения для комманды `/spy`
![command spy](/commandspy.gif)

## Редактирование
```yaml
<ru_ru.command.spy>
```

### По умолчанию
```yaml
spy:
  format-true: "<fcolor:1>[👁] Ты <color:#98FB98>включил <fcolor:1>слежку"
  format-false: "<fcolor:1>[👁] Ты <color:#F08080>выключил <fcolor:1>слежку"
  format-log: "<fcolor:1>[👁] <display_name> <color:#98FB98><action> <fcolor:1>→ <fcolor:2><message>"
```

## Параметры

- [Комманда](/docs/command/spy/)
- [Права](/docs/permission/command/spy/)

### `format-true`

Сообщение при включении слежки

### `format-false`

Сообщение при выключении слежки

### `format-log`

Формат сообщения, которое будет отправлено при слежке за действием

