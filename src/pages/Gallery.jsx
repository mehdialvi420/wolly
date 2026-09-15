import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import PageMeta from '../components/seo/PageMeta'
import SectionHeading from '../components/ui/SectionHeading'
import SmartImage from '../components/ui/SmartImage'
import Lightbox from '../components/ui/Lightbox'
import { siteConfig } from '../data/siteConfig'
import { galleryCategories, galleryItems } from '../data/galleryData'

const spanClass = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[4/3]',
  square: 'aspect-square',
}

export default function Gallery() {
  const [filter, setFilter] = useState('All')
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const filteredItems = useMemo(() => {
    if (filter === 'All') return galleryItems
    return galleryItems.filter((item) => item.category === filter)
  }, [filter])

  const openLightbox = (index) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  return (
    <>
      <PageMeta
        title={siteConfig.seo.pages.gallery.title}
        description={siteConfig.seo.pages.gallery.description}
        path="/gallery"
      />

      <section className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <SectionHeading
          as="h1"
          eyebrow="Gallery"
          title="A look inside"
          subtitle="Food, interiors, and moments from wolly. Placeholder photos until the full set arrives."
        />

        <div
          className="mb-8 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Gallery categories"
        >
          {galleryCategories.map((category) => {
            const isActive = filter === category
            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setFilter(category)
                  setLightboxIndex(null)
                }}
                className={`px-4 py-2 font-sans text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                  isActive
                    ? 'bg-primary text-background'
                    : 'bg-primary/5 text-primary hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6 md:pb-20" aria-live="polite">
        {filteredItems.length === 0 ? (
          <p className="font-sans text-sm text-primary/60">
            No photos in this category yet.
          </p>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filteredItems.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => openLightbox(index)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openLightbox(index)
                  }
                }}
                className="mb-4 block w-full break-inside-avoid overflow-hidden bg-primary/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
                aria-label={`Open ${item.alt}`}
              >
                <SmartImage
                  src={item.src}
                  alt={item.alt}
                  width={640}
                  height={item.span === 'tall' ? 853 : item.span === 'wide' ? 480 : 640}
                  className={spanClass[item.span] ?? spanClass.square}
                  imgClassName="object-cover transition duration-500 hover:scale-[1.03]"
                />
              </motion.button>
            ))}
          </div>
        )}
      </section>

      {lightboxIndex !== null ? (
        <Lightbox
          items={filteredItems}
          index={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={setLightboxIndex}
        />
      ) : null}
    </>
  )
}
