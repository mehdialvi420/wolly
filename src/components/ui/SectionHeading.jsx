export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
  as: TitleTag = 'h2',
}) {
  const alignment =
    align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'

  return (
    <div className={`mb-10 flex max-w-2xl flex-col gap-3 ${alignment} ${className}`}>
      {eyebrow ? (
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-secondary">
          {eyebrow}
        </p>
      ) : null}
      <TitleTag className="font-display text-3xl font-medium text-primary md:text-4xl">
        {title}
      </TitleTag>
      {subtitle ? (
        <p className="font-sans text-base leading-relaxed text-primary/70">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
