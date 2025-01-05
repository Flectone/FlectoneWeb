# Комманда /translateto
Путь `localizations > en_us.yml > command.translateto`

## Пояснение
Сообщения для комманды `/translateto`
![command translateto](/commandtranslateto.png)

## Редактирование
```yaml
<en_us.command.translateto>
```

### По умолчанию
```yaml
translateto:
  null-or-error: "<color:#ff7171><b>⁉</b> Error, you may have specified an unsupported language"
  format: "<fcolor:1>📖 [<language>] <display_name> translated → <fcolor:2><message>"
```

## Параметры

- [Комманда](/docs/command/translateto/)
- [Права](/docs/permission/command/translateto/)

### `null-or-error`

Сообщение, если произошла ошибка при переводе

### `format`

Формат сообщения, которое будет отправлено

