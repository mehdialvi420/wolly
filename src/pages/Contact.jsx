import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail } from 'lucide-react'
import PageMeta from '../components/seo/PageMeta'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import { siteConfig } from '../data/siteConfig'

function InstagramIcon({ size = 20, className = '' }) {
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
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

const inputClass =
  'w-full border border-primary/15 bg-background px-4 py-3 font-sans text-sm outline-none transition focus:border-secondary'

export default function Contact() {
  const { street, zip, city, full } = siteConfig.address
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) return

    const subject = encodeURIComponent(`Message from ${name.trim()} — ${siteConfig.name}`)
    const body = encodeURIComponent(
      `${message.trim()}\n\n—\n${name.trim()}\n${email.trim()}`,
    )
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <>
      <PageMeta
        title={siteConfig.seo.pages.contact.title}
        description={siteConfig.seo.pages.contact.description}
        path="/contact"
      />

      <section className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <SectionHeading
          as="h1"
          eyebrow="Contact"
          title="Get in touch"
          subtitle="Questions, group bookings, or just say hi — we’d love to hear from you."
        />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Left: form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {sent ? (
              <div className="border border-accent/30 bg-accent/10 px-6 py-10">
                <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                  Sent
                </p>
                <h2 className="mt-3 font-display text-2xl text-primary md:text-3xl">
                  Thanks, we&apos;ll get back to you
                </h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-primary/70">
                  Your email app should open with the message ready to send. If it
                  didn&apos;t, write us at{' '}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-primary underline decoration-secondary underline-offset-2 hover:text-secondary"
                  >
                    {siteConfig.email}
                  </a>
                  .
                </p>
                <Button
                  type="button"
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSent(false)
                    setName('')
                    setEmail('')
                    setMessage('')
                  }}
                >
                  Send another message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block font-sans text-sm">
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block font-sans text-sm">
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block font-sans text-sm"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={6}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="How can we help?"
                    className={`${inputClass} resize-y`}
                  />
                </div>
                <Button type="submit">Send Message</Button>
              </form>
            )}
          </motion.div>

          {/* Right: info card */}
          <motion.aside
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="border border-primary/10 bg-primary/[0.03] p-6 md:p-8"
          >
            <h2 className="font-display text-2xl text-primary">Visit {siteConfig.name}</h2>
            <p className="mt-1 font-sans text-sm text-primary/60">{siteConfig.tagline}</p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-secondary" size={18} />
                <address className="not-italic font-sans text-sm leading-relaxed text-primary/80">
                  <p>{street}</p>
                  <p>
                    {zip} {city}
                  </p>
                  <p>{siteConfig.address.country}</p>
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(full)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-secondary hover:underline"
                  >
                    Open in Maps
                  </a>
                </address>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 shrink-0 text-secondary" size={18} />
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="font-sans text-sm text-primary/80 hover:text-secondary"
                >
                  {siteConfig.phone}
                </a>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 shrink-0 text-secondary" size={18} />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="font-sans text-sm text-primary/80 hover:text-secondary"
                >
                  {siteConfig.email}
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-primary/10 pt-6">
              <h3 className="font-display text-lg text-primary">Opening hours</h3>
              <ul className="mt-3 space-y-2">
                {siteConfig.hours.map((row) => (
                  <li
                    key={row.days}
                    className="flex items-baseline justify-between gap-4 font-sans text-sm text-primary/75"
                  >
                    <span>{row.days}</span>
                    <span className="text-primary">{row.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 border-t border-primary/10 pt-6">
              <h3 className="font-display text-lg text-primary">Follow along</h3>
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-2 font-sans text-sm text-primary/80 transition hover:text-secondary"
              >
                <InstagramIcon size={20} />
                {siteConfig.social.handle}
              </a>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Map */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <h2 className="mb-4 font-display text-2xl text-primary">Find us</h2>
        <div className="overflow-hidden border border-primary/10 bg-primary/5">
          <iframe
            title={`Map — ${full}`}
            src={siteConfig.mapsEmbedUrl}
            className="h-[280px] w-full border-0 md:h-[400px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
        <p className="mt-3 font-sans text-xs text-primary/50">
          Map shows {full}. Update{' '}
          <code className="text-primary/70">mapsEmbedUrl</code> in siteConfig for
          the final Google Maps embed.
        </p>
      </section>
    </>
  )
}
