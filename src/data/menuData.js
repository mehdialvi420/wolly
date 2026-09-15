import acaiBowl from '../assets/images/acai-bowl.jpg'
import cinnamonBun from '../assets/images/cinnamon-bun.jpg'
import matchaLatte from '../assets/images/matcha-latte.jpg'
import pastramiSandwich from '../assets/images/pastrami-sandwich.jpg'
import pistachioCroissant from '../assets/images/pistachio-croissant.jpg'
import briocheKip from '../assets/images/brioche-krokante-kip.jpg'

/**
 * Menu data for wolly.
 *
 * Item shape:
 * {
 *   name: string,
 *   description: string,
 *   price: string, // use 'TBC' where PDF matching was unclear
 *   image?: import,
 *   tags?: Array<'veg' | 'vegan' | 'gluten-free' | 'spicy'>,
 *   featured?: boolean,
 * }
 *
 * FLAG — confirm before launch:
 * - Bowls: all prices TBC
 * - Mains & Sourdough Sandwiches: all prices TBC (raw page values: 7, 11, 12.5, 13, 13.5, 14.5, 14.5, 15, 15, 18)
 * - Sodas: Coca Cola/Zero & Ginger Beer inferred at €4
 */

export const menuData = [
  {
    category: 'Homemade Sweets',
    items: [
      {
        name: 'Blueberry Pecan Roll',
        description: 'White chocolate ganache',
        price: '€6.5',
        tags: ['veg'],
        image: cinnamonBun,
        featured: true,
      },
      {
        name: 'Croissant',
        description: 'Jam +€0.5',
        price: '€7',
        tags: ['veg'],
        image: pistachioCroissant,
        featured: true,
      },
      {
        name: 'Cookie',
        description: 'Changing flavours',
        price: '€4.5',
        tags: ['veg'],
      },
      {
        name: 'French Toast',
        description: 'Croissant-bread pudding, hangop yogurt, homemade jam',
        price: '€6',
        tags: ['veg'],
      },
    ],
  },
  {
    category: 'Bowls',
    items: [
      {
        name: 'Sunshine Smoothie Bowl',
        description: 'Mango & banana, seasonal fruits, granola, coconut flakes',
        price: 'TBC',
        tags: ['veg', 'vegan'],
        image: acaiBowl,
        featured: true,
      },
      {
        name: 'Oat Porridge',
        description:
          'Coconut milk, apple-ginger compote, pear, hangop yogurt, granola',
        price: 'TBC',
        tags: ['veg'],
      },
      {
        name: 'Overnight Pistachio Oats',
        description:
          'Chia & oat, pistachio paste, coconut milk, white chocolate, honey',
        price: 'TBC',
        tags: ['veg'],
      },
    ],
  },
  {
    category: 'Pancakes & Eggs',
    items: [
      {
        name: "Wolly's Pancakes",
        description: '3pc, butter & sweet syrup',
        price: '€10.5',
        tags: ['veg'],
      },
      {
        name: "Wolly's Eggs",
        description: 'Scrambled or sunny side up, sourdough or brioche',
        price: '€10.5',
        tags: ['veg'],
      },
    ],
  },
  {
    category: 'Toppings & Sides',
    items: [
      {
        name: 'Fresh seasonal fruits',
        description: 'Sweet topping',
        price: '€4',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Nutella',
        description: 'Sweet topping',
        price: '€2.5',
        tags: ['veg'],
      },
      {
        name: 'Peanut butter',
        description: 'Sweet topping',
        price: '€2',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Bacon',
        description: 'Savory side',
        price: '€4',
        tags: [],
      },
      {
        name: 'Smoked salmon',
        description: 'Savory side',
        price: '€4',
        tags: [],
      },
      {
        name: 'Extra egg',
        description: 'Savory side',
        price: '€3.2',
        tags: ['veg'],
      },
      {
        name: 'Spicy kimchi',
        description: 'Savory side',
        price: '€3.5',
        tags: ['veg', 'vegan', 'spicy'],
      },
      {
        name: 'Avocado',
        description: 'Savory side',
        price: '€3',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Crispy fried chicken',
        description: 'Savory side',
        price: '€4.5',
        tags: [],
      },
      {
        name: 'Young Gouda / aged Rotterdam cheese',
        description: 'Savory side',
        price: '€2.7',
        tags: ['veg'],
      },
      {
        name: 'Sautéed mushrooms',
        description: 'Savory side',
        price: '€3',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Sautéed spinach',
        description: 'Savory side',
        price: '€3',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Baked beans',
        description: 'Savory side',
        price: '€2.5',
        tags: ['veg', 'vegan'],
      },
    ],
  },
  {
    category: 'For the Kids',
    items: [
      {
        name: 'Mini Pancakes',
        description: '3pc, butter & syrup',
        price: '€6',
        tags: ['veg'],
      },
      {
        name: 'Mini Bagel',
        description: 'Cream cheese & cucumber OR peanut butter & banana',
        price: '€3.5',
        tags: ['veg'],
      },
      {
        name: 'Babyccino',
        description: '',
        price: 'Free',
        tags: ['veg'],
      },
    ],
  },
  {
    category: 'Mains & Sourdough Sandwiches',
    items: [
      {
        name: 'Crispy Chicken',
        description: 'Thigh, avocado cream, cole slaw',
        price: 'TBC',
        tags: [],
        image: briocheKip,
        featured: true,
      },
      {
        name: 'Slow Cooked Short Rib',
        description: '15hr, cole slaw, pickled onion, mini fries, peanut',
        price: 'TBC',
        tags: [],
      },
      {
        name: 'Eggs & Avo',
        description:
          'Scrambled eggs, avocado, chili oil, chives — add bacon/salmon +€4',
        price: 'TBC',
        tags: ['veg'],
      },
      {
        name: 'Miso Mushroom',
        description:
          'Miso glaze, Chinese cabbage, pickled cucumber, sesame, broad beans, edamame',
        price: 'TBC',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'The Big Pastrami',
        description: "Pastrami, Gouda, pickles, Wolly's mayo",
        price: 'TBC',
        tags: [],
        image: pastramiSandwich,
        featured: true,
      },
      {
        name: 'Kimchi Grilled Cheese',
        description: 'Kimchi, cheddar & Gouda, basil, sesame, honey',
        price: 'TBC',
        tags: ['veg', 'spicy'],
      },
      {
        name: 'Nordic Tosti',
        description: 'Smoked salmon, herb cream cheese, Gouda, red pepper, dill',
        price: 'TBC',
        tags: [],
      },
    ],
  },
  {
    category: 'Bites to Share',
    items: [
      {
        name: 'Fries',
        description: 'Rosemary & garlic oil, dill mayo',
        price: '€5',
        tags: ['veg'],
      },
      {
        name: 'Truffle Croquettes',
        description: 'Panko, truffle ragout, mustard; parmesan +€1',
        price: '€3.5',
        tags: ['veg'],
      },
      {
        name: 'Sicilian Nocellara Olives',
        description: 'Olive oil, citrus zest',
        price: '€4',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Sourdough & Whipped Miso Butter',
        description: 'Browned butter, Shiro miso, honey, sea salt',
        price: '€12',
        tags: ['veg'],
      },
    ],
  },
  {
    category: 'Breakfast Deal',
    items: [
      {
        name: 'Breakfast Deal',
        description:
          'Served until 10:00 — filter coffee/tea, fresh OJ, mini croissant, toast with sunny-side egg & avocado cream, mini fruit bowl',
        price: '€9.9',
        tags: ['veg'],
      },
    ],
  },
  {
    category: 'Runners Deal',
    items: [
      {
        name: 'Runners Deal',
        description:
          'Served until 10:00 — filter coffee/tea, fresh OJ, mini croissant, power oatmeal bowl, brioche with scrambled eggs',
        price: '€9.9',
        tags: ['veg'],
      },
    ],
  },
  {
    category: 'Hot Coffee',
    items: [
      {
        name: 'Filter Coffee',
        description: '1× free refill with food',
        price: '€3.8',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Espresso',
        description: 'Single / double',
        price: '€3.4 / €4.5',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Cappuccino',
        description: 'Regular / large',
        price: '€4.3 / €5.7',
        tags: ['veg'],
      },
      {
        name: 'Café Latte',
        description: 'Regular / large',
        price: '€4.6 / €6',
        tags: ['veg'],
      },
      {
        name: 'Flat White',
        description: '',
        price: '€4.8',
        tags: ['veg'],
      },
    ],
  },
  {
    category: 'Hot Tea',
    items: [
      {
        name: 'Matcha Latte',
        description: '',
        price: '€6',
        tags: ['veg'],
        image: matchaLatte,
        featured: true,
      },
      {
        name: 'Chai Latte',
        description: '',
        price: '€4.8',
        tags: ['veg'],
      },
      {
        name: 'Earl Grey / Green White / Green Sencha Yuzu',
        description: '',
        price: '€4.1',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Rooibos Fig / Jasmine',
        description: '',
        price: '€4.3',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Fresh Ginger Orange or Fresh Mint',
        description: '',
        price: '€6.5',
        tags: ['veg', 'vegan'],
      },
    ],
  },
  {
    category: 'Cold Specials',
    items: [
      {
        name: 'Avogato Latte',
        description: '',
        price: '€5.5',
        tags: ['veg'],
      },
      {
        name: 'Iced Popcorn Latte',
        description: '',
        price: '€5',
        tags: ['veg'],
      },
      {
        name: 'Iced Latte',
        description: '',
        price: '€6',
        tags: ['veg'],
      },
      {
        name: 'Coco Cloud',
        description: '',
        price: '€6.5',
        tags: ['veg'],
      },
      {
        name: 'Berry Iced Matcha Latte',
        description: '',
        price: '€6.2',
        tags: ['veg'],
      },
      {
        name: 'Iced Matcha Latte',
        description: '',
        price: '€4.5',
        tags: ['veg'],
      },
    ],
  },
  {
    category: 'Sodas',
    items: [
      {
        name: 'Sparkling / Still 0.5L',
        description: '',
        price: '€3.5',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Coca Cola / Zero',
        description: 'Price inferred from PDF — confirm',
        price: '€4',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Ginger Beer',
        description: 'Price inferred from PDF — confirm',
        price: '€4',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Filtered tap water',
        description: '',
        price: 'Free',
        tags: ['veg', 'vegan'],
      },
    ],
  },
  {
    category: 'Cocktails',
    items: [
      { name: 'Mimosa', description: '', price: '€10', tags: ['veg'] },
      { name: 'Aperol Spritz', description: '', price: '€9.5', tags: ['veg'] },
      {
        name: 'Limoncello Spritz',
        description: '',
        price: '€9.5',
        tags: ['veg'],
      },
      { name: 'Bloody Wolly', description: '', price: '€10', tags: ['veg'] },
      {
        name: 'Negroni Sbagliato',
        description: '',
        price: '€10',
        tags: ['veg'],
      },
    ],
  },
  {
    category: 'Juices',
    items: [
      {
        name: 'Juice of the Week',
        description: '',
        price: '€6',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Fresh Orange Juice',
        description: '',
        price: '€5',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Ginger Shot',
        description: '',
        price: '€3.5',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Tomato Juice',
        description: '',
        price: '€4.5',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Apple Juice',
        description: '',
        price: '€3.7',
        tags: ['veg', 'vegan'],
      },
    ],
  },
  {
    category: 'Lemonades',
    items: [
      {
        name: "Wolly's Lemonade Green",
        description: '',
        price: '€5',
        tags: ['veg', 'vegan'],
      },
      {
        name: "Wolly's Lemonade Pink",
        description: '',
        price: '€5',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Brazilian Lemonade',
        description: '',
        price: '€5.2',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Kombucha',
        description: '',
        price: '€6.8',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Homemade Ice Tea',
        description: '',
        price: '€4.7',
        tags: ['veg', 'vegan'],
      },
    ],
  },
  {
    category: 'Beers',
    items: [
      {
        name: 'Pils (Noam)',
        description: '',
        price: '€5.5',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Craft Beer',
        description: '',
        price: '€5.8',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Non-Alcoholic / Low-Alcohol',
        description: '',
        price: '€5.8',
        tags: ['veg', 'vegan'],
      },
    ],
  },
  {
    category: 'Wines',
    items: [
      {
        name: 'Rin Tin Tin, Vinho Verde',
        description: 'White — glass | bottle',
        price: '€5.5 | €27.5',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Vinalonga, Albariño',
        description: 'White — glass | bottle',
        price: '€7 | €35',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Esporão Reserva',
        description: 'White — bottle only',
        price: '€45',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Greg & Juju',
        description: 'Rosé — glass | bottle',
        price: '€5.5 | €27.5',
        tags: ['veg', 'vegan'],
      },
      {
        name: 'Cote Mas Orange',
        description: 'Orange wine — bottle only',
        price: '€45',
        tags: ['veg', 'vegan'],
      },
    ],
  },
]

export function categoryId(category) {
  return category
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const featuredMenu = menuData
  .flatMap((group) => group.items)
  .filter((item) => item.featured)
