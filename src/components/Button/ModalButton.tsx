'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LinkButton from './LinkButton';
import { Leaf, Pickaxe } from 'lucide-react'

interface ModalButtonProps {
  text: string
  title: string
}

export default function ModalButton({ text, title }: ModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button onClick={openModal} className={`bg-fd-gray text-fd-gray-foreground hover:bg-fd-muted-gray w-fit px-5 py-1 rounded-full text-nowrap duration-100 cursor-pointer box-content flex font-medium items-center`}>
        <h1>{text}</h1>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 md:px-32 z-50 flex items-center justify-center bg-black/50"
            onClick={openModal}
          >
            <motion.div className='flex flex-col items-start gap-2'>
              <h1 className='font-bold text-lg'>{title}</h1>
              <div className='flex gap-2'>
                <LinkButton className='gap-1' href='/pulse/docs/'><Pickaxe size='1.1em' />Minecraft</LinkButton>
                <LinkButton className='gap-1' href='/pulse/docs/hytale'><Leaf size='1.1em' />Hytale</LinkButton>
              </div>
            </motion.div>
            <button
              className="absolute cursor-pointer hover:text-fd-muted-foreground duration-70 top-5 right-5 text-white text-2xl drop-shadow-md"
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