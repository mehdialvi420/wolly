import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from 'lucide-react'
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

const STEPS = [
  { id: 'select', label: 'Select food' },
  { id: 'details', label: 'Your details' },
  { id: 'review', label: 'Review' },
  { id: 'done', label: 'Confirmed' },
]

export default function Takeaway() {
  const [step, setStep] = useState(0)
  const [activeCategory, setActiveCategory] = useState('All')
  const [cart, setCart] = useState({})
  const [details, setDetails] = useState(emptyDetails)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const categoryRef = useRef(null)

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

  const updateCategoryScroll = () => {
    const el = categoryRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }

  useEffect(() => {
    const el = categoryRef.current
    if (!el) return

    updateCategoryScroll()
    el.addEventListener('scroll', updateCategoryScroll, { passive: true })
    window.addEventListener('resize', updateCategoryScroll)

    const onWheel = (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      if (el.scrollWidth <= el.clientWidth) return
      event.preventDefault()
      el.scrollLeft += event.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      el.removeEventListener('scroll', updateCategoryScroll)
      el.removeEventListener('wheel', onWheel)
      window.removeEventListener('resize', updateCategoryScroll)
    }
  }, [categories.length, step])

  const scrollCategories = (direction) => {
    const el = categoryRef.current
    if (!el) return
    el.scrollBy({ left: direction * Math.min(240, el.clientWidth * 0.7), behavior: 'smooth' })
  }

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

  const detailsValid =
    details.name.trim() && details.email.trim() && details.phone.trim()

  const openMailto = () => {
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
  }

  const confirmOrder = () => {
    setStep(3)
  }

  const resetOrder = () => {
    setStep(0)
    setCart({})
    setDetails(emptyDetails)
    setActiveCategory('All')
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

        {/* Progress flow */}
        <ol className="mt-8 flex flex-wrap items-center gap-2 sm:gap-0" aria-label="Order steps">
          {STEPS.map((s, index) => {
            const done = index < step
            const current = index === step
            return (
              <li key={s.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-2 py-1.5 sm:px-3 ${
                    current ? 'text-primary' : done ? 'text-secondary' : 'text-primary/35'
                  }`}
                >
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center font-sans text-xs font-medium ${
                      current
                        ? 'bg-primary text-background'
                        : done
                          ? 'bg-secondary text-background'
                          : 'bg-primary/10 text-primary/50'
                    }`}
                    aria-current={current ? 'step' : undefined}
                  >
                    {done ? <Check size={14} strokeWidth={2.5} /> : index + 1}
                  </span>
                  <span className="hidden font-sans text-sm sm:inline">{s.label}</span>
                </div>
                {index < STEPS.length - 1 ? (
                  <span
                    className={`mx-1 hidden h-px w-6 sm:mx-2 sm:block sm:w-10 md:w-14 ${
                      index < step ? 'bg-secondary' : 'bg-primary/15'
                    }`}
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            )
          })}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 md:px-6">
        <AnimatePresence mode="wait">
          {step === 0 ? (
            <motion.div
              key="select"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="min-w-0"
            >
              <div className="relative mb-6 min-w-0">
                {canScrollLeft ? (
                  <button
                    type="button"
                    aria-label="Scroll categories left"
                    onClick={() => scrollCategories(-1)}
                    className="absolute left-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center border border-primary/15 bg-background text-primary shadow-sm hover:bg-primary/5 sm:inline-flex"
                  >
                    <ChevronLeft size={18} />
                  </button>
                ) : null}
                {canScrollRight ? (
                  <button
                    type="button"
                    aria-label="Scroll categories right"
                    onClick={() => scrollCategories(1)}
                    className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center border border-primary/15 bg-background text-primary shadow-sm hover:bg-primary/5 sm:inline-flex"
                  >
                    <ChevronRight size={18} />
                  </button>
                ) : null}

                <div
                  ref={categoryRef}
                  className="flex touch-pan-x gap-2 overflow-x-auto overscroll-x-contain scroll-smooth px-0 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:px-11 [&::-webkit-scrollbar]:hidden"
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

              <div className="sticky bottom-4 z-20 mt-8 flex items-center justify-between gap-4 border border-primary/10 bg-background/95 p-4 backdrop-blur">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-sans text-sm font-medium text-primary">
                    <ShoppingBag size={16} className="shrink-0 text-secondary" />
                    {cartCount === 0
                      ? 'No items yet'
                      : `${cartCount} item${cartCount === 1 ? '' : 's'} selected`}
                  </p>
                  <p className="mt-0.5 truncate font-sans text-xs text-primary/55">
                    Next: enter pickup details
                  </p>
                </div>
                <Button
                  type="button"
                  disabled={cartCount === 0}
                  onClick={() => setStep(1)}
                >
                  Continue
                </Button>
              </div>
            </motion.div>
          ) : null}

          {step === 1 ? (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-xl"
            >
              <div className="mb-6 border border-primary/10 bg-primary/[0.03] p-4">
                <p className="font-sans text-sm text-primary/70">
                  {cartCount} item{cartCount === 1 ? '' : 's'} in your order
                </p>
                <ul className="mt-2 space-y-1 font-sans text-sm text-primary">
                  {cartLines.map((line) => (
                    <li key={line.id}>
                      {line.qty}× {line.name}
                    </li>
                  ))}
                </ul>
              </div>

              <form
                className="space-y-3"
                onSubmit={(event) => {
                  event.preventDefault()
                  if (!detailsValid) return
                  setStep(2)
                }}
              >
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

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(0)}
                  >
                    Back
                  </Button>
                  <Button type="submit" disabled={!detailsValid}>
                    Review order
                  </Button>
                </div>
              </form>
            </motion.div>
          ) : null}

          {step === 2 ? (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="mx-auto max-w-xl"
            >
              <div className="border border-primary/10 bg-background p-5 md:p-6">
                <h2 className="font-display text-2xl text-primary">Review your order</h2>
                <p className="mt-1 font-sans text-sm text-primary/60">
                  Check everything looks right, then confirm for pickup.
                </p>

                <ul className="mt-5 space-y-3 border-y border-primary/10 py-4">
                  {cartLines.map((line) => (
                    <li
                      key={line.id}
                      className="flex items-start justify-between gap-3 font-sans text-sm"
                    >
                      <div className="min-w-0">
                        <p className="font-medium text-primary">
                          {line.qty}× {line.name}
                        </p>
                        <p className="text-primary/55">{line.price} each</p>
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

                <dl className="mt-4 space-y-2 font-sans text-sm">
                  <div className="flex justify-between gap-4">
                    <dt className="text-primary/55">Name</dt>
                    <dd className="text-right font-medium text-primary">
                      {details.name}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-primary/55">Phone</dt>
                    <dd className="text-right font-medium text-primary">
                      {details.phone}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-primary/55">Email</dt>
                    <dd className="text-right font-medium text-primary">
                      {details.email}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-primary/55">Pickup</dt>
                    <dd className="text-right font-medium text-primary">
                      {details.pickupTime || 'ASAP / flexible'}
                    </dd>
                  </div>
                  {details.notes.trim() ? (
                    <div className="flex justify-between gap-4">
                      <dt className="text-primary/55">Notes</dt>
                      <dd className="text-right text-primary">{details.notes}</dd>
                    </div>
                  ) : null}
                </dl>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="button"
                    disabled={cartCount === 0}
                    onClick={confirmOrder}
                  >
                    Confirm takeaway
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : null}

          {step === 3 ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="mx-auto max-w-xl"
            >
              <div className="border border-accent/30 bg-accent/10 px-6 py-10 text-center">
                <span className="mx-auto inline-flex h-12 w-12 items-center justify-center bg-secondary text-background">
                  <Check size={24} strokeWidth={2.5} />
                </span>
                <h2 className="mt-4 font-display text-2xl text-primary md:text-3xl">
                  Takeaway confirmed
                </h2>
                <p className="mt-3 font-sans text-sm leading-relaxed text-primary/70">
                  Thanks {details.name.trim()}. Your order is ready for the kitchen —
                  this is the demo confirmation step you can show clients.
                </p>

                <div className="mt-6 space-y-3 border border-primary/10 bg-background px-4 py-4 text-left">
                  <p className="font-sans text-xs font-medium uppercase tracking-wide text-primary/45">
                    Order summary
                  </p>
                  <ul className="space-y-1 font-sans text-sm text-primary">
                    {cartLines.map((line) => (
                      <li key={line.id}>
                        {line.qty}× {line.name}{' '}
                        <span className="text-primary/55">({line.price})</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-start gap-2 pt-2 font-sans text-sm text-primary/70">
                    <Clock size={16} className="mt-0.5 shrink-0 text-secondary" />
                    <span>
                      Pickup:{' '}
                      {details.pickupTime
                        ? details.pickupTime
                        : 'ASAP / flexible'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 font-sans text-sm text-primary/70">
                    <MapPin size={16} className="mt-0.5 shrink-0 text-secondary" />
                    <span>{siteConfig.address.full}</span>
                  </div>
                </div>

                <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                  <Button type="button" variant="outline" onClick={openMailto}>
                    Send by email
                  </Button>
                  <Button type="button" onClick={resetOrder}>
                    Start a new order
                  </Button>
                </div>
                <p className="mt-4 font-sans text-xs text-primary/50">
                  Email is optional for demos. Live orders can still go to{' '}
                  {siteConfig.email}.
                </p>
              </div>

              <p className="mt-6 text-center font-sans text-xs text-primary/55">
                Or call{' '}
                <a
                  href={`tel:${siteConfig.phoneHref}`}
                  className="hover:text-secondary"
                >
                  {siteConfig.phone}
                </a>
                . Prefer the full menu?{' '}
                <Link
                  to="/menu"
                  className="underline underline-offset-2 hover:text-secondary"
                >
                  Browse menu
                </Link>
                .
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </section>
    </>
  )
}
