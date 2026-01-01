'use client'
import { ReactNode } from "react"
import Link from 'next/link'

interface CardProps {
  className?: string;
  children?: ReactNode;
  path?: string;      
  target?: string;
}

export default function Card({ className = '', children, path, target }: CardProps) {

  const base =
    `${className} duration-100 p-6 max-sm:p-4 backdrop-blur-3xl 
     rounded-xl bg-fd-card overflow-hidden border
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
