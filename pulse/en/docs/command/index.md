---
authors:
  - TheFaser
  - Stokmenn
---

# Commands

Category responsible for configuring all commands

[//]: # (localization)
<!--@include: @/parts/words.md#localization--> 
<!--@include: @/parts/words.md#path--> `localizations → locale.yml → command`

<!--@include: @/parts/words.md#default--> 

::: code-group
<<< @/files/localizations/ru_ru.yml#command
<<< @/files/localizations/en_us.yml#command
:::

### `exception`

::: details Messages for incorrect command usage

#### `execution`

Message if an error occurs during command execution

#### `parse-unknown`

Message if an unknown argument is entered

#### `parse-boolean`

Message if a `boolean` argument is expected

#### `parse-number`

Message if a `number` argument is expected

#### `parse-string`

Message if a `string` argument is expected

#### `permission`

Message if the player doesn't have permission for this command

#### `syntax`

Message if an incomplete command is entered
![command syntax](/commandsyntax.png)

:::

### `prompt`

::: details Prompt formatting

#### `message`

Prompt for commands where a message is entered

#### `hard`

Prompt for commands where difficulty is asked

#### `accept`

Prompt for commands where something is accepted or rejected

#### `turn`

Prompt for commands where something is toggled on or off

#### `type`

Prompt for commands where a type is entered

#### `reason`

Prompt for commands where a reason is entered

#### `category`

Prompt for commands where a category is selected

#### `id`

Prompt for commands where an ID is entered

#### `time`

Prompt for commands where time is entered

#### `repeat-time`

Prompt for commands where repeat time is entered

#### `multiple-vote`

Prompt for commands where multiple voting is asked

#### `player`

Prompt for commands where a player is entered

#### `number`

Prompt for commands where a number is entered

#### `color`

Prompt for commands where a color is entered

#### `language`

Prompt for commands where a language is entered

#### `url`

Prompt for commands where a URL is entered

#### `move`

Prompt for commands where a move is selected
:::

[//]: # (command.yml)
<!--@include: @/parts/words.md#setting-->
<!--@include: @/parts/words.md#path--> `command.yml`

<!--@include: @/parts/words.md#default-->
<<< @/files/command.yml#command

<!--@include: @/parts/enable.md-->

[//]: # (permission.yml)
<!--@include: @/parts/words.md#permission-->
<!--@include: @/parts/words.md#path--> `permission.yml → command`

<!--@include: @/parts/words.md#default-->
<<< @/files/permission.yml#command

<!--@include: @/parts/permission/permissionTier3.md-->