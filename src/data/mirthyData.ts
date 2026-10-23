import { BrandConfig, MenuItem, CraftFeature } from '../types'

export const BRAND_CONFIG: BrandConfig = {
  name: 'MIRTHY',
  logo: '/Mirthylogo.jpg',
  motto: 'Layered with joy',
  tagline: 'Come for the desserts. Stay for the mirth.',
  subtagline: 'Layered with joy • Haute French Pâtisserie, Viennoiserie & Café Dining',
  locationBrief: 'Road No. 36, Jubilee Hills, Hyderabad',
  address: {
    line1: 'Ground Floor, Plot No. 726',
    line2: 'CBI Colony, Road No. 36',
    landmark: 'Near Vurve Salon & Check Post area',
    city: 'Hyderabad',
    state: 'Telangana',
    pincode: '500033',
    full: 'Ground Floor, Plot No. 726, Road No. 36 (near Vurve Salon), CBI Colony, Jubilee Hills, Hyderabad, Telangana 500033',
    mapCoordinates: {
      lat: 17.4382631,
      lng: 78.3987587
    },
    googleMapsUrl: 'https://maps.app.goo.gl/SgHixwNMjMhj3acP8?g_st=aw'
  },
  hours: {
    days: 'Monday – Sunday',
    time: '10:00 AM – 11:30 PM',
    openHour: 10,
    closeHour: 23.5
  },
  socials: {
    instagram: 'https://www.instagram.com/mirthycafe/',
    instagramHandle: '@mirthycafe',
    phone: '+91 91212 88440',
    whatsapp: 'https://wa.me/919121288440?text=Hello%20Mirthy%20Team%2C%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation%20or%20bespoke%20dessert.',
    email: 'hello@mirthycafe.com'
  }
}

export const SIGNATURE_DESSERTS: MenuItem[] = [
  {
    id: 'hazelnut-obsidian',
    name: 'Hazelnut Obsidian',
    frenchName: 'Obsidienne Noisette',
    category: 'entremets',
    price: 495,
    description: 'Our crowned signature entremet. Sculpted into an organic obsidian pebble, coated with jet-black mirror glaze, adorned with 24k gold leaf foil, encasing a silky 70% dark chocolate mousse and salted caramel center.',
    flavorNotes: ['Piedmont Hazelnut', '70% Valrhona Dark Mousse', 'Salted Fleur de Sel Caramel', 'Crisp Feuilletine Base'],
    dietary: ['Signature', 'Contains Nuts', 'Chef Special'],
    image: '/images/hazelnut_obsidian.jpg',
    layers: [
      'Obsidian Jet-Black Mirror Glaze with 24K Gold Foil',
      'Valrhona Guanaja 70% Dark Chocolate Mousse',
      'Slow-Cooked Salted Caramel Liquid Insert',
      'Piedmont Hazelnut Praliné Core',
      'Caramelized Feuilletine & Hazelnut Crunch Biscuit'
    ]
  },
  {
    id: 'the-cherry',
    name: 'The Cherry',
    frenchName: 'La Cerise Noire',
    category: 'entremets',
    price: 495,
    description: 'An architectural trompe-l’œil sculpted cherry coated in a gleaming ruby glaze. Beneath the delicate shell lies tart Morello cherry compote and airy Tahitian vanilla bean chantilly.',
    flavorNotes: ['Morello Cherry Compote', 'Tahitian Vanilla Chantilly', 'Handcrafted Chocolate Stem', 'Almond Pâte Sablée'],
    dietary: ['Signature', 'Contains Nuts', 'Contains Dairy'],
    image: '/images/the_cherry.jpg',
    layers: [
      'Mirror Ruby Glaze with 24K Flecks',
      'Tahitian Vanilla Bean Whipped Ganache',
      'Spiced Morello Cherry & Kirsch Reduction',
      'Single-Origin Chocolate Stem & Leaf',
      'Crisp Almond Breton Sablé Base'
    ]
  },
  {
    id: 'mirthy-signature-cheesecake',
    name: 'Mirthy Signature Cheesecake',
    frenchName: 'Gâteau au Fromage Basque',
    category: 'cheesecakes',
    price: 445,
    description: 'Hyderabad’s benchmark Basque-inspired cheesecake. Baked at intense heat to achieve a deeply caramelized blistered crown with an unctuous, molten Madagascar vanilla bean center.',
    flavorNotes: ['Caramelized Crust', 'Molten Cream Cheese Center', 'Madagascar Vanilla Pods', 'Seasonal Berry Reduction'],
    dietary: ['Signature', 'Contains Dairy'],
    image: '/images/mirthy_cheesecake.jpg',
    layers: [
      'Charred Caramelized Basque Crown',
      'Molten French Cream Cheese Core',
      'Fresh Madagascar Bourbon Vanilla Speckles',
      'Warm Salted Butter Glaze',
      'Macerated Wild Berry Coulis'
    ]
  },
  {
    id: 'the-pistachio',
    name: 'The Pistachio',
    frenchName: 'Le Pistache de Bronte',
    category: 'entremets',
    price: 525,
    description: 'A tribute to pure Sicilian Bronte pistachios. A velvet-sprayed sculpted pod revealing slow-roasted stone-ground pistachio praliné, white chocolate crunch, and pistachio dacquoise.',
    flavorNotes: ['Bronte Pistachio Velvet', 'Stone-Ground Praliné', 'Spun White Chocolate', 'Sablé Crunch'],
    dietary: ['Signature', 'Contains Nuts', 'Contains Dairy'],
    image: '/images/the_pistachio.jpg',
    layers: [
      'Velvet Pastel Green Cocoa Spray',
      'Light Pistachio Diplomat Cream',
      'Slow-Roasted 100% Pistachio Praliné Core',
      'Spun White Chocolate Halo',
      'Salted Pistachio Dacquoise Biscuit'
    ]
  }
]

