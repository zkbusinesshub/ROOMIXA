/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  TrendingUp, ShoppingBag, Users, AlertCircle, Plus, Edit2, Trash2, CheckCircle, XCircle, 
  Tag, Download, ArrowUpRight, Clock, MessageSquare, ListFilter, RotateCcw, PlusCircle, Activity
} from 'lucide-react';
import { Product, Order, User, Coupon, EmailLog, FAQItem } from '../types';
import { CATEGORIES } from '../data';

interface AdminPanelProps {
  products: Product[];
  orders: Order[];
  users: User[];
  coupons: Coupon[];
  supportTickets: any[];
  activityLogs: string[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
  onAddCoupon: (coupon: Coupon) => void;
  onDeleteCoupon: (code: string) => void;
  onResolveTicket: (id: string) => void;
  onClose: () => void;
}

export default function AdminPanel({
  products,
  orders,
  users,
  coupons,
  supportTickets,
  activityLogs,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onAddCoupon,
  onDeleteCoupon,
  onResolveTicket,
  onClose
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'users' | 'coupons' | 'reviews' | 'support' | 'logs'>('analytics');
  
  // Product Edit Form State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    category: 'led-lights',
    price: 999,
    originalPrice: 1999,
    description: '',
    stock: 10,
    images: ['https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80'],
    specifications: 'Warranty: 1 Year\nPower: USB DC 5V',
    features: 'Premium RGB\nSmart Companion App Sync'
  });

  // Coupon Form State
  const [newCoupon, setNewCoupon] = useState({
    code: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 15,
    minPurchase: 1499,
    description: 'Special seasonal coupon code'
  });

  // Calculate statistics
  const totalSales = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((acc, o) => acc + o.total, 0);

  const pendingSales = orders
    .filter(o => o.status === 'Pending')
    .reduce((acc, o) => acc + o.total, 0);

  const lowStockThreshold = 5;
  const lowStockProducts = products.filter(p => p.stock <= lowStockThreshold);

  // Export orders as CSV handler
  const exportOrdersCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Order ID,Customer,Email,Phone,Total (INR),Status,Payment Method,Date\n';
    
