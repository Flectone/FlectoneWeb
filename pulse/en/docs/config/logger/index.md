---
order: 25
authors:
- TheFaser
---

# Logger

Configuration for everything related to console and logs

::: warning WARNING
This uses `ANSI` colors for messages, regular colors won't work
:::

[//]: # (config.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `config.yml → logger`

<!--@include: @/parts/words.md#default-->
<<< @/files/config.yml#logger

### `console`

Used to display the name when a message is created by the console
![console](/console.gif)

### `prefix`

Prefix for all messages written by `FlectonePulse` to the console

### `description`

Message on successful startup, `<version>` will be replaced with the current version of `FlectonePulse`

### `warn`

Color for warning messages

### `info`

Color for information messages

### `filter`

Idea taken [from here](https://github.com/Whitescan/ConsoleFilter/blob/master/src/main/java/dev/whitescan/consolefilter/share/LogFilter.java), thanks @Whitescan

List of messages that should not be shown, using keywords found in the message

::: info EXAMPLE I WANT TO FILTER
![filter](/filter.png)

So need to write:
`Unknown or incomplete command` or `command` or `Unknown`
:::