import { useState } from 'react'

/**
 * Image with subtle skeleton shimmer while loading.
 * Pass width/height (intrinsic) to reduce layout shift.
 */
export default function SmartImage({
  src,
  alt,
  className = '',
  imgClassName = '',
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  ...props
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-primary/5 ${className}`}>
      {!loaded ? (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-r from-primary/5 via-secondary/15 to-primary/5"
          aria-hidden="true"
        />
      ) : null}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full max-w-full transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
        {...props}
      />
    </div>
  )
}
