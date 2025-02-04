import {defineConfig} from 'vitepress'

const modrinth = '<svg width="512" height="514" viewBox="0 0 512 514" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M503.16 323.56C514.55 281.47 515.32 235.91 503.2 190.76C466.57 54.2299 326.04 -26.8001 189.33 9.77991C83.8101 38.0199 11.3899 128.07 0.689941 230.47H43.99C54.29 147.33 113.74 74.7298 199.75 51.7098C306.05 23.2598 415.13 80.6699 453.17 181.38L411.03 192.65C391.64 145.8 352.57 111.45 306.3 96.8198L298.56 140.66C335.09 154.13 364.72 184.5 375.56 224.91C391.36 283.8 361.94 344.14 308.56 369.17L320.09 412.16C390.25 383.21 432.4 310.3 422.43 235.14L464.41 223.91C468.91 252.62 467.35 281.16 460.55 308.07L503.16 323.56Z" fill="var(--color-brand)"/><path d="M321.99 504.22C185.27 540.8 44.7501 459.77 8.11011 323.24C3.84011 307.31 1.17 291.33 0 275.46H43.27C44.36 287.37 46.4699 299.35 49.6799 311.29C53.0399 323.8 57.45 335.75 62.79 347.07L101.38 323.92C98.1299 316.42 95.39 308.6 93.21 300.47C69.17 210.87 122.41 118.77 212.13 94.7601C229.13 90.2101 246.23 88.4401 262.93 89.1501L255.19 133C244.73 133.05 234.11 134.42 223.53 137.25C157.31 154.98 118.01 222.95 135.75 289.09C136.85 293.16 138.13 297.13 139.59 300.99L188.94 271.38L174.07 231.95L220.67 184.08L279.57 171.39L296.62 192.38L269.47 219.88L245.79 227.33L228.87 244.72L237.16 267.79C237.16 267.79 253.95 285.63 253.98 285.64L277.7 279.33L294.58 260.79L331.44 249.12L342.42 273.82L304.39 320.45L240.66 340.63L212.08 308.81L162.26 338.7C187.8 367.78 226.2 383.93 266.01 380.56L277.54 423.55C218.13 431.41 160.1 406.82 124.05 361.64L85.6399 384.68C136.25 451.17 223.84 484.11 309.61 461.16C371.35 444.64 419.4 402.56 445.42 349.38L488.06 364.88C457.17 431.16 398.22 483.82 321.99 504.22Z" fill="var(--color-brand)"/></svg>'
const boosty = '<svg width="250" height="250" viewBox="-5 60 215.6 150" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" class="st0" d="M44.3,164.5L76.9,51.6H127l-10.1,35c-0.1,0.2-0.2,0.4-0.3,0.6L90,179.6h24.8c-10.4,25.9-18.5,46.2-24.3,60.9 c-45.8-0.5-58.6-33.3-47.4-72.1 M90.7,240.6l60.4-86.9h-25.6l22.3-55.7c38.2,4,56.2,34.1,45.6,70.5 c-11.3,39.1-57.1,72.1-101.7,72.1C91.3,240.6,91,240.6,90.7,240.6z" fill="var(--color-brand)"/></svg>'

