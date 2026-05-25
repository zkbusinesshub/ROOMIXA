/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Mail, Phone, MapPin, Sparkles, Shield, RefreshCcw, Send, Globe } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleNavClick = (page: string) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 transition-all font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper footer bento configuration */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-white/5">
          
          {/* Logo & Slogan Column */}
          <div className="space-y-4 md:col-span-1.5 text-left">
            <button 
              id="footer-logo-btn"
              onClick={() => handleNavClick('home')}
              className="flex flex-col items-start text-left cursor-pointer"
            >
              <span className="font-display font-black text-2xl tracking-tight text-white leading-none">ROOMIXA</span>
              <span className="text-[8px] text-zinc-500 uppercase tracking-widest font-mono">A Unit of ZK Business Hub</span>
            </button>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-sm font-light">
              Crafting state-of-the-art gaming setups and lofi room aesthetics for Gen-Z. Elevate bare walls into glowing dimensional architectural wonders. 
            </p>
            <div className="text-[11px] text-zinc-500 font-mono space-y-1.5 pt-2">
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>Hotline: +91 7822884303</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span className="truncate">zkbusinesshub@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                <span>Mumbai Room Decor Circle, India</span>
              </div>
            </div>
          </div>

          {/* Quick shop links column */}
          <div className="text-left space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">Decor Collections</h4>
            <div className="flex flex-col gap-2 text-xs font-medium text-zinc-400">
              <button onClick={() => handleNavClick('shop')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer">LED Smart Lights</button>
              <button onClick={() => handleNavClick('shop')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer">Neon Tube Art Signs</button>
              <button onClick={() => handleNavClick('shop')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer">Cozy Anime Posters</button>
              <button onClick={() => handleNavClick('shop')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer">Levitating Clocks & Decor</button>
              <button onClick={() => handleNavClick('categories')} className="text-left font-semibold text-amber-500 hover:text-amber-400 transition-colors cursor-pointer">All Categories →</button>
            </div>
          </div>

          {/* Customer policies Column */}
          <div className="text-left space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">Information Hub</h4>
            <div className="flex flex-col gap-2 text-xs font-medium text-zinc-400">
              <button onClick={() => handleNavClick('about')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer">The Roomixa Story</button>
              <button onClick={() => handleNavClick('faq')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer">Expand FAQ</button>
              <button onClick={() => handleNavClick('refund-policy')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer">7-Day Replacement Policy</button>
              <button onClick={() => handleNavClick('shipping-policy')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer">Free Shipping Grid</button>
              <button onClick={() => handleNavClick('privacy-policy')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer">Secure Privacy Policy</button>
              <button onClick={() => handleNavClick('terms-conditions')} className="text-left hover:text-white hover:underline transition-colors cursor-pointer">Terms & Conditions</button>
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="text-left space-y-4">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-white">Drop your Inbox</h4>
            <p className="text-zinc-400 text-xs leading-relaxed font-light">
              Get secret festive discounts and exclusive Gen-Z styling books sent to your email.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="yours@lofimail.com"
                className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-900 border border-white/5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button 
                id="footer-newsletter-btn"
                onClick={() => alert("Successfully synchronized with Roomixa subscriber feeds. Standard code 'FIRSTORDER' coupon dispatched.")}
                className="px-3.5 bg-white text-black hover:bg-zinc-200 rounded-xl flex items-center justify-center transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] text-zinc-600 font-mono">
              <Shield className="w-3.5 h-3.5 text-emerald-500" />
              <span>Anti-spam enabled | No shared files</span>
            </div>
          </div>

        </div>

        {/* Lower branding credits and details */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left text-[11px] text-zinc-500 font-mono unicode">
          <div>
            <p>© {new Date().getFullYear()} Roomixa. All rights reserved.</p>
            <p className="mt-1 text-[10px] font-bold text-zinc-400">ROOMIXA — A UNIT OF ZK BUSINESS HUB</p>
          </div>
          <div className="flex gap-4 items-center text-[10px]">
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-cyan-400" />
              INR ₹ Payments Only
            </span>
            <span className="text-zinc-600">|</span>
            <span className="font-semibold text-zinc-400 hover:text-white cursor-pointer" onClick={() => handleNavClick('admin-login')}>Admin Gateway</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
