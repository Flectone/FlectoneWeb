---
authors:
  - TheFaser
  - Stokmenn
---

# Questionanswer

Module responsible for answering a player's question
![question](/questionanswer.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → message.format.question-answer`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#questionanswer
<<< @/files/localizations/en_us.yml#questionanswer
:::

### `questions`

List of questions and their corresponding answers


[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.questionanswer`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#questionanswer

<!--@include: @/parts/enable.md-->

### `questions`

List of questions with their settings

<!--@include: @/parts/range.md-->
<!--@include: @/parts/destination.md-->
<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

- ### `target`

[Regular expression](https://javarush.com/groups/posts/regulyarnye-vyrazheniya-v-java) to match the question

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.question-answer`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#questionanswer

<!--@include: @/parts/permission/permissionTier3.md-->

### `questions`

List of questions with permissions

<!--@include: @/parts/permission/sound.md-->
<!--@include: @/parts/permission/cooldown.md-->
