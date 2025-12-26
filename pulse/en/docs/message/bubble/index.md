---
authors:
  - TheFaser
  - Stokmenn
---

# Bubble

Module responsible for overhead messages  
![bubble](/bubble.gif)

Idea taken from [LightChatBubbles](https://github.com/atesin/LightChatBubbles)

### Duration Formula

```java
long duration = (countWords + handicapChars) / readSpeed * 60;
```

[//]: # (localization)
<!--@include: @/parts/words.md#localization-->  
<!--@include: @/parts/words.md#path--> `localizations → language.yml → message.bubble`  

<!--@include: @/parts/words.md#default-->  

::: code-group  
<<< @/files/localizations/ru_ru.yml#bubble  
<<< @/files/localizations/en_us.yml#bubble  
:::

### `format`

Format of the overhead message

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->  
<!--@include: @/parts/words.md#path--> `message.yml → bubble`  

<!--@include: @/parts/words.md#default-->  
<<< @/files/message.yml#bubble

<!--@include: @/parts/enable.md-->

### `max_count`

Maximum number of overhead messages displayed simultaneously

### `max_length`

Maximum length of a single overhead message. If the text is longer, it will be split into multiple parts

### `elevation`

How high overhead will the message be

### `distance`

How far away a player's overhead message can be seen

### `read_speed`

Reading speed in words per minute

### `handicap_chars`

Additional time for short messages

### `word_break_hint`

A hint symbol placed when a word breaks across two lines

### `interaction`

Allows adjusting the spacing between messages or legacy `area effect cloud` is used

::: warning WARNING
This will only be used for servers running version `1.21.3` or higher.
:::

::: details SETTING
#### `enable`

Enables functionality

#### `height`

The spacing between each message
:::

### `modern`

Overhead messages via Text Display

::: warning WARNING  
This will only be used for servers running version `1.19.4` or higher
:::

::: details CONFIGURATION
#### `enable`

Enables functionality

#### `has_shadow`

Enables text shadow

#### `see_through`

Enables text transparency against water and clouds (so you cannot see through water)

#### `scale`

Scales the size of the message

#### `background`

Background color of the message, including transparency (alpha channel) [Color picker website](https://rgbacolorpicker.com/color-wheel-picker)  

#### `billboard`

| Type           | Explanation                                                    |
|----------------|----------------------------------------------------------------|
| `FIXED`        | Position remains unchanged                                     |
| `VERTICAL`     | Position adjusts relative to the vertical axis                 |
| `HORIZONTAL`   | Position adjusts relative to the horizontal axis               |
| `CENTER`       | Position adjusts relative to both horizontal and vertical axes |
:::

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->  
<!--@include: @/parts/words.md#path--> `permission.yml → message.bubble`  

<!--@include: @/parts/words.md#default-->  
<<< @/files/permission.yml#bubble

<!--@include: @/parts/permission/permissionTier3.md-->