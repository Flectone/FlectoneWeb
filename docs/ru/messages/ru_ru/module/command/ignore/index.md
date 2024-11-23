# Комманда /ignore
Путь `messages > ru_ru.yml > module.command.ignore`

## Пояснение
Сообщения для комманды `/ignore`
![command ignore](/commandignore.png)

## Редактирование
```yaml
<ru_ru.module.command.ignore>
```

### По умолчанию
```yaml
ignore:
  null-player: "<color:#ff7171><b>⁉</b> Игрок не найден"
  myself: "<color:#ff7171><b>⁉</b> Нельзя игнорировать самого себя"
  he: "<color:#ff7171><b>⁉</b> Он тебя игнорирует"
  you: "<color:#ff7171><b>⁉</b> Ты его игнорируешь"
  format-true: "<color:#ff7171>☹ Ты игнорируешь <display_name>"
  format-false: "<color:#98FB98>☺ Ты перестал игнорировать <display_name>"
```

## Параметры

- [Комманда](/ru/commands/module/command/ignore/)
- [Права](/ru/permissions/module/command/ignore/)

### `null-player`
- По умолчанию `<color:#ff7171><b>⁉</b> Игрок не найден`

Сообщение, если введённый игрок не найден

### `myself`
- По умолчанию `<color:#ff7171><b>⁉</b> Нельзя игнорировать самого себя`

Сообщение, если игрок пытается игнорировать самого себя

### `he`
- По умолчанию `<color:#ff7171><b>⁉</b> Он тебя игнорирует`

Сообщение, если получатель игнорирует отправителя

### `you`
- По умолчанию `<color:#ff7171><b>⁉</b> Ты его игнорируешь`

Сообщение, если отправитель игнорирует получателя

### `format-true`
- По умолчанию `<color:#ff7171>☹ Ты игнорируешь <display_name>`

Сообщение при успешном игнорировании

### `format-false`
- По умолчанию `<color:#98FB98>☺ Ты перестал игнорировать <display_name>`

Сообщение при снятии игнорирования
