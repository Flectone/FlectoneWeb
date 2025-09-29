---
order: 25
authors:
  - TheFaser
---

# Логгер

Настройка всего, что связано с консолью и логами

::: warning ПРЕДУПРЕЖДЕНИЕ
Здесь используются `ANSI` цвета для сообщений, обычные цвета не будут работать
:::

[//]: # (config.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `config.yml → logger`

<!--@include: @/parts/words.md#default-->
<<< @/files/config.yml#logger

### `console`

Используется для отображения имени, когда сообщения создано консолью
![console](/console.gif)

### `prefix`

Префикс у всех сообщений, которые пишет `FlectonePulse` в консоль

### `description`

Сообщение при успешном старте, `<version>` заменится на текущую версию `FlectonePulse`

### `warn`

Цвет для сообщений с предупреждением

### `info`

Цвет для сообщений с информацией

### `filter`

Идея взята [отсюда](https://github.com/Whitescan/ConsoleFilter/blob/master/src/main/java/dev/whitescan/consolefilter/share/LogFilter.java), спасибо @Whitescan

Списком указываются сообщения, которые нужно не показывать, используя ключевые слова, встречающиеся в сообщении

::: info НАПРИМЕР Я ХОЧУ ОТФИЛЬТРОВАТЬ
![filter](/filter.png)

Значит нужно вписать:
`Unknown or incomplete command` или `command` или `Unknown`
:::