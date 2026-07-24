import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface HeroProps {
  onShopClick: () => void;
  onQuizClick: () => void;
}

export function Hero({ onShopClick, onQuizClick }: HeroProps) {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden bg-gradient-to-b from-[#FFF3EA] via-[#FFF9F6] to-[#EAF8FF]">
      {/* Background soft glowing blur blobs */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F7A8C9]/30 via-[#B8A7FF]/20 to-[#8ED8FF]/30 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse-slow" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/85 border border-[#F7A8C9]/30 shadow-xs mb-6">
              <Sparkles className="w-4 h-4 text-[#F7A8C9]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2F2F35]/80">
                New Summer Collection 2026
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-normal text-[#2F2F35] tracking-tight leading-[1.08] mb-6">
              Fresh, effortless, <span className="italic font-light text-[#E07A9E]">colorful</span> living.
            </h1>

            <p className="text-lg sm:text-xl text-[#2F2F35]/70 font-normal max-w-xl leading-relaxed mb-8">
              Daely is the feeling of stepping into a bright summer morning—lightweight formulas, skin-loving squalane, and sun-drenched fragrances ready for whatever the day brings.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onShopClick}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#2F2F35] hover:bg-[#2F2F35]/90 text-white font-medium transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onQuizClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/80 hover:bg-white text-[#2F2F35] font-medium border border-black/10 transition-all duration-300 shadow-xs hover:shadow-sm cursor-pointer"
              >
                <span>Find Your Ritual</span>
              </button>
            </div>

            {/* Feature Pills */}
            <div className="grid grid-cols-3 gap-6 mt-14 pt-10 border-t border-black/10 w-full">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white shadow-xs border border-black/5 text-[#F7A8C9]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#2F2F35]">Clean Formula</h4>
                  <p className="text-[11px] text-[#2F2F35]/60">100% Vegan & Safe</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white shadow-xs border border-black/5 text-[#8ED8FF]">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#2F2F35]">Free Shipping</h4>
                  <p className="text-[11px] text-[#2F2F35]/60">On orders over $50</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-white shadow-xs border border-black/5 text-[#B8A7FF]">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#2F2F35]">Easy Returns</h4>
                  <p className="text-[11px] text-[#2F2F35]/60">30-day guarantee</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Card */}
              <div className="relative rounded-[32px] overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-[#EAF8FF]">
                <img
                  src="https://images.unsplash.com/photo-1608248597359-994b633d9c28?auto=format&fit=crop&w=1000&q=80"
                  alt="Daely Sunwhip Souffle"
                  className="w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700"
                />
                
                {/* Floating Glassmorphism Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#2F2F35]/60 font-semibold block">
                      Featured Formula
                    </span>
                    <h3 className="font-serif text-lg text-[#2F2F35]">The Sunwhip Body Soufflé</h3>
                    <p className="text-xs text-[#2F2F35]/70">Whipped squalane & vitamin E</p>
                  </div>
                  <span className="px-4 py-2 rounded-full bg-[#2F2F35] text-white text-xs font-semibold">
                    $36
                  </span>
                </div>
              </div>

              {/* Floating secondary accent badge */}
              <div className="absolute -top-6 -left-6 bg-white/90 backdrop-blur-md px-5 py-4 rounded-3xl shadow-xl border border-black/5 flex items-center gap-3 animate-bounce-short hidden sm:flex">
                <div className="w-3 h-3 rounded-full bg-[#F7A8C9] animate-ping" />
                <div>
                  <p className="text-xs font-semibold text-[#2F2F35]">Sunny Morning Vibe</p>
                  <p className="text-[11px] text-[#2F2F35]/60">Rated 4.9 / 5.0 (428 reviews)</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
