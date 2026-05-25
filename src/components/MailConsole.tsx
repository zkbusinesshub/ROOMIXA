/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Mail, Clock, Shield, Trash2, ChevronDown, ChevronUp, Bell, CheckCircle2 } from 'lucide-react';
import { EmailLog } from '../types';

interface MailConsoleProps {
  logs: EmailLog[];
  onClear: () => void;
}

export default function MailConsole({ logs, onClear }: MailConsoleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLogId, setActiveLogId] = useState<string | null>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (logs.length > 0) {
      setUnreadCount(prev => prev + 1);
    }
  }, [logs.length]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    setUnreadCount(0);
  };

  const getBadgeColor = (type: string) => {
    if (type.includes('Alert') || type.includes('Cancel') || type.includes('Reset') || type.includes('Form')) {
      return 'bg-rose-500/10 text-rose-400 border border-rose-500/20';
    }
    if (type.includes('Order') || type.includes('Payment') || type.includes('Success')) {
      return 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20';
    }
    return 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20';
  };

  return (
    <div id="email-debug-console" className="fixed bottom-6 right-6 z-50 max-w-sm sm:max-w-md w-full">
      {/* Console Header Bubble */}
      <button 
        id="email-console-trigger"
        onClick={handleToggle}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl glass-panel shadow-2xl transition-all duration-300 border border-white/10 ${isOpen ? 'rounded-b-none' : 'hover:scale-[1.02]'} group`}
      >
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-lg bg-cyan-950 text-cyan-400 group-hover:animate-bounce">
            <Mail className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-neon-pink rounded-full border border-black animate-ping" />
            )}
          </div>
          <div className="text-left">
            <h4 className="font-display font-medium text-sm text-white flex items-center gap-2">
              ZK Notification Hub
              {unreadCount > 0 && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-neon-pink text-white font-mono">
                  +{unreadCount} NEW
                </span>
              )}
            </h4>
            <p className="text-[10px] text-zinc-400 font-mono">Simulated Resend / SMTP Logs</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-zinc-400">
          <span className="text-[10px] font-mono">{logs.length} Sent</span>
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </button>

      {/* Expanded SMTP Logs Display */}
      {isOpen && (
        <div className="glass-panel border-t-0 border-white/10 rounded-b-2xl h-[380px] flex flex-col shadow-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Top stats bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-black/60">
            <div className="flex items-center gap-1.5 text-xs text-zinc-400">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>SMTP Router Online (Dev Sandbox)</span>
            </div>
            {logs.length > 0 && (
              <button 
                id="clear-email-logs-btn"
                onClick={onClear}
                className="text-zinc-500 hover:text-rose-400 text-xs flex items-center gap-1 font-mono transition-colors"
                title="Flush Email Server Logs"
              >
                <Trash2 className="w-3 h-3" />
                Clear
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {logs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600 mb-2">
                  <Bell className="w-6 h-6 animate-pulse" />
                </div>
                <h5 className="text-xs font-semibold text-zinc-400">No SMTP Packets Dispatched Yet</h5>
                <p className="text-[10px] text-zinc-500 mt-1 max-w-[200px]">
                  Place an order, register an account, send a contact query or trigger low stock on products to trace automated notification payloads here!
                </p>
              </div>
            ) : (
              [...logs].reverse().map((log) => {
                const isExpanded = activeLogId === log.id;
                return (
                  <div 
                    key={log.id} 
                    className={`rounded-xl border transition-all duration-200 ${isExpanded ? 'bg-zinc-950/90 border-cyan-500/30' : 'bg-zinc-900/40 border-white/5 hover:bg-zinc-900/70'}`}
                  >
                    {/* Header trigger */}
                    <button
                      onClick={() => setActiveLogId(isExpanded ? null : log.id)}
                      className="w-full text-left p-3 flex flex-col gap-1 cursor-pointer"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full ${getBadgeColor(log.type)}`}>
                          {log.type}
                        </span>
                        <div className="flex items-center gap-1 text-[9px] text-zinc-500 font-mono">
                          <Clock className="w-3 h-3" />
                          {log.timestamp}
                        </div>
                      </div>
                      <div className="font-display font-medium text-[11px] text-zinc-200 line-clamp-1 mt-1">
                        {log.subject}
                      </div>
                      <div className="text-[9px] text-zinc-400 flex items-center gap-1 font-mono">
                        <span>To:</span>
                        <span className="text-zinc-300 truncate">{log.recipient}</span>
                      </div>
                    </button>

                    {/* Detailed HTML Render */}
                    {isExpanded && (
                      <div className="px-3 pb-3 border-t border-white/5 pt-2 text-[10px] text-zinc-300 space-y-2">
                        <div className="bg-zinc-950 p-2 rounded-lg font-mono text-[9px] text-cyan-400 border border-white/5 break-words">
                          <span className="text-zinc-500">// Simulated Email Payload</span>
                          <div className="mt-1 font-semibold text-white">Subject: {log.subject}</div>
                          <div>Recipient: {log.recipient}</div>
                          <div className="h-px bg-white/5 my-1.5" />
                          <div className="whitespace-pre-wrap overflow-x-auto text-[9px] leading-relaxed text-zinc-300">
                            {log.body}
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-1 text-[9px] text-zinc-500 font-mono">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Delivered via Roomixa Router Node-01</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
