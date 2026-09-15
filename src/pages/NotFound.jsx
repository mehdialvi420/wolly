import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageMeta from '../components/seo/PageMeta'
import Button from '../components/ui/Button'
import { siteConfig } from '../data/siteConfig'

export default function NotFound() {
  return (
    <>
      <PageMeta
        title="Page not found"
        description={`The page you’re looking for doesn’t exist. Head back to ${siteConfig.name}.`}
        path="/404"
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,162,109,0.16),_transparent_55%)]" />
        <div className="relative mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
              404
            </p>
            <h1 className="mt-3 font-display text-4xl font-medium text-primary md:text-5xl">
              Page not found
            </h1>
            <p className="mt-4 font-sans text-base leading-relaxed text-primary/70">
              That link doesn&apos;t lead anywhere at {siteConfig.name}. Let&apos;s get
              you back to something tasty.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/">
                <Button>Back to Home</Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline">View menu</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
