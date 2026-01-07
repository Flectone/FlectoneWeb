'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ZoomImageProps {
  src: string;
}

export default function ZoomImage({ src }: ZoomImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleZoom = () => setIsOpen(!isOpen);

  return (
    <>
      <div className="w-full cursor-zoom-in" onClick={toggleZoom}>
        <img src={src} alt="" className="w-full rounded-lg" />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 px-4 md:px-32 z-50 flex items-center justify-center bg-black/20 cursor-zoom-out"
            onClick={toggleZoom}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              src={src}
              alt=""
              className="max-w-full max-h-[90vh] object-contain"
            />

            <button
              className="absolute cursor-pointer hover:text-fd-muted-foreground duration-70 top-5 right-5 text-white text-3xl drop-shadow-md"
              onClick={toggleZoom}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}