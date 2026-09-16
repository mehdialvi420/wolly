import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'
import PageMeta from '../components/seo/PageMeta'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { siteConfig } from '../data/siteConfig'

const inputClass =
  'w-full border border-primary/15 bg-background px-4 py-3 font-sans text-sm outline-none transition focus:border-secondary focus-visible:ring-2 focus-visible:ring-secondary'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  guests: '2',
  date: '',
}

export default function Reservations() {
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(false)

  const minDate = useMemo(() => {
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  }, [])

  const updateField = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { name, email, phone, guests, date } = form
    if (!name.trim() || !email.trim() || !phone.trim() || !guests || !date) return

    const subject = encodeURIComponent(
      `Table reservation — ${guests} ${Number(guests) === 1 ? 'guest' : 'guests'} on ${date}`,
    )
    const body = encodeURIComponent(
      [
        'New table reservation request',
        '',
        `Name: ${name.trim()}`,
        `Email: ${email.trim()}`,
        `Phone: ${phone.trim()}`,
        `Guests: ${guests}`,
        `Date: ${date}`,
        '',
        `Sent from the ${siteConfig.name} website`,
      ].join('\n'),
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

      <section className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <SectionHeading
          as="h1"
          eyebrow="Reservations"
          title="Book a table"
          subtitle={`Reserve a spot at ${siteConfig.name}. We’re open every day ${siteConfig.hours[0]?.time ?? '08.00 – 16.00'}.`}
        />

        <div className="grid items-start gap-10 pb-16 lg:grid-cols-2 lg:gap-14 lg:pb-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {submitted ? (
              <div className="border border-accent/30 bg-accent/10 px-6 py-10">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Request ready
                </p>
                <h2 className="mt-3 font-display text-2xl text-primary md:text-3xl">
                  Thanks — check your email app
                </h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-primary/70">
                  Your reservation details should open in an email to{' '}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-primary underline decoration-secondary underline-offset-2 hover:text-secondary"
                  >
                    {siteConfig.email}
                  </a>
                  . Send it to confirm, and we&apos;ll get back to you.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSubmitted(false)
                    setForm(emptyForm)
                  }}
                >
                  Make another reservation
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="res-name" className="mb-1.5 block font-sans text-sm">
                    Name
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    required
                    autoComplete="name"
                    value={form.name}
                    onChange={updateField('name')}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="res-email" className="mb-1.5 block font-sans text-sm">
                      Email
                    </label>
                    <input
                      id="res-email"
                      type="email"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={updateField('email')}
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="res-phone" className="mb-1.5 block font-sans text-sm">
                      Contact number
                    </label>
                    <input
                      id="res-phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={form.phone}
                      onChange={updateField('phone')}
                      placeholder="+31 6 00 00 00 00"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="res-guests" className="mb-1.5 block font-sans text-sm">
                      Number of persons
                    </label>
                    <select
                      id="res-guests"
                      required
                      value={form.guests}
                      onChange={updateField('guests')}
                      className={inputClass}
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={String(n)}>
                          {n} {n === 1 ? 'person' : 'persons'}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="res-date" className="mb-1.5 block font-sans text-sm">
                      Date
                    </label>
                    <input
                      id="res-date"
                      type="date"
                      required
                      min={minDate}
                      value={form.date}
                      onChange={updateField('date')}
                      className={inputClass}
                    />
                  </div>
                </div>

                <Button type="submit" className="mt-2">
                  Request reservation
                </Button>
                <p className="font-sans text-xs text-primary/50">
                  This opens an email with your details — no online payment required.
                </p>
              </form>
            )}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="border border-primary/10 bg-primary/[0.03] p-6 md:p-8"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center border border-secondary/40 bg-secondary/20 text-primary">
              <Calendar size={22} strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl text-primary">Before you book</h2>
            <ul className="mt-4 space-y-3 font-sans text-sm leading-relaxed text-primary/75">
              <li>{siteConfig.hoursSummary}</li>
              <li>{siteConfig.address.full}</li>
              <li>
                Prefer to call?{' '}
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="text-primary underline decoration-secondary underline-offset-2 hover:text-secondary"
                >
                  {siteConfig.phone}
                </a>
              </li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/menu">
                <Button variant="outline">View menu</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">Contact</Button>
              </Link>
            </div>
          </motion.aside>
        </div>
      </section>
    </>
  )
}
