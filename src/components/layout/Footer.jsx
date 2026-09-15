import { Link } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'

function InstagramIcon({ size = 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  const { street, zip, city } = siteConfig.address

  return (
    <footer className="border-t border-primary/10 bg-primary text-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3 md:px-6">
        <div>
          <Link to="/" className="font-display text-2xl font-semibold">
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-background/70">
            {siteConfig.tagline}
          </p>
        </div>

        <div>
          <h3 className="font-display text-lg">Hours & location</h3>
          <p className="mt-3 font-sans text-sm text-background/90">
            {siteConfig.hoursSummary}
          </p>
          <ul className="mt-4 space-y-1.5 font-sans text-sm text-background/60">
            {siteConfig.hours.map((row) => (
              <li
                key={row.days}
                className="flex items-baseline justify-between gap-4"
              >
                <span>{row.days}</span>
                <span className="text-background/85">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg">Visit</h3>
          <address className="mt-3 not-italic font-sans text-sm leading-relaxed text-background/70">
            <p>{street}</p>
            <p>
              {zip} {city}
            </p>
            <p className="mt-3">
              <a href={`tel:${siteConfig.phoneHref}`} className="hover:text-secondary">
                {siteConfig.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${siteConfig.email}`} className="hover:text-secondary">
                {siteConfig.email}
              </a>
            </p>
          </address>

          <div className="mt-5 flex flex-col gap-3">
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 text-background/70 transition hover:text-secondary"
            >
              <InstagramIcon size={20} />
              <span className="font-sans text-sm">{siteConfig.social.handle}</span>
            </a>
            <Link
              to="/contact"
              className="font-sans text-sm text-background/70 transition hover:text-secondary"
            >
              Contact & map →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-background/10">
        <p className="mx-auto max-w-6xl px-4 py-5 font-sans text-xs text-background/50 md:px-6">
          © {year} {siteConfig.name} All rights reserved.
        </p>
      </div>
    </footer>
  )
}
