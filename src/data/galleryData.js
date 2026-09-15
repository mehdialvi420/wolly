import exterior from '../assets/images/exterior.jpg'
import acaiBowl from '../assets/images/acai-bowl.jpg'
import cinnamonBun from '../assets/images/cinnamon-bun.jpg'
import matchaLatte from '../assets/images/matcha-latte.jpg'
import pastramiSandwich from '../assets/images/pastrami-sandwich.jpg'
import pistachioCroissant from '../assets/images/pistachio-croissant.jpg'
import briocheKip from '../assets/images/brioche-krokante-kip.jpg'

/**
 * Gallery items — replace with real photos in src/assets/images/gallery/
 * category: 'Food' | 'Interior' | 'Events'
 */
export const galleryCategories = ['All', 'Food', 'Interior', 'Events']

export const galleryItems = [
  {
    id: 'acai-bowl',
    src: acaiBowl,
    alt: 'Açai bowl',
    category: 'Food',
    span: 'tall',
  },
  {
    id: 'exterior',
    src: exterior,
    alt: 'wolly. exterior',
    category: 'Interior',
    span: 'wide',
  },
  {
    id: 'cinnamon-bun',
    src: cinnamonBun,
    alt: 'Cinnamon bun',
    category: 'Food',
    span: 'square',
  },
  {
    id: 'matcha-latte',
    src: matchaLatte,
    alt: 'Matcha latte',
    category: 'Food',
    span: 'square',
  },
  {
    id: 'pastrami',
    src: pastramiSandwich,
    alt: 'Pastrami sandwich',
    category: 'Food',
    span: 'tall',
  },
  {
    id: 'pistachio-croissant',
    src: pistachioCroissant,
    alt: 'Pistachio croissant',
    category: 'Food',
    span: 'square',
  },
  {
    id: 'brioche-kip',
    src: briocheKip,
    alt: 'Brioche krokante kip',
    category: 'Food',
    span: 'wide',
  },
  {
    id: 'events-placeholder',
    src: cinnamonBun,
    alt: 'Events placeholder',
    category: 'Events',
    span: 'square',
  },
  {
    id: 'interior-placeholder',
    src: exterior,
    alt: 'Interior placeholder',
    category: 'Interior',
    span: 'tall',
  },
]