export const BAKERY_ITEMS: MenuItem[] = [
  {
    id: 'croissant-beurre',
    name: 'Classic Butter Croissant',
    frenchName: 'Croissant au Beurre d’Isigny',
    category: 'viennoiserie',
    price: 245,
    description: 'Laminated with AOP Isigny Sainte-Mère butter over 72 hours. Delicate golden shatter, deep caramel aroma, and an open, airy honeycomb crumb.',
    flavorNotes: ['French Cultured Butter', 'Subtle Maldon Salt', 'Caramelized Flaky Crust'],
    dietary: ['Contains Dairy'],
    image: '/images/viennoiserie_spread.jpg'
  },
  {
    id: 'pain-au-chocolat',
    name: 'Pain au Chocolat',
    frenchName: 'Chocolatine Valrhona',
    category: 'viennoiserie',
    price: 285,
    description: 'Two parallel bars of single-origin Valrhona 55% dark chocolate baked into our signature laminated dough for a warm molten center.',
    flavorNotes: ['Valrhona 55% Batons', 'Golden Laminated Pastry', 'Rich Butter Finish'],
    dietary: ['Contains Dairy'],
    image: '/images/viennoiserie_spread.jpg'
  },
  {
    id: 'kouign-amann',
    name: 'Brittany Kouign-Amann',
    frenchName: 'Kouign-Amann de Douarnenez',
    category: 'viennoiserie',
    price: 295,
    description: 'Layered with cultured butter and cane sugar that caramelizes during slow stone-deck baking, creating a crunch that gives way to a tender, buttery core.',
    flavorNotes: ['Slow-Caramelized Sugar', 'Salted French Butter', 'Crispy Golden Edges'],
    dietary: ['Contains Dairy'],
    image: '/images/viennoiserie_spread.jpg'
  },
  {
    id: 'almond-frangipane',
    name: 'Almond Frangipane Croissant',
    frenchName: 'Croissant aux Amandes',
    category: 'viennoiserie',
    price: 325,
    description: 'Twice-baked croissant soaked in subtle vanilla bean syrup, filled with rich roasted almond frangipane, and crowned with toasted flaked almonds.',
    flavorNotes: ['Roasted Almond Cream', 'Vanilla Syrup Soaked', 'Toasted Flaked Almonds'],
    dietary: ['Contains Nuts', 'Contains Dairy'],
    image: '/images/viennoiserie_spread.jpg'
  }
]

