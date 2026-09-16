import food1 from '../assets/images/gallery/gallery-food-1.jpg'
import food2 from '../assets/images/gallery/gallery-food-2.jpg'
import food3 from '../assets/images/gallery/gallery-food-3.jpg'
import food4 from '../assets/images/gallery/gallery-food-4.jpg'
import food5 from '../assets/images/gallery/gallery-food-5.jpg'
import food6 from '../assets/images/gallery/gallery-food-6.jpg'
import interior1 from '../assets/images/gallery/gallery-interior-1.jpg'
import interior2 from '../assets/images/gallery/gallery-interior-2.jpg'
import events1 from '../assets/images/gallery/gallery-events-1.jpg'
import events2 from '../assets/images/gallery/gallery-events-2.jpg'

/**
 * Gallery items — photos in src/assets/images/gallery/
 * category: 'Food' | 'Interior' | 'Events'
 */
export const galleryCategories = ['All', 'Food', 'Interior', 'Events']

export const galleryItems = [
  {
    id: 'brunch-plate',
    src: food1,
    alt: 'Brunch plate with avocado toast and eggs',
    category: 'Food',
    span: 'tall',
  },
  {
    id: 'cafe-interior',
    src: interior1,
    alt: 'Bright cafe interior with wooden tables',
    category: 'Interior',
    span: 'wide',
  },
  {
    id: 'smoothie-bowl',
    src: food2,
    alt: 'Berry smoothie bowl with fresh fruit',
    category: 'Food',
    span: 'square',
  },
  {
    id: 'latte-pastry',
    src: food3,
    alt: 'Latte with heart art and pastry',
    category: 'Food',
    span: 'square',
  },
  {
    id: 'grilled-sandwich',
    src: food4,
    alt: 'Gourmet grilled sandwich',
    category: 'Food',
    span: 'tall',
  },
  {
    id: 'window-corner',
    src: interior2,
    alt: 'Cozy cafe corner by the window',
    category: 'Interior',
    span: 'tall',
  },
  {
    id: 'croissants',
    src: food5,
    alt: 'Fresh croissants on a bakery tray',
    category: 'Food',
    span: 'square',
  },
  {
    id: 'chicken-sandwich',
    src: food6,
    alt: 'Crispy chicken sandwich',
    category: 'Food',
    span: 'wide',
  },
  {
    id: 'friends-brunch',
    src: events1,
    alt: 'Friends sharing brunch together',
    category: 'Events',
    span: 'square',
  },
  {
    id: 'celebration-table',
    src: events2,
    alt: 'Celebration brunch table with drinks',
    category: 'Events',
    span: 'wide',
  },
]
