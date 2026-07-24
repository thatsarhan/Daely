import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ShopSection } from './components/ShopSection';
import { RitualBuilder } from './components/RitualBuilder';
import { JournalSection } from './components/JournalSection';
import { CommunitySection } from './components/CommunitySection';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { ConciergeModal } from './components/ConciergeModal';
import { CartDrawer } from './components/CartDrawer';
import { Product, ProductVariant, CartItem } from './types';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isConciergeOpen, setIsConciergeOpen] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = (product: Product, variant: ProductVariant, quantity: number = 1, isGiftWrapped: boolean = false) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant.id === variant.id
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [...prev, { product, selectedVariant: variant, quantity, isGiftWrapped }];
      }
    });
  };

  const handleAddBundleToCart = (items: { product: Product; variant: ProductVariant }[]) => {
    setCart((prev) => {
      let nextCart = [...prev];
      items.forEach((bundleItem) => {
        const existingIndex = nextCart.findIndex(
          (item) => item.product.id === bundleItem.product.id && item.selectedVariant.id === bundleItem.variant.id
        );
        if (existingIndex > -1) {
          nextCart[existingIndex].quantity += 1;
        } else {
          nextCart.push({ product: bundleItem.product, selectedVariant: bundleItem.variant, quantity: 1 });
        }
      });
      return nextCart;
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    setCart((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFF9F6] text-[#2F2F35] font-sans selection:bg-[#F7A8C9] selection:text-white">
      {/* Navbar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenConcierge={() => setIsConciergeOpen(true)}
        onNavigate={handleNavigate}
      />

      {/* Hero Section */}
      <Hero
        onShopClick={() => handleNavigate('shop')}
        onQuizClick={() => handleNavigate('quiz')}
      />

      {/* Shop / Product Collection */}
      <ShopSection
        onSelectProduct={(p) => setSelectedProduct(p)}
        onAddToCart={(p, v) => handleAddToCart(p, v, 1)}
      />

      {/* Ritual Builder / Quiz */}
      <RitualBuilder
        onAddBundle={handleAddBundleToCart}
      />

      {/* Journal / Editorial */}
      <JournalSection />

      {/* Community / Reviews */}
      <CommunitySection />

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <ConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
