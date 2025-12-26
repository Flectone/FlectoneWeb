---
authors:
  - TheFaser
---

# Вопрос-Ответ

Модуль, отвечающий за ответ на вопрос игрока
![question](/questionanswer.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.format.question_answer`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#questionanswer
<<< @/files/localizations/en_us.yml#questionanswer
:::

### `questions`

Список вопросов и ответов на эти вопросы


[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.questionanswer`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#questionanswer

<!--@include: @/parts/enable.md-->

### `questions`

Список вопросов с их настройкой

<!--@include: @/parts/range.md-->
<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->
### `target`

[Регулярное выражение](https://javarush.com/groups/posts/regulyarnye-vyrazheniya-v-java) для поиска вопроса

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.question_answer`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#questionanswer

<!--@include: @/parts/permission/permissionTier3.md-->

### `questions`

Список вопросов с правами

<!--@include: @/parts/permission/sound.md-->
<!--@include: @/parts/permission/cooldown.md-->