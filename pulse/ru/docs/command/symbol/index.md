---
authors:
  - TheFaser
---

# `/symbol`

Комманда для поиска unicode символа
![symbol](/commandsymbol.png)

Огромное спасибо @replaceitem за право использования [списками](https://github.com/replaceitem/symbol-chat) символов

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → command.symbol`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#symbol
<<< @/files/localizations/en_us.yml#symbol
:::

### `null_category`

Сообщение, если введённая категория не существует

### `null_page`

Сообщение, если введённая страница не существует

### `header`

Верхняя часть сообщения списка

### `line_element`

Формат для каждого компонента, они будут добавляться друг за другом

#### `footer`

Нижняя часть сообщения списка

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → symbol`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#symbol

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/perPage.md-->
<!--@include: @/parts/aliases.md-->

### `categories`

Список категорий и символов разделённых пробелами

::: info ЧТО МОЖНО С ЭТИМ ДЕЛАТЬ?
1. Добавлять свои символы к уже текущим через пробел
2. Переименовывать категории или добавлять свои
:::

<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.symbol`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#symbol

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->

