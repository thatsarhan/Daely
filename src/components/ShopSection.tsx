import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { PRODUCTS } from '../data/mockData';
import { Star, ShoppingBag, Eye, Check } from 'lucide-react';

interface ShopSectionProps {
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, variant: ProductVariant) => void;
}

export function ShopSection({ onSelectProduct, onAddToCart }: ShopSectionProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedVariants, setSelectedVariants] = useState<Record<string, ProductVariant>>(() => {
    const initial: Record<string, ProductVariant> = {};
    PRODUCTS.forEach((p) => {
      initial[p.id] = p.variants[0];
    });
    return initial;
  });
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = ['All', 'Body Care', 'Sun & SPF', 'Hydration', 'Fragrance'];

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleVariantChange = (productId: string, variant: ProductVariant, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedVariants((prev) => ({ ...prev, [productId]: variant }));
  };

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    const variant = selectedVariants[product.id] || product.variants[0];
    onAddToCart(product, variant);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="shop" className="py-24 bg-[#FFF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#F7A8C9] font-bold block mb-3">
            Curated Essentials
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2F2F35] tracking-tight mb-4">
            The Daely Lineup
          </h2>
          <p className="text-[#2F2F35]/70 text-base sm:text-lg">
            Formulated with clean botanicals, playful sunshine notes, and nourishing textures for your everyday routine.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[#2F2F35] text-white shadow-md'
                    : 'bg-white hover:bg-black/5 text-[#2F2F35]/70 border border-black/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const currentVariant = selectedVariants[product.id] || product.variants[0];
            const isJustAdded = addedId === product.id;

            return (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="group bg-white rounded-[32px] p-5 border border-black/5 shadow-xs hover:shadow-xl transition-all duration-500 flex flex-col justify-between cursor-pointer relative overflow-hidden"
              >
                {/* Badge if present */}
                {product.badge && (
                  <div className="absolute top-8 left-8 z-10 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#2F2F35] text-xs font-semibold shadow-xs border border-black/5">
                    {product.badge}
                  </div>
                )}

                {/* Product Image Container */}
                <div className="relative rounded-[24px] overflow-hidden bg-[#F5F5F7] aspect-[4/3] mb-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Quick View Hover Button */}
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                    <span className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md text-[#2F2F35] text-xs font-semibold shadow-md flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider text-[#2F2F35]/50 font-medium">
                      {product.category}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-semibold text-[#2F2F35]">
                      <Star className="w-3.5 h-3.5 fill-[#FFE56D] text-[#FFE56D]" />
                      <span>{product.rating}</span>
                      <span className="text-[#2F2F35]/40">({product.reviewCount})</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-xl text-[#2F2F35] mb-2 group-hover:text-[#E07A9E] transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-sm text-[#2F2F35]/70 line-clamp-2 mb-4">
                    {product.description}
                  </p>

                  {/* Variant Swatches */}
                  <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {product.variants.map((v) => {
                        const isSelected = currentVariant.id === v.id;
                        return (
                          <button
                            key={v.id}
                            onClick={(e) => handleVariantChange(product.id, v, e)}
                            title={v.name}
                            className={`w-6 h-6 rounded-full transition-all duration-300 cursor-pointer ${
                              isSelected ? 'ring-2 ring-offset-2 ring-[#2F2F35] scale-110' : 'hover:scale-105 opacity-70 hover:opacity-100'
                            }`}
                            style={{ backgroundColor: v.colorHex }}
                          />
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-serif text-lg font-semibold text-[#2F2F35]">
                        ${product.price}
                      </span>

                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`p-3 rounded-full transition-all duration-300 cursor-pointer shadow-xs ${
                          isJustAdded
                            ? 'bg-[#A8F2D3] text-[#2F2F35]'
                            : 'bg-[#2F2F35] hover:bg-[#2F2F35]/90 text-white'
                        }`}
                        title="Add to Bag"
                      >
                        {isJustAdded ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
