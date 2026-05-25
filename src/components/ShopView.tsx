/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Filter, SlidersHorizontal, Star, Heart, ShoppingBag, Eye, X, Tag, ListFilter,
  SortAsc, PackageOpen, HelpCircle, Flame, Sparkles
} from 'lucide-react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../data';

interface ShopViewProps {
  products: Product[];
  wishlistIds: string[];
  searchQuery: string;
  selectedCategory: string;
  onNavigateToProduct: (id: string) => void;
  onNavigateToCart: () => void;
  onToggleWishlist: (p: Product) => void;
  onAddToCart: (p: Product) => void;
  onSelectCategory: (id: string | null) => void;
  currentPage: string; // 'shop' | 'categories'
}

export default function ShopView({
  products,
  wishlistIds,
  searchQuery,
  selectedCategory,
  onNavigateToProduct,
  onNavigateToCart,
  onToggleWishlist,
  onAddToCart,
  onSelectCategory,
  currentPage
}: ShopViewProps) {
  // Sort and filter states
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'rating' | 'priceLow' | 'priceHigh' | 'trending'>('trending');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Clear filters
  const handleClearFilters = () => {
    setMaxPrice(5000);
    setSortBy('trending');
    setInStockOnly(false);
    onSelectCategory(null);
  };

  // Memoized filter and sorting engine
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      // Search matching name / description
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Category tag matching
      const matchesCategory = !selectedCategory || p.category === selectedCategory;

      // Price constraints
      const matchesPrice = p.price <= maxPrice;

      // Stock filter
      const matchesStock = !inStockOnly || p.stock > 0;

      return matchesSearch && matchesCategory && matchesPrice && matchesStock;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'priceLow') return a.price - b.price;
      if (sortBy === 'priceHigh') return b.price - a.price;
      // Default / Trending
      return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
    });
  }, [products, searchQuery, selectedCategory, maxPrice, sortBy, inStockOnly]);

  // CATEGORIES VIEW MARKUP
  if (currentPage === 'categories') {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in duration-300">
        <div className="text-center space-y-2">
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#9e701e] uppercase">Aesthetic Directories</span>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white">CHOOSE YOUR MOOD CATEGORY</h1>
          <p className="text-zinc-400 text-xs max-w-xl mx-auto leading-relaxed font-light">
            Each category matches a distinct Gen-Z subculture vibe. Hop directly into selected layouts to check matching lights, vinyl sets, and clocks.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
          {CATEGORIES.map(cat => {
            // Count matching items
            const count = products.filter(p => p.category === cat.id).length;
            return (
              <div 
                key={cat.id}
                onClick={() => { onSelectCategory(cat.id); onSelectCategory(cat.id); }}
                className="group relative h-64 rounded-3xl overflow-hidden border border-white/5 cursor-pointer glass-panel shadow-xl transition-all hover:scale-[1.01] hover:border-amber-500/30"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-300 scale-100 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                {/* Visual shade gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 text-left space-y-1.5 z-10">
                  <span className="font-mono text-[9px] font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">{count} Aesthetics</span>
                  <h3 className="font-display font-black text-lg text-white leading-tight uppercase group-hover:text-amber-300 transition-colors">{cat.name}</h3>
                  <p className="text-[10px] text-zinc-400 leading-normal line-clamp-2 font-light">{cat.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // SHOP PRODUCTS VIEW MARKUP
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300 font-sans">
      
      {/* Top filter stats bar */}
      <div className="border-b border-white/5 pb-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-left">
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500">Exotic Catalogs</span>
          <h1 className="font-display font-black text-2xl text-white tracking-tight uppercase">
            {selectedCategory ? `${CATEGORIES.find(c=>c.id===selectedCategory)?.name || 'Custom'} Decor` : 'Explore All Aesthetics'}
          </h1>
          <p className="text-[10px] text-zinc-400 font-mono mt-0.5">Showing {filteredProducts.length} premium visual creations</p>
        </div>

        {/* Categories horizontal swiper inside shop */}
        <div className="flex gap-2 py-1 overflow-x-auto max-w-full no-scrollbar pb-2">
          <button
            onClick={() => onSelectCategory(null)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase shrink-0 cursor-pointer border ${!selectedCategory ? 'bg-amber-500 text-black border-amber-400 font-bold' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'}`}
          >
            All
          </button>
          {CATEGORIES.map(c => (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-full text-[10px] font-mono tracking-wider uppercase shrink-0 cursor-pointer border ${selectedCategory === c.id ? 'bg-amber-500 text-black border-amber-400 font-bold' : 'bg-zinc-900 text-zinc-400 border-white/5 hover:text-white'}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Core Columns layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* LEFT COLLAPSIBLE FILTER SIDEBAR (Desktop) */}
        <aside className="lg:col-span-1 space-y-5 text-left">
          <div className="glass-panel p-5 rounded-2xl border border-white/5 space-y-5">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="font-display font-bold text-xs uppercase tracking-wider text-white flex items-center gap-1.5">
                <SlidersHorizontal className="w-4 h-4 text-amber-500" />
                Refine search
              </h3>
              {(selectedCategory || maxPrice < 5000 || inStockOnly || sortBy !== 'trending') && (
                <button 
                  onClick={handleClearFilters}
                  className="text-[10px] text-zinc-500 hover:text-rose-400 font-mono"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Filter 1: Sorting parameter */}
            <div className="space-y-2">
              <label className="block text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Sort parameters</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl bg-black/45 border border-white/10 text-xs text-white outline-none focus:border-amber-500"
              >
                <option value="trending">Featured & Trending</option>
                <option value="rating">Top Rated (Ratings)</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>

            {/* Filter 2: Price range limits with slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                <span>Maximum Price:</span>
                <span className="text-amber-400 font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
              </div>
              <input
                type="range"
                min={200}
                max={5000}
                step={100}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[9px] font-mono text-zinc-650">
                <span>₹200</span>
                <span>₹5,000</span>
              </div>
            </div>

            {/* Filter 3: Stock restrictions checkboxes */}
            <div className="space-y-3 pt-1">
              <label className="block text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest">Inventory parameters</label>
              <label className="flex items-center gap-2.5 text-xs text-zinc-300 font-medium cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded bg-black border-white/15 text-amber-500 focus:ring-0 cursor-pointer w-4 h-4"
                />
                In Stock Creator Pieces Only
              </label>
            </div>
          </div>

          {/* Prompt banner for assistance */}
          <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 text-[10px] leading-relaxed">
            <span className="font-mono text-cyan-400 font-bold block mb-1">★ FREE METRO SHIPPING GRID</span>
            All orders above ₹1,499 are automatically processed with 100% Free Shipping throughout India pincodes!
          </div>
        </aside>

        {/* RIGHT PRODUCTS CARDS GRID (3 Columns) */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-16 bg-zinc-950 rounded-3xl border border-white/5 space-y-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 animate-pulse">
                <PackageOpen className="w-8 h-8" />
              </div>
              <div className="text-center">
                <h3 className="font-display font-medium text-white text-sm uppercase tracking-wider">No Aesthetics Matched Filters</h3>
                <p className="text-[10px] text-zinc-500 mt-1 max-w-[250px] mx-auto leading-relaxed">
                  Adjust maximum price boundaries, try checking other categories, or reset searches.
                </p>
              </div>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 font-mono rounded-xl bg-white text-black font-bold text-xs"
              >
                Flush filters & Reset
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((p) => {
                const isFavorite = wishlistIds.includes(p.id);
                const isLowStock = p.stock <= 5 && p.stock > 0;
                
                return (
                  <div 
                    key={p.id}
                    id={`product-card-${p.id}`}
                    className="group flex flex-col justify-between rounded-2xl overflow-hidden glass-panel border border-white/5 p-4 space-y-3.5 relative shadow-lg transform transition-all duration-300 hover:scale-[1.01] hover:border-white/10"
                  >
                    {/* Image block hover state */}
                    <div 
                      onClick={() => onNavigateToProduct(p.id)}
                      className="aspect-square w-full rounded-xl overflow-hidden relative bg-zinc-950 cursor-pointer"
                    >
                      <img 
                        src={p.images[0]} 
                        alt={p.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Floating Indicator Badges */}
                      <div className="absolute top-2 left-2 flex flex-col gap-1 z-10 text-[9px] font-mono uppercase tracking-widest font-bold">
                        {p.isTrending && (
                          <span className="bg-amber-500 text-black px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                            <Flame className="w-3 h-3 text-black fill-current animate-pulse" />
                            HOT
                          </span>
                        )}
                        {p.isNewArrival && (
                          <span className="bg-cyan-500 text-white px-2 py-0.5 rounded shadow-lg flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-white" />
                            NEW Arrival
                          </span>
                        )}
                        {isLowStock && (
                          <span className="bg-rose-600 text-white px-2 py-0.5 rounded shadow-lg">
                            STOCK ALARM
                          </span>
                        )}
                        {p.stock === 0 && (
                          <span className="bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded border border-white/10">
                            SOLDOUT
                          </span>
                        )}
                      </div>

                      {/* Wishlist Bubble */}
                      <button
                        onClick={(e) => { e.stopPropagation(); onToggleWishlist(p); }}
                        className={`absolute top-2 right-2 p-2 rounded-full border shadow-lg transition-all z-15 cursor-pointer hover:scale-105 ${
                          isFavorite ? 'bg-neon-pink border-neon-pink text-white' : 'bg-black/60 border-white/5 text-zinc-400 hover:text-white hover:bg-black/80'
                        }`}
                        title="Add to wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
                      </button>

                      {/* Cover overlay button */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300 pointer-events-none">
                        <span className="px-3 py-1.5 rounded-lg bg-white/10 text-white text-[10px] font-mono tracking-wider font-semibold border border-white/10 flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          Zoom Aesthetics
                        </span>
                      </div>
                    </div>

                    {/* Metadata detail block */}
                    <div className="text-left space-y-1 my-1 flex-1">
                      <div className="flex justify-between items-center text-[10px] text-zinc-500 font-mono uppercase tracking-wider">
                        <span>{CATEGORIES.find(c => c.id === p.category)?.name || p.category}</span>
                        <div className="flex items-center gap-0.5 font-sans font-medium text-amber-400">
                          <Star className="w-3 h-3 fill-current" />
                          <span>{p.rating}</span>
                        </div>
                      </div>

                      <h3 
                        onClick={() => onNavigateToProduct(p.id)}
                        className="font-display font-medium text-xs text-white group-hover:text-amber-400 cursor-pointer transition-colors line-clamp-1 py-0.5 uppercase tracking-wide"
                      >
                        {p.name}
                      </h3>
                      <p className="text-[10px] text-zinc-400 line-clamp-2 leading-relaxed font-light">{p.description}</p>
                    </div>

                    {/* Action Block - Pricing & Button */}
                    <div className="flex justify-between items-center pt-2 border-t border-white/5">
                      <div className="text-left">
                        <div className="text-[9px] text-zinc-500 line-through font-mono">₹{p.originalPrice.toLocaleString('en-IN')}</div>
                        <div className="text-sm font-semibold text-white font-mono">₹{p.price.toLocaleString('en-IN')}</div>
                      </div>

                      {p.stock > 0 ? (
                        <button
                          onClick={() => onAddToCart(p)}
                          className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-[10px] font-bold font-display cursor-pointer transition-all flex items-center gap-1 hover:scale-[1.02]"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          Add To Cart
                        </button>
                      ) : (
                        <span className="text-[10px] font-mono font-bold text-zinc-600 block px-2.5 py-1.5 border border-white/5 rounded-lg bg-zinc-950">
                          SOLD OUT
                        </span>
                      )}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
