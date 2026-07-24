import React, { useState } from 'react';
import { Product, ProductVariant } from '../types';
import { X, Star, Check, ShoppingBag, ShieldCheck, Sparkles, Heart } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, variant: ProductVariant, quantity: number, isGiftWrapped: boolean) => void;
}

export function ProductModal({ product, onClose, onAddToCart }: ProductModalProps) {
  if (!product) return null;

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(product.variants[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isGiftWrapped, setIsGiftWrapped] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedVariant, quantity, isGiftWrapped);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-black/10 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/80 hover:bg-white text-[#2F2F35] shadow-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Image Column */}
          <div className="relative bg-[#F5F5F7] p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-80 md:h-[450px] object-cover rounded-2xl shadow-md"
            />
            {product.badge && (
              <span className="absolute top-10 left-10 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-[#2F2F35] text-xs font-semibold shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Right Details Column */}
          <div className="p-8 sm:p-10 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase tracking-wider text-[#2F2F35]/50 font-semibold">
                  {product.category} • {product.size}
                </span>
                <div className="flex items-center gap-1 text-xs font-semibold text-[#2F2F35]">
                  <Star className="w-4 h-4 fill-[#FFE56D] text-[#FFE56D]" />
                  <span>{product.rating}</span>
                  <span className="text-[#2F2F35]/40">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h2 className="font-serif text-3xl text-[#2F2F35] mb-3">
                {product.name}
              </h2>

              <p className="text-2xl font-serif font-semibold text-[#2F2F35] mb-6">
                ${product.price}.00
              </p>

              <p className="text-sm text-[#2F2F35]/80 leading-relaxed mb-6">
                {product.description}
              </p>

              {/* Variant Selector */}
              <div className="mb-6">
                <label className="text-xs font-semibold text-[#2F2F35]/70 uppercase tracking-wider block mb-3">
                  Select Scent / Variant: <span className="text-[#2F2F35] font-bold">{selectedVariant.name}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((v) => {
                    const isSelected = selectedVariant.id === v.id;
                    return (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-4 py-2 rounded-2xl text-xs font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer border ${
                          isSelected
                            ? 'bg-[#2F2F35] text-white border-[#2F2F35] shadow-md scale-105'
                            : 'bg-white hover:bg-black/5 text-[#2F2F35] border-black/10'
                        }`}
                      >
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: v.colorHex }} />
                        <span>{v.name}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-[#2F2F35]/60 italic mt-2">
                  {selectedVariant.tagline}
                </p>
              </div>

              {/* Scent Notes Breakdown */}
              <div className="mb-6 p-4 rounded-2xl bg-[#FFF3EA] border border-[#FFC6A5]/30">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#2F2F35] mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#E07A9E]" />
                  <span>Fragrance Notes</span>
                </h4>
                <div className="grid grid-cols-3 gap-2 text-xs text-[#2F2F35]/80">
                  <div>
                    <span className="font-semibold block text-[11px] text-[#2F2F35]/50">Top</span>
                    {product.scentNotes.top.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#2F2F35]/50">Heart</span>
                    {product.scentNotes.heart.join(', ')}
                  </div>
                  <div>
                    <span className="font-semibold block text-[11px] text-[#2F2F35]/50">Base</span>
                    {product.scentNotes.base.join(', ')}
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-8">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-[#2F2F35]/70 mb-3">
                  Why You'll Love It
                </h4>
                <ul className="space-y-2">
                  {product.benefits.map((b, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-xs text-[#2F2F35]/80">
                      <ShieldCheck className="w-4 h-4 text-[#F7A8C9] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center gap-4">
              
              {/* Quantity selector */}
              <div className="flex items-center border border-black/10 rounded-full bg-white px-4 py-2 w-full sm:w-auto justify-between">
                <span className="text-xs text-[#2F2F35]/60 mr-4">Quantity</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="font-semibold text-sm w-4 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Bag Button */}
              <button
                onClick={handleAdd}
                className={`w-full sm:flex-1 py-4 px-6 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer ${
                  added
                    ? 'bg-[#A8F2D3] text-[#2F2F35]'
                    : 'bg-[#2F2F35] hover:bg-[#2F2F35]/90 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
                  </>
                )}
              </button>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
