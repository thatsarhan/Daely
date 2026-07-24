import React, { useState } from 'react';
import { Sun, Sparkles, ArrowRight, Check } from 'lucide-react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 2000);
  };

  return (
    <footer className="bg-[#2F2F35] text-[#FFF9F6] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Top Newsletter Banner */}
        <div className="bg-gradient-to-r from-[#F7A8C9]/20 via-[#B8A7FF]/20 to-[#8ED8FF]/20 rounded-[32px] p-8 sm:p-12 border border-white/10 mb-20 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-white text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#F7A8C9]" />
              <span>Join the Daely Club</span>
            </div>
            <h3 className="font-serif text-3xl sm:text-4xl text-white mb-2">
              Get 15% off your first sunny order.
            </h3>
            <p className="text-white/70 text-sm max-w-md">
              Receive early drop alerts, weekend ritual guides, and exclusive community invites straight to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-[#F7A8C9] sm:w-80"
              required
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-[#FFF9F6] hover:bg-white text-[#2F2F35] font-semibold flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors"
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Welcome to Daely!</span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F7A8C9] to-[#8ED8FF] flex items-center justify-center">
                <Sun className="w-4 h-4 text-white" />
              </div>
              <span className="font-serif text-2xl tracking-wider text-white">
                daely
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm mb-6">
              Daely is the feeling of stepping into a bright summer morning—fresh, effortless, colorful, and ready for whatever the day brings.
            </p>
            <p className="text-xs text-white/40">
              Designed with care in California & Stockholm.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/50 mb-4">Shop</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a href="#shop" className="hover:text-[#F7A8C9] transition-colors">Sunwhip Soufflés</a></li>
              <li><a href="#shop" className="hover:text-[#F7A8C9] transition-colors">Dew Drops SPF 50</a></li>
              <li><a href="#shop" className="hover:text-[#F7A8C9] transition-colors">Cloud Kiss Balms</a></li>
              <li><a href="#shop" className="hover:text-[#F7A8C9] transition-colors">Hair & Body Mists</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/50 mb-4">Explore</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a href="#quiz" className="hover:text-[#F7A8C9] transition-colors">Ritual Quiz</a></li>
              <li><a href="#journal" className="hover:text-[#F7A8C9] transition-colors">The Journal</a></li>
              <li><a href="#community" className="hover:text-[#F7A8C9] transition-colors">Community Reviews</a></li>
              <li><button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-[#F7A8C9] transition-colors cursor-pointer">Scent AI Concierge</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-semibold text-white/50 mb-4">Support</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li><a href="#" className="hover:text-[#F7A8C9] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#F7A8C9] transition-colors">FAQ & Contact</a></li>
              <li><a href="#" className="hover:text-[#F7A8C9] transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-[#F7A8C9] transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/40">
          <p>© 2026 Daely Lifestyle Care Inc. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">TikTok</a>
            <a href="#" className="hover:text-white transition-colors">Pinterest</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
