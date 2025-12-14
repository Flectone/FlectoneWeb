---
authors:
  - TheFaser
---

# Delete

This formatting replaces `<delete>` and allows deleting messages in chat  
![delete](/delete.gif)

::: warning WARNING

With a large number of players, it may cause slightly higher memory usage due to message storage. Rough estimates: 100 players = 5-10 MB

:::

::: warning WARNING

This module is incompatible with the InteractiveChat plugin

:::

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → message.format.moderation.delete`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#delete
<<< @/files/localizations/en_us.yml#delete
:::

### `placeholder`

Placeholder that replaces each `<delete>` if the player has permission to delete messages (otherwise remains empty)

### `format`

Message format that will be sent upon deletion

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format.moderation.delete`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#delete

<!--@include: @/parts/enable.md-->

### `history_length`

The maximum number of messages stored in each player's chat history

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format.moderation.delete`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#delete

<!--@include: @/parts/permission/permissionTier3.md-->
