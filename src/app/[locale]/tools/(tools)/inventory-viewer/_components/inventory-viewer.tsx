"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import Container from "@/components/shared/container"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { InputGroupAddon } from "@/components/ui/input-group"
import { FieldLabel } from "@/components/ui/field"
import { cn } from "@/lib/utils"

type Container = {
  id: string
  label: string
  icon: string
  image: string
}

function MinecraftIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-6 w-6 object-contain"
      style={{ imageRendering: "pixelated" }}
      onError={(e) => {
        ;(e.target as HTMLImageElement).style.display = "none"
      }}
    />
  )
}

export default function InventoryViewer() {
  const t = useTranslations("FlectoneTools.InventoryViewer")

  const CONTAINERS: Container[] = [
    {
      id: "anvil",
      label: t("Containers.anvil"),
      icon: "/assets/icons/anvil.webp",
      image: "/assets/containers/anvil.webp",
    },
    {
      id: "barrel",
      label: t("Containers.barrel"),
      icon: "/assets/icons/barrel.webp",
      image: "/assets/containers/barrel.webp",
    },
    {
      id: "beacon",
      label: t("Containers.beacon"),
      icon: "/assets/icons/beacon.webp",
      image: "/assets/containers/beacon.webp",
    },
    {
      id: "blast_furnance",
      label: t("Containers.blast_furnance"),
      icon: "/assets/icons/blast_furnace.webp",
      image: "/assets/containers/blast_furnance.webp",
    },
    {
      id: "brewing_stand",
      label: t("Containers.brewing_stand"),
      icon: "/assets/icons/brewing_stand.webp",
      image: "/assets/containers/brewing_stand.webp",
    },
    {
      id: "cartography_table",
      label: t("Containers.cartography_table"),
      icon: "/assets/icons/cartography_table.webp",
      image: "/assets/containers/cartography_table.webp",
    },
    {
      id: "chest",
      label: t("Containers.chest"),
      icon: "/assets/icons/chest.webp",
      image: "/assets/containers/chest.webp",
    },
    {
      id: "crafter",
      label: t("Containers.crafter"),
      icon: "/assets/icons/crafter.webp",
      image: "/assets/containers/crafter.webp",
    },
    {
      id: "crafting_table",
      label: t("Containers.crafting_table"),
      icon: "/assets/icons/crafting_table.webp",
      image: "/assets/containers/crafting_table.webp",
    },
    {
      id: "dispenser",
      label: t("Containers.dispenser"),
      icon: "/assets/icons/dispenser.webp",
      image: "/assets/containers/dispenser.webp",
    },
    {
      id: "donkey",
      label: t("Containers.donkey"),
      icon: "/assets/icons/donkey.webp",
      image: "/assets/containers/donkey.webp",
    },
    {
      id: "dropper",
      label: t("Containers.dropper"),
      icon: "/assets/icons/dropper.webp",
      image: "/assets/containers/dropper.webp",
    },
    {
      id: "enchanting_table",
      label: t("Containers.enchanting_table"),
      icon: "/assets/icons/enchanting_table.webp",
      image: "/assets/containers/enchanting_table.webp",
    },
    {
      id: "furnance",
      label: t("Containers.furnance"),
      icon: "/assets/icons/furnace.webp",
      image: "/assets/containers/furnance.webp",
    },
    {
      id: "grindstone",
      label: t("Containers.grindstone"),
      icon: "/assets/icons/grindstone.webp",
      image: "/assets/containers/grindstone.webp",
    },
    {
      id: "hopper",
      label: t("Containers.hopper"),
      icon: "/assets/icons/hopper.webp",
      image: "/assets/containers/hopper.webp",
    },
    {
      id: "horse",
      label: t("Containers.horse"),
      icon: "/assets/icons/horse.webp",
      image: "/assets/containers/horse.webp",
    },
    {
      id: "inventory",
      label: t("Containers.inventory"),
      icon: "/assets/icons/player_head.webp",
      image: "/assets/containers/inventory.webp",
    },
    {
      id: "large_chest",
      label: t("Containers.large_chest"),
      icon: "/assets/icons/large_chest.webp",
      image: "/assets/containers/large_chest.webp",
    },
    {
      id: "llama",
      label: t("Containers.llama"),
      icon: "/assets/icons/llama.webp",
      image: "/assets/containers/llama.webp",
    },
    {
      id: "loom",
      label: t("Containers.loom"),
      icon: "/assets/icons/loom.webp",
      image: "/assets/containers/loom.webp",
    },
    {
      id: "nautilus",
      label: t("Containers.nautilus"),
      icon: "/assets/icons/nautilus.webp",
      image: "/assets/containers/nautilus.webp",
    },
    {
      id: "shulker_box",
      label: t("Containers.shulker_box"),
      icon: "/assets/icons/shulker_box.webp",
      image: "/assets/containers/shulker_box.webp",
    },
    {
      id: "smithing",
      label: t("Containers.smithing"),
      icon: "/assets/icons/smithing_table.webp",
      image: "/assets/containers/smithing.webp",
    },
    {
      id: "smoker",
      label: t("Containers.smoker"),
      icon: "/assets/icons/smoker.webp",
      image: "/assets/containers/smoker.webp",
    },
    {
      id: "stonecutter",
      label: t("Containers.stonecutter"),
      icon: "/assets/icons/stonecutter.webp",
      image: "/assets/containers/stonecutter.webp",
    },
    {
      id: "villager",
      label: t("Containers.villager"),
      icon: "/assets/icons/villager.webp",
      image: "/assets/containers/villager.webp",
    },
  ]

  const [selected, setSelected] = useState<Container>(CONTAINERS[0])

  return (
    <div className="flex w-full gap-4 max-lg:flex-col">
      <div className="relative flex flex-1 overflow-hidden rounded-xl border">
        <div className="flex items-center justify-center bg-[url('/assets/backgrounds/minecraft_forest.webp')] bg-cover bg-center">
          <div className="absolute h-full w-full bg-black/40" />
          <div className="relative z-10 flex w-full items-center justify-center p-8">
            <img
              key={selected.id}
              src={selected.image}
              alt={selected.label}
              className="object-contain drop-shadow-2xl"
              style={{
                imageRendering: "pixelated",
                maxHeight: "560px",
                maxWidth: "100%",
                width: "auto",
                height: "auto",
              }}
            />
          </div>

          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 rounded-xl border border-white/10 bg-black/60 px-4 py-2.5 backdrop-blur-sm">
            <MinecraftIcon src={selected.icon} alt={selected.label} />
            <span className="text-base font-bold text-white">
              {selected.label}
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-96 flex-col gap-4 max-lg:w-full">
        <Card>
          <CardHeader>
            <CardTitle>{t("container")}</CardTitle>
          </CardHeader>
          <CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button variant="outline" className={"flex justify-start"}>
                    <Image
                      src={selected.icon}
                      width={20}
                      height={20}
                      alt=""
                      className="h-5 w-5"
                    />
                    {selected.label}
                  </Button>
                }
              />
              <DropdownMenuContent className="h-64 min-w-56 scrollbar-none">
                <DropdownMenuGroup>
                  <DropdownMenuRadioGroup
                    value={selected}
                    onValueChange={setSelected}
                  >
                    {CONTAINERS.map((container, key) => (
                      <DropdownMenuRadioItem
                        className={cn(
                          "cursor-pointer",
                          selected.id === container.id && "bg-accent"
                        )}
                        key={key}
                        value={container}
                      >
                        <Image
                          src={container.icon}
                          width={20}
                          height={20}
                          alt=""
                          className="h-5 w-5"
                        />
                        {container.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{t("allContainers")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 items-center justify-items-center gap-3">
              {CONTAINERS.map((container) => (
                <Button
                  key={container.id}
                  onClick={() => setSelected(container)}
                  size={"icon-lg"}
                  className={cn(
                    "size-14",
                    selected.id === container.id && "border-primary!"
                  )}
                  variant={"outline"}
                >
                  <img
                    src={container.icon}
                    alt={container.label}
                    className="h-9 w-9 object-contain"
                    style={{ imageRendering: "pixelated" }}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).style.opacity = "0.2"
                    }}
                  />
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
