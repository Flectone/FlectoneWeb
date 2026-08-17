import { useTranslations } from "next-intl"
import ModuleCard from "./module-card"

const WIDE = "col-span-2 max-sm:col-span-1"

const MODULES = [
  {
    key: "Chat",
    link: "/pulse/docs/message/chat/",
    className: WIDE,
    layout: "horizontal" as const,
    images: [
      { src: "/pulse/message_chat.webp", width: 806, height: 158 },
      { src: "/pulse/message_format_world_chat.webp", width: 807, height: 96 },
      {
        src: "/pulse/message_chat_null_recipient.webp",
        width: 652,
        height: 95,
      },
    ],
  },
  {
    key: "Minigame",
    link: "/pulse/docs/command/",
    images: [
      {
        src: "/pulse/command_rockpaperscissors.webp",
        width: 1101,
        height: 289,
      },
      { src: "/pulse/command_minesweeper.webp", width: 798, height: 882 },
      { src: "/pulse/command_dice.webp", width: 910, height: 295 },
      { src: "/pulse/command_ball.webp", width: 1267, height: 350 },
    ],
  },
  {
    key: "Moderation",
    link: "/pulse/docs/message/format/moderation/",
    images: [
      {
        src: "/pulse/message_format_moderation_swear.webp",
        width: 562,
        height: 79,
      },
      {
        src: "/pulse/message_format_moderation_caps.webp",
        width: 814,
        height: 300,
      },
      {
        src: "/pulse/message_format_moderation_flood.webp",
        width: 732,
        height: 402,
      },
      {
        src: "/pulse/message_format_moderation_delete.webp",
        width: 923,
        height: 348,
      },
    ],
  },
  {
    key: "Destination",
    link: "/pulse/docs/message/",
    className: WIDE,
    layout: "horizontal-reverse" as const,
    images: [
      { src: "/pulse/destination_title.webp", width: 1129, height: 289 },
      { src: "/pulse/destination_action_bar.webp", width: 915, height: 388 },
      { src: "/pulse/destination_boss_bar.webp", width: 911, height: 75 },
      { src: "/pulse/destination_toast.webp", width: 799, height: 156 },
      { src: "/pulse/destination_text_screen.webp", width: 1373, height: 1109 },
    ],
  },
  {
    key: "Tab",
    link: "/pulse/docs/message/tab/",
    images: [
      { src: "/pulse/message_tab_header.webp", width: 722, height: 396 },
      {
        src: "/pulse/message_tab_playerlistname.webp",
        width: 684,
        height: 397,
      },
      { src: "/pulse/message_sidebar.webp", width: 444, height: 221 },
      {
        src: "/pulse/message_scoreboard_objective_belowname.webp",
        width: 620,
        height: 709,
      },
    ],
  },
  {
    key: "Vanilla",
    link: "/pulse/docs/message/vanilla/",
    images: [
      { src: "/pulse/message_join.webp", width: 462, height: 103 },
      { src: "/pulse/message_quit.webp", width: 447, height: 100 },
      { src: "/pulse/message_vanilla_death.webp", width: 830, height: 67 },
      { src: "/pulse/message_greeting.webp", width: 801, height: 466 },
    ],
  },
  {
    key: "Replacement",
    link: "/pulse/docs/message/format/replacement/",
    className: WIDE,
    layout: "horizontal" as const,
    images: [
      {
        src: "/pulse/message_format_replacement_item.webp",
        width: 1285,
        height: 465,
      },
      {
        src: "/pulse/message_format_replacement_skin.webp",
        width: 1490,
        height: 478,
      },
      {
        src: "/pulse/message_format_replacement_coords.webp",
        width: 809,
        height: 244,
      },
      {
        src: "/pulse/message_format_replacement_url.webp",
        width: 1246,
        height: 348,
      },
      {
        src: "/pulse/message_format_replacement_stats.webp",
        width: 1238,
        height: 293,
      },
    ],
  },
  {
    key: "Object",
    link: "/pulse/docs/message/format/object/",
    images: [
      {
        src: "/pulse/message_format_object_texture.webp",
        width: 547,
        height: 204,
      },
      {
        src: "/pulse/message_format_object_texture_motd.webp",
        width: 1208,
        height: 145,
      },
      { src: "/pulse/message_format_object_slot.webp", width: 472, height: 92 },
    ],
  },
  {
    key: "Punishment",
    link: "/pulse/docs/command/mute/",
    images: [
      { src: "/pulse/command_mute.webp", width: 1326, height: 293 },
      { src: "/pulse/command_ban.webp", width: 1375, height: 296 },
      { src: "/pulse/command_warn.webp", width: 1307, height: 248 },
    ],
  },
  {
    key: "Bubble",
    link: "/pulse/docs/message/bubble/",
    className: WIDE,
    layout: "horizontal-reverse" as const,
    images: [
      { src: "/pulse/message_bubble.webp", width: 720, height: 870 },
      { src: "/pulse/message_rightclick.webp", width: 629, height: 1151 },
    ],
  },
]

export default function Modules() {
  const t = useTranslations("FlectonePulse.Main.Modules")

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="grid w-full grid-cols-2 gap-4 max-sm:grid-cols-1">
        {MODULES.map((module, index) => (
          <ModuleCard
            key={module.key}
            className={module.className}
            layout={module.layout}
            delay={index * 2000}
            title={t(`${module.key}.title`)}
            description={t(`${module.key}.description`)}
            images={module.images}
            link={module.link}
          />
        ))}
      </div>
    </div>
  )
}
