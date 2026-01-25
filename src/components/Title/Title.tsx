import {ReactNode} from "react";

export default function Title({ text }: { text: ReactNode }) {
  return (
    <div className='w-full flex max-lg:justify-center max-sm:justify-start'>
      <h1 className='font-bold text-5xl w-fit max-sm:w-1/3 max-sm:text-4xl'>{text}</h1>
    </div>
  );
}