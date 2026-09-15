export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`overflow-hidden border border-primary/10 bg-background ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
