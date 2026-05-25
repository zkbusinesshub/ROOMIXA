/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Download, Printer, Shield, CheckCircle, Smartphone, Mail, MapPin } from 'lucide-react';
import { Order } from '../types';

interface InvoiceDocumentProps {
  order: Order;
  onClose: () => void;
}

export default function InvoiceDocument({ order, onClose }: InvoiceDocumentProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 print:bg-white print:p-0">
      <div id="invoice-modal-card" className="w-full max-w-3xl rounded-3xl bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden text-white flex flex-col my-8 print:w-full print:rounded-none print:bg-white print:text-black print:border-none print:shadow-none">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="px-6 py-4 border-b border-white/5 bg-zinc-950 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono font-medium tracking-wide">Secure PDF Invoice Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="print-invoice-btn"
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-medium cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              Print Invoice
            </button>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-lg bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 text-xs font-mono"
            >
              Close
            </button>
          </div>
        </div>

        {/* Invoice Printable Sheet */}
        <div className="p-8 sm:p-12 space-y-8 bg-[#0a0a0a] text-zinc-300 print:bg-white print:text-black print:p-4">
          
          {/* Brand header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-6 border-b border-white/10 pb-8 print:border-zinc-200">
            <div>
              <h1 className="font-display font-black text-3xl tracking-tight text-white print:text-black">ROOMIXA</h1>
              <p className="text-xs text-zinc-400 font-mono tracking-wider mt-1 print:text-zinc-600">A UNIT OF ZK BUSINESS HUB</p>
              
              <div className="text-[11px] text-zinc-500 space-y-1 mt-4 print:text-zinc-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-zinc-400" />
                  <span>HQ: Mumbai Room Decor Craft Circle, India</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Smartphone className="w-3 h-3 text-zinc-400" />
                  <span>Support: +91 7822884303</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3 h-3 text-zinc-400" />
                  <span>Admin Panel Email: zkbusinesshub@gmail.com</span>
                </div>
              </div>
            </div>

            <div className="text-right flex flex-col items-end">
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Tax Invoice</span>
              <span className="font-mono text-xs font-semibold text-white print:text-black mt-1">#INV-{order.id.toUpperCase()}</span>
              
              <span className="text-[10px] text-zinc-400 font-mono mt-3">DATE / TIME:</span>
              <span className="text-xs font-semibold text-zinc-300 print:text-black">{order.date}</span>
              
              <div className="mt-4 px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 print:border-zinc-300 print:bg-zinc-100 print:text-zinc-800">
                <CheckCircle className="w-3 h-3" />
                {order.paymentMethod === 'COD' ? 'Cash On Delivery Authorized' : 'Paid in Full via Razorpay'}
              </div>
            </div>
          </div>

          {/* Parties Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-white/10 pb-8 print:border-zinc-200">
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Billed To (Customer):</span>
              <h3 className="font-display font-bold text-sm text-white print:text-black mt-1.5">{order.customerName}</h3>
              <p className="text-xs text-zinc-400 mt-1">{order.email}</p>
              <p className="text-xs text-zinc-400">Secure Contact: +91 {order.phone}</p>
            </div>
            <div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Shipping Destination:</span>
              <p className="text-xs text-white print:text-black mt-1.5 leading-relaxed">{order.shippingAddress}</p>
              <p className="text-xs text-zinc-400 mt-1">City: {order.city}</p>
              <p className="text-xs text-zinc-400">PINCODE: <span className="font-mono">{order.pincode}</span></p>
            </div>
          </div>

          {/* Items breakdown table */}
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-4">Ordered items:</span>
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-zinc-400 print:border-zinc-200">
                    <th className="py-2.5 font-medium">Product / Room Decor Element</th>
                    <th className="py-2.5 font-medium text-center">Qty</th>
                    <th className="py-2.5 font-medium text-right">Unit Price</th>
                    <th className="py-2.5 font-medium text-right">Total (INR ₹)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 print:divide-zinc-100">
                  {order.items.map((item) => (
                    <tr key={item.productId} className="text-zinc-200 print:text-black">
                      <td className="py-3 font-medium">
                        <div>{item.name}</div>
                        <div className="text-[9px] text-zinc-500 font-mono mt-0.5">REF: {item.productId}</div>
                      </td>
                      <td className="py-3 text-center font-mono">{item.quantity}</td>
                      <td className="py-3 text-right font-mono">₹{item.price.toLocaleString('en-IN')}</td>
                      <td className="py-3 text-right font-mono">₹{(item.price * item.quantity).toLocaleString('en-IN')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals box */}
          <div className="flex flex-col items-end pt-4">
            <div className="w-full sm:w-[320px] space-y-2 border-t border-white/10 pt-4 print:border-zinc-200">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Subtotal Items Valuing:</span>
                <span className="font-mono text-white print:text-black">₹{order.subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Roomixa Active Coupon Savings:</span>
                <span className="font-mono text-rose-400 font-medium">-₹{order.discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs text-zinc-400">
                <span>Standard Delivery Charges:</span>
                <span className="font-mono text-white print:text-black">
                  {order.deliveryCharge === 0 ? 'FREE Shipping' : `₹${order.deliveryCharge}`}
                </span>
              </div>
              <div className="h-px bg-white/10 my-1 print:bg-zinc-200" />
              <div className="flex justify-between text-sm font-semibold text-white print:text-black">
                <span className="font-display">Grand Total (INR ₹):</span>
                <span className="font-mono text-emerald-400 text-base print:text-black">₹{order.total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>

          {/* Refund policy highlight and stamp */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left print:border-zinc-200 print:pt-4">
            <div className="max-w-[400px]">
              <span className="text-[10px] font-mono text-rose-400 uppercase tracking-wider block">★ 7-Day Replacement Guarantee Clause:</span>
              <p className="text-[10px] text-zinc-500 mt-1 leading-relaxed">
                As a premium customer, you are eligible for our 7-day hassle-free physical replacement module under ZK Business Hub rules. Please film an continuous unboxing video clips displaying item integrity when taking delivery to invoke full coverage protection.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-zinc-500 font-mono">Roomixa Tax Invoicing Node 7-A</p>
              <p className="text-[10px] text-zinc-400 font-medium font-mono mt-1">Authorized Seal [ZK Hub India]</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
