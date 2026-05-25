/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CreditCard, Smartphone, Shield, ArrowRight, Loader2, CheckCircle2, ChevronRight, Check } from 'lucide-react';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentFailure: (errorReason: string) => void;
}

export default function RazorpayModal({
  isOpen,
  onClose,
  amount,
  orderId,
  customerName,
  customerEmail,
  customerPhone,
  onPaymentSuccess,
  onPaymentFailure,
}: RazorpayModalProps) {
  const [paymentStep, setPaymentStep] = useState<'methods' | 'details' | 'processing' | 'otp' | 'success'>('methods');
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'upi' | 'net'>('card');
  const [cardNumber, setCardNumber] = useState('4532 7182 9102 3843');
  const [expiry, setExpiry] = useState('02/29');
  const [cvv, setCvv] = useState('***');
  const [upiId, setUpiId] = useState('zkbusinesshub@okaxis');
  const [otp, setOtp] = useState('');
  const [errorText, setErrorText] = useState('');

  if (!isOpen) return null;

  const handlePay = () => {
    if (selectedMethod === 'card') {
      if (!cardNumber || !expiry || !cvv) {
        setErrorText('Please enter complete secure credit card attributes.');
        return;
      }
    } else if (selectedMethod === 'upi') {
      if (!upiId.includes('@')) {
        setErrorText('Please specify a valid looking virtual payment address VPA (e.g. user@okhdfc).');
        return;
      }
    }
    setErrorText('');
    setPaymentStep('processing');
    
    // Simulate payment loading
    setTimeout(() => {
      setPaymentStep('otp');
    }, 1800);
  };

  const verifyOtp = () => {
    if (otp !== '1234' && otp.length > 0) {
      setPaymentStep('processing');
      setTimeout(() => {
        onPaymentFailure('Security Validation Pin did not match master card authorization keys.');
        setPaymentStep('methods');
      }, 1500);
      return;
    }

    setPaymentStep('processing');
    setTimeout(() => {
      const simulatedPaymentId = 'pay_' + Math.random().toString(36).substring(2, 11).toUpperCase();
      setPaymentStep('success');
      setTimeout(() => {
        onPaymentSuccess(simulatedPaymentId);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="razorpay-container"
        className="w-full max-w-[430px] rounded-3xl overflow-hidden shadow-2xl border border-blue-500/20 bg-[#121624] text-white flex flex-col font-sans"
      >
        {/* Embedded Top Brand Header */}
        <div className="bg-[#1b213b] p-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded bg-blue-600 flex items-center justify-center font-display font-black text-xs text-white">R</span>
            <div>
              <h3 className="font-display font-bold text-xs text-blue-400 uppercase tracking-widest">Razorpay Checkout</h3>
              <p className="text-[10px] text-zinc-400 font-mono">Roomixa powered by ZK Business Hub</p>
            </div>
          </div>
          <button 
            onClick={() => onPaymentFailure('Checkout operation abandoned by the user.')}
            className="text-zinc-400 hover:text-white text-xs font-mono px-2 py-1 rounded hover:bg-white/5"
          >
            Cancel
          </button>
        </div>

        {/* Amount & Summary Widget */}
        <div className="p-4 bg-[#141a2e] border-b border-white/5 flex justify-between items-center text-xs">
          <div>
            <div className="text-[10px] text-zinc-400 font-mono">ID: {orderId}</div>
            <div className="text-[10px] font-medium text-zinc-300 mt-1">{customerEmail}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-zinc-400 font-mono">Amount Payable:</div>
            <div className="text-sm font-semibold font-mono text-emerald-400">₹{amount.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Dynamic Step Panels */}
        <div className="flex-1 p-5 min-h-[220px]">
          {paymentStep === 'methods' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Select Payment Method (INR only)</h4>
              
              <div className="grid grid-cols-1 gap-2">
                <button
                  id="pay-card-btn"
                  onClick={() => { setSelectedMethod('card'); setPaymentStep('details'); }}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 hover:border-blue-500/40 bg-white/5 hover:bg-white/[0.08] transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white group-hover:text-blue-300">Net Credit / Debit Card</div>
                      <div className="text-[9px] text-zinc-400 mt-0.5">Visa, Mastercard, RuPay cards supported</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>

                <button
                  id="pay-upi-btn"
                  onClick={() => { setSelectedMethod('upi'); setPaymentStep('details'); }}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 hover:border-teal-500/40 bg-white/5 hover:bg-white/[0.08] transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-teal-500/10 text-teal-400 rounded-lg">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white group-hover:text-teal-300">BHIM UPI / GooglePay / Paytm</div>
                      <div className="text-[9px] text-zinc-400 mt-0.5">Pay instantaneously through virtual addresses</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>

                <button
                  id="pay-cod-option-sim"
                  onClick={() => onPaymentSuccess('pay_COD_MOCK')}
                  className="flex items-center justify-between p-3.5 rounded-xl border border-white/5 hover:border-amber-500/40 bg-white/5 hover:bg-white/[0.08] transition-all text-left cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-500/10 text-amber-400 rounded-lg">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-white group-hover:text-amber-300">Simulate Cash on Delivery (COD)</div>
                      <div className="text-[9px] text-zinc-400 mt-0.5">No immediate digital secure capture required</div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </button>
              </div>
            </div>
          )}

          {paymentStep === 'details' && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <div className="flex justify-between items-center">
                <h4 className="text-xs font-semibold text-zinc-300 uppercase">
                  {selectedMethod === 'card' ? 'Enter Card Details' : 'Enter UPI Information'}
                </h4>
                <button 
                  onClick={() => setPaymentStep('methods')}
                  className="text-[10px] text-blue-400 hover:underline"
                >
                  Back to methods
                </button>
              </div>

              {selectedMethod === 'card' ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] text-zinc-400 font-mono mb-1">CARD NUMBER</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] text-zinc-400 font-mono mb-1">EXPIRY (MM/YY)</label>
                      <input
                        type="text"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500 text-center"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-zinc-400 font-mono mb-1">CVV</label>
                      <input
                        type="password"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500 text-center"
                        placeholder="***"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-[10px] text-zinc-400 font-mono mb-1">VIRTUAL PAYMENT ADDRESS (VPA)</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 bg-black/40 border border-white/10 rounded-lg text-xs font-mono text-white focus:outline-none focus:border-blue-500"
                    placeholder="mobile@ybl or username@paytm"
                  />
                </div>
              )}

              {errorText && (
                <p className="text-[10px] text-rose-400 font-mono">{errorText}</p>
              )}

              <button
                id="submit-payment-btn"
                onClick={handlePay}
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-bold font-display transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-900/40"
              >
                Proceed to Pay ₹{amount.toLocaleString('en-IN')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {paymentStep === 'processing' && (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-pulse">
              <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
              <h4 className="text-sm font-semibold">Contacting Card Issuing Bank Router</h4>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-[250px]">
                Initiated secure AES-256 session mapping. Please do not close or reload this iframe...
              </p>
            </div>
          )}

          {paymentStep === 'otp' && (
            <div className="space-y-4 text-center animate-in zoom-in-95 duration-200">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mx-auto">
                <Shield className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider">3D Secure Verified by VISA</h4>
                <p className="text-[10px] text-zinc-400 mt-1">
                  Enter authentication code sent to {customerPhone.substring(0, 3)}****{customerPhone.substring(7)}
                </p>
              </div>

              <div className="max-w-[180px] mx-auto">
                <input
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="1234 (Demo Pin)"
                  className="w-full px-3 py-2 bg-black/60 border border-white/20 rounded-lg text-center font-mono text-sm tracking-widest text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                />
                <p className="text-[9px] text-zinc-500 mt-1.5 font-mono">Type 1234 for success, or any wrong number to fail.</p>
              </div>

              <button
                id="verify-otp-btn"
                onClick={verifyOtp}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-bold transition-all cursor-pointer shadow-lg shadow-emerald-950"
              >
                Confirm Gateway Pin
              </button>
            </div>
          )}

          {paymentStep === 'success' && (
            <div className="flex flex-col items-center justify-center py-6 text-center animate-in zoom-in-95 duration-250">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-sm font-semibold text-emerald-400">Payment Captured Successfully</h4>
              <p className="text-[10px] text-zinc-400 mt-1 max-w-[220px]">
                Token reference successfully broadcasted. Handing back secure payload to Roomixa checkout pipeline...
              </p>
            </div>
          )}
        </div>

        {/* Secure Trust Stamp */}
        <div className="bg-[#0f121d] px-6 py-2 border-t border-white/5 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-zinc-500" />
          <span className="text-[9px] text-zinc-500 font-mono uppercase tracking-widest">PCI-DSS Compliant Secure Gateway</span>
        </div>
      </div>
    </div>
  );
}
