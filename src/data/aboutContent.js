import heroCafe from '../assets/images/about/hero-cafe.jpg'
import chefPhoto from '../assets/images/about/chef.jpg'
import ambiance1 from '../assets/images/about/ambiance-1.jpg'
import ambiance2 from '../assets/images/about/ambiance-2.jpg'
import ambiance3 from '../assets/images/about/ambiance-3.jpg'
import ambiance4 from '../assets/images/about/ambiance-4.jpg'

/**
 * About page content — images live under src/assets/images/about/
 */
export const aboutContent = {
  heroImage: heroCafe,
  heroAlt: 'Bright cafe interior at wolly.',
  story: {
    title: 'Our Story',
    paragraphs: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident — placeholder story copy.',
    ],
  },
  chef: {
    name: 'Chef Name',
    role: 'Head Chef',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Placeholder chef bio — share a short story about the kitchen, inspiration, and what makes wolly. special.',
    image: chefPhoto,
  },
  ambiance: [
    { src: ambiance1, alt: 'Cafe seating in soft daylight' },
    { src: ambiance2, alt: 'Coffee being prepared at the bar' },
    { src: ambiance3, alt: 'Brunch table setting' },
    { src: ambiance4, alt: 'Fresh bakery pastries' },
  ],
  values: [
    {
      id: 'locally-sourced',
      title: 'Locally Sourced',
      detail: 'Placeholder — ingredients from nearby makers and markets.',
    },
    {
      id: 'handmade-daily',
      title: 'Handmade Daily',
      detail: 'Placeholder — bakery and brunch prepared fresh each morning.',
    },
    {
      id: 'cozy-atmosphere',
      title: 'Cozy Atmosphere',
      detail: 'Placeholder — a calm waterside spot to linger over coffee.',
    },
  ],
}
