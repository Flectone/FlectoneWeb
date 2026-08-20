"use client"
import Container from "@/components/shared/container"
import Image from "next/image"

interface GithubCarpProps {
  className?: string
  link?: string
  name: string
  description: string
  avatar: string
}

export default function GithubCard({
  className,
  link,
  name,
  description,
  avatar,
}: GithubCarpProps) {
  return (
    <>
      <Container href={link} target="blank" className="flex w-full gap-4">
        <Image
          className="h-18 w-18 rounded-md"
          src={avatar}
          alt={avatar}
          width={100}
          height={100}
        />
        <div>
          <h2 className="font-bold">{name}</h2>
          <p>{description}</p>
        </div>
      </Container>
    </>
  )
}