    orders.forEach(o => {
      csvContent += `"${o.id}","${o.customerName}","${o.email}","${o.phone}",${o.total},"${o.status}","${o.paymentMethod}","${o.date}"\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Roomixa_ZK_Orders_Export_${new Date().toISOString().substring(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Parse specs and features from textareas
    const specObj: { [key: string]: string } = {};
    productForm.specifications.split('\n').forEach(line => {
      const pts = line.split(':');
      if (pts.length >= 2) {
        specObj[pts[0].trim()] = pts[1].trim();
      } else if (line.trim()) {
        specObj['Config'] = line.trim();
      }
    });

    const featureList = productForm.features.split('\n').filter(Boolean);

    const completeProduct: Product = {
      id: isAddingNew ? productForm.name.toLowerCase().replace(/\s+/g, '-') + '-' + Math.floor(Math.random()*100) : productForm.id,
      name: productForm.name,
      category: productForm.category,
      price: Number(productForm.price),
      originalPrice: Number(productForm.originalPrice),
      description: productForm.description,
      stock: Number(productForm.stock),
      images: productForm.images,
      rating: 4.8,
      specifications: specObj,
      features: featureList,
      reviews: editingProduct?.reviews || []
    };

    if (isAddingNew) {
      onAddProduct(completeProduct);
    } else {
      onUpdateProduct(completeProduct);
    }

    setEditingProduct(null);
    setIsAddingNew(false);
  };

  const editProductTrigger = (p: Product) => {
    setEditingProduct(p);
    setIsAddingNew(false);
    
    const specString = Object.entries(p.specifications)
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');
    const featureString = p.features.join('\n');

    setProductForm({
      id: p.id,
      name: p.name,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice,
      description: p.description,
      stock: p.stock,
      images: p.images,
      specifications: specString,
      features: featureString
    });
  };

  const startNewProductTrigger = () => {
    setIsAddingNew(true);
    setEditingProduct(null);
    setProductForm({
      id: '',
      name: '',
      category: 'led-lights',
      price: 1299,
      originalPrice: 2499,
      description: 'Luminous dynamic bedroom decorative items with intelligent light output features.',
      stock: 15,
      images: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80'],
      specifications: 'Warranty: 1 Year Hub Guarantee\nVoltage: USB Type-C Low Power\nDiodes: High brightness micro LED nodes',
      features: 'Full spectrum 16 million colors\nPremium acrylic composite build\nMobile phone app remote integration'
    });
  };

  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCoupon.code.trim()) return;

    onAddCoupon({
      code: newCoupon.code.toUpperCase().replace(/\s+/g, ''),
      discountType: newCoupon.discountType,
      discountValue: Number(newCoupon.discountValue),
      minPurchase: Number(newCoupon.minPurchase),
      description: newCoupon.description
    });

    setNewCoupon({
      code: '',
      discountType: 'percentage',
      discountValue: 15,
      minPurchase: 1499,
      description: 'Promotional custom code added'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex bg-[#030303] text-zinc-100 flex-col md:flex-row overflow-hidden animate-in fade-in duration-200">
      
      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 bg-zinc-950 border-r border-white/5 flex flex-col h-auto md:h-full p-4 shrink-0">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div>
            <h2 className="font-display font-black text-xl tracking-tight text-white uppercase flex items-center gap-2">
              ROOMIXA <span className="text-[10px] bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20 font-mono">ADMIN</span>
            </h2>
            <p className="text-[9px] text-zinc-500 font-mono">ZK BUSINESS HUB INDIA</p>
          </div>
          <button 
            onClick={onClose}
            className="md:hidden text-zinc-400 hover:text-white text-xs px-2.5 py-1.5 rounded bg-zinc-900 border border-white/5"
          >
            Exit
          </button>
        </div>

        {/* Sidebar Nav Buttons */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium cursor-pointer transition-all ${activeTab === 'analytics' ? 'bg-amber-500/10 text-amber-300 border-l-4 border-amber-500' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
          >
            <TrendingUp className="w-4 h-4" />
            Core Analytics
          </button>
          
          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium cursor-pointer transition-all ${activeTab === 'products' ? 'bg-amber-500/10 text-amber-300 border-l-4 border-amber-500' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
          >
            <ShoppingBag className="w-4 h-4" />
            Manage Products
            {lowStockProducts.length > 0 && (
              <span className="ml-auto w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium cursor-pointer transition-all ${activeTab === 'orders' ? 'bg-amber-500/10 text-amber-300 border-l-4 border-amber-500' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
          >
            <Clock className="w-4 h-4" />
            Dispatch Orders
            {orders.filter(o => o.status === 'Pending').length > 0 && (
              <span className="ml-auto px-1.5 py-0.2 rounded text-[9px] bg-rose-600 text-white font-mono">
                {orders.filter(o => o.status === 'Pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium cursor-pointer transition-all ${activeTab === 'users' ? 'bg-amber-500/10 text-amber-300 border-l-4 border-amber-500' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
          >
            <Users className="w-4 h-4" />
            Customers Log
          </button>

          <button
            onClick={() => setActiveTab('coupons')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium cursor-pointer transition-all ${activeTab === 'coupons' ? 'bg-amber-500/10 text-amber-300 border-l-4 border-amber-500' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
          >
            <Tag className="w-4 h-4" />
            Coupon Center
          </button>

          <button
            onClick={() => setActiveTab('support')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium cursor-pointer transition-all ${activeTab === 'support' ? 'bg-amber-500/10 text-amber-300 border-l-4 border-amber-500' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
          >
            <MessageSquare className="w-4 h-4" />
            Queries Inbox
            {supportTickets.filter(t => !t.resolved).length > 0 && (
              <span className="ml-auto px-1.5 py-0.2 rounded text-[9px] bg-cyan-600 text-white font-mono">
                {supportTickets.filter(t => !t.resolved).length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left text-xs font-medium cursor-pointer transition-all ${activeTab === 'logs' ? 'bg-amber-500/10 text-amber-300 border-l-4 border-amber-500' : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200'}`}
          >
            <Activity className="w-4 h-4" />
            Audit Trails (Logs)
          </button>
        </nav>

        {/* Brand Exit Button (PC) */}
        <div className="mt-auto pt-6 border-t border-white/5 hidden md:block">
          <button 
            onClick={onClose}
            className="w-full py-2 bg-gradient-to-r from-zinc-900 to-black hover:from-white/10 hover:to-white/5 text-zinc-300 hover:text-white rounded-xl border border-white/5 text-xs font-bold font-display cursor-pointer transition-all flex items-center justify-center gap-1.5"
          >
            Exit Admin Area
          </button>
        </div>
      </aside>

      {/* Main dashboard viewport */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-black/60">
        
        {/* Top bar header */}
        <header className="px-6 py-4 border-b border-white/5 bg-zinc-950 flex justify-between items-center bg-transparent backdrop-blur-md">
          <h1 className="font-display font-medium text-base text-white capitalize">
            {activeTab === 'analytics' && 'Dynamic Hub Performance'}
            {activeTab === 'products' && 'Product Inventory Panel'}
            {activeTab === 'orders' && 'Real-Time Order Logistics'}
            {activeTab === 'users' && 'Active Customer Database'}
            {activeTab === 'coupons' && 'Discount Campaigns & Coupons'}
            {activeTab === 'support' && 'Aesthetic Service Tickets'}
            {activeTab === 'logs' && 'System Audit & Terminal Activity logs'}
          </h1>
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-zinc-400">Server Node Live</span>
          </div>
        </header>

        {/* Inner Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* ANALYTICS BOARD */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              {/* Stat grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel p-5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-start text-zinc-400 text-xs">
                    <span>Delivered Gross Sales (INR)</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="mt-3 font-mono text-2xl font-bold text-white">₹{totalSales.toLocaleString('en-IN')}</div>
                  <div className="mt-1 text-[10px] text-zinc-500 flex items-center gap-1">
                    <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-medium">+18.5%</span> weekly rise
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-start text-zinc-400 text-xs">
                    <span>Pending Pipeline Orders</span>
                    <ShoppingBag className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="mt-3 font-mono text-2xl font-bold text-white">₹{pendingSales.toLocaleString('en-IN')}</div>
                  <p className="mt-1 text-[10px] text-zinc-500 font-mono">From {orders.filter(o=>o.status==='Pending').length} pending carts</p>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/5">
                  <div className="flex justify-between items-start text-zinc-400 text-xs">
                    <span>Customer Index Size</span>
                    <Users className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="mt-3 font-mono text-2xl font-bold text-white">{users.length} Users</div>
                  <p className="mt-1 text-[10px] text-zinc-500 font-mono">100% active email matching</p>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/5 ring-1 ring-rose-500/20">
                  <div className="flex justify-between items-start text-zinc-400 text-xs">
                    <span>Low Stock Alarms</span>
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                  </div>
                  <div className="mt-3 font-mono text-2xl font-bold text-rose-400">{lowStockProducts.length} Items</div>
                  <div className="mt-1 text-[10px] text-zinc-500">Threshold: &lt;= {lowStockThreshold} units</div>
                </div>
              </div>

              {/* Bento Row: Low Stock Alert Warning Box */}
              {lowStockProducts.length > 0 && (
                <div className="p-4 bg-rose-950/20 border border-rose-500/30 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl">
                      <AlertCircle className="w-5 h-5 animate-bounce" />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-rose-300">Inventory Starvation Alarm!</h4>
                      <p className="text-[10px] text-zinc-400 leading-relaxed mt-0.5">
                        Multiple items are nearing depletion. Ensure restocking to prevent COD buy-now failures. Email alerts successfully targeted to zkbusinesshub@gmail.com!
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="shrink-0 px-3.5 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-400 text-xs font-bold text-black cursor-pointer transition-all"
                  >
                    Adjust Stock
                  </button>
                </div>
              )}

              {/* Order summary Table */}
              <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5 bg-zinc-950 flex justify-between items-center leading-none">
                  <div>
                    <h3 className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Latest Store Logs</h3>
                    <p className="text-[9px] text-zinc-500 font-mono mt-1">Directly tracking pipeline activities</p>
                  </div>
                  <button 
                    onClick={exportOrdersCSV}
                    className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:bg-white/10 text-[10px] font-mono text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    Export CSV
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-zinc-500 bg-black/40">
                        <th className="py-3 px-5">ID Ref</th>
                        <th className="py-3 px-5">Customer Billing</th>
                        <th className="py-3 px-5">Grand Total</th>
                        <th className="py-3 px-5">Payment Method</th>
                        <th className="py-3 px-5">Status Badge</th>
                        <th className="py-3 px-5">Placement Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-8 text-center text-zinc-500 font-mono text-xs">
                            No sales registered in database yet.
                          </td>
                        </tr>
                      ) : (
                        orders.slice(-5).reverse().map((o) => (
                          <tr key={o.id} className="hover:bg-white/[0.01]">
                            <td className="py-3 px-5 font-mono text-[10px] font-semibold text-zinc-400 uppercase">#{o.id}</td>
                            <td className="py-3 px-5">
                              <div className="font-medium text-white">{o.customerName}</div>
                              <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{o.email}</div>
                            </td>
                            <td className="py-3 px-5 font-mono font-bold text-amber-300">₹{o.total.toLocaleString('en-IN')}</td>
                            <td className="py-3 px-5 font-mono text-[10px]/none">{o.paymentMethod}</td>
                            <td className="py-3 px-5">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono ${
                                o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                o.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              }`}>
                                {o.status}
                              </span>
                            </td>
                            <td className="py-3 px-5 text-zinc-400 text-[10px]">{o.date.split('T')[0]}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS LIST MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Product Catalog</h3>
                  <p className="text-[10px] text-zinc-500">Edit, add, and adjust stock in real time. Deletes instantly sync to front shop.</p>
                </div>
                <button
                  id="admin-add-product-btn"
                  onClick={startNewProductTrigger}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-display font-bold text-xs rounded-xl cursor-pointer transition-all shadow-lg flex items-center justify-center gap-1.5 shadow-amber-950/20"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add New Decor Item
                </button>
              </div>

              {/* Form Area in Case of Add/Edit */}
              {(editingProduct || isAddingNew) && (
                <form onSubmit={handleProductSubmit} className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="flex justify-between items-center pb-3 border-b border-white/5">
                    <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                      {isAddingNew ? 'Register Complete Product Form' : `Edit Metadata for: ${editingProduct?.name}`}
                    </h4>
                    <button
                      type="button"
                      onClick={() => { setEditingProduct(null); setIsAddingNew(false); }}
                      className="text-zinc-500 hover:text-white"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 mb-1 font-semibold uppercase">Product Name</label>
                      <input
                        type="text"
                        required
                        value={productForm.name}
                        onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                        placeholder="e.g. Astro Glimpse Projector"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 mb-1 font-semibold uppercase">Select Category Tag</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500"
                      >
                        {CATEGORIES.map(c => (
                          <option key={c.id} value={c.id} className="bg-zinc-900">{c.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 mb-1 font-semibold uppercase">Regular Sale Price (INR ₹)</label>
                      <input
                        type="number"
                        required
                        value={productForm.price}
                        onChange={(e) => setProductForm({...productForm, price: Number(e.target.value)})}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 mb-1 font-semibold uppercase">Original Compare Price (₹)</label>
                      <input
                        type="number"
                        required
                        value={productForm.originalPrice}
                        onChange={(e) => setProductForm({...productForm, originalPrice: Number(e.target.value)})}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 mb-1 font-semibold uppercase">Stock Volume Balance</label>
                      <input
                        type="number"
                        required
                        value={productForm.stock}
                        onChange={(e) => setProductForm({...productForm, stock: Number(e.target.value)})}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 mb-1 font-semibold uppercase">Description Detail Description</label>
                    <textarea
                      required
                      value={productForm.description}
                      onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-amber-500 leading-relaxed"
                      placeholder="Enter premium description describing aesthetic benefits, setup tips etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 mb-1 font-semibold uppercase">Specifications (Line separated Key: Value)</label>
                      <textarea
                        value={productForm.specifications}
                        onChange={(e) => setProductForm({...productForm, specifications: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-emerald-400 focus:outline-none focus:border-amber-500"
                        placeholder="Power Input: USB type-C&#10;Material: Clear Acrylic&#10;Warranty: 1 Year"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 mb-1 font-semibold uppercase">Key Feature Bullet Points (Line separated)</label>
                      <textarea
                        value={productForm.features}
                        onChange={(e) => setProductForm({...productForm, features: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-zinc-200 focus:outline-none focus:border-amber-500"
                        placeholder="Stunning neon layout&#10;Vibrant interactive RGB diodes&#10;Eco-conscious safe build"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 mb-1 font-semibold uppercase">Product Image Showcase Link</label>
                    <input
                      type="text"
                      required
                      value={productForm.images[0]}
                      onChange={(e) => setProductForm({...productForm, images: [e.target.value]})}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs font-mono text-zinc-300 focus:outline-none focus:border-amber-500"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-3 border-t border-white/5">
                    <button
                      type="button"
                      onClick={() => { setEditingProduct(null); setIsAddingNew(false); }}
                      className="px-4 py-2 rounded-xl bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white hover:bg-zinc-800 text-xs font-medium cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold font-display cursor-pointer transition-all"
                    >
                      {isAddingNew ? 'Submit Creation Payload' : 'Update Inventory Item'}
                    </button>
                  </div>
                </form>
              )}

              {/* Products Table */}
              <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-zinc-500 bg-black/40">
                        <th className="py-3 px-5">Preview</th>
                        <th className="py-3 px-5">Tag Detail</th>
                        <th className="py-3 px-5">Product Details</th>
                        <th className="py-3 px-5">Unit Price</th>
                        <th className="py-3 px-5">In Stock</th>
                        <th className="py-3 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {products.map((p) => {
                        const isLow = p.stock <= lowStockThreshold;
                        return (
                          <tr key={p.id} className="hover:bg-white/[0.01]">
                            <td className="py-3 px-5">
                              <img 
                                src={p.images[0]} 
                                alt={p.name} 
                                className="w-10 h-10 object-cover rounded-lg border border-white/10"
                                referrerPolicy="no-referrer"
                              />
                            </td>
                            <td className="py-3 px-5 uppercase font-mono text-[9px] text-zinc-500">{p.category}</td>
                            <td className="py-3 px-5">
                              <div className="font-semibold text-white">{p.name}</div>
                              <p className="text-[10px] text-zinc-500 line-clamp-1 mt-0.5">{p.description}</p>
                            </td>
                            <td className="py-3 px-5 font-mono font-semibold">₹{p.price.toLocaleString('en-IN')}</td>
                            <td className="py-3 px-5 font-mono">
                              <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                                isLow ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              }`}>
                                {p.stock} pcs {isLow && '⚠️ LOW'}
                              </span>
                            </td>
                            <td className="py-3 px-5 text-right space-x-1">
                              <button
                                onClick={() => editProductTrigger(p)}
                                className="p-1.5 rounded-lg bg-zinc-900 border border-white/5 hover:bg-white/10 text-zinc-300 hover:text-white cursor-pointer transition-colors"
                                title="Edit attributes"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => onDeleteProduct(p.id)}
                                className="p-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 cursor-pointer transition-colors"
                                title="Delete from system"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* DISPATCH ORDER LOGISTICS */}
          {activeTab === 'orders' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Logistics Dispatch Controller</h3>
                <p className="text-[10px] text-zinc-500">Coordinate item routing maps and adjust states. Customer will receive automated mailing confirmations synchronously.</p>
              </div>

              <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-zinc-500 bg-black/40">
                        <th className="py-3 px-5 font-mono">Order ID</th>
                        <th className="py-3 px-5">Billing & Recipient Info</th>
                        <th className="py-3 px-5">Decor items mapping</th>
                        <th className="py-3 px-5">Payment / Value</th>
                        <th className="py-3 px-5">Interactive Status Select</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {orders.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-zinc-500 font-mono text-xs">
                            No dispatch queues are currently active.
                          </td>
                        </tr>
                      ) : (
                        [...orders].reverse().map((o) => (
                          <tr key={o.id} className="hover:bg-white/[0.01]">
                            <td className="py-3 px-5 font-mono text-[10px] font-semibold text-zinc-400 uppercase">#{o.id}</td>
                            <td className="py-3 px-5">
                              <div className="font-medium text-white">{o.customerName}</div>
                              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">PH: +91 {o.phone}</div>
                              <div className="text-[10px] text-zinc-500 max-w-[200px] truncate mt-0.5">{o.shippingAddress}</div>
                            </td>
                            <td className="py-3 px-5 max-w-[180px]">
                              <div className="space-y-0.5">
                                {o.items.map(item => (
                                  <div key={item.productId} className="text-[10px] text-zinc-300 truncate">
                                    • {item.name} <span className="font-mono text-[9px] text-zinc-500">(x{item.quantity})</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="py-3 px-5">
                              <div className="font-mono font-bold text-amber-300">₹{o.total.toLocaleString('en-IN')}</div>
                              <span className="text-[9px] font-mono text-zinc-500">{o.paymentMethod}</span>
                            </td>
                            <td className="py-3 px-5">
                              <select
                                value={o.status}
                                onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as Order['status'])}
                                className={`px-2 py-1 select-status rounded-lg text-[10px] font-semibold text-white cursor-pointer border border-white/10 outline-none ${
                                  o.status === 'Delivered' ? 'bg-emerald-950 text-emerald-400' :
                                  o.status === 'Cancelled' ? 'bg-rose-950 text-rose-400' :
                                  o.status === 'Shipped' || o.status === 'Out for Delivery' ? 'bg-cyan-950 text-cyan-400' :
                                  'bg-zinc-900 text-amber-400'
                                }`}
                              >
                                <option value="Pending">Pending Validation</option>
                                <option value="Confirmed">Confirmed Checkouts</option>
                                <option value="Shipped">Shipped Transit</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered Successfully</option>
                                <option value="Cancelled">Cancelled/Terminated</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CUSTOMERS LOG LIST */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Registered Roomixa Community Profiles</h3>
                <p className="text-[10px] text-zinc-500 font-mono">Review active users and access hierarchy details.</p>
              </div>

              <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-zinc-500 bg-black/40">
                        <th className="py-3 px-5">System ID</th>
                        <th className="py-3 px-5">Full Named Customer</th>
                        <th className="py-3 px-5">Email Identifier</th>
                        <th className="py-3 px-5">Pincode / Location Mapping</th>
                        <th className="py-3 px-5">Authority Layer</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-white/[0.01]">
                          <td className="py-3 px-5 font-mono text-[10px] text-zinc-500 uppercase">{u.id}</td>
                          <td className="py-3 px-5 font-medium text-white">{u.name}</td>
                          <td className="py-3 px-5 font-mono text-zinc-400">{u.email}</td>
                          <td className="py-3 px-5 text-zinc-400">
                            {u.zipCode ? `PIN: ${u.zipCode}, ${u.city || ''}` : 'Not provided yet'}
                          </td>
                          <td className="py-3 px-5">
                            <span className={`px-20 py-0.5 rounded text-[9px] font-bold ${
                              u.role === 'Admin' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* COUPONS CENTER */}
          {activeTab === 'coupons' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Form to insert new code */}
                <form onSubmit={handleCreateCouponSubmit} className="glass-panel p-5 rounded-2xl border border-white/5 space-y-4 h-fit">
                  <h4 className="text-zinc-200 text-xs font-semibold uppercase tracking-wider pb-2 border-b border-white/5">Assemble New Code</h4>
                  
                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 mb-1">PROMOTION CODE WORD</label>
                    <input
                      type="text"
                      required
                      value={newCoupon.code}
                      onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value})}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white uppercase focus:outline-none focus:border-amber-500"
                      placeholder="e.g. MONSTER20"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 mb-1">TYPE</label>
                      <select
                        value={newCoupon.discountType}
                        onChange={(e) => setNewCoupon({...newCoupon, discountType: e.target.value as any})}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-amber-500"
                      >
                        <option value="percentage">Percentage %</option>
                        <option value="fixed">Fixed Flat INR ₹</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono text-zinc-400 mb-1">VALUE</label>
                      <input
                        type="number"
                        required
                        value={newCoupon.discountValue}
                        onChange={(e) => setNewCoupon({...newCoupon, discountValue: Number(e.target.value)})}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 mb-1">MINIMUM ORDER AMOUNT (INR ₹)</label>
                    <input
                      type="number"
                      required
                      value={newCoupon.minPurchase}
                      onChange={(e) => setNewCoupon({...newCoupon, minPurchase: Number(e.target.value)})}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono text-zinc-400 mb-1">SLOGAN DESCRIPTION</label>
                    <input
                      type="text"
                      required
                      value={newCoupon.description}
                      onChange={(e) => setNewCoupon({...newCoupon, description: e.target.value})}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-xl text-xs text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-black font-display font-medium text-xs rounded-xl cursor-pointer transition-all"
                  >
                    Deploy Promotion Code
                  </button>
                </form>

                {/* Listing Grid */}
                <div className="md:col-span-2 space-y-3">
                  <h4 className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Active Promo Codes</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {coupons.map(c => (
                      <div key={c.code} className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center">
                            <span className="font-mono text-sm font-black text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded border border-amber-500/20">{c.code}</span>
                            <span className="text-[10px] text-zinc-500 uppercase font-mono">
                              {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-300 mt-2 font-display">{c.description}</p>
                          <p className="text-[10px] text-zinc-500 font-mono mt-1">Min purchase required: ₹{c.minPurchase}</p>
                        </div>
                        <button
                          onClick={() => onDeleteCoupon(c.code)}
                          className="mt-4 text-[10px] font-mono text-rose-400 hover:text-rose-300 text-left cursor-pointer"
                        >
                          Terminate coupon code
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* QUERIES INBOX */}
          {activeTab === 'support' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div>
                <h3 className="text-zinc-300 text-xs font-semibold uppercase tracking-wider">Customer Support Hotline Queries</h3>
                <p className="text-[10px] text-zinc-500">Respond to customer inputs securely. Submitting contact forms instantly sends notification traces to zkbusinesshub@gmail.com.</p>
              </div>

              <div className="glass-panel rounded-2xl border border-white/5 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/5 text-zinc-500 bg-black/40">
                        <th className="py-3 px-5">Timestamp</th>
                        <th className="py-3 px-5">Sender Metadata</th>
                        <th className="py-3 px-5">Inquiry Topic</th>
                        <th className="py-3 px-5">Message details</th>
                        <th className="py-3 px-5 text-right">Moderations</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {supportTickets.length === 0 ? (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-zinc-500 font-mono text-xs">
                            Queries inbox is currently clean of messages.
                          </td>
                        </tr>
                      ) : (
                        [...supportTickets].reverse().map((t) => (
                          <tr key={t.id} className="hover:bg-white/[0.01]">
                            <td className="py-3 px-5 font-mono text-[10px] text-zinc-500">{t.date}</td>
                            <td className="py-3 px-5">
                              <div className="font-medium text-white">{t.name}</div>
                              <div className="text-[10px] text-zinc-400 font-mono mt-0.5">PH: +91 {t.phone}</div>
                              <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{t.email}</div>
                            </td>
                            <td className="py-3 px-5">
                              <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 text-[9px] font-semibold">{t.subject}</span>
                            </td>
                            <td className="py-3 px-5 p-3 max-w-[220px] text-zinc-300 italic">
                              "{t.message}"
                            </td>
                            <td className="py-3 px-5 text-right">
                              {t.resolved ? (
                                <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center justify-end gap-1">
                                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                  Resolved
                                </span>
                              ) : (
                                <button
                                  onClick={() => onResolveTicket(t.id)}
                                  className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 rounded text-[9px] font-bold tracking-wide cursor-pointer text-center"
                                >
                                  Mark as Resolved
                                </button>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* AUDIT TERMINAL ACTIONS */}
          {activeTab === 'logs' && (
            <div className="space-y-6 animate-in fade-in duration-300 bg-black/40 p-4 rounded-xl border border-white/5 font-mono text-xs leading-relaxed">
              <div className="flex justify-between items-center text-zinc-400 border-b border-white/5 pb-2 mb-4">
                <span>SYSTEM LOGS: terminal@roomixa:~$</span>
                <span>Active thread: 02</span>
              </div>
              <div className="space-y-1.5 font-mono max-h-[450px] overflow-y-auto pr-2 text-[11px]">
                {activityLogs.map((log, index) => (
                  <div key={index} className="text-zinc-400 flex items-start gap-2">
                    <span className="text-amber-500 shrink-0">[{new Date().toLocaleTimeString()}]</span>
                    <span className="text-zinc-300">{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
