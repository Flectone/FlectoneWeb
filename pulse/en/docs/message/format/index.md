---
authors:
  - TheFaser
  - Stokmenn
---

# Format

The module responsible for formatting sent messages

[//]: # (message.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `message.yml → format`

<!--@include: @/parts/words.md#default-->
<<< @/files/message.yml#format

<!--@include: @/parts/enable.md-->

### `convert_legacy_color`

Enables formatting of legacy colors

<!--@include: @/parts/legacyColors.md-->

### `adventure_tags`

These are [Kyori tags](https://docs.advntr.dev/minimessage/format.html#standard-tags) that may appear in messages.

| Tag                       | Usage                                                                        | Description                                                                                  |
|---------------------------|------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| `<hover>`                 | [Hover](https://docs.advntr.dev/minimessage/format.html#hover)               | Text displayed when hovering over                                                            |
| `<click>`                 | [Click](https://docs.advntr.dev/minimessage/format.html#click)               | Action triggered when clicked                                                                |
| `<color>`                 | [Color](https://docs.advntr.dev/minimessage/format.html#color)               | Color                                                                                        |
| `<keybind>`               | [Keybind](https://docs.advntr.dev/minimessage/format.html#keybind)           | Key setup for the message                                                                    |
| `<translatable>`          | [Translatable](https://docs.advntr.dev/minimessage/format.html#translatable) | Message using the player's locale                                                            |
| `<translatable_fallback>` | [Translatable](https://docs.advntr.dev/minimessage/format.html#translatable) | Message with fallback translation using the player's locale                                  |
| `<insertion>`             | [Insertion](https://docs.advntr.dev/minimessage/format.html#insertion)       | Text insertion in chat with SHIFT                                                            |
| `<font>`                  | [Font](https://docs.advntr.dev/minimessage/format.html#font)                 | Change font for text                                                                         |
| `<decoration>`            | [Decoration](https://docs.advntr.dev/minimessage/format.html#decoration)     | Standard Minecraft decorations `bold`, `italic`, `underlined`, `strikethrough`, `obfuscated` |
| `<gradient>`              | [Gradient](https://docs.advntr.dev/minimessage/format.html#gradient)         | Gradient text color                                                                          |
| `<rainbow>`               | [Rainbow](https://docs.advntr.dev/minimessage/format.html#rainbow)           | Rainbow-colored text                                                                         |
| `<reset>`                 | [Reset](https://docs.advntr.dev/minimessage/format.html#reset)               | Reset all tags and decorations                                                               |
| `<newline>`               | [Newline](https://docs.advntr.dev/minimessage/format.html#newline)           | Newline, replaces `\n`                                                                       |
| `<transition>`            | [Transition](https://docs.advntr.dev/minimessage/format.html#transition)     | Transition between two colors                                                                |
| `<selector>`              | [Selector](https://docs.advntr.dev/minimessage/format.html#selector)         | Mob selector                                                                                 |
| `<score>`                 | [Score](https://docs.advntr.dev/minimessage/format.html#score)               | Team score (scoreboard)                                                                      |
| `<nbt>`                   | [NBT](https://docs.advntr.dev/minimessage/format.html#nbt)                   | Insertion of NBT component                                                                   |
| ...                       | ...                                                                          | ...                                                                                          |

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → message.format`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#format

<!--@include: @/parts/permission/permissionTier3.md-->

### `legacy_colors`

This allows player to use legacy colors in their messages

<!--@include: @/parts/legacyColors.md-->  

::: tip NOTE

If you need player's chat colors to be formatted, use `flectonepulse.module.message.format.color`

:::

### `adventure_tags`

List of tags and their respective permissions
