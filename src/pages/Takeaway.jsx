import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import PageMeta from '../components/seo/PageMeta'
import SectionHeading from '../components/ui/SectionHeading'
import Button from '../components/ui/Button'
import Badge from '../components/ui/Badge'
import SmartImage from '../components/ui/SmartImage'
import { siteConfig } from '../data/siteConfig'
import { menuData, takeawayItems } from '../data/menuData'

const inputClass =
  'w-full border border-primary/15 bg-background px-4 py-3 font-sans text-sm outline-none transition focus:border-secondary focus-visible:ring-2 focus-visible:ring-secondary'

const emptyDetails = {
  name: '',
  email: '',
  phone: '',
  pickupTime: '',
  notes: '',
}

export default function Takeaway() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState({})
  const [details, setDetails] = useState(emptyDetails)
  const [submitted, setSubmitted] = useState(false)

  const categories = useMemo(
    () => ['All', ...menuData.map((group) => group.category)],
    [],
  )

  const visibleItems = useMemo(() => {
    if (activeCategory === 'All') return takeawayItems
    return takeawayItems.filter((item) => item.category === activeCategory)
  }, [activeCategory])

  const cartLines = useMemo(() => {
    return Object.entries(cart)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => {
        const item = takeawayItems.find((entry) => entry.id === id)
        return item ? { ...item, qty } : null
      })
      .filter(Boolean)
  }, [cart])

  const cartCount = cartLines.reduce((sum, line) => sum + line.qty, 0)

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const next = { ...prev }
      const value = (next[id] || 0) + delta
      if (value <= 0) delete next[id]
      else next[id] = value
      return next
    })
  }

  const updateDetail = (field) => (event) => {
    setDetails((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!cartLines.length) return
    if (!details.name.trim() || !details.email.trim() || !details.phone.trim()) return

    const orderLines = cartLines
      .map((line) => `- ${line.qty}× ${line.name} (${line.price})`)
      .join('\n')

    const subject = encodeURIComponent(
      `Takeaway order — ${details.name.trim()} (${cartCount} items)`,
    )
    const body = encodeURIComponent(
      [
        'New takeaway order',
        '',
        'Customer',
        `Name: ${details.name.trim()}`,
        `Email: ${details.email.trim()}`,
        `Phone: ${details.phone.trim()}`,
        `Preferred pickup time: ${details.pickupTime || 'ASAP / flexible'}`,
        details.notes.trim() ? `Notes: ${details.notes.trim()}` : null,
        '',
        'Items',
        orderLines,
        '',
        `Sent from the ${siteConfig.name} website`,
      ]
        .filter(Boolean)
        .join('\n'),
    )

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <>
      <PageMeta
        title={siteConfig.seo.pages.takeaway?.title || 'Take Away'}
        description={
          siteConfig.seo.pages.takeaway?.description ||
          siteConfig.seo.pages.order.description
        }
        path="/takeaway"
      />

      <section className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <SectionHeading
          as="h1"
          eyebrow="Take away"
          title="Order for pickup"
          subtitle={`Select your food, add your details, and we’ll prep it for pickup at ${siteConfig.address.full}.`}
        />
      </section>

      {submitted ? (
        <section className="mx-auto max-w-2xl px-4 pb-20 md:px-6">
          <div className="border border-accent/30 bg-accent/10 px-6 py-10 text-center">
            <ShoppingBag className="mx-auto text-accent" size={28} />
            <h2 className="mt-4 font-display text-2xl text-primary md:text-3xl">
              Order ready to send
            </h2>
            <p className="mt-3 font-sans text-sm leading-relaxed text-primary/70">
              Your email app should open with the takeaway order for{' '}
              <a
                href={`mailto:${siteConfig.email}`}
                className="underline decoration-secondary underline-offset-2 hover:text-secondary"
              >
                {siteConfig.email}
              </a>
              . Send it to confirm — we&apos;ll follow up if needed.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-6"
              onClick={() => {
                setSubmitted(false)
                setCart({})
                setDetails(emptyDetails)
              }}
            >
              Start a new order
            </Button>
          </div>
        </section>
      ) : (
        <section className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:px-6">
          {/* Menu picker */}
          <div>
            <div
              className="mb-6 flex gap-2 overflow-x-auto pb-1"
              role="tablist"
              aria-label="Takeaway categories"
            >
              {categories.map((category) => {
                const isActive = activeCategory === category
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`shrink-0 whitespace-nowrap px-3 py-2 font-sans text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
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

            <div className="space-y-3">
              {visibleItems.map((item) => {
                const qty = cart[item.id] || 0
                return (
                  <article
                    key={item.id}
                    className="flex gap-3 border border-primary/10 bg-background p-3 sm:gap-4 sm:p-4"
                  >
                    {item.image ? (
                      <SmartImage
                        src={item.image}
                        alt={item.name}
                        width={160}
                        height={160}
                        className="h-20 w-20 shrink-0 sm:h-24 sm:w-24"
                        imgClassName="object-cover"
                      />
                    ) : (
                      <div className="h-20 w-20 shrink-0 bg-secondary/30 sm:h-24 sm:w-24" />
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="font-display text-lg text-primary sm:text-xl">
                          {item.name}
                        </h3>
                        <span className="shrink-0 font-sans text-sm font-medium text-secondary">
                          {item.price}
                        </span>
                      </div>
                      {item.description ? (
                        <p className="mt-1 line-clamp-2 font-sans text-sm text-primary/65">
                          {item.description}
                        </p>
                      ) : null}
                      {item.tags?.length ? (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {item.tags.map((tag) => (
                            <Badge key={tag} tag={tag} />
                          ))}
                        </div>
                      ) : null}
                      <div className="mt-3 flex items-center gap-2">
                        {qty === 0 ? (
                          <Button
                            type="button"
                            variant="outline"
                            className="px-4 py-2 text-xs"
                            onClick={() => updateQty(item.id, 1)}
                          >
                            Add
                          </Button>
                        ) : (
                          <>
                            <button
                              type="button"
                              aria-label={`Decrease ${item.name}`}
                              className="inline-flex h-9 w-9 items-center justify-center border border-primary/15 text-primary hover:bg-primary/5"
                              onClick={() => updateQty(item.id, -1)}
                            >
                              <Minus size={16} />
                            </button>
                            <span className="min-w-6 text-center font-sans text-sm font-medium">
                              {qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase ${item.name}`}
                              className="inline-flex h-9 w-9 items-center justify-center border border-primary/15 text-primary hover:bg-primary/5"
                              onClick={() => updateQty(item.id, 1)}
                            >
                              <Plus size={16} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </div>

          {/* Cart + details */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="h-fit border border-primary/10 bg-primary/[0.03] p-5 md:sticky md:top-24 md:p-6"
          >
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-secondary" />
              <h2 className="font-display text-2xl text-primary">Your order</h2>
            </div>
            <p className="mt-1 font-sans text-sm text-primary/60">
              {cartCount === 0
                ? 'No items yet — add food from the list.'
                : `${cartCount} item${cartCount === 1 ? '' : 's'} selected`}
            </p>

            {cartLines.length > 0 ? (
              <ul className="mt-5 max-h-56 space-y-3 overflow-y-auto border-y border-primary/10 py-4">
                {cartLines.map((line) => (
                  <li
                    key={line.id}
                    className="flex items-start justify-between gap-3 font-sans text-sm"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-primary">
                        {line.qty}× {line.name}
                      </p>
                      <p className="text-primary/55">{line.price}</p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${line.name}`}
                      className="shrink-0 p-1 text-primary/45 hover:text-primary"
                      onClick={() =>
                        setCart((prev) => {
                          const next = { ...prev }
                          delete next[line.id]
                          return next
                        })
                      }
                    >
                      <Trash2 size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <div>
                <label htmlFor="tw-name" className="mb-1 block font-sans text-sm">
                  Name
                </label>
                <input
                  id="tw-name"
                  required
                  value={details.name}
                  onChange={updateDetail('name')}
                  className={inputClass}
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="tw-phone" className="mb-1 block font-sans text-sm">
                  Contact number
                </label>
                <input
                  id="tw-phone"
                  type="tel"
                  required
                  value={details.phone}
                  onChange={updateDetail('phone')}
                  className={inputClass}
                  placeholder="+31 6 00 00 00 00"
                />
              </div>
              <div>
                <label htmlFor="tw-email" className="mb-1 block font-sans text-sm">
                  Email
                </label>
                <input
                  id="tw-email"
                  type="email"
                  required
                  value={details.email}
                  onChange={updateDetail('email')}
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="tw-time" className="mb-1 block font-sans text-sm">
                  Preferred pickup time
                </label>
                <input
                  id="tw-time"
                  type="time"
                  value={details.pickupTime}
                  onChange={updateDetail('pickupTime')}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="tw-notes" className="mb-1 block font-sans text-sm">
                  Notes (optional)
                </label>
                <textarea
                  id="tw-notes"
                  rows={3}
                  value={details.notes}
                  onChange={updateDetail('notes')}
                  className={`${inputClass} resize-y`}
                  placeholder="Allergies, extra napkins…"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={cartCount === 0}
              >
                Proceed for take away
              </Button>
              <p className="font-sans text-xs text-primary/50">
                Opens an email with your order to {siteConfig.email}. Pay on
                pickup.
              </p>
            </form>

            <p className="mt-4 font-sans text-xs text-primary/55">
              Or call{' '}
              <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-secondary">
                {siteConfig.phone}
              </a>
              . Prefer the full menu?{' '}
              <Link to="/menu" className="underline underline-offset-2 hover:text-secondary">
                Browse menu
              </Link>
              .
            </p>
          </motion.aside>
        </section>
      )}
    </>
  )
}
