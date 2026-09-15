export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  const variants = {
    primary:
      'bg-primary text-background hover:bg-primary/90 focus-visible:ring-primary',
    secondary:
      'bg-secondary text-primary hover:bg-secondary/90 focus-visible:ring-secondary',
    outline:
      'border border-primary bg-transparent text-primary hover:bg-primary hover:text-background focus-visible:ring-primary',
    'outline-light':
      'border border-background/80 bg-transparent text-background hover:bg-background hover:text-primary focus-visible:ring-background',
    light:
      'bg-background text-primary hover:bg-background/90 focus-visible:ring-background',
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-6 py-3 font-sans text-sm font-medium tracking-wide transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
