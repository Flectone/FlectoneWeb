'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

type ButtonMode = 'blue' | 'orange' | 'gray' | 'green'

interface LinkButtonProps {
  children?: ReactNode
  className?: string
  href: string
  mode?: ButtonMode
}

const modeStyles: Record<ButtonMode, string> = {
  blue: 'bg-fd-primary text-fd-primary-foreground hover:bg-fd-muted-primary',
  orange: 'bg-fd-orange text-fd-orange-foreground hover:bg-fd-muted-orange',
  gray: 'bg-fd-gray text-fd-gray-foreground hover:bg-fd-muted-gray',
  green: 'bg-fd-green text-fd-green-foreground hover:bg-fd-muted-green',
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  className = '',
  href,
  mode = 'blue',
}) => {
  return (
    <Link
      href={href}
      className={`
        ${modeStyles[mode]}
        ${className}
        w-fit px-4 py-1 rounded-full text-nowrap 
        duration-100 cursor-pointer box-content flex font-medium items-center
      `}
    >
      {children}
    </Link>
  )
}

export default LinkButton
