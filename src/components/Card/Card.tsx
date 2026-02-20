'use client'
import { ReactNode } from "react"
import Link from 'next/link'

export interface CardProps {
  className?: string;
  children?: ReactNode;
  path?: string;
  target?: string;
}

export default function Card({ className = '', children, path, target }: CardProps) {

  const base =
    `${className} duration-100 p-6 max-sm:p-4 backdrop-blur-3xl 
     rounded-2xl bg-fd-card overflow-hidden border shadow-md
     ${path ? 'hover:bg-fd-border cursor-pointer' : ''}`

  if (path) {
    return (
      <Link href={path} target={target} className={base}>
        {children}
      </Link>
    )
  }

  return (
    <div className={base}>
      {children}
    </div>
  )
}
