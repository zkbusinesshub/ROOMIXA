/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Star, Heart, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, Truck, Clock, 
  ChevronRight, Sparkles, MessageCircle, MoreHorizontal, User, AlertCircle
} from 'lucide-react';
import { Product } from '../types';

interface ProductDetailsViewProps {
  product: Product;
  allProducts: Product[];
  wishlistIds: string[];
  onAddToCart: (p: Product, qty?: number) => void;
  onBuyNow: (p: Product) => void;
  onToggleWishlist: (p: Product) => void;
  onNavigateToProduct: (id: string) => void;
  onBackToShop: () => void;
  onAddReview: (productId: string, review: { userName: string; rating: number; comment: string }) => void;
}

export default function ProductDetailsView({
  product,
  allProducts,
  wishlistIds,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  onNavigateToProduct,
  onBackToShop,
  onAddReview
}: ProductDetailsViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [purchaseQty, setPurchaseQty] = useState(1);
  const isFavorite = wishlistIds.includes(product.id);

  // New review form states
  const [reviewName, setReviewName] = useState('Usman Pathan');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('Absolutely amazing room aesthetic. Setup completed in Bandra West bedroom and look premium!');
  const [reviewSubmittedFlag, setReviewSubmittedFlag] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    onAddReview(product.id, {
      userName: reviewName,
      rating: reviewRating,
      comment: reviewComment
    });

    setReviewSubmittedFlag(true);
    setTimeout(() => {
      setReviewSubmittedFlag(false);
      setReviewComment('');
    }, 4000);
  };

  // Find recommended items (same category, different ID)
  const recommendations = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300 font-sans text-left">
      
      {/* Upper breadcrumbs link */}
      <button 
        id="product-back-to-shop-btn"
        onClick={onBackToShop}
        className="mb-8 font-mono text-[10px] uppercase tracking-wider text-zinc-500 hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back To Store Catalog
      </button>

      {/* Main product presentation columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start pb-12 border-b border-white/5">
        
        {/* Left Column: Multi-image presentation */}
        <div className="space-y-4">
          <div className="aspect-square w-full rounded-3xl overflow-hidden glass-panel border border-white/5 relative bg-zinc-950 flex items-center justify-center">
            <img 
              src={product.images[activeImageIndex] || product.images[0]} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {product.stock <= 5 && product.stock > 0 && (
              <span className="absolute top-4 left-4 bg-rose-600 text-white font-mono text-[9px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded shadow-lg">
                STOCK STARVATION WARNING: ONLY {product.stock} LEFT
              </span>
            )}
          </div>

          {/* Carousel thumbnails swiper array */}
          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border transition-all cursor-pointer bg-zinc-950 ${activeImageIndex === i ? 'border-amber-500 ring-1 ring-amber-500/20' : 'border-white/5 hover:border-white/25'}`}
                >
                  <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Metadata details & configurations */}
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest text-zinc-500">
              <span className="text-amber-500 font-bold">ROOMIXA ORIGINAL CREATION</span>
              <span>ID: {product.id}</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase leading-none">{product.name}</h1>
            
            {/* Reviews summary */}
            <div className="flex items-center gap-1 pt-1 text-xs text-zinc-400">
              <div className="flex text-amber-400">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="font-semibold text-white ml-1">{product.rating} / 5</span>
              <span className="text-zinc-600 font-mono">|</span>
              <span className="font-mono text-[10px] tracking-wider uppercase">{product.reviews.length} Verified Customer Reviews</span>
            </div>
          </div>

          <p className="text-zinc-400 text-xs leading-relaxed font-light font-sans">{product.description}</p>

          {/* Pricing Row */}
          <div className="flex items-end gap-3 py-3 border-y border-white/5 bg-black/30 px-4 rounded-xl">
            <div className="text-3xl font-black font-mono text-white">₹{product.price.toLocaleString('en-IN')}</div>
            <div className="text-sm text-zinc-500 line-through font-mono pb-1">₹{product.originalPrice.toLocaleString('en-IN')}</div>
            <span className="px-2.5 py-0.5 rounded text-[10px] bg-rose-500/15 text-rose-400 font-mono font-bold ml-auto mb-1">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% DISPATCH DEAL
            </span>
          </div>

          {/* Buy Options block & Quantity adjust */}
          <div className="space-y-4 pt-1">
            {product.stock > 0 ? (
              <div className="space-y-4">
                {/* Quantity selector */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-semibold">Quantity details:</span>
                  <div className="flex items-center rounded-xl bg-zinc-950 border border-white/10 overflow-hidden font-mono text-sm max-w-[120px]">
                    <button 
                      onClick={() => setPurchaseQty(prev => Math.max(1, prev - 1))}
                      className="px-3.5 py-1.5 hover:bg-white/5 text-zinc-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 text-white font-bold">{purchaseQty}</span>
                    <button 
                      onClick={() => setPurchaseQty(prev => Math.min(product.stock, prev + 1))}
                      className="px-3.5 py-1.5 hover:bg-white/5 text-zinc-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600 uppercase">Available stock: {product.stock} units</span>
                </div>

                {/* Operations Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                  <button 
                    id="product-details-add-to-cart"
                    onClick={() => onAddToCart(product, purchaseQty)}
                    className="py-3 px-4 rounded-xl border border-white hover:bg-white text-black font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer hover:scale-[1.01] text-center"
                  >
                    Add to Cart
                  </button>
                  <button 
                    id="product-details-buy-now"
                    onClick={() => { onAddToCart(product, purchaseQty); onBuyNow(product); }}
                    className="py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-display font-black text-xs uppercase tracking-wider transition-all cursor-pointer hover:scale-[1.01] text-center shadow-lg shadow-amber-950/20"
                  >
                    Buy Now Directly
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-zinc-950 border border-white/5 text-center">
                <p className="text-zinc-500 text-xs font-mono font-bold uppercase">This custom creation has sold out temporarily.</p>
                <button 
                  onClick={onBackToShop}
                  className="mt-2 text-[10px] font-mono text-amber-500 hover:underline"
                >
                  Explore other aesthetics →
                </button>
              </div>
            )}
          </div>

          {/* Trust assurances block */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/5 text-[10px]/none font-mono text-zinc-500">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-500 shrink-0" />
              <span>METRO FREE SHIPPING ON ₹1499+</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>ZK SECURED PACKAGING MAP</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>7-DAY UNBOX视频 REPLACEMENT</span>
            </div>
          </div>
        </div>

      </div>

      {/* Specifications & Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10 border-b border-white/5">
        
        {/* Specs Table */}
        <div className="space-y-4 text-left">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-300">Technical Specifications</h3>
          <div className="rounded-2xl border border-white/5 bg-zinc-950 overflow-hidden text-xs">
            {Object.entries(product.specifications).map(([key, value], idx) => (
              <div key={key} className={`flex p-3 justify-between ${idx % 2 === 0 ? 'bg-black/20' : ''}`}>
                <span className="text-zinc-500 font-mono">{key}</span>
                <span className="text-zinc-300 font-medium font-sans">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features list */}
        <div className="space-y-4 text-left font-sans">
          <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-300 font-sans">Key Design Elements</h3>
          <div className="space-y-3">
            {product.features.map((fea, i) => (
              <div key={i} className="flex gap-2.5 items-start text-xs text-zinc-400 font-sans leading-normal font-light">
                <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{fea}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Form & Lists */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 py-10">
        
        {/* Left reviewers list */}
        <div className="md:col-span-2 space-y-6 text-left">
          <h3 className="font-display font-medium text-sm text-white uppercase tracking-wider">Verified Customer Reviews ({product.reviews.length})</h3>
          
          <div className="space-y-4">
            {product.reviews.length === 0 ? (
              <p className="text-zinc-500 font-mono text-xs italic">No reviews registered for this decor creation yet. Be the first to catalog your setup!</p>
            ) : (
              product.reviews.map((rev) => (
                <div key={rev.id} className="p-4 rounded-2xl bg-zinc-950 border border-white/5 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-xs font-semibold text-zinc-300 font-display">{rev.userName}</div>
                      <p className="text-[9px] text-zinc-600 font-mono mt-0.5">PURCHASER STAMP: {rev.date}</p>
                    </div>
                    {/* Rating stars */}
                    <div className="flex text-amber-400 gap-0.5">
                      {Array.from({ length: Math.floor(rev.rating) }).map((_, st) => (
                        <Star key={st} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light italic font-sans">"{rev.comment}"</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Add Review Form */}
        <div className="md:col-span-1">
          <form onSubmit={handleReviewSubmit} className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4">
            <h4 className="text-zinc-200 text-xs font-semibold uppercase tracking-wider pb-2 border-b border-white/5">Write Review Card</h4>
            
            <div>
              <label className="block text-[10px] font-mono text-zinc-500 mb-1">ACCOUNT NAME</label>
              <input
                type="text"
                required
                value={reviewName}
                onChange={(e) => setReviewName(e.target.value)}
                className="w-full px-3 py-1.5 bg-black/40 border border-white/15 rounded-lg text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 mb-1">RATING SCORE (1-5)</label>
              <select
                value={reviewRating}
                onChange={(e) => setReviewRating(Number(e.target.value))}
                className="w-full px-3 py-1.5 bg-black/40 border border-white/15 rounded-lg text-xs text-white"
              >
                <option value={5}>⭐⭐⭐⭐⭐ (5 Stars Excellent)</option>
                <option value={4}>⭐⭐⭐⭐ (4 Stars Good)</option>
                <option value={3}>⭐⭐⭐ (3 Stars Average)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-500 mb-1">COMMENTS ON DECOR SETUP</label>
              <textarea
                required
                rows={3}
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="w-full px-3 py-1.5 bg-black/40 border border-white/15 rounded-lg text-xs text-white leading-normal"
              />
            </div>

            {reviewSubmittedFlag ? (
              <div className="p-2 border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold rounded-lg text-center font-mono">
                Setup review submitted safely. Admin alert sent!
              </div>
            ) : (
              <button
                type="submit"
                className="w-full py-2 bg-white hover:bg-zinc-200 text-black font-display font-medium text-xs rounded-xl cursor-pointer"
              >
                Submit Review Rating
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Recommendations Slider Grid */}
      {recommendations.length > 0 && (
        <div className="pt-8 space-y-6">
          <h3 className="font-display font-medium text-sm text-zinc-300 uppercase tracking-widest text-left">Complete your Bedroom Style Setup</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {recommendations.map((p) => (
              <div 
                key={p.id}
                onClick={() => onNavigateToProduct(p.id)}
                className="p-3 bg-zinc-950 rounded-2xl border border-white/5 hover:border-amber-500/10 transition-all cursor-pointer text-left group space-y-2.5 select-none"
              >
                <div className="aspect-square w-full rounded-xl overflow-hidden bg-[#0d0d0d]">
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300" />
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-zinc-200 group-hover:text-amber-400 font-display line-clamp-1 truncate uppercase">{p.name}</h4>
                  <div className="text-xs font-mono font-medium text-amber-500 mt-1">₹{p.price.toLocaleString('en-IN')}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
