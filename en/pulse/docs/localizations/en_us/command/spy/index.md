# Комманда /spy
Путь `localizations > en_us.yml > command.spy`

## Пояснение
Сообщения для комманды `/spy`
![command spy](/commandspy.gif)

## Редактирование
```yaml
<en_us.command.spy>
```

### По умолчанию
```yaml
spy:
  format-true: "<fcolor:1>[👁] You <color:#98FB98>turned on <fcolor:1>spy mode"
  format-false: "<fcolor:1>[👁] You <color:#F08080>turned off <fcolor:1>spy mode"
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

