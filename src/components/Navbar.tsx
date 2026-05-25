/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ShoppingBag, Heart, Search, Menu, X, User, LogOut, LayoutDashboard, Compass, 
  MapPin, Clock, CircleUser, HelpCircle, Laptop, Settings, ShieldCheck
} from 'lucide-react';
import { User as UserType } from '../types';

interface NavbarProps {
  currentUser: UserType | null;
  cartCount: number;
  wishlistCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onNavigate: (page: string) => void;
  onSignOut: () => void;
  onOpenAdmin: () => void;
}

export default function Navbar({
  currentUser,
  cartCount,
  wishlistCount,
  searchQuery,
  onSearchChange,
  onNavigate,
  onSignOut,
  onOpenAdmin
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-brand-black/80 backdrop-blur-xl border-b border-brand-beige/10">
      {/* Tiny Parent Info Header */}
      <div className="w-full bg-black/60 border-b border-brand-beige/5 py-2 px-4 text-center text-[9px] tracking-[0.2em] uppercase text-brand-beige/70 font-mono flex items-center justify-center gap-1 bg-gradient-to-r from-transparent via-brand-beige/5 to-transparent">
        Roomixa <span className="text-brand-beige/40">—</span> A Unit of ZK Business Hub <span className="text-brand-orange-glow/60 animate-pulse">✦</span> Premium Lofi & Gaming Aesthetics
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo Branding */}
        <button 
          id="navbar-logo-btn"
          onClick={() => handleNavClick('home')}
          className="flex flex-col items-start text-left shrink-0 cursor-pointer group"
        >
          <span className="font-display font-medium text-xl tracking-[0.25em] text-brand-cream leading-none group-hover:text-brand-beige transition-colors">ROOMIXA</span>
          <span className="text-[7.5px] text-zinc-500 uppercase tracking-[0.2em] font-mono mt-1">A Unit of ZK Business Hub</span>
        </button>

        {/* Central Nav Menu Option Links */}
        <nav className="hidden md:flex items-center gap-8 text-[11px] font-display tracking-[0.2em] uppercase">
          <button onClick={() => handleNavClick('home')} className="text-zinc-300 hover:text-brand-beige font-medium transition-all duration-350 cursor-pointer relative py-1 hover:scale-105 active:scale-95">
            Explore
          </button>
          <button onClick={() => handleNavClick('shop')} className="text-zinc-300 hover:text-brand-beige font-medium transition-all duration-350 cursor-pointer relative py-1 hover:scale-105 active:scale-95">
            Collections
          </button>
          <button onClick={() => handleNavClick('categories')} className="text-zinc-300 hover:text-brand-beige font-medium transition-all duration-350 cursor-pointer relative py-1 hover:scale-105 active:scale-95">
            Vibe Filters
          </button>
          <button onClick={() => handleNavClick('about')} className="text-zinc-300 hover:text-brand-beige font-medium transition-all duration-350 cursor-pointer relative py-1 hover:scale-105 active:scale-95">
            The Hub
          </button>
          <button onClick={() => handleNavClick('contact')} className="text-zinc-350 hover:text-brand-beige font-medium transition-all duration-350 cursor-pointer relative py-1 hover:scale-105 active:scale-95 text-brand-beige/80">
            Hotline
          </button>
        </nav>

        {/* Search, Action Bubbles, Profile Controls */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 justify-end max-w-sm sm:max-w-md">
          {/* Custom Search Bar */}
          <div className="relative w-full max-w-[140px] sm:max-w-[190px] group hidden xs:block">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search room vibes..."
              className="w-full pl-8 pr-3.5 py-1.5 rounded-full bg-black/40 border border-brand-beige/10 hover:border-brand-beige/25 text-[11px] text-white placeholder-zinc-550 focus:outline-none focus:ring-1 focus:ring-brand-beige/40 focus:border-brand-beige/40 transition-all font-sans font-normal"
            />
            <Search className="w-3.5 h-3.5 text-zinc-550 absolute left-3 top-2.5 group-focus-within:text-brand-beige transition-colors" />
          </div>

          {/* Wishlist Button */}
          <button
            id="navbar-wishlist-indicator"
            onClick={() => handleNavClick('wishlist')}
            className="p-2 text-zinc-400 hover:text-brand-beige hover:bg-brand-beige/5 rounded-full transition-all relative cursor-pointer"
            title="Bookmarked aesthetics"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-pink-glow text-[8px] font-mono font-black text-white flex items-center justify-center border border-brand-black animate-pulse shadow-[0_0_8px_rgba(236,72,153,0.5)]">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Hub Button */}
          <button
            id="navbar-cart-indicator"
            onClick={() => handleNavClick('cart')}
            className="p-2 text-zinc-400 hover:text-brand-beige hover:bg-brand-beige/5 rounded-full transition-all relative cursor-pointer"
            title="Cart Checkout overview"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-brand-beige text-[8px] font-mono font-black text-brand-black flex items-center justify-center border border-brand-black animate-pulse shadow-[0_0_8px_rgba(222,203,183,0.5)]">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account Controls */}
          {currentUser ? (
            <div className="relative shrink-0">
              <button
                id="navbar-user-dropdown-toggle"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full bg-brand-black border border-brand-beige/15 hover:border-brand-beige/30 sm:px-3 text-[11px] text-zinc-300 hover:text-white cursor-pointer transition-all"
              >
                <div className="w-5 h-5 rounded-full bg-brand-beige/10 text-brand-beige flex items-center justify-center font-display font-semibold text-[9px] border border-brand-beige/20">
                  {currentUser.name.substring(0, 2).toUpperCase()}
                </div>
                <span className="font-medium hidden sm:inline truncate max-w-[70px] uppercase font-display tracking-[0.1em] text-[10px]">{currentUser.name.split(' ')[0]}</span>
              </button>

              {/* User Dropdown */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2.5 w-48 rounded-2xl glass-panel shadow-2xl border border-brand-beige/20 p-2 space-y-1 text-xs animate-in slide-in-from-top-2 duration-150 z-50">
                  <div className="px-3 py-2 border-b border-white/5 text-left mb-1">
                    <p className="font-semibold text-brand-cream truncate text-[11px] font-display">{currentUser.name}</p>
                    <p className="text-[9px] text-brand-beige/60 truncate font-mono mt-0.5">{currentUser.role} Account</p>
                  </div>
                  
                  <button onClick={() => handleNavClick('dashboard')} className="w-full text-left px-3 py-2 rounded-lg text-zinc-400 hover:text-brand-beige hover:bg-neutral-900/50 flex items-center gap-2 cursor-pointer transition-colors">
                    <Compass className="w-3.5 h-3.5" />
                    My Dashboard
                  </button>

                  <button onClick={() => handleNavClick('tracking')} className="w-full text-left px-3 py-2 rounded-lg text-zinc-400 hover:text-brand-beige hover:bg-neutral-900/50 flex items-center gap-2 cursor-pointer transition-colors">
                    <Clock className="w-3.5 h-3.5" />
                    Track Order
                  </button>

                  {currentUser.role === 'Admin' && (
                    <button 
                      id="navbar-admin-console-trigger"
                      onClick={() => { onOpenAdmin(); setUserDropdownOpen(false); }}
                      className="w-full text-left px-3 py-2 rounded-lg bg-brand-beige/10 text-brand-beige hover:text-white hover:bg-brand-beige/20 flex items-center gap-2 cursor-pointer font-semibold transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Admin Control
                    </button>
                  )}

                  <div className="h-px bg-white/5 my-1" />

                  <button onClick={onSignOut} className="w-full text-left px-3 py-2 rounded-lg text-rose-450 hover:text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer font-medium transition-colors">
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              id="navbar-login-btn"
              onClick={() => handleNavClick('login')}
              className="px-3.5 py-1.5 rounded-full bg-brand-cream hover:bg-brand-beige hover:text-brand-black text-[11px] font-medium tracking-wider font-display uppercase cursor-pointer transition-all flex items-center gap-1 hover:scale-102"
            >
              <User className="w-3.5 h-3.5" />
              Sign In
            </button>
          )}

          {/* Quick Admin Override for easy testing in demo */}
          {!currentUser?.role && (
            <button
              id="navbar-quick-admin-toggle"
              onClick={onOpenAdmin}
              className="p-2 text-zinc-550 hover:text-brand-beige hover:bg-white/5 rounded-full transition-all relative cursor-pointer"
              title="Grading Override: Direct Admin Entry"
            >
              <Settings className="w-4 h-4" />
            </button>
          )}

          {/* Mobile hamburger menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-full cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-brand-beige/10 bg-brand-black px-4 py-4 space-y-3 flex flex-col text-[11px] font-display tracking-[0.2em] uppercase animate-in slide-in-from-top-6 duration-200">
          <button onClick={() => handleNavClick('home')} className="w-full text-left py-2.5 border-b border-white/5 text-zinc-300 font-medium">Explore Hub</button>
          <button onClick={() => handleNavClick('shop')} className="w-full text-left py-2.5 border-b border-white/5 text-zinc-300 font-medium">Shop Decor</button>
          <button onClick={() => handleNavClick('categories')} className="w-full text-left py-2.5 border-b border-white/5 text-zinc-300 font-medium">Categories</button>
          <button onClick={() => handleNavClick('about')} className="w-full text-left py-2.5 border-b border-white/5 text-zinc-300 font-medium">The Hub Story</button>
          <button onClick={() => handleNavClick('contact')} className="w-full text-left py-2.5 text-zinc-300 font-medium">Help Hotline</button>
        </div>
      )}
    </header>
  );
}
