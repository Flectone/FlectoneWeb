# Комманда /poll
Путь `localizations > ru_ru.yml > command.poll`

## Пояснение
Сообщения для комманды `/poll`
![command poll](/commandpoll.png)

## Редактирование
```yaml
<ru_ru.command.poll>
```

### По умолчанию
```yaml
poll:
  null-poll: "<color:#ff7171><b>⁉</b> Голосование не найдено"
  expired: "<color:#ff7171><b>⁉</b> Голосование завершено"
  already: "<color:#ff7171><b>⁉</b> Ты уже проголосовал в этом голосовании"
  vote-true: "<color:#4eff52>👍 Ты выбрал <answer_id> в голосовании #<id>. Всего таких голосов <count>"
  vote-false: "<color:#ff4e4e>🖓 Ты передумал об <answer_id> в голосовании #<id>. Всего таких голосов <count> без тебя"
  count-answers: "<color:#4eff52><bold><count></bold> за [<answer_key>] - <answer_value> <br>"
  vote-button: "<color:#4eff52><hover:show_text:\"<color:#4eff52>Проголосовать за <bold><answer_key>\"><click:run_command:\"/poll vote <id> <number>\">[<answer_key>] - <answer_value> <br>"
  format-start: "<br><color:#fce303>🗐 Создано голосование #<id> <br>❓ <message> <br><answers>"
  format-over: "<br><color:#fce303>🗐 Голосование #<id> завершено <br>❓ <message> <br>Результат: <br><answers>"
```

## Параметры

- [Комманда](/docs/command/poll/)
- [Права](/docs/permission/command/poll/)

### `null-poll`

Сообщение, если голосование не найдено

### `expired`

Сообщение, если игрок пытается проголосовать в голосовании, которое закончилось

### `already`

Сообщение, если игрок пытается проголосовать в голосовании ещё один раз

### `vote-true`

Сообщение, если игрок проголосовал за какой-то вариант

### `vote-false`

Сообщение, если игрок убрал свой голос

### `count-answers`

Формат сообщения для подсчёта голосов

### `vote-button`

Формат сообщения для голоса за какой-то вариант

### `format-start`

Форма сообщения для начала голосования

### `format-over`

Формат сообщения для конца голосования


