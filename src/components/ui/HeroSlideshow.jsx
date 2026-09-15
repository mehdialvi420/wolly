import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { heroSlides, HERO_SLIDE_MS } from '../../data/heroSlides'

/**
 * Crossfading photo background for page heroes.
 * Same images + interval everywhere for consistent quality.
 */
export default function HeroSlideshow({
  className = '',
  overlayClassName = 'bg-gradient-to-t from-primary/80 via-primary/45 to-primary/25',
  intervalMs = HERO_SLIDE_MS,
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % heroSlides.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [intervalMs])

  return (
    <div className={`absolute inset-0 z-0 overflow-hidden ${className}`} aria-hidden="true">
      <AnimatePresence mode="sync">
        <motion.img
          key={heroSlides[index].src}
          src={heroSlides[index].src}
          alt=""
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>
      <div className={`absolute inset-0 ${overlayClassName}`} />
    </div>
  )
}
