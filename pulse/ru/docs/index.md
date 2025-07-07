---
title: "Документация"
authors:
  - TheFaser
---

<div class="center-row" align="center">
    <a href="https://flectone.net/pulse/"><img src="https://flectone.net/pulse/flectonepulse.png" alt="flectone" class="hover-brightness"></a>
    <br>
    <h1> FlectonePulse — документация </h1>
    <p>Полное руководство по настройке и использованию FlectonePulse</p>
</div>

## Часто задаваемые вопросы (FAQ)

### 1. Что такое FlectonePulse и для чего он нужен?
FlectonePulse — это плагин для серверов Minecraft, который позволяет полностью настраивать сообщения, чат, команды и интеграции. Он поддерживает все популярные платформы (Bukkit, Spigot, Paper, Purpur, Folia, BungeeCord, Velocity) и предоставляет гибкую систему форматирования текста, автоматическое определение языка игроков и интеграции с Discord, Telegram и Twitch.

### 2. Как установить FlectonePulse?
1. Скачайте плагин с [Modrinth](https://modrinth.com/plugin/flectonepulse).
2. Поместите файл плагина в папку `plugins` вашего сервера.
3. Перезапустите сервер.
4. Настройте конфигурацию в файлах.

| Файл                | Ссылка на документацию                                                         | Объяснение                                                                                                                                                                                    |
|---------------------|--------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `config.yml`        | [Конфигурация](/docs/config/)                                                  | Основная конфигурация FlectonePulse, без которой невозможна правильная работа. Здесь настраиваются база данных, язык плагина, режим прокси и т.д.                                              |
| `command.yml`       | [Команды](/docs/command/)                                                      | Настройка всех **собственных** команд. Их можно использовать, набрав в Minecraft `/flectonepulse:название`.                                                                                     |
| `integration.yml`   | [Интеграции](/docs/integration/)                                               | Настройка взаимодействий с внешними плагинами и сервисами.                                                                                                                                     |
| `message.yml`       | [Сообщения](/docs/message/)                                                    | Настройка сообщений FlectonePulse (условия их появления и содержание).<br/> **Не путать с настройкой формата сообщений**, которая выполняется в файлах `/localizations/...`.                     |
| `localizations/...` | Указано в каждом пункте документации команд и сообщений                        | В этой папке находятся файлы с настройками для каждого языка игроков ([см. язык](/docs/config/#language)). Здесь настраивается **формат** сообщений, т.е. текст.                              |
| `permission.yml`    | Указано в каждом пункте документации команд, сообщений и интеграций            | Настройка прав доступа. По умолчанию права настроены так, чтобы большинство функций были доступны всем игрокам без необходимости дополнительной настройки.                                     |

### 3. Как настроить форматирование сообщений?
FlectonePulse обладает универсальной системой форматирования текста, поддерживающей различные цветовые форматы — от классических кодов до современных градиентов.

| **Входной цвет**                                      | **Преобразуется в**                                         |  
|-------------------------------------------------------|-------------------------------------------------------------|  
| `&0`-`&9`, `&a`-`&f`                                  | `<black>`, `<dark_blue>` ... `<white>`                      |  
| `&l`/`&m`/`&n`/`&o`/`&k`/`&r`                         | `<b>` / `<st>` / `<u>` / `<i>` / `<obf>` / `<reset>`        |  
| `&#rrggbb`, `#rrggbb`, `&x&r&r&g&g&b&b`, `<##rrggbb>` | `<#rrggbb>`                                                |
| Теги MiniMessage                                      | `<color:#rrggbb>`, `<rainbow>`, `<click:...>`, `<font>` и др. |

*Для гибкости вы можете использовать `&` или `§` как взаимозаменяемые символы.*

```yaml
welcome-message: "<gradient:#FF0000:#00FF00>&lПривет</gradient> <rainbow><player></rainbow>!"
```

![welcome message](/welcomemessage.png)

### 4. Можно ли отключить определённые функции плагина?
Да, FlectonePulse использует модульную систему. Любую функцию (команды, сообщения или интеграции) можно отключить в файлах `command.yml`, `message.yml` или `integration.yml` соответственно. После внесения изменений перезапустите плагин командой `/flectonepulse reload`.

### 5. Как работает автоматическое определение языка?
Если в `config.yml` включена опция `language-player`, плагин автоматически определяет язык Minecraft игрока и отображает сообщения из папки `localizations/...` на этом языке. Если локализация недоступна, используется язык по умолчанию из конфигурации. Подробности в [документации по локализации](/docs/config/#language).

### 6. Какие интеграции поддерживает FlectonePulse?
Плагин интегрируется с Discord, Telegram и Twitch, позволяя игрокам общаться через разные платформы. Также поддерживаются сторонние плагины Minecraft, например, для запрета игрокам с мутом говорить в PlasmoVoice и SimpleVoice. Настройка интеграций выполняется в файле `integration.yml`. Подробности в [документации по интеграциям](/docs/integration/).

### 7. Как использовать команду `/chatsetting`?
Введите в чат команду `/chatsetting`, чтобы настроить чат и связанные функции (например, цвет, стиль, уведомления).

![commandchatsetting](/commandchatsetting.gif)

### 8. Поддерживает ли FlectonePulse PlaceholderAPI?
Да, FlectonePulse полностью совместим с PlaceholderAPI и MiniPlaceholders. Используйте плейсхолдеры в сообщениях.

### 9. Как использовать команду `/symbol`?
Введите в чат команду `/symbol`, чтобы искать и использовать Unicode-эмодзи.

![commandsymbol](/commandsymbol.png)

### 10. Есть ли поддержка мини-игр в чате?
Да, игроки могут использовать встроенные мини-игры, такие как крестики-нолики или камень-ножницы-бумага.

![commandtictactoe](/commandtictactoe.png)

![commandrockpaperscissors](/commandrockpaperscissors.png)

### 11. Чем FlectonePulse отличается от FlectoneChat?
FlectonePulse — это новый проект, а не улучшенная версия FlectoneChat. FlectoneChat был экспериментом, а FlectonePulse создан с учётом прошлых ошибок, предлагая больше возможностей и кастомизации.

### 12. Как включить ототображение имени над игроком?
Включите настройку `name-visible` в файле `message.yml`:

```yaml
scoreboard:
  enable: true
  name-visible: true
  color: "<white>"
  prefix: "<vault_prefix><stream_prefix>"
  suffix: "<afk_suffix><vault_suffix>"
  ticker:
    enable: false
```

После изменения выполните команду `/flectonepulse reload`. Подробности в [документации по настройке](/docs/message/format/scoreboard/).

### 13. Как настроить отображение имени игрока?
Настройка имени игрока выполняется в файле `localizations/...`:

```yaml
name-:
  constant: ""
  display: "<click:suggest_command:\"/msg <player> \"><hover:show_text:\"<fcolor:2>Написать <player>\"><vault_prefix><stream_prefix><fcolor:2><player></fcolor><afk_suffix><vault_suffix></hover></click>"
  entity: "<fcolor:2><hover:show_text:\"<fcolor:2><lang:'<name>'> <br><fcolor:1>Тип <fcolor:2><lang:'<type>'> <br><fcolor:1>Айди <fcolor:2><uuid>\"><lang:'<name>'></hover></fcolor:2>"
  unknown: "<fcolor:2><name></fcolor:2>"
```

После изменений выполните `/flectonepulse reload`. Подробности в [документации по локализации](/docs/message/format/name_/).

### 14. Как настроить цвета в сообщениях и интерфейсе?
Настройка цветов выполняется в файле `message.yml` с помощью модуля `color`:

```yaml
color:
  enable: true
  use-recipient-colors: true
  values:
    1: "#ADD8E6"
    2: "#87CEFA"
    3: "#A9A9A9"
    4: "#FFFAFA"
```

Здесь задаются цвета по умолчанию, если игрок не выбрал свои в `/chatsetting` или `/chatcolor`. Можно запретить изменение цветов в соответствующих командах. Подробности в [руководстве по форматированию](/docs/message/format/color/).

::: tip СОВЕТ
Проще изменить 4 цвета здесь, чем заменять `<fcolor:>` во всех настройках плагина.
:::

### 15. Как настроить ТАБ (список игроков)?
Для включения/отключения модулей ТАБа настройте файл `message.yml`:

```yaml
tab:
  enable: true
  header:
    enable: true
  footer:
    enable: true
  playerlistname:
    enable: true
```

Для изменения сообщений отредактируйте файл локализации `localizations/...`:

```yaml
tab:
  header:
    lists:
      - - " "
        - "<fcolor:1>👾"
        - " "
      - - " "
        - "<fcolor:1>❤"
        - " "
  footer:
    lists:
      - - " "
        - "<fcolor:1>ТПС <tps>, Онлайн <online>"
        - " "
      - - " "
        - "<fcolor:1>Привет <fcolor:2><player></fcolor:2>!"
        - " "
  playerlistname:
    format: "<world_prefix>▋ <reset><vault_prefix><stream_prefix><fcolor:2><player><afk_suffix><vault_suffix>"
```

::: warning ВАЖНО
Для сортировки ТАБа по донатным группам включите [`tab-sort`](/docs/integration/luckperms/#tab-sort).
:::

После изменений выполните `/flectonepulse reload`. Подробности в [документации по ТАБ](/docs/message/tab/).

### 16. Что делать, если возникают ошибки?
1. Проверьте консоль сервера на наличие ошибок и отправите их в [Discord-сообщество](https://discord.com/channels/861147957365964810/1271850075064369152) для помощи.
2. Убедитесь, что используете последнюю версию плагина.
3. Ознакомьтесь с документацией или получите персональную техническую поддержку для бустеров на [Boosty](https://boosty.to/thefaser).

### 17. Как связаться с разработчиками?
Присоединяйтесь к [Discord-сообществу](https://discord.flectone.net/) для поддержки и предложений. Оставьте звезду на [GitHub](https://github.com/Flectone/FlectonePulse) или отзыв на [SpigotMC](https://www.spigotmc.org/resources/flectonepulse.121618/).

### 18. Когда выйдет новая версия FlectonePulse с поддержкой последней версии Minecraft?
Скорее всего, FlectonePulse уже поддерживает новейшую версию Minecraft. Экспериментальные версии доступны для скачивания на [GitHub](https://github.com/Flectone/FlectonePulse/actions/) или в [Discord-канале для тестеров](https://discord.com/channels/861147957365964810/1357058707011272926). Если версия Minecraft уже вышла, а обновление FlectonePulse отсутствует, это связано с ожиданием релиза PacketEvents — основной библиотеки, используемой FlectonePulse для взаимодействия с сервером. Как только PacketEvents выйдет в релиз, FlectonePulse будет обновлён.

::: danger ВНИМАТЕЛЬНО
Тестовые версии используйте на свой страх и риск. Эти версии чаще всего не созданы для того, чтобы использовать их в продакшене, они могут быть сломаны или сломать вам прошлую версию FlectonePulse
:::

### 19. Работает ли FlectonePulse с прокси и как его настроить?
FlectonePulse поддерживает прокси-серверы, включая BungeeCord и Velocity. Для работы плагина необходимо установить один и тот же файл плагина как на прокси, так и на сервер. На прокси файлы конфигурации не создаются — оно выступает в роли моста. Все настройки выполняются в файлах на серверах. Для корректной работы обязательно подключение к базе данных MySQL, которая должна быть настроена в файле `config.yml` на серверах. Также нужно включить один из режимов `velocity` или `bungeecord`, подробности в [документации по конфигурации](/docs/config/#bungeecord).

### 20. Поддерживает ли FlectonePulse ядра, работающие одновременно с модами и плагинами, такие как Arclight или Mohist, а также будет ли он для Fabric?
FlectonePulse не тестировался на ядрах, поддерживающих одновременно моды и плагины (например, Arclight или Mohist), и их поддержка не предполагается. Основная проблема заключается в библиотеке Libby, используемой для загрузки зависимостей, которая не работает на таких ядрах. Теоретически можно собрать FlectonePulse со всеми необходимыми зависимостями для запуска на этих ядрах, но нет гарантии корректной работы PacketEvents. В будущем планируется отдельная поддержка Fabric, но только для последних версий.

<div align="center">
  <h3>🚀 Начни использовать FlectonePulse уже сегодня!</h3>
  <br>
  <a href="https://modrinth.com/plugin/flectonepulse"><img src="https://flectone.net/pulse/modrinth.svg" alt="modrinth" class="hover-brightness"></a>
  <a href="https://discord.flectone.net/"><img src="https://flectone.net/pulse/discord.svg" alt="discord" class="hover-brightness"></a>
</div>