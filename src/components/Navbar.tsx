import React, { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Menu, X, Compass, BookOpen, Heart, Sun } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenConcierge: () => void;
  onNavigate: (sectionId: string) => void;
}

export function Navbar({ cartCount, onOpenCart, onOpenConcierge, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Shop', id: 'shop' },
    { name: 'Ritual Quiz', id: 'quiz' },
    { name: 'Journal', id: 'journal' },
    { name: 'Community', id: 'community' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#FFF9F6]/85 backdrop-blur-md shadow-xs py-4 border-b border-[#EFECE9]'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#F7A8C9] to-[#8ED8FF] flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform duration-300">
              <Sun className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <span className="font-serif text-2xl tracking-wider text-[#2F2F35] font-medium">
              daely
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 bg-white/60 backdrop-blur-sm px-6 py-2 rounded-full border border-black/5 shadow-xs">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-sm font-medium text-[#2F2F35]/80 hover:text-[#2F2F35] transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            {/* AI Concierge Trigger */}
            <button
              onClick={onOpenConcierge}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#F7A8C9]/20 hover:bg-[#F7A8C9]/30 text-[#2F2F35] text-xs font-semibold tracking-wide transition-all duration-300 border border-[#F7A8C9]/40 cursor-pointer shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F7A8C9] animate-pulse" />
              <span>Scent AI</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-full bg-white hover:bg-black/5 border border-black/10 text-[#2F2F35] transition-all duration-300 cursor-pointer shadow-xs"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#F7A8C9] text-white text-[11px] font-bold flex items-center justify-center shadow-xs animate-bounce-short">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full bg-white hover:bg-black/5 border border-black/10 text-[#2F2F35] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FFF9F6]/95 backdrop-blur-xl pt-28 px-6 flex flex-col justify-between pb-12 md:hidden animate-fade-in">
          <div className="flex flex-col gap-6">
            <h3 className="text-xs uppercase tracking-widest text-[#2F2F35]/50 font-semibold">
              Menu
            </h3>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-2xl font-serif text-left text-[#2F2F35] hover:text-[#F7A8C9] transition-colors py-2 border-b border-black/5"
              >
                {link.name}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConcierge();
              }}
              className="mt-4 flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r from-[#F7A8C9] to-[#8ED8FF] text-white font-semibold shadow-md"
            >
              <Sparkles className="w-5 h-5" />
              <span>Ask Daely Scent AI</span>
            </button>
          </div>

          <div className="text-center text-xs text-[#2F2F35]/60">
            <p>Daely Lifestyle Care © 2026</p>
            <p className="mt-1">Fresh, effortless, colorful.</p>
          </div>
        </div>
      )}
    </>
  );
}
