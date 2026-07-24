import React, { useState } from 'react';
import { PRODUCTS, DAELY_VARIANTS } from '../data/mockData';
import { Product, ProductVariant } from '../types';
import { Sparkles, ArrowRight, Check, RefreshCw, Sun, Compass } from 'lucide-react';

interface RitualBuilderProps {
  onAddBundle: (items: { product: Product; variant: ProductVariant }[]) => void;
}

export function RitualBuilder({ onAddBundle }: RitualBuilderProps) {
  const [step, setStep] = useState<number>(1);
  const [vibe, setVibe] = useState<string>('Coastal Morning');
  const [goal, setGoal] = useState<string>('Deep Hydration');
  const [scentPref, setScentPref] = useState<string>('Fresh & Salty');
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  const vibes = [
    { name: 'Coastal Morning', desc: 'Crisp ocean breeze & sunny walks', variant: DAELY_VARIANTS.coastal },
    { name: 'Sunset Bloom', desc: 'Warm golden hour & floral warmth', variant: DAELY_VARIANTS.blossom },
    { name: 'Dusk Relax', desc: 'Calming lavender & starry skies', variant: DAELY_VARIANTS.lavender },
    { name: 'Citrus Energy', desc: 'Zesty mandarin & morning juice', variant: DAELY_VARIANTS.citrus },
  ];

  const goals = [
    { name: 'Deep Hydration', desc: 'Nourish dry skin with whipped squalane' },
    { name: 'Glass Skin SPF', desc: 'Invisible sun protection & glow' },
    { name: 'Lip Plump & Shine', desc: 'Juicy, peptide-infused gloss' },
    { name: 'All-Day Refresh', desc: 'Hair & body uplifting mist' },
  ];

  // Selected variant based on Vibe
  const selectedVibeObj = vibes.find((v) => v.name === vibe) || vibes[0];

  // Recommended bundle items (3 products)
  const bundleProducts = [PRODUCTS[0], PRODUCTS[1], PRODUCTS[2]];

  const handleComplete = () => {
    setIsCompleted(true);
  };

  const handleAddBundleToCart = () => {
    const items = bundleProducts.map((p) => ({
      product: p,
      variant: selectedVibeObj.variant,
    }));
    onAddBundle(items);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const resetQuiz = () => {
    setStep(1);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="py-24 bg-gradient-to-b from-[#FFF9F6] via-[#FFF3EA] to-[#FFF9F6]">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#F7A8C9]/30 shadow-xs mb-4">
            <Compass className="w-4 h-4 text-[#F7A8C9]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2F2F35]/80">
              Personalized Ritual Builder
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2F2F35] tracking-tight mb-4">
            Find Your Daily Vibe
          </h2>
          <p className="text-[#2F2F35]/70 text-base">
            Answer 2 quick questions and let our intelligent ritual creator curate your bespoke summer routine with a 15% bundle discount.
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-[32px] p-8 sm:p-12 shadow-xl border border-black/5 relative overflow-hidden">
          
          {!isCompleted ? (
            <div>
              {/* Progress bar */}
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-black/5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#2F2F35]/60">
                  Step {step} of 2
                </span>
                <div className="flex gap-2">
                  <div className={`w-12 h-1.5 rounded-full transition-all ${step >= 1 ? 'bg-[#F7A8C9]' : 'bg-black/10'}`} />
                  <div className={`w-12 h-1.5 rounded-full transition-all ${step >= 2 ? 'bg-[#F7A8C9]' : 'bg-black/10'}`} />
                </div>
              </div>

              {step === 1 && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-serif text-[#2F2F35] mb-6 text-center">
                    What is your ideal summer atmosphere?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {vibes.map((v) => {
                      const isSelected = vibe === v.name;
                      return (
                        <div
                          key={v.name}
                          onClick={() => setVibe(v.name)}
                          className={`p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-[#2F2F35] bg-[#FFF3EA]/50 shadow-md'
                              : 'border-black/5 hover:border-black/20 bg-white'
                          }`}
                        >
                          <div>
                            <h4 className="font-serif text-lg text-[#2F2F35] mb-1">{v.name}</h4>
                            <p className="text-xs text-[#2F2F35]/60">{v.desc}</p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#2F2F35] bg-[#2F2F35]' : 'border-black/20'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => setStep(2)}
                      className="px-8 py-4 rounded-full bg-[#2F2F35] hover:bg-[#2F2F35]/90 text-white font-medium flex items-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Continue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="animate-fade-in">
                  <h3 className="text-2xl font-serif text-[#2F2F35] mb-6 text-center">
                    What is your primary skincare goal?
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {goals.map((g) => {
                      const isSelected = goal === g.name;
                      return (
                        <div
                          key={g.name}
                          onClick={() => setGoal(g.name)}
                          className={`p-6 rounded-3xl border-2 transition-all duration-300 cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'border-[#2F2F35] bg-[#FFF3EA]/50 shadow-md'
                              : 'border-black/5 hover:border-black/20 bg-white'
                          }`}
                        >
                          <div>
                            <h4 className="font-serif text-lg text-[#2F2F35] mb-1">{g.name}</h4>
                            <p className="text-xs text-[#2F2F35]/60">{g.desc}</p>
                          </div>
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#2F2F35] bg-[#2F2F35]' : 'border-black/20'}`}>
                            {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setStep(1)}
                      className="px-6 py-3 rounded-full text-xs font-semibold text-[#2F2F35]/70 hover:bg-black/5 cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      onClick={handleComplete}
                      className="px-8 py-4 rounded-full bg-gradient-to-r from-[#F7A8C9] to-[#8ED8FF] text-white font-semibold flex items-center gap-2 shadow-md cursor-pointer hover:opacity-95"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Generate My Ritual Bundle</span>
                    </button>
                  </div>
                </div>
              )}

            </div>
          ) : (
            <div className="animate-fade-in text-center">
              <span className="px-4 py-1.5 rounded-full bg-[#A8F2D3] text-[#2F2F35] text-xs font-bold uppercase tracking-wider inline-block mb-4">
                Curated Just For You
              </span>
              <h3 className="text-3xl font-serif text-[#2F2F35] mb-2">
                Your {vibe} Ritual
              </h3>
              <p className="text-[#2F2F35]/70 text-sm max-w-lg mx-auto mb-8">
                Paired with <span className="font-semibold text-[#2F2F35]">{selectedVibeObj.name}</span> scent profile ({selectedVibeObj.variant.tagline}) and customized for {goal}.
              </p>

              {/* Bundle Items Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8 text-left">
                {bundleProducts.map((p) => (
                  <div key={p.id} className="bg-[#FFF9F6] p-4 rounded-2xl border border-black/5 flex items-center gap-4">
                    <img src={p.image} alt={p.name} className="w-16 h-16 rounded-xl object-cover" />
                    <div>
                      <h4 className="font-serif text-sm text-[#2F2F35] line-clamp-1">{p.name}</h4>
                      <p className="text-xs text-[#2F2F35]/60 mt-0.5">${p.price}.00</p>
                      <span className="inline-flex items-center gap-1 text-[10px] text-[#E07A9E] font-semibold mt-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: selectedVibeObj.variant.colorHex }} />
                        {selectedVibeObj.variant.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing breakdown */}
              <div className="max-w-md mx-auto bg-[#FFF3EA] p-6 rounded-2xl mb-8 flex items-center justify-between border border-[#FFC6A5]/40">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#2F2F35]/60">Bundle Total (15% Off)</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-serif font-bold text-[#2F2F35]">$88.40</span>
                    <span className="text-sm line-through text-[#2F2F35]/40">$104.00</span>
                  </div>
                </div>
                <span className="px-3.5 py-1 rounded-full bg-[#F7A8C9] text-white text-xs font-bold">
                  Save $15.60
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 rounded-full text-xs font-semibold text-[#2F2F35]/70 hover:bg-black/5 flex items-center gap-2 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Retake Quiz</span>
                </button>

                <button
                  onClick={handleAddBundleToCart}
                  className={`px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-md cursor-pointer transition-all ${
                    added ? 'bg-[#A8F2D3] text-[#2F2F35]' : 'bg-[#2F2F35] text-white hover:bg-[#2F2F35]/90'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{added ? 'Bundle Added to Bag!' : 'Add Entire Bundle to Bag'}</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
