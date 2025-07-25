### `destination`

Куда будет отправлено сообщение

| Тип          | Пояснение                                    | Требует дополнительной настройки? |
|--------------|----------------------------------------------|-----------------------------------|
| `ACTION_BAR` | Сообщение над инвентарём игрока              | Да                                |
| `BOSS_BAR`   | Сообщение в верхней части экрана             | Да                                |
| `BRAND`      | Сообщение в F3                               | Нет                               |
| `CHAT`       | Сообщение в чат                              | Нет                               |
| `TITLE`      | Сообщение на весь экран                      | Да                                |
| `SUBTITLE`   | Сообщение на весь экран (нижняя строчка)     | Да                                |
| `TAB_HEADER` | Сообщение в ТАБ (сверху)                     | Нет                               |
| `TAB_FOOTER` | Сообщение в ТАБ (снизу)                      | Нет                               |
| `TOAST`      | Сообщение в правом верхнем углу (достижение) | Да                                |

::: info КАК ПОМЕНЯТЬ НАЗНАЧЕНИЕ?
Замени значение `type: сюды` и перезапусти `FlectonePulse` с помощью комманды `/flectonepulse reload`, дополнительные настройки появятся САМИ

<hr>

#### Если тип <b>`ACTION_BAR`</b>
```yaml
destination:
  type: ACTION_BAR
  times:
    stay: 60
```

#### - `times`

| Поле       | Пояснение                            |
|------------|--------------------------------------|
| `stay`     | Время в тиках на удержание сообщения |

<hr>

#### Если тип <b>`BOSS_BAR`</b>

```yaml
destination:
  type: BOSS_BAR
  duration: 100
  health: 1.0
  overlay: PROGRESS
  color: BLUE
  play-boos-music: false
  create-world-fog: false
  darken-screen: false
```

#### - `duration`

Длительность отображения сообщения

#### - `health`

Насколько будет заполнена шкала босс бара

#### - `overlay`

| Тип          | Пояснение                |
|--------------|--------------------------|
| `PROGRESS`   | Одной линией             |
| `NOTCHED_6`  | Разделённое на 6 частей  |
| `NOTCHED_10` | Разделённое на 10 частей |
| `NOTCHED_12` | Разделённое на 12 частей |
| `NOTCHED_20` | Разделённое на 20 частей |

#### - `color`

Цвет отображения

| Тип      |
|----------|
| `PINK`   |
| `BLUE`   |
| `RED`    |
| `GREEN`  |
| `YELLOW` |
| `PURPLE` |
| `WHITE`  |

#### - `play-boos-music`

Будет ли музыка при сообщении

#### - `create-world-fog`

Будет ли туман при сообщении

#### - `darken-screen`

Будет ли затемнён экран при сообщении

<hr>

#### Если тип <b>`TITLE`</b> (или <b>`SUBTITLE`</b>)
```yaml
destination:
  type: TITLE (или SUBTITLE)
  subtext: ""
  times:
    fade-in: 20
    stay: 60
    fade-out: 20
```

#### - `subtext`

Сообщение для второй части отображения. Например, если выбран `TITLE`, то `subtext` будет показываться под ним и наоборот

#### - `times`

| Поле       | Пояснение                            |
|------------|--------------------------------------|
| `fade-in`  | Время в тиках на появление сообщения |
| `stay`     | Время в тиках на удержание сообщения |
| `fade-out` | Время в тиках на удаления сообщения  |

<hr>

#### Если тип <b>`TOAST`</b>
```yaml
destination:
  type: TOAST
  icon: "minecraft:diamond"
  style: TASK
```

#### - `icon`

Аватарка достижения, которая может быть любым предметом из майнкрафта (нужно обязательно указывать полный путь)

#### - `style`

Вид достижения (`TASK` обычное, `GOAL` цель, `CHALLENGE` челлендж)

:::