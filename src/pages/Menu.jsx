import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import PageMeta from '../components/seo/PageMeta'
import SectionHeading from '../components/ui/SectionHeading'
import Badge from '../components/ui/Badge'
import Card from '../components/ui/Card'
import SmartImage from '../components/ui/SmartImage'
import { siteConfig } from '../data/siteConfig'
import { menuData, categoryId } from '../data/menuData'

function matchesQuery(item, query) {
  if (!query) return true
  const q = query.trim().toLowerCase()
  if (!q) return true

  const nameHit = item.name?.toLowerCase().includes(q)
  const descHit = item.description?.toLowerCase().includes(q)
  const tagHit = (item.tags ?? []).some((tag) => {
    const label = tag.replace(/-/g, ' ')
    return tag.includes(q) || label.includes(q)
  })

  return Boolean(nameHit || descHit || tagHit)
}

function MenuItemCard({ item }) {
  return (
    <Card className="flex h-full min-w-0 flex-col">
      {item.image ? (
        <SmartImage
          src={item.image}
          alt={item.name}
          width={640}
          height={480}
          className="aspect-[4/3]"
          imgClassName="object-cover"
        />
      ) : null}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 break-words font-display text-xl text-primary">
            {item.name}
          </h3>
          <span
            className={`shrink-0 font-sans text-sm font-medium ${
              item.price === 'TBC' ? 'text-primary/45' : 'text-secondary'
            }`}
          >
            {item.price}
          </span>
        </div>
        {item.description ? (
          <p className="mt-2 font-sans text-sm leading-relaxed text-primary/70">
            {item.description}
          </p>
        ) : null}
        {item.tags?.length ? (
          <div className="mt-auto flex flex-wrap gap-2 pt-3">
            {item.tags.map((tag) => (
              <Badge key={tag} tag={tag} />
            ))}
          </div>
        ) : null}
      </div>
    </Card>
  )
}

export default function Menu() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState(menuData[0]?.category ?? '')

  const filteredGroups = useMemo(() => {
    return menuData
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => matchesQuery(item, query)),
      }))
      .filter((group) => {
        if (query.trim()) return group.items.length > 0
        return true
      })
  }, [query])

  useEffect(() => {
    const sections = filteredGroups.map((group) =>
      document.getElementById(categoryId(group.category)),
    )

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          const match = filteredGroups.find(
            (group) => categoryId(group.category) === visible.target.id,
          )
          if (match) setActiveCategory(match.category)
        }
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.35, 0.6] },
    )

    sections.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [filteredGroups])

  const scrollToCategory = (category) => {
    setActiveCategory(category)
    const el = document.getElementById(categoryId(category))
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 140
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <>
      <PageMeta
        title={siteConfig.seo.pages.menu.title}
        description={siteConfig.seo.pages.menu.description}
        path="/menu"
      />

      <section className="mx-auto max-w-6xl px-4 pt-12 md:px-6 md:pt-16">
        <SectionHeading
          as="h1"
          eyebrow="Menu"
          title="Our menu"
          subtitle="Browse by category or search by dish name and dietary tags."
        />

        <div className="relative mb-6">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary/40"
            size={18}
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes or tags (veg, vegan, gluten-free, spicy)…"
            className="w-full border border-primary/15 bg-background py-3 pl-10 pr-4 font-sans text-sm outline-none transition focus:border-secondary focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label="Search menu"
          />
        </div>
      </section>

      <div className="sticky top-[65px] z-40 border-y border-primary/10 bg-background">
        <div
          className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 md:px-6"
          role="tablist"
          aria-label="Menu categories"
        >
          {menuData.map((group) => {
            const isActive = activeCategory === group.category
            const disabled =
              Boolean(query.trim()) &&
              !filteredGroups.some((g) => g.category === group.category)

            return (
              <button
                key={group.category}
                type="button"
                role="tab"
                aria-selected={isActive}
                disabled={disabled}
                onClick={() => scrollToCategory(group.category)}
                className={`shrink-0 whitespace-nowrap px-3 py-2 font-sans text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary ${
                  isActive
                    ? 'bg-primary text-background'
                    : 'bg-primary/5 text-primary hover:bg-primary/10'
                } ${disabled ? 'cursor-not-allowed opacity-35' : ''}`}
              >
                {group.category}
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12 md:px-6 md:py-16">
        {filteredGroups.length === 0 ? (
          <p className="font-sans text-sm text-primary/70">
            No dishes match “{query}”. Try another name or dietary tag.
          </p>
        ) : (
          filteredGroups.map((group) => (
            <section
              key={group.category}
              id={categoryId(group.category)}
              className="scroll-mt-36"
            >
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-primary/10 pb-3">
                <h2 className="font-display text-2xl text-primary md:text-3xl">
                  {group.category}
                </h2>
                <span className="font-sans text-xs uppercase tracking-wider text-primary/45">
                  {group.items.length}{' '}
                  {group.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {group.items.length === 0 ? (
                <p className="font-sans text-sm text-primary/55">
                  Items for this category will appear here once the menu is
                  populated.
                </p>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((item) => (
                    <MenuItemCard
                      key={`${group.category}-${item.name}`}
                      item={item}
                    />
                  ))}
                </div>
              )}
            </section>
          ))
        )}
      </div>
    </>
  )
}
