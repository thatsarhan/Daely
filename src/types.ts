export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface ProductVariant {
  id: string;
  name: string;
  colorHex: string;
  accentHex: string;
  tagline: string;
}

export interface Product {
  id: string;
  name: string;
  category: 'Body Care' | 'Sun & SPF' | 'Fragrance' | 'Hydration' | 'Hair Care';
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  description: string;
  benefits: string[];
  variants: ProductVariant[];
  scentNotes: ScentNotes;
  size: string;
}

export interface CartItem {
  product: Product;
  selectedVariant: ProductVariant;
  quantity: number;
  isGiftWrapped?: boolean;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  author: string;
  date: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  verified: boolean;
  location: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