export const CAFE_ITEMS: MenuItem[] = [
  {
    id: 'specialty-flat-white',
    name: 'Mirthy Flat White & Pour Over',
    frenchName: 'Café de Spécialité',
    category: 'coffee',
    price: 260,
    description: 'Precision extracted double shot of high-altitude shade-grown Arabica from Araku Valley, paired with textured microfoam poured with swan latte art.',
    flavorNotes: ['Dark Chocolate', 'Candied Orange', 'Velvety Microfoam'],
    dietary: ['Contains Dairy'],
    image: '/images/specialty_coffee_brunch.jpg'
  },
  {
    id: 'truffle-brioche-eggs',
    name: 'Truffle Scrambled Brioche',
    frenchName: 'Œufs Brouillés à la Truffe',
    category: 'savory',
    price: 475,
    description: 'Silky French scrambled eggs gently folded with black summer truffle paste, chives, and parmesan, piled high on toasted house-baked brioche.',
    flavorNotes: ['Black Summer Truffle', 'French Butter Brioche', 'Fresh Chives'],
    dietary: ['Signature', 'Contains Dairy'],
    image: '/images/specialty_coffee_brunch.jpg'
  },
  {
    id: 'burrata-heirloom-tartine',
    name: 'Heirloom Tomato & Burrata',
    frenchName: 'Burrata Crémeuse & Tomates',
    category: 'savory',
    price: 495,
    description: 'Fresh creamy artisanal burrata paired with marinated multi-color heirloom tomatoes, cold-pressed basil olive oil, and balsamic glaze on toasted sourdough.',
    flavorNotes: ['Artisanal Burrata', 'Heirloom Tomatoes', 'Cold-Pressed Basil Oil'],
    dietary: ['Contains Dairy'],
    image: '/images/specialty_coffee_brunch.jpg'
  },
  {
    id: 'madagascar-gelato',
    name: 'House-Churned Gelato & Affogato',
    frenchName: 'Glace Artisanale',
    category: 'gelato',
    price: 295,
    description: 'Slow-churned daily in-house using pure milk and natural ingredients. Flavors include Madagascar Bourbon Vanilla, Bronte Pistachio, and 70% Dark Chocolate Affogato.',
    flavorNotes: ['Madagascar Vanilla Bean', 'Bronte Pistachio', 'Espresso Affogato'],
    dietary: ['Contains Dairy'],
    image: '/images/the_pistachio.jpg'
  }
]

export const CRAFT_FEATURES: CraftFeature[] = [
  {
    number: '01',
    title: '72-Hour Lamination',
    subtitle: 'The Art of Viennoiserie',
    description: 'True flakiness cannot be rushed. Our laminated dough undergoes a three-day cold fermentation cycle with AOP Isigny Sainte-Mère butter, yielding distinct honeycomb air pockets and unmatched lightness.',
    detail: 'Isigny Sainte-Mère AOP Butter • 27 Honeycomb Laminated Folds • 72h Cold Fermentation'
  },
  {
    number: '02',
    title: 'Haute Entremet Sculpting',
    subtitle: 'Jewelry of French Pastry',
    description: 'Every entremet is hand-cast and finished by our pastry team. From mirror glazes heated to the exact degree to hand-placed 24-karat edible gold leaves, precision is our quiet obsession.',
    detail: 'Mirror Glaze Poured at 32°C • Single-Origin Valrhona Guanaja • 24K Edible Gold Leaf'
  },
  {
    number: '03',
    title: 'Single-Origin Terroir',
    subtitle: 'Uncompromising Ingredients',
    description: 'We source exclusively from heritage producers: Valrhona chocolate from France, Bronte pistachios from Sicily, bourbon vanilla from Madagascar, and shade-grown single-estate coffee from Araku Valley.',
    detail: 'Valrhona Grand Crus • Bronte Pistachios • Bourbon Vanilla Beans • Araku Arabica'
  },
  {
    number: '04',
    title: 'The Mirth Philosophy',
    subtitle: 'Where Delight Meets Craft',
    description: 'Mirth is more than happiness; it is the shared joy of discovery. Our sunlit Jubilee Hills space is tailored for lingering conversations, warmth, and unhurried culinary pleasure.',
    detail: 'Travertine Stone Architecture • Sunlit Courtyard • Handcrafted Ceramics'
  }
]

export const CAFE_HIGHLIGHTS = [
  { stat: '72h', label: 'Lamination Process' },
  { stat: '100%', label: 'French Valrhona Chocolate' },
  { stat: '24K', label: 'Edible Gold Adornment' },
  { stat: '0%', label: 'Artificial Flavors or Pre-mixes' }
]
