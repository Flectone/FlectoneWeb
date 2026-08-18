"use client"
import Image from "next/image"

export function TexturePreview() {
  return (
    <div className="flex items-center gap-4">
      <div className="h-14 w-14">
        <Image
          width={60}
          height={60}
          src={"/assets/flectone_logo.png"}
          alt=""
        />
      </div>
      <span className="font-[Minecraft] text-lg text-fd-muted-foreground">
        &rarr;
      </span>
      <div className="flex w-14 flex-col-reverse gap-[2px]">
        {[...Array(4)].map((_, index) => (
          <Image
            key={index}
            width={100}
            height={100}
            src={`/assets/flectonetools/flectonetools_texturegenerator_slicesimage_${index + 1}.webp`}
            alt={String(index)}
          />
        ))}
      </div>
    </div>
  )
}

export function AnimationPreview() {
  return (
    <span className="animate-gradient-flow bg-[linear-gradient(90deg,var(--color-primary),var(--color-purple-400),var(--color-warning),var(--color-success),var(--color-primary))] bg-size-[200%_auto] bg-clip-text font-[Minecraft] text-3xl text-transparent max-sm:text-2xl">
      FlectonePulse
    </span>
  )
}

export function PrefixPreview() {
  return (
    <span className="flex items-center gap-2 font-[Minecraft] text-2xl">
      <div className="flex h-[1em] items-center bg-orange-300 px-1">
        <span className="text-md bg-[linear-gradient(90deg,var(--color-red-800),var(--color-error))] bg-clip-text text-transparent">
          ADMIN
        </span>
      </div>
      <span className="text-fd-foreground">TheFaser</span>
    </span>
  )
}

export function UuidPreview() {
  return (
    <div className="flex flex-col items-start gap-1">
      <span className="font-[Minecraft] text-lg text-fd-foreground">
        TheFaser
      </span>
      <code className="text-[0.68rem] whitespace-nowrap text-fd-muted-foreground">
        717de580<span className="text-fd-green">-</span>6198
        <span className="text-fd-green">-</span>36a3
        <span className="text-fd-green">-</span>b79b
        <span className="text-fd-green">-</span>7f277f051c39
      </code>
    </div>
  )
}

export function InventoryPreview() {
  return (
    <div className="flex w-full justify-center">
      <Image
        width={200}
        height={100}
        alt=""
        src={
          "/assets/flectonetools/flectonetools_inventorypreviewer_preview.webp"
        }
      />
    </div>
  )
}

export function CoordinatePreview() {
  return (
    <div className="flex flex-col items-start gap-1 font-[Minecraft] text-lg">
      <span className="flex gap-3">
        <span className="w-24 text-start text-fd-muted-foreground">
          Overworld
        </span>
        <span className="text-fd-foreground">X 1280 Z -640</span>
      </span>
      <span className="flex gap-3">
        <span className="w-24 text-start text-fd-muted-foreground">Nether</span>
        <span className="text-sky-500">X 160 Z -80</span>
      </span>
    </div>
  )
}

export function ColorTextPreview() {
  return (
    <div className="flex flex-col items-start gap-1">
      <code className="text-xs text-fd-muted-foreground">
        &amp;a&amp;lHello &lt;gradient&gt;world&lt;/gradient&gt;
      </code>
      <span className="flex gap-2 font-[Minecraft] text-2xl">
        <span className="text-fd-green font-bold">Hello</span>
        <span className="bg-[linear-gradient(90deg,var(--color-pink-500),var(--color-fd-primary))] bg-clip-text text-transparent">
          world
        </span>
      </span>
    </div>
  )
}

export function FlagsPreview() {
  return (
    <code className="text-start text-xs leading-5 text-fd-muted-foreground">
      <span className="text-fd-green">$</span> java{" "}
      <span className="text-fd-orange">-Xms4G -Xmx4G</span>
      {"\n"}
      <span className="block pl-4">-XX:+UseG1GC -jar server.jar</span>
    </code>
  )
}

export function TimePreview() {
  return (
    <div className="flex items-center gap-3 font-[Minecraft] text-2xl">
      <span className="text-fd-foreground">15:00</span>
      <span className="text-fd-muted-foreground">&rarr;</span>
      <span className="text-sm text-cyan-500">/time set 9000</span>
    </div>
  )
}
