import React from 'react';
import { REVIEWS } from '../data/mockData';
import { Star, ShieldCheck, Heart } from 'lucide-react';

export function CommunitySection() {
  return (
    <section id="community" className="py-24 bg-gradient-to-b from-[#FFF9F6] via-[#FFF3EA] to-[#FFF9F6]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-[#F7A8C9] font-bold block mb-3">
            Real Community Love
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#2F2F35] tracking-tight mb-4">
            As Seen on Friends in the Sun
          </h2>
          <p className="text-[#2F2F35]/70 text-base">
            Over 5,000+ glowing reviews from our community who start their day the Daely way.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-[32px] p-8 shadow-xs border border-black/5 flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#FFE56D] text-[#FFE56D]" />
                    ))}
                  </div>
                  <span className="text-xs text-[#2F2F35]/50">{review.date}</span>
                </div>

                <p className="text-sm font-serif font-semibold text-[#2F2F35] mb-2">
                  "{review.productName}"
                </p>

                <p className="text-sm text-[#2F2F35]/80 leading-relaxed mb-6">
                  {review.comment}
                </p>
              </div>

              <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-[#2F2F35]">{review.author}</h4>
                  <p className="text-[11px] text-[#2F2F35]/60">{review.location}</p>
                </div>
                {review.verified && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#A8F2D3]/30 text-[#2F2F35] text-[10px] font-semibold">
                    <ShieldCheck className="w-3 h-3 text-[#2F2F35]" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Social Instagram Grid Strip */}
        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="relative rounded-3xl overflow-hidden aspect-square group shadow-xs">
            <img src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80" alt="Daely community" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
              @daely.care
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-square group shadow-xs">
            <img src="https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=600&q=80" alt="Daely community" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
              @daely.care
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-square group shadow-xs">
            <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80" alt="Daely community" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
              @daely.care
            </div>
          </div>
          <div className="relative rounded-3xl overflow-hidden aspect-square group shadow-xs">
            <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80" alt="Daely community" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
              @daely.care
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
