import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Gift, Check, Sparkles } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}: CartDrawerProps) {
  if (!isOpen) return null;

  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const giftWrapFee = isGiftWrapped ? 5 : 0;
  const discount = promoApplied ? subtotal * 0.15 : 0;
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 5.99;
  const total = Math.max(0, subtotal + giftWrapFee - discount + shipping);

  const freeShippingGoal = 50;
  const progressPercent = Math.min(100, (subtotal / freeShippingGoal) * 100);

  const handleCheckout = () => {
    setCheckedOut(true);
    setTimeout(() => {
      setCheckedOut(false);
      onClearCart();
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#FFF9F6] h-full shadow-2xl flex flex-col justify-between animate-slide-left relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-white border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#2F2F35]" />
            <h3 className="font-serif text-xl text-[#2F2F35]">Your Shopping Bag</h3>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F7A8C9]/20 text-[#2F2F35] text-xs font-bold">
              {items.reduce((acc, i) => acc + i.quantity, 0)}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white hover:bg-black/5 text-[#2F2F35] transition-colors cursor-pointer border border-black/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#FFF3EA] px-6 py-3 border-b border-[#FFC6A5]/30">
          <div className="flex items-center justify-between text-xs font-medium text-[#2F2F35] mb-1.5">
            {subtotal >= 50 ? (
              <span className="text-[#2F2F35] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#E07A9E]" />
                You've unlocked free shipping!
              </span>
            ) : (
              <span>Add ${(50 - subtotal).toFixed(2)} more for free shipping</span>
            )}
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-black/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#F7A8C9] to-[#8ED8FF] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-[#2F2F35]/60 py-12">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-xs mb-4 border border-black/5">
                <ShoppingBag className="w-8 h-8 text-[#2F2F35]/30" />
              </div>
              <h4 className="font-serif text-xl text-[#2F2F35] mb-2">Your bag is empty</h4>
              <p className="text-xs max-w-xs mb-6">Explore our sunny collection of body soufflés, SPF dew drops, and lip balms.</p>
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-[#2F2F35] text-white text-xs font-semibold shadow-md cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedVariant.id}-${idx}`}
                className="bg-white p-4 rounded-3xl border border-black/5 shadow-xs flex items-center gap-4"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 rounded-2xl object-cover bg-[#F5F5F7] shrink-0"
                />

                <div className="flex-1">
                  <h4 className="font-serif text-sm text-[#2F2F35] line-clamp-1">{item.product.name}</h4>
                  
                  <div className="flex items-center gap-2 mt-1 mb-2">
                    <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: item.selectedVariant.colorHex }} />
                    <span className="text-xs text-[#2F2F35]/70">{item.selectedVariant.name}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-[#2F2F35]">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        className="w-6 h-6 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-xs font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(idx)}
                  className="p-2 text-[#2F2F35]/40 hover:text-red-500 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-white border-t border-black/10 space-y-4">
            
            {/* Gift Wrap Toggle */}
            <div className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FFF3EA] border border-[#FFC6A5]/30">
              <div className="flex items-center gap-3">
                <Gift className="w-5 h-5 text-[#E07A9E]" />
                <div>
                  <h5 className="text-xs font-semibold text-[#2F2F35]">Signature Gift Packaging</h5>
                  <p className="text-[11px] text-[#2F2F35]/60">Recyclable pastel box & ribbon (+$5.00)</p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={isGiftWrapped}
                onChange={(e) => setIsGiftWrapped(e.target.checked)}
                className="w-4 h-4 accent-[#F7A8C9] cursor-pointer"
              />
            </div>

            {/* Promo code */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Promo code (try 'DAELY15')"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-full bg-[#F5F5F7] border border-black/10 text-xs text-[#2F2F35] uppercase"
              />
              <button
                onClick={() => {
                  if (promoCode.toUpperCase() === 'DAELY15' || promoCode.trim().length > 0) {
                    setPromoApplied(true);
                  }
                }}
                className="px-5 py-2.5 rounded-full bg-[#2F2F35] text-white text-xs font-semibold cursor-pointer"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <p className="text-xs text-emerald-600 font-medium">15% promo discount applied!</p>
            )}

            {/* Price breakdown */}
            <div className="space-y-1.5 pt-2 text-xs text-[#2F2F35]/70">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {isGiftWrapped && (
                <div className="flex justify-between">
                  <span>Gift Packaging</span>
                  <span>$5.00</span>
                </div>
              )}
              {promoApplied && (
                <div className="flex justify-between text-[#E07A9E]">
                  <span>Promo Discount (15%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-semibold text-[#2F2F35] pt-2 border-t border-black/10">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={checkedOut}
              className="w-full py-4 rounded-full bg-[#2F2F35] hover:bg-[#2F2F35]/90 text-white font-semibold flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all"
            >
              {checkedOut ? (
                <>
                  <Check className="w-5 h-5 text-[#A8F2D3]" />
                  <span>Order Placed Successfully!</span>
                </>
              ) : (
                <>
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
