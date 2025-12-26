---
authors:
  - TheFaser
---

# Floodgate

Интеграция с Floodgate позволяет правильно форматировать сообщения для `bedrock` игроков, когда Geyser стоит на Proxy, а сам Floodgate на конкретном сервере

[//]: # (integration.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `integration.yml → floodgate`

<!--@include: @/parts/words.md#default-->
<<< @/files/integration.yml#floodgate

<!--@include: @/parts/enable.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → integration.floodgate`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#floodgate

<!--@include: @/parts/permission/permissionTier3.md-->