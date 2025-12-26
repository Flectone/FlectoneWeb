### `destination`

::::: details Where the message will be sent

| Type           | Explanation                                      | Requires additional setup? |
|----------------|--------------------------------------------------|----------------------------|
| `ACTION_BAR`   | Message above the player's inventory             | Yes                        |
| `BOSS_BAR`     | Message at the top of the screen                 | Yes                        |
| `BRAND`        | Message in the F3 menu                           | No                         |
| `CHAT`         | Message in the chat                              | No                         |
| `TEXT_SCREEN`  | Message anywhere on the screen                   | Yes                        |
| `TITLE`        | Full-screen message                              | Yes                        |
| `SUBTITLE`     | Full-screen message (bottom line)                | Yes                        |
| `TAB_HEADER`   | Message in the TAB list (top)                    | No                         |
| `TAB_FOOTER`   | Message in the TAB list (bottom)                 | No                         |
| `TOAST`        | Message in the top right corner (achievement)    | Yes                        |

To change this, replace the value `type: here` and restart `FlectonePulse` using the command `/flectonepulse reload`. Additional settings will appear AUTOMATICALLY.

<hr>

#### <b>`ACTION_BAR`</b>
![action bar](/destinationaction_bar.png)

```yaml
destination:
  type: "ACTION_BAR"
  times:
    stay: 60
```

#### - `times`

| Field    | Explanation                               |
|----------|-------------------------------------------|
| `stay`   | Time in ticks to keep the message visible |

<hr>

#### <b>`BOSS_BAR`</b>

![action bar](/destinationboss_bar.png)

```yaml
destination:
  type: "BOSS_BAR"
  duration: 100
  health: 1.0
  overlay: "PROGRESS"
  color: "BLUE"
  play_boos_music: false
  create_world_fog: false
  darken_screen: false
```

#### - `duration`

Duration for displaying the message.

#### - `health`

How full the boss bar will be.

#### - `overlay`

| Type          | Explanation                     |
|---------------|---------------------------------|
| `PROGRESS`    | A single line                   |
| `NOTCHED_6`   | Divided into 6 parts            |
| `NOTCHED_10`  | Divided into 10 parts           |
| `NOTCHED_12`  | Divided into 12 parts           |
| `NOTCHED_20`  | Divided into 20 parts           |

#### - `color`

Display color.

| Type     |
|----------|
| `PINK`   |
| `BLUE`   |
| `RED`    |
| `GREEN`  |
| `YELLOW` |
| `PURPLE` |
| `WHITE`  |

#### - `play_boos_music`

Whether to play boss music with the message

#### - `create_world_fog`

Whether to create world fog with the message

#### - `darken_screen`

Whether to darken the screen with the message

<hr>

#### <b>`TEXT_SCREEN`</b>
![text screen](/destinationtext_screen.png)

::: warning WARNING

This only works on version 1.19.4 and above. On older versions, `CHAT` will be used instead

:::

```yaml
destination:
  type: "TEXT_SCREEN"
  background: "#00000040"
  has_shadow: false
  animation_time: 2
  live_time: 10
  width: 100000
  scale: 0.5
  offset_x: 0.0
  offset_y: -0.3
  offset_z: -0.8
```

#### - `background`

The background color of the message, which includes transparency (alpha channel). [Website for choosing a color](https://rgbacolorpicker.com/color-wheel-picker)

#### - `has_shadow`

Enables text shadow.

#### - `animation_time`

Time in seconds for the appearance and disappearance animations. If set to 0 or less, there will be no animation

#### - `live_time`

Time in seconds for the text to be displayed. If set to 0 or less, the text won't appear

#### - `width`

Text length per line in pixels. If the text is longer, it will wrap to the next line

#### - `scale`

Text size. If negative, the text will be flipped

#### - `offset_x`

Offset along the X coordinate (right +, left -) relative to the center of the player's screen

#### - `offset_y`

Offset along the Y coordinate (up +, down -) relative to the center of the player's screen

#### - `offset_z`

Offset along the Z coordinate (forward +, backward -) relative to the center of the player's screen

<hr>

#### <b>`TITLE`</b> (or <b>`SUBTITLE`</b>)
![title](/destinationtitle.png)

```yaml
destination:
  type: "TITLE" (or "SUBTITLE")
  subtext: ""
  times:
    fade_in: 20
    stay: 60
    fade_out: 20
```

#### - `subtext`

Message for the second part of the display. For example, if `TITLE` is selected, `subtext` will be shown below it, and vice versa

#### - `times`

| Field      | Explanation                                 |
|------------|---------------------------------------------|
| `fade_in`  | Time in ticks for the message to appear     |
| `stay`     | Time in ticks to keep the message visible   |
| `fade_out` | Time in ticks for the message to disappear  |

<hr>

#### <b>`TOAST`</b>
![toast](/destinationtoast.png)
```yaml
destination:
  type: "TOAST"
  icon: "minecraft:diamond"
  style: "TASK"
```

#### - `icon`

Achievement icon, which can be any Minecraft item (must specify the full path)

#### - `style`

Achievement type (`TASK` regular, `GOAL` goal, `CHALLENGE` challenge)

:::::