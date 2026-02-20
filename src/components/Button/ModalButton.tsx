'use client'
import { ReactNode, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalButtonProps {
  text: string
  title: string
  children: ReactNode
}

export default function ModalButton({ text, title, children }: ModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={openModal} className={`bg-fd-gray text-fd-gray-foreground hover:bg-fd-muted-gray w-fit px-5 py-1 rounded-lg text-nowrap duration-100 cursor-pointer box-content flex font-medium items-center`}>
        <h1>{text}</h1>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 md:px-32 z-50 flex items-center justify-center bg-fd-background/80 backdrop-blur-xs"
            onClick={openModal}
          >
            <motion.div className='flex flex-col items-start gap-2'>
              <h1 className='font-bold text-lg'>{title}</h1>
              <div className='flex gap-2'>
                {children}
              </div>
            </motion.div>
            <button
              className="absolute cursor-pointer hover:text-fd-muted-foreground duration-70 top-5 right-5 text-fd-foreground text-2xl drop-shadow-md"
              onClick={openModal}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}