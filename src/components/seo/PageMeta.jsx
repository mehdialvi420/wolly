import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../../data/siteConfig'

/**
 * Centralized page titles + meta descriptions for every route.
 */
export default function PageMeta({ title, description, path = '' }) {
  const fullTitle = title.includes(siteConfig.name)
    ? title
    : `${title} | ${siteConfig.name}`
  const desc = description || siteConfig.seo.defaultDescription
  const url = `${siteConfig.seo.siteUrl}${path}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
