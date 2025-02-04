# Стуки

Стуки создаются с помощью **ШИФТ** и **ЛКМ** по конкретному блоку

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → contact.knock`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#knock

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/cooldown.md-->

### `variants`

Список стуков с их звуком

Можно создавать свои стуки и название блока может быть неполным, а лишь содержать ключевое слово

::::: tip ПРИМЕР СТУКА ДЛЯ ВСЕХ ВИДОВ СТЕКЛА
Я напишу название `GLASS`, потому что оно встречается во всех названиях стёкл

```yaml
- type: "GLASS"
  sound:
    enable: true
    volume: 1.0
    pitch: 1.0
    category: "BLOCK"
    name: "minecraft:block.glass.place"
```
:::::

<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.contact.knock`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#knock

<!--@include: @/parts/permission/permissionTier3.md-->

### `variants`

Список стуков и их права

<!--@include: @/parts/permission/cooldown.md-->