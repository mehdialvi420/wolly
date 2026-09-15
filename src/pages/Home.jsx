import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, MapPin, Utensils } from 'lucide-react'
import PageMeta from '../components/seo/PageMeta'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SmartImage from '../components/ui/SmartImage'
import { siteConfig } from '../data/siteConfig'
import { featuredMenu } from '../data/menuData'
import heroImage from '../assets/images/hero-illustration.png'
import aboutImage from '../assets/images/matcha-latte.jpg'

function InstagramIcon({ size = 22, className = '', ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const sectionMotion = {
  initial: 'hidden',
  whileInView: 'visible',
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  variants: fadeUp,
}

function MotionSection({ children, className = '', delay = 0 }) {
  return (
    <motion.section
      className={className}
      {...sectionMotion}
      transition={{ ...sectionMotion.transition, delay }}
    >
      {children}
    </motion.section>
  )
}

export default function Home() {
  const hoursLine = {
    days: 'Open every day',
    time: siteConfig.hours[0]?.time ?? '08.00 – 16.00',
  }
  const highlightItems = [
    {
      id: 'hours',
      Icon: Clock,
      title: hoursLine.days,
      body: hoursLine.time,
    },
    {
      id: 'location',
      Icon: MapPin,
      title: 'Find us',
      body: siteConfig.address.full,
    },
    {
      id: 'service',
      Icon: Utensils,
      title: 'How to enjoy',
      body: null,
      badges: [siteConfig.highlights.dineIn, siteConfig.highlights.takeaway],
    },
    {
      id: 'instagram',
      Icon: InstagramIcon,
      title: 'Follow along',
      body: siteConfig.social.handle,
      href: siteConfig.social.instagram,
    },
  ]

  return (
    <>
      <PageMeta
        title={siteConfig.seo.pages.home.title}
        description={siteConfig.seo.pages.home.description}
        path="/"
      />

      {/* 1. Hero */}
      <section className="relative min-h-[85svh] overflow-hidden bg-hero md:min-h-[100svh]">
        <div className="relative z-10 mx-auto flex min-h-[85svh] w-full max-w-6xl flex-col justify-center px-4 py-20 text-center md:min-h-[100svh] md:justify-end md:px-6 md:pb-28 md:pt-24 md:text-left lg:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-xl md:mx-0 md:mb-8"
          >
            <h1 className="break-words font-display text-5xl font-medium tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-8xl">
              {siteConfig.name}
            </h1>
            <p className="mt-4 break-words font-sans text-base tracking-wide text-primary/80 md:text-lg">
              {siteConfig.heroTagline}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start">
              <Link to="/menu">
                <Button variant="primary">View Menu</Button>
              </Link>
              <Link to="/reservations">
                <Button variant="outline">Reserve a Table</Button>
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.img
          src={heroImage}
          alt="Line illustration of a person in a beanie enjoying a warm drink"
          width={792}
          height={792}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-0 right-0 z-0 hidden h-auto w-[42%] max-w-[420px] select-none object-contain object-bottom md:block lg:max-w-[520px] xl:right-[max(0px,calc((100vw-72rem)/2))] xl:max-w-[560px]"
        />
      </section>

      {/* 2. Highlights strip */}
      <MotionSection className="border-b border-primary/10 bg-background">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:grid-cols-2 md:px-6 lg:grid-cols-4 lg:gap-6 lg:py-12">
          {highlightItems.map(({ id, Icon, title, body, badges, href }) => {
            const content = (
              <>
                <Icon className="mb-3 text-secondary" size={22} />
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-primary/60">
                  {title}
                </p>
                {body ? (
                  <p className="mt-2 font-sans text-sm leading-relaxed text-primary">
                    {body}
                  </p>
                ) : null}
                {badges ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {badges.map((label) => (
                      <Badge key={label} variant="accent">
                        {label}
                      </Badge>
                    ))}
                  </div>
                ) : null}
              </>
            )

            if (href) {
              return (
                <a
                  key={id}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="block transition hover:opacity-80"
                >
                  {content}
                </a>
              )
            }

            return (
              <div key={id} className="block">
                {content}
              </div>
            )
          })}
        </div>
      </MotionSection>

      {/* 3. Featured menu teaser */}
      <MotionSection className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-20">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Featured"
            title="A taste of the menu"
            subtitle="Placeholder featured dishes — swap names and prices when ready."
            className="mb-0"
          />
          <Link to="/menu" className="shrink-0">
            <Button variant="outline">See Full Menu</Button>
          </Link>
        </div>

        <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-thin md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {featuredMenu.map((item) => (
            <article
              key={item.name}
              className="w-[78vw] max-w-xs shrink-0 snap-start sm:w-72 md:w-auto md:max-w-none"
            >
              <SmartImage
                src={item.image}
                alt={item.name}
                width={640}
                height={480}
                className="aspect-[4/3]"
                imgClassName="object-cover transition duration-500 hover:scale-105"
              />
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="font-display text-xl text-primary">{item.name}</h3>
                <span className="font-sans text-sm font-medium text-secondary">
                  {item.price}
                </span>
              </div>
            </article>
          ))}
        </div>
      </MotionSection>

      {/* 4. About teaser */}
      <MotionSection className="border-y border-primary/10 bg-primary/[0.03]">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:gap-14 md:px-6 md:py-20">
          <SmartImage
            src={aboutImage}
            alt="Matcha latte served at wolly."
            width={640}
            height={800}
            className="aspect-[4/5] md:order-1"
            imgClassName="object-cover"
          />
          <div className="md:order-2">
            <SectionHeading
              eyebrow="About"
              title="Our story"
              className="mb-5"
            />
            <p className="font-sans text-base leading-relaxed text-primary/75">
              {siteConfig.aboutTeaser}
            </p>
            <Link to="/about" className="mt-8 inline-block">
              <Button variant="outline">Read More</Button>
            </Link>
          </div>
        </div>
      </MotionSection>

      {/* 5. Events / specials banner */}
      <MotionSection className="bg-secondary">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8 md:flex-row md:items-stretch md:gap-0 md:divide-x md:divide-primary/15 md:px-6 md:py-10">
          {siteConfig.specials.map((special) => (
            <div key={special.id} className="min-w-0 flex-1 md:px-6 first:md:pl-0 last:md:pr-0">
              <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-primary/80">
                {special.label}
              </p>
              <p className="mt-2 font-display text-lg text-primary md:text-xl">
                {special.detail}
              </p>
            </div>
          ))}
        </div>
      </MotionSection>

      {/* 6. Footer CTA */}
      <MotionSection className="bg-primary text-background">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-4 py-16 md:flex-row md:items-center md:px-6 md:py-20">
          <div>
            <h2 className="font-display text-3xl font-medium md:text-4xl">
              Come sit with us
            </h2>
            <p className="mt-3 font-sans text-sm text-background/85 md:text-base">
              {hoursLine.days} · {hoursLine.time}
            </p>
            <p className="mt-1 font-sans text-sm text-background/85">
              {siteConfig.address.full}
            </p>
          </div>
          <Link to="/reservations">
            <Button variant="secondary">Reserve a Table</Button>
          </Link>
        </div>
      </MotionSection>
    </>
  )
}
