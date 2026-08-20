"use client"
import { ReactNode } from "react"

interface MinecraftTabProps {
  tabText: ReactNode
}

export default function MinecraftTab({ tabText }: MinecraftTabProps) {
  return (
    <div className="flex h-fit w-fit flex-col items-center justify-center gap-2 bg-black/60 p-3 font-[Minecraft]">
      {tabText}
      <div className="flex w-full flex-col gap-1">
        {[
          { name: "TheFaser", id: "4ebc9a34fb5e55be" },
          { name: "Terrona", id: "7693a80b8a699db1" },
          { name: "vpllll", id: "1ac29710d9c4e3dd" },
          { name: "Realepi_Bars_", id: "df64f2e4705dfd18" },
        ].map((user) => (
          <div
            key={user.name}
            className="flex h-[calc(1em-1px)] w-full items-center justify-between bg-white/10"
          >
            <div className="flex h-full items-center">
              <img
                className="mr-0.5 h-full"
                src={`https://s.namemc.com/2d/skin/face.png?id=${user.id}&scale=4`}
              />
              <span className="mr-2 h-full w-1 bg-[#96F896] [box-shadow:1.2px_1.2px_0_#303631]"></span>
              <p className="-mt-[3.2px] text-[1.28em] text-[#85CCF7]! [text-shadow:1.2px_1.2px_0px_#212F38]">
                {user.name}
              </p>
            </div>
            <div className="mr-0.5 ml-2 flex items-end gap-0.5">
              {[0.125, 0.25, 0.375, 0.5, 0.625].map((h, i) => (
                <div
                  key={i}
                  className={`w-0.5 bg-[#01F720] [box-shadow:1.2px_1.2px_0px_#00870F]`}
                  style={{ height: h + "rem" }}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-1 flex w-full justify-center">
        <p className="text-[1.28em] text-[#85CCF7]! [text-shadow:1.2px_1.2px_0px_#212F38]">
          <b className="font-normal text-[#ABD5E3]!">TPS</b> 20.0,{" "}
          <b className="font-normal text-[#ABD5E3]!">Online</b> 4
        </p>
      </div>
    </div>
  )
}
