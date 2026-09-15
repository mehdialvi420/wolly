import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import PageMeta from '../components/seo/PageMeta'
import Button from '../components/ui/Button'
import { siteConfig } from '../data/siteConfig'

export default function Order() {
  return (
    <>
      <PageMeta
        title={siteConfig.seo.pages.order.title}
        description={siteConfig.seo.pages.order.description}
        path="/order"
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(122,139,111,0.16),_transparent_55%)]" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-20 text-center md:px-6 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex w-full flex-col items-center"
          >
            <div className="mb-8 flex h-16 w-16 items-center justify-center border border-accent/40 bg-accent/15 text-primary">
              <ShoppingBag size={28} strokeWidth={1.5} aria-hidden="true" />
            </div>

            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              Order
            </p>
            <h1 className="mt-3 font-display text-3xl font-medium text-primary sm:text-4xl md:text-5xl">
              Online Ordering — Coming Soon
            </h1>
            <p className="mt-5 max-w-lg font-sans text-base leading-relaxed text-primary/70">
              Order in person for dine-in or takeaway — online ordering launches
              soon.
            </p>

            <div className="mt-4 max-w-md border border-primary/10 bg-background/80 px-5 py-4 font-sans text-sm text-primary/65">
              Visit us at {siteConfig.address.full} · {siteConfig.hoursSummary}
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link to="/menu">
                <Button>View menu</Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline">Contact us</Button>
              </Link>
            </div>

            <p className="mt-10 font-sans text-sm text-primary/55">
              Questions about takeaway? Call{' '}
              <a
                href={`tel:${siteConfig.phoneHref}`}
                className="text-primary underline decoration-secondary/60 underline-offset-2 hover:text-secondary"
              >
                {siteConfig.phone}
              </a>{' '}
              or DM{' '}
              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline decoration-secondary/60 underline-offset-2 hover:text-secondary"
              >
                {siteConfig.social.handle}
              </a>
              .
            </p>
          </motion.div>
        </div>
      </section>
    </>
  )
}
