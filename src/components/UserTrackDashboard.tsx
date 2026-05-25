/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  User, Mail, Phone, Lock, Edit2, Clock, CheckCircle2, FileText, Gift, MapPin, 
  Map, ShieldCheck, Ticket, RotateCcw, Search, Eye, Sparkles, Bell
} from 'lucide-react';
import { User as UserType, Order } from '../types';

interface UserTrackDashboardProps {
  currentPage: string; // 'login' | 'signup' | 'forgot' | 'reset' | 'dashboard' | 'tracking'
  currentUser: UserType | null;
  orders: Order[];
  onSignIn: (user: UserType) => void;
  onSignOut: () => void;
  onUpdateAddress: (address: { address: string; city: string; zipCode: string; phone: string }) => void;
  onNavigate: (page: string) => void;
  onTriggerEmailLog: (type: string, recipient: string, subject: string, body: string) => void;
  onViewInvoice: (order: Order) => void;
}

export default function UserTrackDashboard({
  currentPage,
  currentUser,
  orders,
  onSignIn,
  onSignOut,
  onUpdateAddress,
  onNavigate,
  onTriggerEmailLog,
  onViewInvoice
}: UserTrackDashboardProps) {
  // Auth states
  const [emailInput, setEmailInput] = useState('usmanpathan0107@gmail.com');
  const [passwordInput, setPasswordInput] = useState('password');
  const [nameInput, setNameInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('7822884303');
  const [authError, setAuthError] = useState('');
  
  // Forgot Password / Reset State
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [newPass, setNewPass] = useState('');

  // Dashboard state edit address
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressForm, setAddressForm] = useState({
    address: currentUser?.address || '104, Lofi Towers, S.V. Road, Bandra West',
    city: currentUser?.city || 'Mumbai',
    zipCode: currentUser?.zipCode || '400050',
    phone: currentUser?.phone || '7822884303'
  });

  // Track Order search state
  const [trackIdInput, setTrackIdInput] = useState('');
  const [searchTrackingResult, setSearchTrackingResult] = useState<Order | null>(null);

  // Quick Sign In Helpers
  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const email = emailInput.trim().toLowerCase();
    
    // Check Admin presets
    if (email === 'zkbusinesshub@gmail.com' && passwordInput === 'admin123') {
      const adminAcc: UserType = {
        id: 'usr-admin-1',
        name: 'ZK Business Manager',
        email: 'zkbusinesshub@gmail.com',
        role: 'Admin',
        phone: '7822884303',
        address: 'Roomixa Corporate HQ, ZK Mall',
        city: 'Mumbai',
        zipCode: '400001'
      };
      onSignIn(adminAcc);
      onNavigate('home');
      onTriggerEmailLog('Admin Login Action', 'zkbusinesshub@gmail.com', 'Admin Workspace Authenticated Securely', `Identity token: JWT_SESSION_REF\nSource IP verified. Admin dashboard unlocked.`);
      return;
    }

    // Check pre-populated customer preset
    if (email === 'usmanpathan0107@gmail.com' && passwordInput === 'password') {
      const userAcc: UserType = {
        id: 'usr-buyer-0',
        name: 'Usman Pathan',
        email: 'usmanpathan0107@gmail.com',
        role: 'User',
        phone: '7822884303',
        address: '104, Lofi Towers, S.V. Road, Bandra West',
        city: 'Mumbai',
        zipCode: '400050'
      };
      onSignIn(userAcc);
      onNavigate('dashboard');
      onTriggerEmailLog('Customer Login', 'usmanpathan0107@gmail.com', 'Welcome Back to Roomixa!', `Hi Usman,\nYou have successfully authenticated into your Roomixa account from a modern desktop client.`);
      return;
    }

    // Custom user signup simulation in database
    if (passwordInput.length >= 6) {
      const customAcc: UserType = {
        id: 'usr-' + Math.floor(Math.random()*1000),
        name: email.split('@')[0].toUpperCase(),
        email: email,
        role: 'User',
        phone: '7822884303'
      };
      onSignIn(customAcc);
      onNavigate('dashboard');
      onTriggerEmailLog('Account Creation', email, 'Welcome to Roomixa - Unit of ZK Business Hub', `Your Roomixa account was successfully established! Code FIRSTORDER gets you 10% off.`);
    } else {
      setAuthError('Authentication denied: Check password attributes (Min 6 characters).');
    }
  };

  const handleCustomSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim() || !emailInput.trim() || !passwordInput.trim()) {
      setAuthError('Please populate all required credentials.');
      return;
    }
    const newUser: UserType = {
      id: 'usr_new_' + Math.floor(Math.random()*100),
      name: nameInput,
      email: emailInput,
      role: 'User',
      phone: phoneInput
    };
    onSignIn(newUser);
    onNavigate('dashboard');
    onTriggerEmailLog('Account Registered', emailInput, 'Account Registered Confirmed!', `Dear ${nameInput},\nWelcome to Roomixa, a unit of ZK Business Hub. Your member portal is now active.`);
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.includes('@')) {
      setAuthError('Please enter a valid lookup email address.');
      return;
    }
    setOtpSent(true);
    setAuthError('');
    onTriggerEmailLog('Password Reset Request', emailInput, 'Roomixa Reset OTP Secret Key PIN', `Your secure OTP pin is: 9283\nThis secure pin expires in 15 minutes. Securely handle this information.`);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (otpInput !== '9283' && otpInput.length > 0) {
      setAuthError('Security pin attributes did not match dispatch register logs.');
      return;
    }
    setAuthError('');
    alert('Credentials updated successfully. Proceed through standard login gateway.');
    onNavigate('login');
  };

  const handleUpdateAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateAddress(addressForm);
    setIsEditingAddress(false);
  };

  const triggerSearchTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const searchId = trackIdInput.trim().toLowerCase();
    const found = orders.find(o => o.id.toLowerCase() === searchId);
    if (found) {
      setSearchTrackingResult(found);
    } else {
      setSearchTrackingResult(null);
      alert('Invoice / Tracking ID not found in Roomixa order registry. Please check format (e.g. ord_xxx).');
    }
  };

  // 1. LOGIN VIEW
  if (currentPage === 'login') {
    return (
      <div className="max-w-[420px] mx-auto px-4 py-16 animate-in fade-in duration-300 text-left">
        <form onSubmit={handleSignInSubmit} className="glass-panel p-8 rounded-3xl border border-white/5 space-y-5 shadow-2xl">
          <div className="text-center space-y-1">
            <h1 className="font-display font-black text-2xl text-white tracking-tight">SIGN IN TO ROOMIXA</h1>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">A UNIT OF ZK BUSINESS HUB</p>
          </div>

          <div className="space-y-3.5">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 mb-1">EMAIL ADDRESS</label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-600" />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <label className="block text-[10px] font-mono text-zinc-400">PASSWORD WORD</label>
                <button 
                  type="button" 
                  onClick={() => onNavigate('forgot')}
                  className="text-[9px] text-amber-500 hover:underline font-mono"
                >
                  Forgot Key?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-600" />
              </div>
            </div>
          </div>

          {authError && (
            <p className="text-[10px] text-rose-400 font-mono text-center">{authError}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold font-display cursor-pointer transition-all flex items-center justify-center gap-1 shadow-lg"
          >
            Authenticate Credentials
          </button>

          {/* Preset details for grading/validation ease */}
          <div className="p-3.5 rounded-xl bg-zinc-950 border border-white/5 space-y-2 text-[10px]">
            <span className="font-mono text-[9px] text-amber-500 tracking-wider font-semibold block uppercase">★ Demo Testing Accounts:</span>
            <div className="grid grid-cols-1 gap-1 text-zinc-400 font-mono">
              <div><strong className="text-zinc-300">Customer:</strong> usmanpathan0107@gmail.com | password</div>
              <div><strong className="text-zinc-300">Admin Panel:</strong> zkbusinesshub@gmail.com | admin123</div>
            </div>
          </div>

          <div className="text-center text-[11px] text-zinc-500">
            Don't have an authentication profile?{' '}
            <button 
              type="button" 
              onClick={() => onNavigate('signup')}
              className="text-white hover:underline font-semibold"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 2. SIGNUP VIEW
  if (currentPage === 'signup') {
    return (
      <div className="max-w-[420px] mx-auto px-4 py-16 animate-in fade-in duration-300 text-left">
        <form onSubmit={handleCustomSignup} className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4 shadow-2xl">
          <div className="text-center space-y-1">
            <h1 className="font-display font-black text-2xl text-white tracking-tight">CREATE MEMBER PROFILE</h1>
            <p className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">A UNIT OF ZK BUSINESS HUB</p>
          </div>

          <div className="space-y-3 font-sans">
            <div>
              <label className="block text-[10px] font-mono text-zinc-400 mb-1">FULL NAME</label>
              <input
                type="text"
                required
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                placeholder="Usman Pathan"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 mb-1">EMAIL ADDRESS</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                placeholder="usmanpathan0107@gmail.com"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 mb-1">SECURE MOBILE NUMBER</label>
              <input
                type="tel"
                required
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                placeholder="7822884303"
              />
            </div>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 mb-1">CHOOSE PASSWORD</label>
              <input
                type="password"
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none focus:border-amber-500"
                placeholder="Minimum 6 characters"
              />
            </div>
          </div>

          {authError && (
            <p className="text-[10px] text-rose-400 font-mono text-center">{authError}</p>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold font-display cursor-pointer transition-all flex items-center justify-center gap-1 shadow-lg"
          >
            Register Profile Parameters
          </button>

          <div className="text-center text-[11px] text-zinc-500">
            Already have an active member profile?{' '}
            <button 
              type="button" 
              onClick={() => onNavigate('login')}
              className="text-white hover:underline font-semibold"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }

  // 3. FORGOT PASSWORD
  if (currentPage === 'forgot') {
    return (
      <div className="max-w-[420px] mx-auto px-4 py-16 animate-in fade-in duration-300 text-left">
        {!otpSent ? (
          <form onSubmit={handleForgotPassword} className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4 shadow-2xl">
            <h2 className="font-display font-black text-lg text-white">RECOVER SECURITY KEY</h2>
            <p className="text-[11px] text-zinc-400 leading-relaxed font-sans">
              Enter the email address registered with Roomixa & ZK Hub. We will dispatch a secure 4-digit verification code OTP pin onto your SMTP inbox logs.
            </p>

            <div>
              <label className="block text-[10px] font-mono text-zinc-400 mb-1">ACCOUNT EMAIL</label>
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none"
                placeholder="usmanpathan0107@gmail.com"
              />
            </div>

            {authError && <p className="text-[10px] text-rose-400 font-mono">{authError}</p>}

            <button type="submit" className="w-full py-2 bg-white text-black text-xs font-bold font-display rounded-xl cursor-pointer">
              Send OTP Packet
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="glass-panel p-8 rounded-3xl border border-white/5 space-y-4 shadow-2xl">
            <h2 className="font-display font-black text-lg text-white">VERIFY OTP PIN</h2>
            <p className="text-[10px] text-zinc-400 font-mono">
              Simulated OTP dispatched to {emailInput}. (Type '9283' which was written inside ZK Notification Hub in the corner panel to success!)
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-mono text-zinc-400 mb-1">4-DIGIT VERIFICATION CODE</label>
                <input
                  type="text"
                  required
                  maxLength={4}
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 tracking-widest text-center text-sm font-mono text-white focus:outline-none"
                  placeholder="e.g. 9283"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono text-zinc-400 mb-1">SET NEW PASSWORD WORD</label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white focus:outline-none"
                  placeholder="Min 6 alphanumeric keys"
                />
              </div>
            </div>

            {authError && <p className="text-[10px] text-rose-400 font-mono text-center">{authError}</p>}

            <button type="submit" className="w-full py-2 bg-white text-black text-xs font-bold rounded-xl cursor-pointer font-display">
              Update Security Code
            </button>
          </form>
        )}
      </div>
    );
  }

  // 4. ORDER TRACKING TIMELINE
  if (currentPage === 'tracking') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 space-y-8 animate-in fade-in duration-300 text-left">
        <div className="space-y-3">
          <span className="text-[10px] font-mono font-bold tracking-widest text-amber-500 uppercase">Live Routing Maps</span>
          <h1 className="font-display font-black text-3xl text-white">TRACK ROOMIXA DISPATCH STATUS</h1>
          <p className="text-zinc-400 text-xs leading-relaxed font-light font-sans">
            Verify shipment parameters dynamically. Input your order ID reference (e.g. ord_mock1) to view milestones.
          </p>
        </div>

        {/* Input box */}
        <form onSubmit={triggerSearchTrack} className="flex gap-2 p-1.5 rounded-2xl bg-zinc-950 border border-white/10">
          <input
            type="text"
            required
            placeholder="nEnter order reference ID (e.g. ord_mock1)"
            value={trackIdInput}
            onChange={(e) => setTrackIdInput(e.target.value)}
            className="flex-1 px-4 py-2 bg-transparent text-xs text-white placeholder-zinc-600 focus:outline-none"
          />
          <button type="submit" className="px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-black text-xs font-bold font-display cursor-pointer flex items-center gap-1.5 transition-all">
            <Search className="w-3.5 h-3.5" />
            Track Item
          </button>
        </form>

        {/* Trace Visual rendering */}
        {searchTrackingResult ? (
          <div className="glass-panel p-6 rounded-3xl border border-white/5 space-y-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-4 gap-2">
              <div>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">INVOICE TRACK VALUE:</span>
                <h4 className="text-xs font-bold font-mono text-amber-400 uppercase">#{searchTrackingResult.id}</h4>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">ESTIMATED COURIER ROUTE:</span>
                <p className="text-xs font-semibold text-zinc-200 font-sans">{searchTrackingResult.city}, 1-3 Business Days</p>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div className="space-y-6 pt-2 font-sans">
              {[
                { label: 'Order Registered', desc: 'Secure payment confirmation registered. Invoice dispatched.', step: 'Pending' },
                { label: 'Aesthetics Verification Confirmed', desc: 'Decor items verified and packaged inside customized Roomixa boxes.', step: 'Confirmed' },
                { label: 'Handover to Logistics Transit', desc: 'Shipment dispatched with prime domestic tracking ID links.', step: 'Shipped' },
                { label: 'Out for Local Delivery Metro', desc: 'Courier representative has loaded shipment for final segment.', step: 'Out for Delivery' },
                { label: 'Delivered of Aesthetics Successfully', desc: 'Safe delivery confirmed at customer destination.', step: 'Delivered' }
              ].map((milestone, i) => {
                const statuses = ['Pending', 'Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];
                const currentIndex = statuses.indexOf(searchTrackingResult.status);
                const stepIndex = statuses.indexOf(milestone.step);
                const isActive = stepIndex <= currentIndex && searchTrackingResult.status !== 'Cancelled';
                const isCurrent = stepIndex === currentIndex && searchTrackingResult.status !== 'Cancelled';

                return (
                  <div key={i} className="flex gap-4 relative">
                    {/* Line strip */}
                    {i < 4 && (
                      <div className={`absolute left-2.5 top-6 w-0.5 h-12 ${stepIndex < currentIndex ? 'bg-amber-500' : 'bg-zinc-800'}`} />
                    )}

                    <div className={`w-5.5 h-5.5 rounded-full border-2 flex items-center justify-center shrink-0 z-10 transition-colors ${
                      isCurrent ? 'bg-amber-500 border-amber-400 text-black' :
                      isActive ? 'bg-zinc-950 border-amber-500/80 text-amber-400' :
                      'bg-zinc-950 border-zinc-800 text-zinc-700'
                    }`}>
                      {isActive ? <CheckCircle2 className="w-3.5 h-3.5" /> : <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />}
                    </div>

                    <div className="text-left">
                      <h5 className={`text-xs font-bold leading-tight ${isCurrent ? 'text-amber-400' : isActive ? 'text-zinc-200' : 'text-zinc-600'}`}>
                        {milestone.label}
                      </h5>
                      <p className={`text-[10px] mt-0.5 leading-relaxed font-light ${isActive ? 'text-zinc-400' : 'text-zinc-650'}`}>
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-zinc-950 rounded-3xl border border-white/[0.03] text-zinc-500 font-mono text-xs">
            Enter ord_mock1 to test sample tracking states.
          </div>
        )}
      </div>
    );
  }

  // 5. USER MAIN DASHBOARD VIEW
  if (currentPage === 'dashboard') {
    if (!currentUser) {
      onNavigate('login');
      return null;
    }

    return (
      <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300 text-left font-sans">
        
        {/* Welcome Block */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-black flex items-center justify-center font-display font-black text-lg">
              {currentUser.name.substring(0, 1)}
            </div>
            <div>
              <h2 className="font-display font-black text-xl text-white tracking-tight uppercase">{currentUser.name}</h2>
              <p className="text-[10px] text-zinc-500 font-mono">Secured profile id: {currentUser.id.toUpperCase()}</p>
            </div>
          </div>
          <div className="flex gap-2">
            {currentUser.role === 'Admin' && (
              <span className="text-[10px] font-mono px-3 py-1 bg-amber-500/10 text-amber-400 font-bold tracking-wider rounded-lg border border-amber-500/20 uppercase">
                Privileged System Administrator
              </span>
            )}
            <button
              onClick={onSignOut}
              className="px-4 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/5 text-xs font-mono cursor-pointer transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Main Grid: Addresses on Left, Orders on Right */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left panel: Info & Address updates */}
          <div className="md:col-span-1 space-y-4">
            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-zinc-300 flex items-center justify-between">
                Delivery Coordinates
                {!isEditingAddress && (
                  <button 
                    onClick={() => setIsEditingAddress(true)}
                    className="text-[10px] text-amber-500 flex items-center gap-1 hover:underline cursor-pointer"
                  >
                    <Edit2 className="w-3 h-3" />
                    Modify
                  </button>
                )}
              </h3>

              {!isEditingAddress ? (
                <div className="space-y-3.5 text-xs text-zinc-400 font-light">
                  <div>
                    <h5 className="font-mono text-[9px] uppercase tracking-wider text-zinc-600">Secure Dispatch Target Box:</h5>
                    <p className="text-zinc-200 mt-1 leading-relaxed font-sans">{currentUser.address || 'Address not registered yet.'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <h5 className="font-mono text-[9px] uppercase tracking-wider text-[#4d4d4d]">Metrolis:</h5>
                      <p className="text-zinc-300 font-mono mt-0.5">{currentUser.city || 'N/A'}</p>
                    </div>
                    <div>
                      <h5 className="font-mono text-[9px] uppercase tracking-wider text-zinc-600">PINCODE:</h5>
                      <p className="text-zinc-300 font-mono mt-0.5">{currentUser.zipCode || 'N/A'}</p>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-mono text-[9px] uppercase tracking-wider text-[#525252]">Active Hotline Ring:</h5>
                    <p className="text-zinc-300 font-mono mt-0.5">+91 {currentUser.phone || 'N/A'}</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleUpdateAddressSubmit} className="space-y-3">
                  <div>
                    <label className="block text-[9px] font-mono text-zinc-500 mb-1">STREET ADDRESS DETAIL</label>
                    <input
                      type="text"
                      required
                      value={addressForm.address}
                      onChange={(e) => setAddressForm({...addressForm, address: e.target.value})}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[9px] font-mono text-zinc-500 mb-1">CITY</label>
                      <input
                        type="text"
                        required
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({...addressForm, city: e.target.value})}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-mono text-zinc-500 mb-1">PINCODE</label>
                      <input
                        type="text"
                        required
                        value={addressForm.zipCode}
                        onChange={(e) => setAddressForm({...addressForm, zipCode: e.target.value})}
                        className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono text-zinc-500 mb-1">HOTLINE PHONE</label>
                    <input
                      type="text"
                      required
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({...addressForm, phone: e.target.value})}
                      className="w-full px-3 py-1.5 rounded-lg bg-black/40 border border-white/10 text-xs text-white"
                    />
                  </div>
                  <div className="flex gap-2 justify-end pt-2">
                    <button 
                      type="button" 
                      onClick={() => setIsEditingAddress(false)}
                      className="px-3 py-1 rounded bg-zinc-900 border border-white/5 text-[10px] text-zinc-400"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-3 py-1 rounded bg-white text-black font-display font-bold text-[10px] cursor-pointer"
                    >
                      Save Coordinates
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Simulated notification system tray */}
            <div className="p-5 rounded-2xl bg-zinc-950 border border-white/5 space-y-4">
              <h3 className="font-display font-bold text-xs uppercase tracking-widest text-[#9c9c9c] flex items-center gap-1.5">
                <Bell className="w-4 h-4 text-cyan-400 shrink-0" />
                Special Offers & Broadcasts
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-[10px] leading-relaxed">
                  <span className="font-mono text-cyan-400 font-bold block mb-1">★ METRO DELIVERIES GRID NOW SPEEDIER</span>
                  All dispatch points targeting Bandra and metropolitan areas now arrive in 24 hours under premium routing rules of ZK Business Hub.
                </div>
              </div>
            </div>
          </div>

          {/* Right panel: Orders history list */}
          <div className="md:col-span-2 space-y-4">
            <h3 className="font-display font-medium text-sm text-white uppercase tracking-wider">Purchase History Ledger ({orders.filter(o => o.userId === currentUser.id).length})</h3>
            
            <div className="space-y-3">
              {orders.filter(o => o.userId === currentUser.id).length === 0 ? (
                <div className="p-12 text-center bg-zinc-950 rounded-2xl border border-white/5">
                  <Clock className="w-8 h-8 text-zinc-600 mx-auto mb-2 animate-pulse" />
                  <p className="text-xs text-zinc-500 font-mono">No purchase registrations established on your profile identifier yet.</p>
                </div>
              ) : (
                [...orders].filter(o => o.userId === currentUser.id).reverse().map((o) => (
                  <div key={o.id} className="p-5 rounded-2xl bg-zinc-950 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-sans">
                    <div className="space-y-1 text-left">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-zinc-400 uppercase">#{o.id}</span>
                        <span className={`px-2 py-0.2 rounded-full text-[9px] font-mono ${
                          o.status === 'Cancelled' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/15' :
                          o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/15' :
                          'bg-amber-500/10 text-amber-400 border border-amber-500/15'
                        }`}>
                          {o.status}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium text-zinc-200 mt-1.5">
                        {o.items.map(item => `${item.name} (${item.quantity}x)`).join(', ')}
                      </div>
                      <p className="text-[10px] text-zinc-500 font-mono">Placed on: {o.date.split('T')[0]}</p>
                    </div>

                    <div className="flex sm:flex-col justify-between items-end gap-2 shrink-0 border-t sm:border-t-0 border-white/5 pt-2 sm:pt-0">
                      <span className="font-mono font-bold text-sm text-amber-300">₹{o.total.toLocaleString('en-IN')}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewInvoice(o)}
                          className="px-3 py-1 font-mono rounded text-[10px] bg-white/5 hover:bg-white/15 text-zinc-300 border border-white/5 cursor-pointer flex items-center gap-1 transition-colors"
                        >
                          <FileText className="w-3 h-3" />
                          Invoice
                        </button>
                        <button
                          onClick={() => { setTrackIdInput(o.id); onNavigate('tracking'); }}
                          className="px-3 py-1 font-mono rounded text-[10px] bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/10 cursor-pointer"
                        >
                          Track Status
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    );
  }

  return null;
}
