import { FaInfoCircle } from "react-icons/fa";
import { TiWarning } from "react-icons/ti";
import { BiSolidErrorAlt } from "react-icons/bi";
import { IoMdBulb } from "react-icons/io";
import { ReactNode } from "react";

interface CalloutProps {
  type: 'info' | 'warn' | 'idea' | 'error';
  title: string;
  children?: ReactNode;
  margin?: 'none' | 'normal';
}

const typeStyles: Record<CalloutProps["type"], string> = {
  info: 'bg-fd-info/50',
  warn: 'bg-fd-warning/50',
  idea: 'bg-fd-success/50',
  error: 'bg-fd-error/50'
}

const typeIcons: Record<CalloutProps["type"], ReactNode> = {
  info: <FaInfoCircle className='w-[1em] text-fd-info shrink-0' />,
  warn: <TiWarning className='w-[1em] text-fd-warning shrink-0' />,
  idea: <IoMdBulb className='w-[1em] text-fd-success shrink-0' />,
  error: <BiSolidErrorAlt className='w-[1em] text-fd-error shrink-0' />
}

export default function Callout({ type, title, children, margin = 'normal' }: CalloutProps) {
  return (
    <div className={`pt-3 pr-3 pb-3 w-full flex gap-3 ${margin == 'normal' ? 'mb-4' : ''} bg-fd-card/50 border rounded-lg overflow-hidden`}>
      <div className={`${typeStyles[type]} w-0.5 ml-1.5 rounded-full shrink-0`}></div>
      <div className={`flex flex-col ${title ? 'gap-2' : 'gap-0'}`}>
        <div className='flex items-center text-sm gap-2 font-semibold [&_p]:my-0'>
          {typeIcons[type]}
          {title ? title : children}
        </div>
        <div className="[&_p]:my-0 text-sm">
          {title ? children : ''}
        </div>
      </div>
    </div>
  )
}