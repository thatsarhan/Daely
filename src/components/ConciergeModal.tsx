import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';

interface ConciergeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConciergeModal({ isOpen, onClose }: ConciergeModalProps) {
  if (!isOpen) return null;

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      content: "Hello! I'm your Daely Scent & Lifestyle Concierge. Are you looking for a refreshing morning body soufflé, a dewy SPF glow, or a custom scent pairing for your next road trip?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/concierge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.content, history: historyPayload }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to fetch concierge response');

      const modelMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: data.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, modelMsg]);
    } catch (error: any) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        content: "I'm having a brief moment of quiet sunshine. Feel free to ask me again about our Coastal or Blossom fragrances!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = [
    "What smells like a Santorini beach?",
    "Best routine for dry summer skin?",
    "Recommend a gift for my best friend",
    "Tell me about the Coastal scent notes"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-black/10 flex flex-col h-[650px]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-[#FFF3EA] via-[#FFF9F6] to-[#EAF8FF] border-b border-black/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#F7A8C9] to-[#8ED8FF] flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[#2F2F35]">Daely Scent AI Concierge</h3>
              <p className="text-xs text-[#2F2F35]/60">Your personal fragrance & routine expert</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-white hover:bg-black/5 text-[#2F2F35] transition-colors cursor-pointer shadow-xs"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#FFF9F6]/50">
          {messages.map((m) => {
            const isUser = m.role === 'user';
            return (
              <div
                key={m.id}
                className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isUser ? 'bg-[#2F2F35] text-white' : 'bg-[#F7A8C9]/30 text-[#2F2F35]'}`}>
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                <div
                  className={`max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                    isUser
                      ? 'bg-[#2F2F35] text-white rounded-tr-none'
                      : 'bg-white text-[#2F2F35] border border-black/5 shadow-xs rounded-tl-none'
                  }`}
                >
                  <p>{m.content}</p>
                  <span className={`block text-[10px] mt-1 text-right ${isUser ? 'text-white/60' : 'text-[#2F2F35]/40'}`}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7A8C9]/30 text-[#2F2F35] flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-4 rounded-2xl bg-white border border-black/5 shadow-xs flex items-center gap-2 text-sm text-[#2F2F35]/70">
                <Loader2 className="w-4 h-4 animate-spin text-[#F7A8C9]" />
                <span>Curating your sunshine recommendation...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-6 py-3 bg-white border-t border-black/5 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => setInput(prompt)}
              className="px-3.5 py-1.5 rounded-full bg-[#FFF3EA] hover:bg-[#FFE56D]/40 text-[#2F2F35] text-xs font-medium whitespace-nowrap transition-colors cursor-pointer border border-[#FFC6A5]/30"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-black/10 flex items-center gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about scents, skin hydration, or routines..."
            className="flex-1 px-5 py-3 rounded-full bg-[#F5F5F7] border border-black/10 text-sm text-[#2F2F35] focus:outline-none focus:ring-2 focus:ring-[#F7A8C9]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-3 rounded-full bg-[#2F2F35] hover:bg-[#2F2F35]/90 text-white disabled:opacity-50 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
}
