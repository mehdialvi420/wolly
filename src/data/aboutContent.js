import exterior from '../assets/images/exterior.jpg'
import acaiBowl from '../assets/images/acai-bowl.jpg'
import cinnamonBun from '../assets/images/cinnamon-bun.jpg'
import matchaLatte from '../assets/images/matcha-latte.jpg'
import pastramiSandwich from '../assets/images/pastrami-sandwich.jpg'
import pistachioCroissant from '../assets/images/pistachio-croissant.jpg'
import briocheKip from '../assets/images/brioche-krokante-kip.jpg'

/**
 * About page content — replace copy and swap images under src/assets/images/about/
 */
export const aboutContent = {
  heroImage: exterior,
  heroAlt: 'wolly. exterior — placeholder ambiance photo',
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
    image: matchaLatte,
  },
  ambiance: [
    { src: exterior, alt: 'Cafe exterior placeholder' },
    { src: cinnamonBun, alt: 'Warm pastry moment placeholder' },
    { src: pastramiSandwich, alt: 'Table setting placeholder' },
    { src: pistachioCroissant, alt: 'Brunch detail placeholder' },
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
