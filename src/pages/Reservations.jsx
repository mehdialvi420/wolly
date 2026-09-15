import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import PageMeta from '../components/seo/PageMeta'
import Button from '../components/ui/Button'
import { siteConfig } from '../data/siteConfig'

export default function Reservations() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleNotify = (event) => {
    event.preventDefault()
    if (!email.trim()) return

    const subject = encodeURIComponent('Notify me — table reservations')
    const body = encodeURIComponent(
      `Please notify me when online table reservations launch.\n\nEmail: ${email.trim()}`,
    )
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <>
      <PageMeta
        title={siteConfig.seo.pages.reservations.title}
        description={siteConfig.seo.pages.reservations.description}
        path="/reservations"
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,109,0.18),_transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center md:px-6 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col items-center"
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center border border-secondary/40 bg-secondary/20 text-primary">
              <Calendar size={28} strokeWidth={1.5} aria-hidden="true" />
            </div>

            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Reservations
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium text-primary sm:text-4xl md:text-5xl">
              Table Reservations — Coming Soon
            </h1>
            <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-primary/70">
              We&apos;re putting the finishing touches on online booking. In the
              meantime, reach out by phone, email, or Instagram and we&apos;ll
              save you a spot.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact">
                <Button>Contact us</Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline">View menu</Button>
              </Link>
            </div>

            <div className="mt-14 w-full max-w-md border border-primary/10 bg-background/80 px-5 py-6 text-left sm:px-6">
              <h2 className="font-display text-xl text-primary">
                Notify me when this launches
              </h2>
              <p className="mt-2 font-sans text-sm text-primary/65">
                Leave your email and we&apos;ll open a message to{' '}
                {siteConfig.email} — or DM us on Instagram.
              </p>

              {submitted ? (
                <p className="mt-5 font-sans text-sm text-accent">
                  Thanks — your email app should open next. Prefer Instagram?{' '}
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-secondary underline-offset-2 hover:text-secondary"
                  >
                    {siteConfig.social.handle}
                  </a>
                </p>
              ) : (
                <form onSubmit={handleNotify} className="mt-5 flex flex-col gap-3 sm:flex-row">
                  <label htmlFor="notify-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="notify-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full flex-1 border border-primary/15 bg-background px-4 py-3 font-sans text-sm outline-none transition focus:border-secondary"
                  />
                  <Button type="submit" className="shrink-0 sm:self-stretch">
                    Notify me
                  </Button>
                </form>
              )}

              <p className="mt-4 font-sans text-xs text-primary/50">
                Or message us anytime:{' '}
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="hover:text-secondary"
                >
                  {siteConfig.phone}
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
