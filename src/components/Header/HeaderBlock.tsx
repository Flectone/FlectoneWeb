import Image from "next/image";
import { ReactNode } from 'react';
interface HeaderBlockProps {
  children?: ReactNode;
  className?: string
}

const HeaderBlock: React.FC<HeaderBlockProps> = ({ children, className }) => {
    return (
        <div className={`${className} backdrop-blur-xs flex justify-around items-center bg-(--primary) px-1 rounded-full`}>
            { children }
        </div>
    );
}

export default HeaderBlock;