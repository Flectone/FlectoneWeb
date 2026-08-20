"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ZoomImageProps {
  src: string
  className?: string
  alt?: string
}

export default function ZoomImage({ src, className, alt }: ZoomImageProps) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleZoom = () => {
    if (window.innerWidth < 1280) return
    setIsOpen(!isOpen)
  }

  return (
    <>
      <span
        className="w-full cursor-zoom-in max-xl:cursor-default"
        onClick={toggleZoom}
      >
        <img src={src} alt={alt || "image"} className={className} />
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/20 px-4 md:px-32"
            onClick={toggleZoom}
          >
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              src={src}
              alt=""
              className="max-h-[90vh] min-w-full rounded-lg object-contain"
            />

            <button
              className="absolute top-5 right-5 cursor-pointer text-3xl text-white drop-shadow-md duration-70 hover:text-fd-muted-foreground"
              onClick={toggleZoom}
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
