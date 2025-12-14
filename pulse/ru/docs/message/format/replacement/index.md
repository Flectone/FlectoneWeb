---
authors:
  - TheFaser
---

# Замена

Используется для замены триггеров на определённые значения

![ping](/ping.png)


![tps](/tps.png)


![online](/online.png)


![coords](/coords.png)


![stats](/stats.png)


![skin](/skin.png)


![item](/item.png)

::: warning ПРЕДУПРЕЖДЕНИЕ

`PacketEvents` в данный момент не поддерживает при наведении правильное отображение подробной информации о предмете. Предмет будет иметь "пустое" описание без зачарований. Чтобы решить эту проблему, можно включить [use_paper_message_sender](/docs/config/module/#use_paper_message_sender), но это костыль  

:::

![url](/url.png)


![image](/image.png)


![spoiler](/spoiler.png)


![bold](/bold.png)


![italic](/italic.png)


![underline](/underline.png)


![obfuscated](/obfuscated.png)


![strikethrough](/strikethrough.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → message.format.replacement`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#replacement
<<< @/files/localizations/en_us.yml#replacement
:::

### `spoiler_symbol`

Символ, который будет заменять каждую букву слов у `spoiler`

### `values`

Список сообщений, где ключом является название, а значением, что будет показано вместо триггера

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.replacement`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#replacement

<!--@include: @/parts/enable.md-->

### `triggers`

Список всех доступных триггеров, где ключом является название, а значением сам `trigger` в формате регулярного выражения

::: warning ПРЕДУПРЕЖДЕНИЕ

Если ты добавляшеь новый триггер, то обязательно добавь его также и в файл локализации, т.е. на что он будет заменяться

:::

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.replacement`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#replacement

<!--@include: @/parts/permission/permissionTier3.md-->