import { motion } from 'framer-motion'
import PageMeta from '../components/seo/PageMeta'
import SectionHeading from '../components/ui/SectionHeading'
import SmartImage from '../components/ui/SmartImage'
import { siteConfig } from '../data/siteConfig'
import { aboutContent } from '../data/aboutContent'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function MotionBlock({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      variants={fadeUp}
    >
      {children}
    </motion.div>
  )
}

export default function About() {
  const { heroImage, heroAlt, story, chef, ambiance, values } = aboutContent

  return (
    <>
      <PageMeta
        title={siteConfig.seo.pages.about.title}
        description={siteConfig.seo.pages.about.description}
        path="/about"
      />

      <section className="relative min-h-[42vh] overflow-hidden md:min-h-[52vh]">
        <img
          src={heroImage}
          alt={heroAlt}
          width={816}
          height={1224}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/45 to-primary/25"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto flex min-h-[42vh] max-w-6xl items-end px-4 pb-10 md:min-h-[52vh] md:px-6 md:pb-14">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              About
            </p>
            <h1 className="mt-2 font-display text-4xl font-medium text-background md:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mt-2 font-sans text-sm tracking-wide text-background/90 md:text-base">
              {siteConfig.tagline}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <MotionBlock className="max-w-3xl">
          <SectionHeading eyebrow="Story" title={story.title} className="mb-6" />
          <div className="space-y-4">
            {story.paragraphs.map((paragraph) => (
              <p
                key={paragraph.slice(0, 24)}
                className="font-sans text-base leading-relaxed text-primary/75"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </MotionBlock>
      </section>

      <section className="border-y border-primary/10 bg-primary/[0.03]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-2 md:gap-14 md:px-6 md:py-20">
          <MotionBlock>
            <SmartImage
              src={chef.image}
              alt={`${chef.name}, ${chef.role}`}
              width={640}
              height={800}
              className="aspect-[4/5]"
              imgClassName="object-cover"
            />
          </MotionBlock>
          <MotionBlock>
            <SectionHeading
              eyebrow="Kitchen"
              title="Meet the Chef"
              className="mb-4"
            />
            <p className="font-display text-2xl text-primary">{chef.name}</p>
            <p className="mt-1 font-sans text-sm uppercase tracking-[0.16em] text-secondary">
              {chef.role}
            </p>
            <p className="mt-5 font-sans text-base leading-relaxed text-primary/75">
              {chef.bio}
            </p>
          </MotionBlock>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <MotionBlock>
          <SectionHeading
            eyebrow="Ambiance"
            title="The vibe"
            subtitle="Placeholder interior and table moments — swap for real ambiance photos next."
          />
        </MotionBlock>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {ambiance.map((photo) => (
            <MotionBlock key={photo.alt}>
              <SmartImage
                src={photo.src}
                alt={photo.alt}
                width={480}
                height={480}
                className="aspect-square"
                imgClassName="object-cover"
              />
            </MotionBlock>
          ))}
        </div>
      </section>

      <section className="border-t border-primary/10 bg-secondary/40">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-3 md:px-6 md:py-16">
          {values.map((value) => (
            <MotionBlock key={value.id} className="min-w-0">
              <h3 className="font-display text-xl text-primary md:text-2xl">
                {value.title}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-primary/80">
                {value.detail}
              </p>
            </MotionBlock>
          ))}
        </div>
      </section>
    </>
  )
}
