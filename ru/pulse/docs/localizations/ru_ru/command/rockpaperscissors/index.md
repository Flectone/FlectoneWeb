# Комманда /rockpaperscissors
Путь `localizations > ru_ru.yml > command.rockpaperscissors`

## Пояснение
Сообщения для комманды `/rockpaperscissors`
![command rockpaperscissors](/commandrockpaperscissors.png)

## Редактирование
```yaml
<ru_ru.command.rockpaperscissors>
```

### По умолчанию
```yaml
rockpaperscissors:
  null-player: "<color:#ff7171><b>⁉</b> Игрок не найден"
  null-game: "<color:#ff7171><b>⁉</b> Этой игры не существует"
  wrong-move: "<color:#ff7171><b>⁉</b> Такой ход невозможен"
  already: "<color:#ff7171><b>⁉</b> Ты уже сходил"
  myself: "<color:#ff7171><b>⁉</b> Ты не можешь играть с самим собой"
  sender: "<fcolor:2>✂ <fcolor:1>Теперь ходит <display_name>"
  receiver: "<fcolor:2>✂ <display_name> <fcolor:1>предложил сыграть в камень-ножницы-бумага"
  format-move: "<fcolor:2>✂ <fcolor:1>Выбери свой ход <fcolor:2><click:run_command:\"/rps <target> rock <uuid>\">[🪨 камень]</click> <click:run_command:\"/rps <target> scissors <uuid>\">[✂ ножницы]</click> <click:run_command:\"/rps <target> paper <uuid>\">[🧻 бумага]</click>"
  format-win: "<color:#98FB98>✂ Выйграл <display_name>! <b><sender_move></b> на <b><receiver_move></b>"
  format-draw: "<color:#98FB98>✂ Ничья! Вы оба выбрали <b><move>"
  strategies:
    paper: "бумага"
    scissors: "ножницы"
    rock: "камень"
```

## Параметры

- [Комманда](/docs/command/rockpaperscissors/)
- [Права](/docs/permission/command/rockpaperscissors/)

### `null-player`

Сообщение, если введённый игрок не найден

### `null-game`

Сообщение, если игры не существует

### `wrong-move`

Сообщение при невозможном ходе

### `already`

Сообщение, если игрок уже сделал ход

### `myself`

Сообщение, если игрок решил поиграть с самим собой

### `sender`

Сообщение для отправителя

### `receiver`

Сообщение для получателя

### `format-move`

Сообщение при ходе

### `format-win`

Сообщение при победе

### `forma-draw`

Сообщение при ничье

### `strategies`

Список стратегий и их названий


