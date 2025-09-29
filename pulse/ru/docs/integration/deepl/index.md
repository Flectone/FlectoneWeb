---
authors:
  - TheFaser
---

# Deepl

Интеграция с Deepl позволяет переводить сообщения с одного языка на другой, используется модулем [перевода](/docs/command/translateto#service)

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → deepl`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#deepl

<!--@include: @/parts/enable.md-->

### `auth_key`

Токен авторизации для Deepl

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.deepl`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#deepl

<!--@include: @/parts/permission/permissionTier3.md-->