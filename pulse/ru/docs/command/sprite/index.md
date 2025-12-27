---
authors:
  - TheFaser
---

# `/sprite`

Комманда для поиска спрайтов из атласов майнкрафта
![sprite](/commandsprite.png)

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → язык.yml → command.sprite`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#sprite
<<< @/files/localizations/en_us.yml#sprite
:::

### `null_atlas`

Сообщение, если введённый атлас не существует

### `null_page`

Сообщение, если введённая страница не существует

### `download_error`

Сообщение при неудачной загрузки файла атласа из интернета. На разных версиях атласы могут отличаться и не существовать, поэтому ошибку нужно воспринимать нормально

### `atlas_downloading`

Сообщение при начале загрузки файла атласа из интернета

### `header`

Верхняя часть сообщения списка

### `line_element`

Формат для каждого компонента, они будут добавляться друг за другом

#### `footer`

Нижняя часть сообщения списка

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml → sprite`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#sprite

<!--@include: @/parts/enable.md-->
<!--@include: @/parts/perPage.md-->
<!--@include: @/parts/aliases.md-->

### `categories`

Список категорий т.е. доступных атласов

::: info ИНФОРМАЦИЯ
- Каждый атлас скачивается только один раз, если он не существует в папке `FlectonePulse/minecraft/<version>/atlases/`
- Каждый атлас имеет итоговый формат `minecraft_textures_atlas_<atlas>.png.txt`
- Каждый атлас скачивается с собственного веб-сервера Flectone по ссылке `https://flectone.net/files/r/minecraft/<version>/atlases/minecraft_textures_atlas_<atlas>.png.txt`
- Атласы необязательно скачивать с веб-сервера, ты можешь их поместить заранее сам в папку `FlectonePulse/minecraft/<version>/atlases/`, получив их с помощью комбинации `F3 + S` в майнкрафте
:::

<!--@include: @/parts/cooldown.md-->
<!--@include: @/parts/sound.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command.sprite`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#sprite

<!--@include: @/parts/permission/permissionTier3.md-->
<!--@include: @/parts/permission/cooldown.md-->
<!--@include: @/parts/permission/sound.md-->