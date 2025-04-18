---
authors:
  - TheFaser
  - Stokmenn
---

# Yandex

Integration with Yandex allows translating messages from one language to another

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → yandex`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#yandex

<!--@include: @/parts/enable.md-->

### `token`

Authorization token for Yandex [`iam-token`](https://yandex.cloud/ru/docs/translate/api-ref/authentication)

### `folder-id`

Folder ID with access

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.yandex`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#yandex

<!--@include: @/parts/permission/permissionTier3.md-->