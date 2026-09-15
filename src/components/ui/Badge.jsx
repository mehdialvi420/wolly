const variants = {
  default: 'bg-primary/10 text-primary',
  accent: 'bg-accent/25 text-[#3F4E38]',
  secondary: 'bg-secondary/25 text-primary',
  veg: 'bg-[#7A8B6F]/30 text-[#3F4E38]',
  vegan: 'bg-[#2F472C]/20 text-[#243820]',
  'gluten-free': 'bg-amber-500/25 text-amber-950',
  spicy: 'bg-red-600/15 text-red-800',
}

const tagLabels = {
  veg: 'Veg',
  vegan: 'Vegan',
  'gluten-free': 'Gluten-free',
  spicy: 'Spicy',
}

export default function Badge({ children, variant = 'default', tag, className = '' }) {
  const resolvedVariant = tag ?? variant
  const label = tag ? tagLabels[tag] ?? children : children

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 font-sans text-xs font-medium uppercase tracking-wide ${variants[resolvedVariant] ?? variants.default} ${className}`}
    >
      {label}
    </span>
  )
}