// https://vitepress.dev/reference/site-config
export default defineConfig({

  base: '/pulse/',
  title: "FlectonePulse",
  description: "Это серверный менеджер сообщений, нацеленный на упрощение настройки сервера",
  lastUpdated: true,
  ignoreDeadLinks: true,

  head: [
    ['link', { rel: "apple-touch-icon", sizes: "180x180", href: "/assets/favicons/apple-touch-icon.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "32x32", href: "/assets/favicons/favicon-32x32.png"}],
    ['link', { rel: "icon", type: "image/png", sizes: "16x16", href: "/assets/favicons/favicon-16x16.png"}],
    ['link', { rel: "manifest", href: "/assets/favicons/site.webmanifest"}],
    ['link', { rel: "shortcut icon", href: "/assets/favicons/favicon.ico"}],
  ],

  themeConfig: {
    logo: '/logo.png',
    socialLinks: [
      {
        icon: { svg: boosty },
        link: 'https://boosty.to/thefaser',
        ariaLabel: 'Boosty',
      },
      { icon: 'github', link: 'https://github.com/flectone/FlectonePulse' },
      {
        icon: { svg: modrinth },
        link: 'https://modrinth.com/plugin/flectonepulse',
        ariaLabel: 'Modrinth',
      },
      { icon: 'discord', link: 'https://discord.flectone.net' },
    ],

    nav: [
      { text: 'Начало', link: '/' },
      { text: 'Документация', link: '/docs/' },
      {
        text: 'Языки',
        items: [
          { text: "Русский", link: 'https://flectone.net/pulse/'},
          { text: "English", link: 'https://flectone.net/en/pulse/'}
        ]
      },
    ],

    lastUpdated: {
      text: 'Обновлено'
    },
    outline: {
      label: "Содержание страницы",
      level: [2, 3]
    },

    docFooter: {
      prev: 'Предыдущая страница',
      next: 'Следующая страница'
    },

    darkModeSwitchLabel: 'Оформление',
    darkModeSwitchTitle: "Переключить на тёмную тему",
    lightModeSwitchTitle: "Переключить на светлую тему",
    sidebarMenuLabel: 'Меню',
    returnToTopLabel: 'Вернуться к началу',
    langMenuLabel: 'Изменить язык',
    editLink: {
      pattern: 'https://github.com/Flectone/FlectonePulseWeb/edit/master/:path',
      text: 'Редактировать эту страницу на GitHub'
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: 'Поиск',
            buttonAriaLabel: 'Поиск'
          },
          modal: {
            displayDetails: 'Отобразить подробный список',
            resetButtonTitle: 'Сбросить поиск',
            backButtonTitle: 'Закрыть поиск',
            noResultsText: 'Нет результатов по запросу',
            footer: {
              selectText: 'выбрать',
              selectKeyAriaLabel: 'выбрать',
              navigateText: 'перейти',
              navigateUpKeyAriaLabel: 'стрелка вверх',
              navigateDownKeyAriaLabel: 'стрелка вниз',
              closeText: 'закрыть',
              closeKeyAriaLabel: 'esc'
            }
          }
        }
      },
    },

    sidebar: [
      {
        text: '📁 Конфигурация',
        link: '/docs/config/',
        collapsed: true,
        items: []
      },
      {
        text: '🛠️Комманды',
        link: '/docs/command/',
        collapsed: true,
        items: [
          { text: 'Afk', link: '/docs/command/afk/' },
          { text: 'Ball', link: '/docs/command/ball/' },
          { text: 'Ban', link: '/docs/command/ban/' },
          { text: 'Banlist', link: '/docs/command/banlist/' },
          { text: 'Broadcast', link: '/docs/command/broadcast/' },
          { text: 'Chatcolor', link: '/docs/command/chatcolor/' },
          { text: 'Chatsetting', link: '/docs/command/chatsetting/' },
          { text: 'Clearchat', link: '/docs/command/clearchat/' },
          { text: 'Clearmail', link: '/docs/command/clearmail/' },
          { text: 'Coin', link: '/docs/command/coin/' },
          { text: 'Dice', link: '/docs/command/dice/' },
          { text: 'Do', link: '/docs/command/do/' },
          { text: 'Flectonepulse', link: '/docs/command/flectonepulse/' },
          { text: 'Geolocate', link: '/docs/command/geolocate/' },
          { text: 'Helper', link: '/docs/command/helper/' },
          { text: 'Ignore', link: '/docs/command/ignore/' },
          { text: 'Ignorelist', link: '/docs/command/ignorelist/' },
          { text: 'Kick', link: '/docs/command/kick/' },
          { text: 'Mail', link: '/docs/command/mail/' },
          { text: 'Maintenance', link: '/docs/command/maintenance/' },
          { text: 'Mark', link: '/docs/command/mark/' },
          { text: 'Me', link: '/docs/command/me/' },
          { text: 'Mute', link: '/docs/command/mute/' },
          { text: 'Mutelist', link: '/docs/command/mutelist/' },
          { text: 'Online', link: '/docs/command/online/' },
          { text: 'Ping', link: '/docs/command/ping/' },
          { text: 'Poll', link: '/docs/command/poll/' },
          { text: 'Reply', link: '/docs/command/reply/' },
          { text: 'Rockpaperscissors', link: '/docs/command/rockpaperscissors/' },
          { text: 'Spit', link: '/docs/command/spit/' },
          { text: 'Spy', link: '/docs/command/spy/' },
          { text: 'Stream', link: '/docs/command/stream/' },
          { text: 'Symbol', link: '/docs/command/symbol/' },
          { text: 'Tell', link: '/docs/command/tell/' },
          { text: 'Tictactoe', link: '/docs/command/tictactoe/' },
          { text: 'Translateto', link: '/docs/command/translateto/' },
          { text: 'Try', link: '/docs/command/try/' },
          { text: 'Unban', link: '/docs/command/unban/' },
          { text: 'Unmute', link: '/docs/command/unmute/' },
          { text: 'Unwarn', link: '/docs/command/unwarn/' },
          { text: 'Warn', link: '/docs/command/warn/' },
          { text: 'Warnlist', link: '/docs/command/warnlist/' },
        ]
      },
      {
        text: '🔗 Интеграции',
        link: '/docs/integration/',
        collapsed: true,
        items: [
          { text: 'Дискорд', link: '/docs/integration/discord/' },
          { text: 'LuckPerms', link: '/docs/integration/luckperms/' },
          { text: 'PlaceholderAPI', link: '/docs/integration/placeholderapi/' },
          { text: 'PlasmoVoice', link: '/docs/integration/plasmovoice/' },
          { text: 'SimpleVoice', link: '/docs/integration/simplevoice/' },
          { text: 'SkinsRestorer', link: '/docs/integration/skinsrestorer/' },
          { text: 'SuperVanish', link: '/docs/integration/supervanish/' },
          { text: 'Телеграм', link: '/docs/integration/telegram/' },
          { text: 'Твич', link: '/docs/integration/twitch/' },
          { text: 'Vault', link: '/docs/integration/vault/' },
        ]
      },
      {
        text: '💬 Сообщения',
        link: '/docs/message/',
        collapsed: true,
        items: [
          { text: 'Достижение', link: '/docs/message/advancement/' },
          { text: 'Наковальня', link: '/docs/message/anvil/' },
          { text: 'Автоматическое', link: '/docs/message/auto/' },
          { text: 'Книга', link: '/docs/message/book/' },
          { text: 'Бренд', link: '/docs/message/brand/' },
          { text: 'Над головой', link: '/docs/message/bubble/' },
          { text: 'Чат', link: '/docs/message/chat/' },
          { text: 'Очищение', link: '/docs/message/clear/' },
          {
            text: 'Контактирование',
            link: '/docs/message/contact/',
            collapsed: true,
            items: [
              { text: 'Афк', link: '/docs/message/contact/afk/' },
              { text: 'Стуки', link: '/docs/message/contact/knock/' },
              { text: 'Метка', link: '/docs/message/contact/mark/' },
              { text: 'Правое нажатие', link: '/docs/message/contact/rightclick/' },
              { text: 'Подпись', link: '/docs/message/contact/sign/' },
              { text: 'Плевок', link: '/docs/message/contact/spit/' },
              { text: 'Снятие подписи', link: '/docs/message/contact/unsign/' },
            ]
          },
          { text: 'Смерть', link: '/docs/message/death/' },
          { text: 'Деоп', link: '/docs/message/deop/' },
          { text: 'Зачарование', link: '/docs/message/enchant/' },
          {
            text: 'Форматирование',
            link: '/docs/message/format/',
            collapsed: true,
            items: [
              { text: 'Цвета', link: '/docs/message/format/color/' },
              { text: 'Смайлики', link: '/docs/message/format/emoji/' },
              { text: 'Изображение', link: '/docs/message/format/image/' },
              { text: 'Упоминание', link: '/docs/message/format/mention/' },
              {
                text: 'Модерация',
                link: '/docs/message/format/moderation/',
                collapsed: true,
                items: [
                  { text: 'Капс', link: '/docs/message/format/moderation/caps/' },
                  { text: 'Ругательство', link: '/docs/message/format/moderation/swear/' },
                ]
              },
              { text: 'Имя', link: '/docs/message/format/name_/' },
              { text: 'Вопрос-Ответ', link: '/docs/message/format/questionanswer/' },
              { text: 'Спойлер', link: '/docs/message/format/spoiler/' },
              { text: 'Измерение', link: '/docs/message/format/world/' },
            ]
          },
          { text: 'Режим игры', link: '/docs/message/gamemode/' },
          { text: 'Приветствие', link: '/docs/message/greeting/' },
          { text: 'Подключение', link: '/docs/message/join/' },
          {
            text: 'Значения',
            link: '/docs/message/objective/',
            collapsed: true,
            items: [
              { text: 'Под ником', link: '/docs/message/objective/belowname/' },
              { text: 'В табе', link: '/docs/message/objective/tabname/' },
            ]
          },
          { text: 'Оп', link: '/docs/message/op/' },
          { text: 'Отключение', link: '/docs/message/quit/' },
          { text: 'Скорборд', link: '/docs/message/scoreboard/' },
          { text: 'Сид', link: '/docs/message/seed/' },
          { text: 'Сетблок', link: '/docs/message/setblock/' },
          { text: 'Табличка', link: '/docs/message/sign/' },
          { text: 'Спавнпоинт', link: '/docs/message/spawnpoint/' },
          {
            text: 'Статус',
            link: '/docs/message/status/',
            collapsed: true,
            items: [
              { text: 'Иконка', link: '/docs/message/status/icon/' },
              { text: 'Описание', link: '/docs/message/status/motd/' },
              { text: 'Игроки', link: '/docs/message/status/players/' },
              { text: 'Версия', link: '/docs/message/status/version/' },
            ]
          },
          {
            text: 'Таб',
            link: '/docs/message/tab/',
            collapsed: true,
            items: [
              { text: 'Верхнее', link: '/docs/message/tab/header/' },
              { text: 'Нижнее', link: '/docs/message/tab/footer/' },
              { text: 'Имя в списке', link: '/docs/message/tab/playerlistname/' },
            ]
          },
        ]
      },
    ],
  }
})
