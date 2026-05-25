/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, Heart, Flame, Sparkles, Star, Gamepad2, ArrowRight, Clock, ShieldCheck, 
  HelpCircle, AlertCircle, Phone, MessageCircle, Mail, ChevronRight, Inbox, Plus,
  FileCode, ListCollapse, MessageSquare, Terminal, Eye, VolumeX, Lightbulb, MapPin, Search
} from 'lucide-react';

import { DUMMY_PRODUCTS, CATEGORIES } from './data';
import { Product, CartItem, Order, User, EmailLog, SupportTicket } from './types';

// Importing Custom Layout Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MailConsole from './components/MailConsole';
import RazorpayModal from './components/RazorpayModal';
import InvoiceDocument from './components/InvoiceDocument';
import AdminPanel from './components/AdminPanel';
import AboutContactFaq from './components/AboutContactFaq';
import UserTrackDashboard from './components/UserTrackDashboard';
import ShopView from './components/ShopView';
import ProductDetailsView from './components/ProductDetailsView';
import CartCheckoutView from './components/CartCheckoutView';

export default function App() {
  // Core application states
  const [productsList, setProductsList] = useState<Product[]>(DUMMY_PRODUCTS);
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  
  // Searching & Category filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  // Cart & Wishlist state variables
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // User auth state
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'usr-buyer-0',
    name: 'Usman Pathan',
    email: 'usmanpathan0107@gmail.com',
    role: 'User',
    phone: '7822884303',
    address: '104, Lofi Towers, S.V. Road, Bandra West',
    city: 'Mumbai',
    zipCode: '400050'
  });

  // Orders Ledger state
  const [ordersLedger, setOrdersLedger] = useState<Order[]>([
    {
      id: 'ord_mock1',
      userId: 'usr-buyer-0',
      customerName: 'Usman Pathan',
      email: 'usmanpathan0107@gmail.com',
      phone: '7822884303',
      shippingAddress: '104, Lofi Towers, S.V. Road, Bandra West',
      city: 'Mumbai',
      pincode: '400050',
      items: [
        {
          productId: 'prod-projector',
          name: 'Astro Nebula Light Projector',
          price: 1899,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=500&q=80'
        }
      ],
      subtotal: 1899,
      discount: 189,
      deliveryCharge: 0,
      total: 1710,
      paymentMethod: 'Card',
      status: 'Shipped',
      date: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
      couponApplied: 'ROOMIXA10'
    }
  ]);

  // SMTP Mail System logs & Support tickets
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([
    {
      id: 'mail_log_1',
      type: 'Account Setup Welcome',
      sender: 'no-reply@roomixa.com',
      recipient: 'usmanpathan0107@gmail.com',
      subject: 'Welcome to Roomixa - Unit of ZK Business Hub',
      body: `Thank you for registering at Roomixa!\nYour secure profile ID has been updated to USR-BUYER-0.\nEnjoy flat 10% off using coupon 'ROOMIXA10' at checkout!`,
      timestamp: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
    }
  ]);

  const [usersList, setUsersList] = useState<User[]>([
    {
      id: 'usr-buyer-0',
      name: 'Usman Pathan',
      email: 'usmanpathan0107@gmail.com',
      role: 'User',
      phone: '7822884303',
      address: '104, Lofi Towers, S.V. Road, Bandra West',
      city: 'Mumbai',
      zipCode: '400050'
    }
  ]);

  const [couponsList, setCouponsList] = useState<any[]>([
    {
      code: 'ROOMIXA10',
      discountType: 'percentage',
      discountValue: 10,
      minPurchase: 0,
      description: 'Flat 10% off on all luxury setups'
    },
    {
      code: 'FESTIVE500',
      discountType: 'fixed',
      discountValue: 500,
      minPurchase: 2499,
      description: 'Flat ₹500 off on order values exceeding ₹2,499'
    }
  ]);

  const [supportTickets, setSupportTickets] = useState<any[]>([
    {
      id: 'ticket-101',
      name: 'Usman Pathan',
      email: 'usmanpathan0107@gmail.com',
      phone: '7822884303',
      subject: 'Bulk LED Projection Enquiry',
      message: 'Hey Roomixa! I want to order 5 Astro Nebula Projectors for my gaming lounge setup, do you have special discounts available?',
      resolved: false,
      status: 'Pending',
      date: new Date().toISOString()
    }
  ]);

  const [activityLogs, setActivityLogs] = useState<string[]>([
    'Secure application database bootstrapped',
    'Simulated payment gate Razorpay active',
    'Customer account [Usman Pathan] loaded in sandbox'
  ]);

  // Inline Razorpay trigger configuration
  const [activeRazorpay, setActiveRazorpay] = useState<{ amount: number; metadata: any } | null>(null);
  
  // Interactive PDF Invoice presentation trigger
  const [activeInvoiceOrder, setActiveInvoiceOrder] = useState<Order | null>(null);

  // Bottom development controllers drawer toggles
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [mailConsoleOpen, setMailConsoleOpen] = useState(false);

  // Countdown timer for Flash sales
  const [countdown, setCountdown] = useState({ hrs: 4, mins: 12, secs: 35 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hrs > 0) return { hrs: prev.hrs - 1, mins: 59, secs: 59 };
        return { hrs: 0, mins: 0, secs: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // System helpers: record action audits & dispatch mails
  const addActivityLog = (action: string) => {
    setActivityLogs(prev => [`[${new Date().toLocaleTimeString()}] ${action}`, ...prev].slice(0, 50));
  };

  const dispatchEmailLog = (type: string, recipient: string, subject: string, body: string) => {
    const newLog: EmailLog = {
      id: 'mail_' + Math.floor(Math.random() * 100000),
      type,
      sender: 'no-reply@roomixa.com',
      recipient,
      subject,
      body,
      timestamp: new Date().toISOString()
    };
    setEmailLogs(prev => [newLog, ...prev]);
    addActivityLog(`Email dispatched securely to ${recipient}: [${subject}]`);
  };

  // Navigations handler
  const handlePageNavigation = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    addActivityLog(`Navigated to page view: ${page.toUpperCase()}`);
  };

  // CART FUNCTIONS
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        addActivityLog(`Adjusted cart quantity for: ${product.name}`);
        return prev.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) } 
            : item
        );
      }
      addActivityLog(`Added product item to shopping cart: ${product.name}`);
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateCartQty = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(productId);
      return;
    }
    setCartItems(prev => prev.map(item => 
      item.product.id === productId ? { ...item, quantity: newQty } : item
    ));
    addActivityLog(`Updated shopping cart quantity for item ID: ${productId}`);
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    addActivityLog(`Removed item representation from cart ID: ${productId}`);
  };

  // WISHLIST FUNCTIONS
  const handleToggleWishlist = (product: Product) => {
    setWishlist(prev => {
      const exists = prev.find(p => p.id === product.id);
      if (exists) {
        addActivityLog(`Removed item bookmark from Wishlist: ${product.name}`);
        return prev.filter(p => p.id !== product.id);
      }
      addActivityLog(`Bookmarked custom creation to Wishlist: ${product.name}`);
      return [...prev, product];
    });
  };

  // ADMIN OPERATIONS
  const handleAddProduct = (newProd: Product) => {
    setProductsList(prev => [...prev, newProd]);
    addActivityLog(`Created new product catalog entry: ${newProd.name}`);
  };

  const handleUpdateProduct = (updatedProd: Product) => {
    setProductsList(prev => prev.map(p => p.id === updatedProd.id ? updatedProd : p));
    addActivityLog(`Updated catalog attributes on product ID: ${updatedProd.id}`);
  };

  const handleDeleteProduct = (pId: string) => {
    setProductsList(prev => prev.filter(p => p.id !== pId));
    addActivityLog(`Deleted item parameter from product catalog: ID ${pId}`);
  };

  const handleAddCoupon = (newCoup: any) => {
    setCouponsList(prev => [...prev, newCoup]);
    addActivityLog(`Added active checkout promotion coupon code: ${newCoup.code}`);
  };

  const handleDeleteCoupon = (code: string) => {
    setCouponsList(prev => prev.filter(c => c.code !== code));
    addActivityLog(`Purged promotion coupon code from directory: ${code}`);
  };

  const handleResolveTicket = (ticketId: string) => {
    setSupportTickets(prev => prev.map(t => t.id === ticketId ? { ...t, resolved: true, status: 'Resolved' } : t));
    addActivityLog(`Support ticket status resolved on reference: ${ticketId}`);
  };

  // RESOLVING FINAL SHIPMENT CONFIRMATION
  const handlePlaceOrder = (details: any) => {
    const finalOrderId = 'ord_' + Math.floor(Math.random() * 900000 + 100000);
    
    const newOrder: Order = {
      id: finalOrderId,
      userId: currentUser?.id || 'usr-guest',
      customerName: details.customerName,
      email: details.email,
      phone: details.phone,
      shippingAddress: details.shippingAddress,
      city: details.city,
      pincode: details.pincode,
      items: details.items,
      subtotal: details.subtotal,
      discount: details.discount,
      deliveryCharge: details.deliveryCharge,
      total: details.total,
      paymentMethod: details.paymentMethod,
      status: 'Pending',
      date: new Date().toISOString(),
      couponApplied: details.couponApplied
    };

    // Substract stock count
    setProductsList(prev => prev.map(p => {
      const purchased = details.items.find((item: any) => item.productId === p.id);
      if (purchased) {
        return { ...p, stock: Math.max(0, p.stock - purchased.quantity) };
      }
      return p;
    }));

    // Save Order in ledger list
    setOrdersLedger(prev => [...prev, newOrder]);
    
    // Wipe Cart
    setCartItems([]);

    // Open Printable Invoice overlay directly!
    setActiveInvoiceOrder(newOrder);

    // Auto-routing
    setCurrentPage('dashboard');

    addActivityLog(`Secure invoice completed successfully! ID Code: #${finalOrderId}`);

    // Customer transactional notification emails
    dispatchEmailLog(
      'Order Registration Success',
      details.email,
      `Your Roomixa Decor Order Confirmed! Transaction #${finalOrderId}`,
      `Dear ${details.customerName},\n\nWe have received your payment via ${details.paymentMethod} and your aesthetic room items are now reserved.\nOrder Total: ₹${details.total.toLocaleString('en-IN')}\nDestination Address: ${details.shippingAddress}, ${details.city} - ${details.pincode}\n\nWe are packaging your items inside premium dustproof wooden layers. Track details using Code: ${finalOrderId}\n\nThank you for choosing Roomixa — A Unit of ZK Business Hub.`
    );

    // Administrator notifications
    dispatchEmailLog(
      'New Order Administration Alert',
      'zkbusinesshub@gmail.com',
      `[ADMIN METRICS] New order placed on Roomixa registry #${finalOrderId}`,
      `A new checkout worth ₹${details.total.toLocaleString('en-IN')} has been completed.\n\nCustomer: ${details.customerName}\nMobile: ${details.phone}\nPayment Selected: ${details.paymentMethod}\nItems: ${details.items.map((it:any) => `${it.name} (${it.quantity}X)`).join(', ')}\n\nAuthorize packaging via Admin Control.`
    );
  };

  return (
    <div className="min-h-screen bg-[#020202] text-zinc-100 flex flex-col font-sans relative selection:bg-amber-500 selection:text-black">
      
      {/* Floating Developer Dashboard Indicator shortcuts */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col sm:flex-row gap-2">
        <button
          onClick={() => setMailConsoleOpen(!mailConsoleOpen)}
          className="p-3 bg-zinc-950 border border-white/10 text-cyan-400 hover:text-white rounded-full shadow-2xl flex items-center justify-center gap-1.5 cursor-pointer backdrop-blur-md hover:scale-105 active:scale-95 transition-all text-xs font-mono font-bold"
          title="SMTP Email Registers Console (GCP logs)"
        >
          <Inbox className="w-4 h-4" />
          <span>Mail Logs ({emailLogs.length})</span>
        </button>

        <button
          id="admin-override-bubble"
          onClick={() => setAdminPanelOpen(!adminPanelOpen)}
          className="p-3 bg-amber-500 text-black font-display font-black rounded-full shadow-2xl flex items-center justify-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95 transition-all text-xs uppercase"
          title="ZK Business Hub Admin Panel Override"
        >
          <ShieldCheck className="w-4 h-4 fill-current text-black" />
          <span>Admin Control</span>
        </button>
      </div>

      {/* Primary Top Navigations Bar */}
      <Navbar 
        currentUser={currentUser}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlist.length}
        searchQuery={searchQuery}
        onSearchChange={(query) => { setSearchQuery(query); if (query) setCurrentPage('shop'); }}
        onNavigate={handlePageNavigation}
        onSignOut={() => {
          setCurrentUser(null);
          addActivityLog('Session logged out securely');
        }}
        onOpenAdmin={() => { setAdminPanelOpen(true); }}
      />

      {/* Main Core Content body routers */}
      <main className="flex-1 pb-16">
        
        {/* HOMEPAGE ROUTER VIEW */}
        {currentPage === 'home' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* 1. CINEMATIC LUXURY HERO GRID */}
            <section className="relative overflow-hidden border-b border-brand-beige/10 py-20 sm:py-32 bg-gradient-to-b from-black via-brand-black to-black min-h-[85vh] flex items-center">
              {/* Ambient Cozy Room Light Halos (Glow Effects) */}
              <div className="absolute top-10 left-10 w-96 h-96 bg-brand-orange-glow/10 blur-[120px] rounded-full animated-glow-soft-orange pointer-events-none z-0" />
              <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-brand-purple/10 blur-[150px] rounded-full animated-glow-soft-purple pointer-events-none z-0" />
              <div className="absolute inset-0 dot-grid-bg pointer-events-none z-0" />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-10 w-full">
                
                {/* Left Text content */}
                <div className="md:col-span-7 text-left space-y-8">
                  <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-beige/10 text-brand-beige border border-brand-beige/25 text-[9px] font-mono uppercase font-bold tracking-[0.2em] shadow-[0_0_15px_rgba(222,203,183,0.05)]">
                    <Sparkles className="w-3.5 h-3.5 text-brand-orange-glow animate-pulse" />
                    Bespoke Aesthetic Spaces by ZK Hub
                  </span>
                  
                  <div className="space-y-4">
                    <h1 className="font-display font-bold text-5xl sm:text-7xl text-brand-cream tracking-tight uppercase leading-[0.95]" style={{ letterSpacing: '-0.02em' }}>
                      CHASE THE <br />
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-beige via-brand-beige-dark to-brand-cream glow-text-animated drop-shadow-[0_0_20px_rgba(222,203,183,0.2)] inline-block">
                        NEON MOOD
                      </span>
                    </h1>
                    <p className="text-zinc-400 text-sm leading-relaxed max-w-xl font-light font-sans">
                      Creators of premium lofi light ornaments, safety-shielded custom silicon neon tube installations, and high-density archive poster sets. Turn any flat room into a deeply cozy, cinematic sanctuary.
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-2">
                    <button 
                      onClick={() => handlePageNavigation('shop')}
                      className="px-8 py-3.5 rounded-full btn-premium-beige text-[11px] font-bold font-display uppercase tracking-widest cursor-pointer shadow-[0_4px_20px_rgba(222,203,183,0.15)] flex items-center gap-2"
                    >
                      Explore Collections
                      <ArrowRight className="w-4 h-4 text-brand-black" />
                    </button>
                    <button 
                      onClick={() => handlePageNavigation('categories')}
                      className="px-8 py-3.5 rounded-full btn-premium-dark text-[11px] font-medium font-mono uppercase tracking-wider cursor-pointer"
                    >
                      Browse Vibe Categories
                    </button>
                  </div>
                </div>

                {/* Right Image layout panel */}
                <div className="md:col-span-5 relative mt-6 md:mt-0">
                  <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-brand-orange-glow/20 to-brand-purple/30 blur-2xl opacity-60 pointer-events-none" />
                  
                  <div className="aspect-[4/5] w-full rounded-2xl overflow-hidden border border-brand-beige/10 relative shadow-2xl glass-panel floating-card-animation">
                    <img 
                      src="https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=600&q=80" 
                      alt="Roomixa Setup Model"
                      className="w-full h-full object-cover opacity-90 hover:scale-[1.03] transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
                    
                    <div className="absolute bottom-6 left-6 right-6 text-left space-y-1.5 z-10 select-none">
                      <span className="font-mono text-[8px] font-bold text-brand-beige uppercase tracking-[0.25em] block">Cozy Studio Mood</span>
                      <h3 className="font-display font-semibold text-sm text-brand-cream uppercase tracking-wider leading-none">Midnight Streamer Edition</h3>
                      <p className="text-[10px] text-zinc-400 font-light font-sans">Bespoke LED setups beginning at ₹899</p>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Why Choose us section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10 relative z-10 pt-10">
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.3em] text-brand-beige uppercase font-bold">The ZK Quality Anchor</span>
                <h2 className="font-display font-medium text-3xl text-brand-cream uppercase tracking-wider">UNDER THE SHELTER OF ZK BUSINESS HUB</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
                <div className="p-8 rounded-2xl glass-panel border border-brand-beige/5 hover:border-brand-beige/15 transition-all text-left space-y-3">
                  <div className="w-10 h-10 rounded-full bg-brand-orange-glow/10 border border-brand-orange-glow/20 flex items-center justify-center text-brand-orange-glow">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h3 className="text-[13px] font-semibold text-brand-cream font-display tracking-widest uppercase">12V Silent Safety Silicon</h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light font-sans">Our bespoke neon strips operate completely hum-free, output no voltage heat, and stay entirely cool to touch.</p>
                </div>
                
                <div className="p-8 rounded-2xl glass-panel border border-brand-beige/5 hover:border-brand-beige/15 transition-all text-left space-y-3">
                  <div className="w-10 h-10 rounded-full bg-brand-beige/10 border border-brand-beige/25 flex items-center justify-center text-brand-beige">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-[13px] font-semibold text-brand-cream font-display tracking-widest uppercase">Archival Paper 300 GSM</h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light font-sans">Art prints and poster sets arrive on heavy multi-ply card fiber sheets packed inside thick tubes with zero wrinkles.</p>
                </div>
                
                <div className="p-8 rounded-2xl glass-panel border border-brand-beige/5 hover:border-brand-beige/15 transition-all text-left space-y-3">
                  <div className="w-10 h-10 rounded-full bg-brand-purple/10 border border-brand-purple/25 flex items-center justify-center text-brand-purple">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="text-[13px] font-semibold text-brand-cream font-display tracking-widest uppercase">Express Shipping & COD</h3>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light font-sans">Direct logistical APIs provide real-time pincode timeline evaluations, Delhivery tracking, and Cash on Delivery option.</p>
                </div>
              </div>
            </section>

            {/* CATEGORY FOCUS SHOWCASE */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10 text-left">
              <div className="border-b border-brand-beige/10 pb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] text-brand-beige uppercase block mb-1">Tailored Subculture aesthetics</span>
                <h2 className="font-display font-medium text-3xl text-brand-cream uppercase tracking-wide">FILTER BY VIBE GENRE</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {CATEGORIES.map((cat, idx) => {
                  const catImages = [
                    'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80', // LED & neon
                    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80', // Ambient
                    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80', // Poster sets
                    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80'  // Projectors
                  ];
                  return (
                    <div 
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.id); handlePageNavigation('shop'); }}
                      className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer border border-brand-beige/10 hover:border-brand-beige/30 transition-all shadow-lg"
                    >
                      <img 
                        src={catImages[idx] || catImages[0]} 
                        alt={cat.name} 
                        className="w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-black/40 to-transparent" />
                      <div className="absolute bottom-5 left-5 right-5 space-y-1">
                        <span className="text-[8px] font-mono text-brand-beige uppercase tracking-[0.2em]">{cat.id.toUpperCase()}</span>
                        <h4 className="font-display font-medium text-sm text-brand-cream uppercase tracking-wider">{cat.name}</h4>
                        <p className="text-[9px] text-zinc-400 font-sans font-light leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">Browse Vibe Collection →</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 2. FLASH SALE SPECIAL SEC */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-brand-beige/10 flex flex-col md:flex-row md:items-center justify-between gap-8 relative overflow-hidden text-left shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                
                {/* Micro lights glows */}
                <div className="absolute -right-10 -bottom-10 w-96 h-96 rounded-full bg-brand-orange-glow/10 blur-3xl pointer-events-none" />
                <div className="absolute -left-10 -top-10 w-96 h-96 rounded-full bg-brand-purple/10 blur-3xl pointer-events-none" />

                <div className="space-y-4 z-10 max-w-lg">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-pink-glow/10 text-brand-pink-glow border border-brand-pink-glow/30 text-[9px] font-mono uppercase font-bold tracking-widest animate-pulse">
                    <Flame className="w-3.5 h-3.5" />
                    Boutique Drop: Live Flash Offer
                  </span>
                  
                  <h2 className="font-display font-bold text-2xl sm:text-4xl text-brand-cream tracking-tight uppercase leading-none">
                    15% SUNDAY DISPATCH OFF
                  </h2>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light font-sans">
                    Apply checkout code <strong className="text-brand-cream font-mono font-bold font-sans tracking-wide">ROOMIXA10</strong> to lock an extra 10% on top of live catalog discounts. Offer expires shortly!
                  </p>
                </div>

                {/* COUNTDOWN TIMER BLOCKS */}
                <div className="flex items-center gap-4 font-mono z-10 self-start md:self-center">
                  {[
                    { label: 'HOURS', value: countdown.hrs },
                    { label: 'MINUTES', value: countdown.mins },
                    { label: 'SECONDS', value: countdown.secs }
                  ].map((block, bidx) => (
                    <div key={bidx} className="flex flex-col items-center">
                      <div className="w-16 h-16 rounded-xl bg-black/80 border border-brand-beige/15 flex items-center justify-center font-black text-lg text-brand-beige shadow-inner glow-beige">
                        {block.value.toString().padStart(2, '0')}
                      </div>
                      <span className="text-[8px] text-zinc-500 mt-2 tracking-widest font-bold font-mono">{block.label}</span>
                    </div>
                  ))}
                </div>

                <div className="z-10 shrink-0 self-start md:self-center">
                  <button 
                    onClick={() => handlePageNavigation('shop')}
                    className="px-8 py-3.5 rounded-full btn-premium-beige text-[11px] font-bold font-display uppercase tracking-widest cursor-pointer shadow-lg"
                  >
                    Claim Deal
                  </button>
                </div>
              </div>
            </section>

            {/* 3. TRENDING PRODUCTS GRID FOR GEN-Z */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10 text-left pt-6">
              <div className="flex justify-between items-end border-b border-brand-beige/10 pb-4">
                <div>
                  <span className="text-[10px] font-mono tracking-[0.25em] text-brand-beige uppercase block mb-1">Highly Coveted Ornaments</span>
                  <h2 className="font-display font-medium text-3xl text-brand-cream uppercase tracking-wide">BEST SELLERS</h2>
                </div>
                <button 
                  onClick={() => handlePageNavigation('shop')}
                  className="font-mono text-xs text-brand-beige hover:text-white transition-colors flex items-center gap-1 cursor-pointer font-medium hover:scale-103"
                >
                  All Items ({productsList.length})
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Renders first 3 items as premium highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {productsList.slice(0, 3).map((p) => {
                  const isFavorite = wishlist.some(item => item.id === p.id);
                  return (
                    <div 
                      key={p.id}
                      className="group p-5 rounded-3xl glass-panel hover:border-brand-beige/20 transition-all duration-300 flex flex-col justify-between space-y-4 relative w-full"
                    >
                      {/* Image Frame */}
                      <div 
                        onClick={() => { setSelectedProductId(p.id); handlePageNavigation('product'); }}
                        className="aspect-square w-full rounded-2xl overflow-hidden bg-black/40 cursor-pointer relative border border-brand-beige/5"
                      >
                        <img 
                          src={p.images[0]} 
                          alt={p.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" 
                        />
                        
                        {/* Favorite button */}
                        <button
                          onClick={(e) => { e.stopPropagation(); handleToggleWishlist(p); }}
                          className={`absolute top-4 right-4 p-2.5 rounded-full border transition-all z-10 cursor-pointer shadow-xl ${
                            isFavorite ? 'bg-brand-pink-glow border-brand-pink-glow text-white' : 'bg-black/60 border-brand-beige/10 text-zinc-400 hover:text-white hover:border-brand-beige/30'
                          }`}
                        >
                          <Heart className="w-3.5 h-3.5 fill-current" />
                        </button>
                      </div>

                      {/* Detail metadata block */}
                      <div className="space-y-2 text-left flex-1 px-1">
                        <div className="flex justify-between items-center text-[9px] uppercase font-mono tracking-widest text-zinc-500">
                          <span>{CATEGORIES.find(c => c.id === p.category)?.name || p.category}</span>
                          <span className="flex items-center text-brand-orange-glow bg-brand-orange-glow/5 px-2 py-0.5 rounded-full border border-brand-orange-glow/10">★ {p.rating}</span>
                        </div>
                        <h3 
                          onClick={() => { setSelectedProductId(p.id); handlePageNavigation('product'); }}
                          className="font-display font-medium text-xs text-brand-cream hover:text-brand-beige uppercase cursor-pointer transition-colors tracking-wide leading-relaxed"
                        >
                          {p.name}
                        </h3>
                        <p className="text-[10px] text-zinc-400 leading-relaxed font-light font-sans line-clamp-2">{p.description}</p>
                      </div>

                      {/* Checkout actions */}
                      <div className="flex justify-between items-center pt-3 border-t border-brand-beige/5 font-mono px-1">
                        <div>
                          <div className="text-[9px] text-zinc-600 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</div>
                          <div className="text-[13px] font-semibold text-brand-beige">₹{p.price.toLocaleString('en-IN')}</div>
                        </div>

                        {p.stock > 0 ? (
                          <button
                            onClick={() => handleAddToCart(p)}
                            className="px-5 py-2 rounded-full bg-brand-cream hover:bg-brand-beige text-brand-black text-[10px] font-bold font-display uppercase tracking-widest cursor-pointer transition-all hover:scale-102 flex items-center gap-1.5"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Add To Cart
                          </button>
                        ) : (
                          <span className="text-[9px] font-mono text-zinc-500 px-3 py-1 bg-black/40 border border-brand-beige/5 rounded-full tracking-wider">SOLD OUT</span>
                        )}
                      </div>

                    </div>
                  );
                })}
              </div>
            </section>

            {/* Custom Interactive setup planner link */}
            <section className="bg-black/40 border-y border-brand-beige/10 relative z-10 py-16">
              <div className="absolute inset-0 dot-grid-bg pointer-events-none z-0" />
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-8 text-left relative z-10 w-full">
                <div className="space-y-2 max-w-xl">
                  <span className="text-[9px] font-mono tracking-[0.3em] text-brand-orange-glow uppercase flex items-center gap-1.5 font-bold">
                    <Terminal className="w-4 h-4" />
                    CO-DESIGN STUDIO
                  </span>
                  <h3 className="font-display font-medium text-2xl sm:text-3xl text-brand-cream uppercase tracking-wide">WANT BESPOKE NEON CARDS OR TAGS?</h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light font-sans">
                    Co-create room elements directly with our technical drawing atelier. We shape high-fidelity 12V cold neon tags styled perfectly to match your gamer handles or specific graphic layouts.
                  </p>
                </div>
                <button
                  onClick={() => handlePageNavigation('contact')}
                  className="px-8 py-3.5 rounded-full btn-premium-beige text-[11px] font-bold font-display uppercase tracking-widest shrink-0 cursor-pointer shadow-lg"
                >
                  Brief Atelier Team →
                </button>
              </div>
            </section>

            {/* 4. METROPOLITAN REVIEWS GRID */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 relative z-10 text-left">
              <div>
                <span className="text-[10px] font-mono tracking-[0.25em] text-brand-beige uppercase block mb-1">Verified Satisfaction Logbook</span>
                <h2 className="font-display font-medium text-3xl text-brand-cream uppercase tracking-wide">APPROVED SHOPPER INSIGHTS</h2>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
                {[
                  { name: 'Kunal Sen (Pune)', comment: 'The Sunday shipping offer was stellar. The 12V Silicon Tube neon decor arrived perfectly, hum-free, thick, and with secure wall pins. Exactly what is expected of ZK Brand quality.', rating: 5 },
                  { name: 'Simran Khosla (Delhi)', comment: 'Astro Nebula Light projector completely customizes my ceiling space. Produces a cozy watercolor nebula and real rotating green laser nodes. Perfect room vibes!', rating: 5 },
                  { name: 'Rohan Pathak (Mumbai Circle)', comment: 'Tracked my parcel transparently through Delhivery logistics. Packed in pristine bubbles. Archival print poster sets are heavy 300 GSM, extremely rich, deep colors.', rating: 5 }
                ].map((testimonial, tidx) => (
                  <div key={tidx} className="p-8 rounded-2xl glass-panel border border-brand-beige/5 hover:border-brand-beige/10 transition-all text-left space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs font-semibold text-brand-cream font-display block">{testimonial.name}</span>
                        <span className="text-[8px] font-mono uppercase text-brand-beige/60 tracking-wider">Verified Purchase</span>
                      </div>
                      <div className="flex text-brand-orange-glow gap-0.5">
                        {Array.from({ length: testimonial.rating }).map((_, rIdx) => (
                          <Star key={rIdx} className="w-3 ml-0.5 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed font-sans italic">
                      " {testimonial.comment} "
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. INSTAGRAM GALLERY SLIDES */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 relative z-10 text-left select-none pb-12">
              <div className="border-b border-brand-beige/10 pb-4">
                <span className="text-[10px] font-mono tracking-[0.25em] text-brand-beige uppercase block mb-1">Tag #RoomixaSetups for a feature</span>
                <h2 className="font-display font-medium text-3xl text-brand-cream uppercase tracking-wide">INSPIRE & BE INSPIRED</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
                  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80'
                ].map((url, iIndex) => (
                  <div key={iIndex} className="aspect-square rounded-2xl overflow-hidden border border-brand-beige/10 relative group shadow-md">
                    <img src={url} alt={`Insta setup ${iIndex}`} className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out" />
                    <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                      <span className="text-[9px] font-mono font-bold text-brand-beige uppercase tracking-[0.25em] border border-brand-beige/30 px-3 py-1.5 rounded-full bg-black/40">View Space</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* MODULAR ROUTER CHUNKS FOR SPECIFIC CATALOG PAGES */}
        {(currentPage === 'shop' || currentPage === 'categories') && (
          <ShopView 
            products={productsList}
            wishlistIds={wishlist.map(w => w.id)}
            searchQuery={searchQuery}
            selectedCategory={selectedCategory}
            onNavigateToProduct={(pId) => { setSelectedProductId(pId); handlePageNavigation('product'); }}
            onNavigateToCart={() => { handlePageNavigation('cart'); }}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectCategory={(catId) => { setSelectedCategory(catId || ''); }}
            currentPage={currentPage}
          />
        )}

        {currentPage === 'product' && selectedProductId && (
          <ProductDetailsView 
            product={productsList.find(p => p.id === selectedProductId) || productsList[0]}
            allProducts={productsList}
            wishlistIds={wishlist.map(w => w.id)}
            onAddToCart={handleAddToCart}
            onBuyNow={(p) => { handleAddToCart(p, 1); handlePageNavigation('cart'); }}
            onToggleWishlist={handleToggleWishlist}
            onNavigateToProduct={(pId) => { setSelectedProductId(pId); }}
            onBackToShop={() => handlePageNavigation('shop')}
            onAddReview={(pId, review) => {
              setProductsList(prev => prev.map(p => {
                if (p.id === pId) {
                  const updatedReviews = [
                    ...p.reviews,
                    {
                      id: 'rev-' + Math.floor(Math.random() * 100000),
                      userName: review.userName,
                      rating: review.rating,
                      comment: review.comment,
                      date: new Date().toLocaleDateString('en-IN')
                    }
                  ];
                  // compute rating again
                  const avg = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
                  return { ...p, reviews: updatedReviews, rating: avg };
                }
                return p;
              }));
              addActivityLog(`New rating submitted on item ID: ${pId}`);
            }}
          />
        )}

        {currentPage === 'cart' && (
          <CartCheckoutView 
            cartItems={cartItems}
            currentUser={currentUser}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveCartItem={handleRemoveCartItem}
            onPlaceOrder={handlePlaceOrder}
            onTriggerRazorpay={(amount, metadata) => {
              setActiveRazorpay({ amount, metadata });
            }}
            onNavigateToShop={() => handlePageNavigation('shop')}
            onNavigate={handlePageNavigation}
            onTriggerEmailLog={dispatchEmailLog}
          />
        )}

        {/* WISHLIST SPECIFIC RENDER */}
        {currentPage === 'wishlist' && (
          <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 text-left animate-in fade-in duration-300">
            <h1 className="font-display font-black text-2xl text-white tracking-tight uppercase">My bookmarked exotics ({wishlist.length})</h1>
            
            {wishlist.length === 0 ? (
              <div className="p-16 text-center bg-zinc-950 rounded-3xl border border-white/5 space-y-4">
                <Heart className="w-8 h-8 text-zinc-650 mx-auto animate-pulse" />
                <p className="text-xs text-zinc-500 font-mono">No aesthetics bookmark saved on your browse parameters yet.</p>
                <button onClick={() => handlePageNavigation('shop')} className="px-5 py-2.5 rounded-xl bg-white text-black font-display font-bold text-xs">
                  Discover Aesthetics
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {wishlist.map(p => (
                  <div key={p.id} className="p-4 bg-zinc-950 rounded-2xl border border-white/5 space-y-3 relative font-sans">
                    <img src={p.images[0]} alt={p.name} className="aspect-square w-full object-cover rounded-xl" />
                    <div>
                      <h4 className="font-semibold text-xs text-zinc-100 truncate font-display uppercase">{p.name}</h4>
                      <p className="font-mono text-xs text-amber-500 mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                      <button 
                        onClick={() => { handleAddToCart(p, 1); handleToggleWishlist(p); }}
                        className="py-1.5 bg-white text-black text-[10px] font-bold font-display rounded-lg cursor-pointer text-center"
                      >
                        Add to Cart
                      </button>
                      <button 
                        onClick={() => handleToggleWishlist(p)}
                        className="py-1.5 bg-zinc-900 text-zinc-400 text-[10px] rounded-lg cursor-pointer text-center hover:bg-zinc-800"
                      >
                        Discard
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* AUTHENTICATION & PROFILE DASHBOARD CHUNKS */}
        {(currentPage === 'login' || currentPage === 'signup' || currentPage === 'forgot' || currentPage === 'dashboard' || currentPage === 'tracking') && (
          <UserTrackDashboard 
            currentPage={currentPage}
            currentUser={currentUser}
            orders={ordersLedger}
            onSignIn={(usr) => {
              setCurrentUser(usr);
              addActivityLog(`Identity successfully verified for: ${usr.name}`);
            }}
            onSignOut={() => {
              setCurrentUser(null);
              addActivityLog('User sign out actions triggered');
              handlePageNavigation('login');
            }}
            onUpdateAddress={(coords) => {
              if (currentUser) {
                setCurrentUser({
                  ...currentUser,
                  address: coords.address,
                  city: coords.city,
                  zipCode: coords.zipCode,
                  phone: coords.phone
                });
                addActivityLog('Shipping coordinates updated on live user registry');
              }
            }}
            onNavigate={handlePageNavigation}
            onTriggerEmailLog={dispatchEmailLog}
            onViewInvoice={(invoiceDoc) => {
              setActiveInvoiceOrder(invoiceDoc);
            }}
          />
        )}

        {/* ABOUT / CONTACT / FAQ ROUTER GRID CHUNK */}
        {(currentPage === 'about' || currentPage === 'contact' || currentPage === 'faq' || currentPage === 'privacy-policy' || currentPage === 'terms-conditions' || currentPage === 'refund-policy' || currentPage === 'shipping-policy') && (
          <AboutContactFaq 
            currentPage={currentPage}
            onNavigate={handlePageNavigation}
            onSubmitContactForm={(form) => {
              // Register new support ticket
              const ticket: SupportTicket = {
                id: 'ticket-' + Math.floor(Math.random() * 1000 + 100),
                name: form.name,
                email: form.email,
                phone: form.phone,
                subject: form.subject,
                message: form.message,
                status: 'Pending',
                date: new Date().toISOString()
              };
              setSupportTickets(prev => [...prev, ticket]);
              addActivityLog(`Support ticket received under subject: [${form.subject}]`);

              // Dispatch alert emails
              dispatchEmailLog(
                'Contact Submissions Received',
                form.email,
                'Support Ticket Registered - Roomixa Inbox',
                `Dear ${form.name},\n\nWe have received your support request regarding "${form.subject}". Our logistics manager or aesthetic designers will get back to your hotline phone +91 ${form.phone} in 24 hours.\n\nThank you for trusting Roomixa — ZK Business Hub.`
              );

              dispatchEmailLog(
                'Support Ticket Alert',
                'zkbusinesshub@gmail.com',
                `[SUPPORT ALERTS] New support ticket regarding ${form.subject}`,
                `Customer Name: ${form.name}\nEmail Address: ${form.email}\nPhone No: ${form.phone}\nMessage details:\n${form.message}`
              );
            }}
          />
        )}

      </main>

      {/* FOOTER ANCHORS */}
      <Footer onNavigate={handlePageNavigation} />

      {/* RAZORPAY SECURED CHECKOUT TRANSACTIONS EMULATOR */}
      <RazorpayModal 
        isOpen={!!activeRazorpay}
        amount={activeRazorpay ? activeRazorpay.amount : 0}
        orderId={activeRazorpay ? 'ord_temp_pay' : ''}
        customerName={activeRazorpay ? activeRazorpay.metadata.customerName : ''}
        customerEmail={activeRazorpay ? activeRazorpay.metadata.email : ''}
        customerPhone={activeRazorpay ? activeRazorpay.metadata.phone : ''}
        onPaymentSuccess={(paymentId) => {
          if (activeRazorpay) {
            handlePlaceOrder(activeRazorpay.metadata);
            setActiveRazorpay(null);
          }
        }}
        onPaymentFailure={(err) => {
          alert(err);
          setActiveRazorpay(null);
        }}
        onClose={() => setActiveRazorpay(null)}
      />

      {/* PRINTABLE PDF TAX INVOICES DOCUMENT MODAL */}
      {activeInvoiceOrder && (
        <InvoiceDocument 
          order={activeInvoiceOrder}
          onClose={() => setActiveInvoiceOrder(null)}
        />
      )}

      {/* DEVELOPMENT CONTROL DRAWER OVERLAYS (STYLISH SLIDE OUT) */}
      {adminPanelOpen && (
        <AdminPanel 
          products={productsList}
          orders={ordersLedger}
          users={usersList}
          coupons={couponsList}
          supportTickets={supportTickets}
          activityLogs={activityLogs}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onUpdateOrderStatus={(oId, status) => {
            setOrdersLedger(prev => prev.map(o => {
              if (o.id === oId) {
                // Sent notifications on dispatch modifications
                if (status === 'Shipped') {
                  dispatchEmailLog(
                    'Order Shipped Logistics Update',
                    o.email,
                    `Your Roomixa aesthetics have been Shipped! Tracker: #${o.id}`,
                    `Dear ${o.customerName},\n\nYour items are now transit! Secure cargo partners have assigned premium tracking metrics to your address.\nEstimated metropolitan delivery: 2-3 Business Days.`
                  );
                } else if (status === 'Delivered') {
                  dispatchEmailLog(
                    'Order Delivered Success Stamp',
                    o.email,
                    `Congratulations! Decor Shipment Delivered #${o.id}`,
                    `Dear ${o.customerName},\n\nOur courier agent has successfully completed unboxing deliveries targeting your destination.\nRemember to file an unboxing video in 7 days for replacement guarantees!\n\nThank you for trusting Roomixa — ZK Business Hub.`
                  );
                }
                return { ...o, status };
              }
              return o;
            }));
            addActivityLog(`Dispatched status update for order #${oId} to: ${status}`);
          }}
          onAddCoupon={handleAddCoupon}
          onDeleteCoupon={handleDeleteCoupon}
          onResolveTicket={handleResolveTicket}
          onClose={() => setAdminPanelOpen(false)}
        />
      )}

      {/* SECURE EMAIL SYSTEM LOG CONTROLLER DRAWER */}
      <MailConsole 
        logs={emailLogs}
        onClear={() => setEmailLogs([])}
      />

    </div>
  );
}
