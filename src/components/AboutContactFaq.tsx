/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Shield, RefreshCcw, Send, Check, ChevronDown } from 'lucide-react';
import { FAQS } from '../data';
import { FAQItem } from '../types';

interface AboutContactFaqProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onSubmitContactForm: (formData: { name: string; email: string; phone: string; subject: string; message: string }) => void;
}

export default function AboutContactFaq({ currentPage, onNavigate, onSubmitContactForm }: AboutContactFaqProps) {
  const [contactForm, setContactForm] = useState({
    name: 'Usman Pathan',
    email: 'usmanpathan0107@gmail.com',
    phone: '7822884303',
    subject: 'Bulk LED Projector Enquiry',
    message: 'Hey Roomixa! I want to order 5 Astro Nebula Projectors for my gaming lounge setup, do you have special discounts available?'
  });
  const [submitted, setSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState<string | null>('faq-1');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitContactForm(contactForm);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 4000);
  };

  if (currentPage === 'about') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-300 text-left">
        <div className="space-y-4">
          <span className="text-[10px] font-mono font-bold tracking-widest text-amber-500 uppercase">Our Corporate Story</span>
          <h1 className="font-display font-black text-4xl text-white">THE ROOMIXA PHILOSOPHY</h1>
          <p className="text-sm font-semibold text-zinc-400 font-mono">A UNIT OF ZK BUSINESS HUB</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center pt-4">
          <div className="space-y-4 text-xs text-zinc-300 leading-relaxed font-light">
            <p>
              Roomixa emerged under the umbrella of <span className="text-white font-semibold">ZK Business Hub</span> as a response to the uninspiring room decor available to Gen-Z in India. Standard lights buzz, posters arrive creased, and neon custom builds cost a fortune.
            </p>
            <p>
              We set out to create India's first fully specialized space visualizer brand. We don't just sell products; we deliver carefully matched visual "packs" that work cohesively to induce focus, lofi relaxation, or gaming energy.
            </p>
            <p>
              By using extreme architectural quality – low-voltage 12V cold silicon tubes, 300 GSM thick archival papers, and smart app-controlled LED nodes – we build visual statements that look spectacular, last for 50,000+ hours, and operate entirely with absolute safety.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80" 
              alt="Roomixa Team Setup" 
              className="rounded-3xl border border-white/5 shadow-2xl skew-y-1"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Core Values Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          <div className="p-6 rounded-2xl glass-panel border border-brand-beige/5 hover:border-brand-beige/15 transition-all">
            <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-brand-beige">Zero-Buzz Comfort</h3>
            <p className="text-[10px] text-zinc-400 mt-2 leading-relaxed font-light">Our electric neon elements are fully hum-free and completely cool to the touch even after weeks of continuous power ignition.</p>
          </div>
          <div className="p-6 rounded-2xl glass-panel border border-brand-beige/5 hover:border-brand-beige/15 transition-all">
            <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-brand-orange-glow">Gen-Z Aesthetic DNA</h3>
            <p className="text-[10px] text-zinc-400 mt-2 leading-relaxed font-light">No generic items. Each product is carefully curated by lofi, vaporwave, and cyberpunk designers to support modern subcultures.</p>
          </div>
          <div className="p-6 rounded-2xl glass-panel border border-brand-beige/5 hover:border-brand-beige/15 transition-all">
            <h3 className="font-display font-semibold text-xs tracking-wider uppercase text-brand-purple">ZK Corporate Guarantee</h3>
            <p className="text-[10px] text-zinc-400 mt-2 leading-relaxed font-light">Backed fully by the financial and logistical network of ZK Business Hub, ensuring super secure checkout and fast metropolitan delivery.</p>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'contact') {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-12 animate-in fade-in duration-300 text-left">
        <div className="space-y-4">
          <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">Interactive Hotline support</span>
          <h1 className="font-display font-black text-4xl text-white">GET IN CONTACT</h1>
          <p className="text-zinc-400 text-xs leading-relaxed max-w-xl">
            Have queries regarding a custom neon configuration or want immediate support? Fill out our secured dispatch form or ping our corporate WhatsApp hotline directly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          {/* Quick Details Sidebar */}
          <div className="space-y-4 md:col-span-1">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-4">
              <h3 className="font-display font-bold text-xs uppercase text-white border-b border-white/5 pb-2">Direct channels</h3>
              
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-300">WhatsApp Hot</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">+91 7822884303</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-300">Admin Email</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5 truncate select-all">zkbusinesshub@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-zinc-500 shrink-0" />
                  <div>
                    <p className="font-semibold text-zinc-300">ZK Corporate Office</p>
                    <p className="text-[10px] text-zinc-500 mt-0.5">Mumbai Decor Hub, Maharashtra, India</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.open('https://wa.me/917822884303?text=Hi%20Roomixa%20and%20ZK%20Business%20Hub!%20I%20have%20decor%20questions.')}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-black font-display font-bold text-xs tracking-wider uppercase transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              Ping WhatsApp Support
            </button>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={handleContactSubmit} className="glass-panel p-6 rounded-3xl border border-white/5 space-y-4">
              <h3 className="font-display font-bold text-xs uppercase text-white">Send secure support packet</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 mb-1">YOUR FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 mb-1">EMAIL ADDRESS</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 mb-1">MOBILE CONTACT</label>
                  <input
                    type="tel"
                    required
                    value={contactForm.phone}
                    onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-zinc-400 mb-1">SUBJECT MATTER</label>
                  <input
                    type="text"
                    required
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 mb-1">YOUR MESSAGE DETAILS</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-500 leading-relaxed"
                />
              </div>

              {submitted ? (
                <div className="p-3 bg-emerald-500/10 text-emerald-400 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 border border-emerald-500/20">
                  <Check className="w-4 h-4 animate-ping" />
                  Hotline message successfully routed. Admin alert sent!
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-display font-medium text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Route hotline Ticket
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'faq') {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-300 text-left">
        <div className="space-y-4">
          <span className="text-[10px] font-mono font-bold tracking-widest text-amber-500 uppercase">Knowledge Center</span>
          <h1 className="font-display font-black text-4xl text-white">FREQUENTLY ASKED FAQS</h1>
          <p className="text-zinc-400 text-xs leading-relaxed font-light">
            Everything you need to verify regarding room lights safety, COD routing across Indian pincodes, and unboxing replace processes.
          </p>
        </div>

        <div className="space-y-3 pt-6">
          {FAQS.map(faq => {
            const isOpen = activeFaq === faq.id;
            return (
              <div 
                key={faq.id} 
                className="rounded-2xl border border-white/5 bg-zinc-950 overflow-hidden"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-xs text-zinc-100 hover:bg-white/5 transition-all cursor-pointer"
                >
                  <span className="font-display tracking-wide">{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-400' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-zinc-400 leading-relaxed font-light animate-in slide-in-from-top-2 duration-150 border-t border-white/[0.02]">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // POLICIES VIEWS
  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-6 text-left animate-in fade-in duration-300">
      {currentPage === 'privacy-policy' && (
        <>
          <h1 className="font-display font-black text-3xl text-white uppercase tracking-tight">Privacy Protection Policy</h1>
          <p className="text-[10px] font-mono text-zinc-500">LAST MODIFIED: MAY 25, 2026</p>
          <div className="text-xs text-zinc-300 space-y-4 leading-relaxed font-light">
            <p>
              At Roomixa, a unit of <strong>ZK Business Hub</strong>, we respect the privacy of our Gen-Z shoppers. This Privacy Policy details how we handle account registrations, custom neon sign design briefs, shipping tags, and billing credentials.
            </p>
            <h3 className="font-display font-bold text-base text-zinc-100 uppercase pt-4">1. Information Encryption</h3>
            <p>
              Any data provided during signup - like names, Indian pincode locations, and email addresses - is stored on secure Firebase Firestore databases with Zero-Trust security rule architecture. All payments are securely routed via Razorpay PCI-DSS certified gateway proxies.
            </p>
            <h3 className="font-display font-bold text-base text-zinc-100 uppercase pt-4">2. Cookies Safeguards</h3>
            <p>
              We utilize local browser memory sessions to store active shopping carts and wishlists. We do not Sell or trace your information to third-party ad brokers. Everything is hosted in standalone sandbox environments.
            </p>
          </div>
        </>
      )}

      {currentPage === 'terms-conditions' && (
        <>
          <h1 className="font-display font-black text-3xl text-white uppercase tracking-tight">Terms and Conditions</h1>
          <p className="text-[10px] font-mono text-zinc-500 font-semibold">CRAFTED UNDER ZK BUSINESS RULES</p>
          <div className="text-xs text-zinc-300 space-y-4 leading-relaxed font-light">
            <p>
              Welcome to the digital storefront of <strong>Roomixa</strong>. By continuing to navigate and order from our website, you agree to comply with ZK Business Hub terms.
            </p>
            <h3 className="font-display font-bold text-sm text-zinc-100 uppercase pt-4">1. Payment Obligations</h3>
            <p>
              Prices on our portal are denominated in Indian Rupees (INR ₹) only. Tax invoices are automatically dispatched once payments are resolved. For Cash on Delivery (COD), order verification is checked over SMS or phone call check before dispatch.
            </p>
            <h3 className="font-display font-bold text-sm text-zinc-100 uppercase pt-4">2. Usage Rights of Custom Designs</h3>
            <p>
              Custom neon signs fabricated by Roomixa are intended strictly for bedroom decorative layout purposes. High-voltage adjustments by users nullify the ZK corporate safety certifications.
            </p>
          </div>
        </>
      )}

      {currentPage === 'refund-policy' && (
        <>
          <h1 className="font-display font-black text-3xl text-white uppercase tracking-tight">Refund & Replacement Guarantee</h1>
          <p className="text-[10px] font-mono text-rose-400 font-bold tracking-widest uppercase">7-DAY STRUCTURE DESIGNED FOR ELITE SATISFACTION</p>
          <div className="text-xs text-zinc-300 space-y-4 leading-relaxed font-light">
            <p>
              We at Roomixa understand that bedroom lighting elements must arrive in perfect working condition. Therefore, we provide an elite <strong>7-day hassle-free replacement or full refund</strong>.
            </p>
            <h3 className="font-display font-bold text-sm text-zinc-100 uppercase pt-4">★ The Unboxing Video Condition</h3>
            <p className="bg-rose-500/10 text-rose-400 p-4 rounded-xl border border-rose-500/20 font-sans leading-relaxed">
              To prevent fraudulent claims, we strictly mandate that the recipient provide an continuous unboxing video footage showing the parcel label, opening, and item test in order to receive immediate replacement grids. This minimizes transit disputes.
            </p>
            <h3 className="font-display font-bold text-sm text-zinc-100 uppercase pt-4">How to Invoke:</h3>
            <p>
              Ping us on WhatsApp <strong>+91 7822884303</strong> or email our administrative managers at <strong>zkbusinesshub@gmail.com</strong> with your Invoice number (e.g. #INV-XXXX) and your video file attachment.
            </p>
          </div>
        </>
      )}

      {currentPage === 'shipping-policy' && (
        <>
          <h1 className="font-display font-black text-3xl text-white uppercase tracking-tight">Shipping and logistics Grid</h1>
          <p className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider">DISPATCHED WITHIN 48 HOURS THROUGHOUT INDIA</p>
          <div className="text-xs text-zinc-300 space-y-4 leading-relaxed font-light font-sans">
            <p>
              We ship utilizing premium domestic transport links (Bluedart, Delhivery, etc.) to ensure your luxury lights and heavy card poster kits stay secure.
            </p>
            <h3 className="font-display font-bold text-sm text-zinc-100 uppercase pt-4">1. Charges & Minimum Volume</h3>
            <p>
              Orders above <strong>₹1,499</strong> are eligible for 100% Free Shipping. A flat shipping cost of ₹49 applies to orders under this threshold.
            </p>
            <h3 className="font-display font-bold text-sm text-zinc-100 uppercase pt-4">2. Estimation Timelines</h3>
            <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400 text-xs">
              <li>Metro cities inside India: 2 to 4 business days</li>
              <li>Tier-2/3 cities: 5 to 7 business days</li>
              <li>Custom manufactured neon designs: 7 to 9 business days</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
