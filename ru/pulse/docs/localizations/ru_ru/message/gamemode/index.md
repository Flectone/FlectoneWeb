# Режим игры
Путь `localizations > ru_ru.yml > message.gamemode`

## Пояснение
Сообщение при использовании `/gamemode`
![gamemode](/gamemode.png)

## Редактирование
```yaml
<ru_ru.message.gamemode>
```

### По умолчанию
```yaml
gamemode:
  self:
    creative: "<fcolor:1>🗘 Твой режим игры изменён на <fcolor:2>Творческий режим"
    survival: "<fcolor:1>🗘 Твой режим игры изменён на <fcolor:2>Режим выживания"
    adventure: "<fcolor:1>🗘 Твой режим игры изменён на <fcolor:2>Режим приключения"
    spectator: "<fcolor:1>🗘 Твой режим игры изменён на <fcolor:2>Режим наблюдателя"
  other:
    creative: "<fcolor:1>🗘 Режим игры игрока <display_name> изменён на <fcolor:2>Творческий режим"
    survival: "<fcolor:1>🗘 Режим игры игрока <display_name> изменён на <fcolor:2>Режим выживания"
    adventure: "<fcolor:1>🗘 Режим игры игрока <display_name> изменён на <fcolor:2>Режим приключения"
    spectator: "<fcolor:1>🗘 Режим игры игрока <display_name> изменён на <fcolor:2>Режим наблюдателя"
```

## Параметры

- [Сообщения](/docs/message/gamemode/)
- [Права](/docs/permission/message/gamemode/)

### `self`

Сообщение при смене режима игры самому себе или получателю, когда его режим изменён

### `multiple`

Сообщение при смене режима игры другому игроку