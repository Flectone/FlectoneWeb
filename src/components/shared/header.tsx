"use client"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import * as SimpleIcons from "react-icons/si"
import { IconType } from "react-icons"

import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { Separator } from "../ui/separator"
import ThemeToggle from "./theme-toggle"
import LanguageToggle from "./language-toggle"
import { PanelTopOpen } from "lucide-react"

function Icon({
  name,
  className,
  size,
}: {
  name: string
  className?: string
  size?: string | number
}) {
  const IconComponent = (SimpleIcons as Record<string, IconType>)[name]

  if (!IconComponent) {
    return null
  }

  return <IconComponent className={className} size={size} />
}

export interface HeaderProps {
  title?: [string, string]
  links: {
    label: string
    href: string
  }[]
  socialLinks?: {
    icon: string
    href: string
  }[]
}

export function Header({
  title = ["Flectone", "/"],
  links,
  socialLinks = [
    { icon: "SiGithub", href: "https://github.com/Flectone/" },
    { icon: "SiDiscord", href: "https://discord.flectone.net/" },
    { icon: "SiBoosty", href: "https://boosty.to/thefaser" },
  ],
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 flex w-full justify-center bg-background">
      <div
        className={cn(
          "container flex h-14 items-center justify-between border-b"
        )}
      >
        <div className="flex flex-1 justify-start">
          <Link href={title[1]} className={cn("flex items-center gap-1")}>
            <Image
              alt="FlectoneLogo"
              src={"/assets/flectone_logo.png"}
              width={24}
              height={24}
            />
            <span className="font-bold">{title[0]}</span>
          </Link>
        </div>

        <div className="flex justify-center max-md:hidden">
          <NavigationMenu>
            <NavigationMenuList className={"gap-2"}>
              {links.map((item, key) => (
                <NavigationMenuItem key={key}>
                  <NavigationMenuLink
                    className={"h-8"}
                    render={<Link href={item.href} />}
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <Sheet>
          <SheetTrigger
            className={"md:hidden"}
            render={(props, state) => (
              <Button
                {...props}
                variant="ghost"
                size="icon-lg"
                className={cn("md:hidden", props.className)}
              >
                <PanelTopOpen />
              </Button>
            )}
          />
          <SheetContent side="top" className={"rounded-b-xl"}>
            <SheetHeader>
              <SheetTitle>
                <div className={cn("flex items-center gap-1")}>
                  <Image
                    alt="FlectoneLogo"
                    src={"/assets/flectone_logo.png"}
                    width={24}
                    height={24}
                  />
                  <span className="text-lg font-bold">{title[0]}</span>
                </div>
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2 px-4 pb-4">
              <div className="flex flex-col gap-2">
                {links.map((item, key) => (
                  <Link
                    key={key}
                    href={item.href}
                    className="transition hover:text-muted-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <Separator />
              <div className="flex justify-between">
                <div>
                  <LanguageToggle />
                  <ThemeToggle />
                </div>
                <div>
                  {socialLinks.map((item, key) => (
                    <Link
                      key={key}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Button variant={"ghost"} size={"icon-sm"}>
                        <Icon name={item.icon} />
                      </Button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end gap-1 max-md:hidden">
          <div>
            <LanguageToggle />
          </div>
          <div>
            <ThemeToggle />
          </div>
          <Separator orientation="vertical" />
          <div className="flex gap-1">
            {socialLinks.map((item, key) => (
              <Link key={key} href={item.href} target="_blank" rel="noreferrer">
                <Button variant={"ghost"} size={"icon-sm"}>
                  <Icon name={item.icon} />
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
