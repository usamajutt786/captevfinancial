'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CHATBOT_RESPONSES } from '../data/mockData';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  ArrowUpRight, 
  User, 
  Bot, 
  Clock 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actionButton?: { label: string; tab: string };
  time: string;
}

export default function Chatbot() {
  const { isChatbotOpen, setIsChatbotOpen, setActiveTab, openBookingModal } = useApp();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageIdCounterRef = useRef(0);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: 'Good day. Welcome to Aureus Luxury Concierge & Fleet. I am your 24/7 digital concierge associate. How may I orchestrate your transit or private experience today?',
      time: 'Just now'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    { label: 'What services do you offer?', key: 'services' },
    { label: 'How do I book?', key: 'booking' },
    { label: 'Do you provide airport transfers?', key: 'airport' },
    { label: 'How much is a black truck rental?', key: 'trucks' },
    { label: 'Can I book a boat?', key: 'boats' },
    { label: 'Can you arrange a custom excursion?', key: 'custom' },
    { label: 'Can I speak to someone?', key: 'contact' },
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || input.trim();
    if (!text) return;

    messageIdCounterRef.current += 1;
    const userMsg: ChatMessage = {
      id: 'msg-' + messageIdCounterRef.current,
      sender: 'user',
      text,
      time: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate concierge response delay
    setTimeout(() => {
      const lower = text.toLowerCase();
      let botReply = "Thank you for inquiring with Aureus. Our senior concierge dispatch team is on standby to tailor your itinerary. You can immediately review our vehicle specifications or submit a custom reservation request.";
      let actionBtn: { label: string; tab: string } | undefined = { label: 'Explore Fleet', tab: 'chauffeur' };

      if (lower.includes('service') || lower.includes('offer')) {
        botReply = CHATBOT_RESPONSES.services;
        actionBtn = { label: 'View Services', tab: 'home' };
      } else if (lower.includes('airport') || lower.includes('fbo') || lower.includes('transfer') || lower.includes('flight')) {
        botReply = CHATBOT_RESPONSES.airport;
        actionBtn = { label: 'Airport Calculator', tab: 'chauffeur' };
      } else if (lower.includes('truck') || lower.includes('suv') || lower.includes('escalade') || lower.includes('rate')) {
        botReply = CHATBOT_RESPONSES.trucks;
        actionBtn = { label: 'Black Truck Fleet', tab: 'black-truck' };
      } else if (lower.includes('boat') || lower.includes('yacht') || lower.includes('charter') || lower.includes('water')) {
        botReply = CHATBOT_RESPONSES.boats;
        actionBtn = { label: 'Yacht Charters', tab: 'boat-rental' };
      } else if (lower.includes('custom') || lower.includes('excursion') || lower.includes('package') || lower.includes('itinerary')) {
        botReply = CHATBOT_RESPONSES.custom;
        actionBtn = { label: 'Custom Itinerary', tab: 'custom' };
      } else if (lower.includes('book') || lower.includes('reserve') || lower.includes('how')) {
        botReply = CHATBOT_RESPONSES.booking;
        actionBtn = { label: 'Open Reservation Portal', tab: 'chauffeur' };
      } else if (lower.includes('speak') || lower.includes('phone') || lower.includes('someone') || lower.includes('human') || lower.includes('contact')) {
        botReply = CHATBOT_RESPONSES.contact;
        actionBtn = { label: 'Concierge Desk', tab: 'contact' };
      }

      messageIdCounterRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: 'msg-bot-' + messageIdCounterRef.current,
          sender: 'bot',
          text: botReply,
          actionButton: actionBtn,
          time: 'Just now'
        }
      ]);
      setIsTyping(false);
    }, 800);
  };

  const handleActionClick = (tab: string) => {
    setIsChatbotOpen(false);
    if (tab === 'chauffeur') {
      openBookingModal(null);
    } else {
      setActiveTab(tab as any);
    }
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom Right) */}
      {!isChatbotOpen && (
        <button
          onClick={() => setIsChatbotOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#C5A880] text-[#0A0D14] hover:bg-[#D6BA93] shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer group"
          aria-label="Open Aureus Concierge Chat"
        >
          <MessageSquare className="w-5 h-5 fill-current" />
          <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider">
            Concierge Desk
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-black opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-black" />
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isChatbotOpen && (
        <div className="fixed bottom-4 sm:bottom-6 right-3 sm:right-6 z-50 w-[95vw] sm:w-[400px] h-[550px] max-h-[85vh] rounded-xl bg-[#0F121A] border border-white/20 shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 bg-black/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-[#C5A880]/20 border border-[#C5A880]/40 flex items-center justify-center text-[#C5A880]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white tracking-wide">
                  Aureus VIP Concierge
                </p>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Desk Online · 24/7/365
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatbotOpen(false)}
              className="p-1.5 text-neutral-400 hover:text-white rounded-md transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="h-6 w-6 rounded-full bg-[#C5A880]/20 text-[#C5A880] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-lg p-3 space-y-2 leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#C5A880] text-black font-medium'
                      : 'bg-[#181B24] border border-white/5 text-neutral-200'
                  }`}
                >
                  <p>{m.text}</p>
                  
                  {m.actionButton && (
                    <button
                      onClick={() => handleActionClick(m.actionButton!.tab)}
                      className="mt-2 inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-black/40 hover:bg-black/60 text-[#C5A880] text-[11px] font-semibold border border-[#C5A880]/30 transition-colors cursor-pointer"
                    >
                      <span>{m.actionButton.label}</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}

                  <span className={`block text-[9px] ${m.sender === 'user' ? 'text-black/60' : 'text-neutral-500'} text-right`}>
                    {m.time}
                  </span>
                </div>

                {m.sender === 'user' && (
                  <div className="h-6 w-6 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-neutral-400 animate-pulse pl-8">
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
                <span className="h-1.5 w-1.5 rounded-full bg-[#C5A880]" />
                <span className="text-[11px] italic">Concierge is composing brief...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 border-t border-white/5 bg-black/30 flex gap-1.5 overflow-x-auto text-[11px] scrollbar-none">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q.label)}
                className="whitespace-nowrap px-2.5 py-1 rounded bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 transition-colors cursor-pointer"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Chat Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 border-t border-white/10 bg-black/60 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Inquire with private concierge..."
              className="flex-1 bg-[#181B24] border border-white/10 rounded-md px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-[#C5A880]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 bg-[#C5A880] text-black hover:bg-[#D6BA93] rounded-md transition-colors disabled:opacity-40 cursor-pointer"
              aria-label="Send message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}
    </>
  );
}
