'use client'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react';
interface HeaderButtonProps {
  children?: ReactNode;
  className?: string;
  path: string;
  mode: 'gray' | 'blue'
}

const HeaderButton: React.FC<HeaderButtonProps> = ({ children, className, path, mode }) => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <Link href={path} className={`${className} ${pathname == path? 'bg-(--muted-primary) hover:bg-(--muted-primary)' : 'hover:bg-(--muted-primary)'}  duration-100 text-center cursor-pointer box-content px-4 rounded-full text-nowrap w-full`}>
            { children }
        </Link>
    );
}

export default HeaderButton;