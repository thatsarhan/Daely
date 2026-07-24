import { Product, JournalArticle, Review } from '../types';

export const DAELY_VARIANTS = {
  blossom: { id: 'blossom', name: 'Blossom', colorHex: '#F7A8C9', accentHex: '#FFC6A5', tagline: 'Fresh petals & morning dew' },
  coastal: { id: 'coastal', name: 'Coastal', colorHex: '#8ED8FF', accentHex: '#A8F2D3', tagline: 'Crisp sea salt & breeze' },
  lavender: { id: 'lavender', name: 'Lavender', colorHex: '#B8A7FF', accentHex: '#DCCEFF', tagline: 'Calming dusk bloom' },
  citrus: { id: 'citrus', name: 'Citrus', colorHex: '#FFE56D', accentHex: '#FF8FA6', tagline: 'Sun-drenched mandarin' },
  forest: { id: 'forest', name: 'Forest', colorHex: '#A8F2D3', accentHex: '#8ED8FF', tagline: 'Pine needle & morning fog' },
  sunset: { id: 'sunset', name: 'Sunset', colorHex: '#FF8FA6', accentHex: '#FFC6A5', tagline: 'Warm golden hour amber' },
};

export const PRODUCTS: Product[] = [
  {
    id: 'daely-01',
    name: 'The Sunwhip Body Soufflé',
    category: 'Body Care',
    price: 36,
    rating: 4.9,
    reviewCount: 428,
    image: 'https://images.unsplash.com/photo-1608248597359-994b633d9c28?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    description: 'An ultra-whipped, featherlight body soufflé infused with plant squalane and vitamin E that melts instantly into skin for 24-hour hydration without heaviness.',
    benefits: ['Deep 24h moisture without sticky residue', 'Infused with organic squalane & aloe', 'Dermatologist tested & vegan formula'],
    variants: [DAELY_VARIANTS.blossom, DAELY_VARIANTS.coastal, DAELY_VARIANTS.lavender, DAELY_VARIANTS.sunset],
    scentNotes: {
      top: ['Sunlit Mandarin', 'Fresh Pear Blossom'],
      heart: ['Whipped Coconut Cream', 'Pink Jasmine'],
      base: ['Warm Vanilla Musk', 'Sandalwood']
    },
    size: '220 ml / 7.4 fl oz'
  },
  {
    id: 'daely-02',
    name: 'Dew Drops Daily Hydration SPF 50',
    category: 'Sun & SPF',
    price: 38,
    rating: 5.0,
    reviewCount: 612,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    badge: 'Award Winner',
    description: 'A weightless, invisible broad-spectrum SPF 50 serum that doubles as a dewy makeup primer. Leaves zero white cast and maximum glass-skin glow.',
    benefits: ['Invisible finish on all skin tones', 'Zero white cast or greasiness', 'Niacinamide & hyaluronic acid infusion'],
    variants: [DAELY_VARIANTS.coastal, DAELY_VARIANTS.citrus],
    scentNotes: {
      top: ['Cucumber Water', 'Bergamot Zest'],
      heart: ['White Tea Leaf', 'Water Lily'],
      base: ['Clean Amber', 'Sheer Musk']
    },
    size: '50 ml / 1.7 fl oz'
  },
  {
    id: 'daely-03',
    name: 'Cloud Kiss Peptide Lip Balm',
    category: 'Hydration',
    price: 22,
    rating: 4.8,
    reviewCount: 890,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
    badge: 'Viral Favourite',
    description: 'A restorative, glossy lip treatment packed with peptides and cupuacu butter that restores dry lips and leaves a juicy, high-shine tint.',
    benefits: ['Plumps and softens lip barrier', 'Non-sticky gloss formula', 'Natural peptide complex'],
    variants: [DAELY_VARIANTS.blossom, DAELY_VARIANTS.sunset, DAELY_VARIANTS.citrus],
    scentNotes: {
      top: ['Ripe Peach', 'Wild Strawberry'],
      heart: ['Sweet Vanilla Bean', 'Marshmallow'],
      base: ['Sugar Cane', 'Soft Amber']
    },
    size: '15 ml / 0.5 fl oz'
  },
  {
    id: 'daely-04',
    name: 'Morning Breeze Hair & Body Mist',
    category: 'Fragrance',
    price: 32,
    rating: 4.9,
    reviewCount: 310,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80',
    description: 'An uplifting, refreshing micro-mist designed for hair and skin. Captures the crisp energy of a coastal road trip with the windows rolled down.',
    benefits: ['Fine atomizing spray for even diffusion', 'Hair-safe hydrating botanical extracts', 'Long-lasting subtle trail'],
    variants: [DAELY_VARIANTS.coastal, DAELY_VARIANTS.forest, DAELY_VARIANTS.lavender],
    scentNotes: {
      top: ['Sea Salt Mist', 'Crushed Mint Leaf'],
      heart: ['Blue Eucalyptus', 'Cyclamen'],
      base: ['White Cedar', 'Clean Musk']
    },
    size: '150 ml / 5.1 fl oz'
  },
  {
    id: 'daely-05',
    name: 'Golden Hour Body Wash',
    category: 'Body Care',
    price: 28,
    rating: 4.7,
    reviewCount: 195,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=800&q=80',
    badge: 'New',
    description: 'A rich, sulfate-free gel cleanser that transforms into a velvety lather, gently washing away the day while enveloping you in a sun-drenched citrus scent.',
    benefits: ['Sulfate-free gentle cleansing', 'Maintains skin microbiome balance', 'Invigorating aromatic shower experience'],
    variants: [DAELY_VARIANTS.citrus, DAELY_VARIANTS.sunset, DAELY_VARIANTS.blossom],
    scentNotes: {
      top: ['Sicilian Lemon', 'Blood Orange'],
      heart: ['Neroli Blossom', 'Solar Accord'],
      base: ['Golden Amber', 'Blond Woods']
    },
    size: '300 ml / 10.1 fl oz'
  },
  {
    id: 'daely-06',
    name: 'Overnight Recovery Sleep Mask',
    category: 'Hydration',
    price: 42,
    rating: 4.9,
    reviewCount: 245,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    description: 'A rich overnight cushion cream that cocoons skin in soothing ceramides and blue tansy, working while you sleep to repair and deeply plump.',
    benefits: ['Locks in moisture overnight', 'Reduces redness and fatigue', 'Calming aromatherapeutic lavender notes'],
    variants: [DAELY_VARIANTS.lavender, DAELY_VARIANTS.blossom],
    scentNotes: {
      top: ['French Lavender', 'Chamomile Tea'],
      heart: ['Blue Tansy', 'Ylang Ylang'],
      base: ['Warm Cedarwood', 'Vanilla Bean']
    },
    size: '60 ml / 2.0 fl oz'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    title: 'The 7 AM Coastal Run: Embracing Morning Light',
    category: 'Lifestyle',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Why shifting your routine to catch the first rays of sunlight transforms your skin vitality and morning mood.',
    author: 'Elena Vance',
    date: 'July 22, 2026'
  },
  {
    id: 'art-2',
    title: 'Minimal Packaging, Maximum Joy: Behind the Design',
    category: 'Design',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    excerpt: 'How we partnered with Nordic industrial designers to create 100% recyclable glass bottles with tactile soft-touch finishes.',
    author: 'Marcus Lindqvist',
    date: 'July 15, 2026'
  },
  {
    id: 'art-3',
    title: 'The Art of the Weekend Road Trip with Friends',
    category: 'Travel',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
    excerpt: 'Pack light, breathe deep, and bring along your favorite multi-use hydration mists for spontaneous beach detours.',
    author: 'Chloe Dupont',
    date: 'July 08, 2026'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Sophie L.',
    rating: 5,
    date: 'Yesterday',
    productName: 'The Sunwhip Body Soufflé',
    comment: 'Literally smells like a luxury vacation in Santorini. The texture is so whipped and lightweight—obsessed!',
    verified: true,
    location: 'Malibu, CA'
  },
  {
    id: 'rev-2',
    author: 'Maya K.',
    rating: 5,
    date: '2 days ago',
    productName: 'Dew Drops Daily Hydration SPF 50',
    comment: 'Zero white cast and leaves my face looking like glass. I get asked what perfume I wear every single day.',
    verified: true,
    location: 'New York, NY'
  },
  {
    id: 'rev-3',
    author: 'Liam B.',
    rating: 5,
    date: '3 days ago',
    productName: 'Cloud Kiss Peptide Lip Balm',
    comment: 'The peach tint is effortless. Stays on for hours without feeling sticky. Essential for summer days.',
    verified: true,
    location: 'Austin, TX'
  }
];
