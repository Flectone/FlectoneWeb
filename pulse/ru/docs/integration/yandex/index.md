---
authors:
  - TheFaser
---

# Яндекс

Интеграция с Яндексом позволяет переводить сообщения с одного языка на другой, используется модулем [перевода](/docs/command/translateto#service)

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → yandex`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#yandex

<!--@include: @/parts/enable.md-->

### `token`

Токен авторизации для Яндекса [`iam_token`](https://yandex.cloud/ru/docs/translate/api-ref/authentication)

### `folder_id`

Идентификатор папки, к которой есть доступ

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.yandex`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#yandex

<!--@include: @/parts/permission/permissionTier3.md-->