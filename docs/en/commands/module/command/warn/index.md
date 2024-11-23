# Комманда /warn
Путь `commands.yml > module.command.warn`

## Пояснение
Комманда для того, чтобы дать предупреждение игроку
![command warn](/commandwarn.png)

## Редактирование
```yaml
<commands.module.command.warn>
```

### По умолчанию
```yaml
warn:
  enable: true
  suggest-offline-players: true
  range: -2
  aliases:
    - "warn"
  actions:
    2: "mute <target> 1h"
    3: "ban <target> 1h"
    5: "ban <target>"
  cooldown:
    enable: false
    duration: 60
  sound:
    enable: false
    type: "BLOCK_NOTE_BLOCK_BELL:1:1"
```

## Параметры

- [Сообщения](/en/messages/ru_ru/module/command/warn/)
- [Права](/en/permissions/module/command/warn/)

### `enable`
- По умолчанию `true`

Включает или выключает работоспособность модуля

### `suggest-offline-players`
- По умолчанию `true`

Если включено, то подсказывает все ники игроков, кто был на сервере, иначе только ники игроков, которые в сети
::: tip ИНФОРМАЦИЯ
Это влияет только на подсказку текста
:::

### `range`
- По умолчанию `-2`

[Диапазон](#виды-диапазонов), насколько далеко в блоках отобразится сообщение

### `aliases`
- По умолчанию `warn`

Список псевдонимов для использования комманды

::: tip Псевдонимы могут быть любыми
Например `newwarn`, `варн` и т.д.
:::

### `actions`
- По умолчанию:
```yaml
5: "ban <target>"
3: "ban <target> 1h"
2: "mute <target> 1h"
```

Список, где ключом является `количество` предупреждений и значением `действие`, которое должно выполниться

::: tip Например я хочу, чтобы при `10` варнов игрока банило
Тогда я должен вписать `10: ban <target> ohh`. Действие выполнится если у игрока будет `10` активных предупреждений
:::

### `cooldown`
- По умолчанию `false`

Включает задержку для игрока между использованиями

::: details Настройка задержки
#### `duration: 60`

Сколько должно пройти [тиков](https://ru.minecraft.wiki/w/%D0%A2%D0%B0%D0%BA%D1%82) между использованиями
:::

### `sound`
- По умолчанию `false`

Включает проигрывание звука при использовании

::: details Настройка звука
#### `type`
- По умолчанию `BLOCK_NOTE_BLOCK_BELL:1:1`

Определяет тип (`BLOCK_NOTE_BLOCK_BELL`), громкость (`1`) и тональность (`1`) звука через `:`
:::

<!--@include: @/en/parts/range.md-->