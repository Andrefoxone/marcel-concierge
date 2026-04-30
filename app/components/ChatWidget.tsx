'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: 'Buonasera! Sono Marcel, il concierge virtuale. Come posso assisterLa?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;
    
    const userMsg: Message = { id: Date.now().toString(), role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.text }))
        })
      });

      if (!res.ok) throw new Error('Errore API');
      
      const reader = res.body?.getReader();
      if (!reader) throw new Error('No reader');
      
      const decoder = new TextDecoder();
      let fullText = '';
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        fullText += decoder.decode(value);
      }
      
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: fullText }]);
    } catch (err) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: 'Mi scusi, si è verificato un errore.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md bg-neutral-900 rounded-2xl overflow-hidden border border-amber-900/20 shadow-2xl">
      {/* Header */}
      <div className="bg-neutral-800 px-5 py-4 flex items-center gap-3 border-b border-white/5">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 to-amber-800 flex items-center justify-center text-white font-bold">M</div>
        <div>
          <div className="text-amber-100 font-semibold">Marcel</div>
          <div className="text-xs text-neutral-500 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Online - Palazzo Sereno
          </div>
        </div>
      </div>

      {/* Messages */}
      <div ref={chatRef} className="h-80 overflow-y-auto p-4 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
              msg.role === 'user' 
                ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-br-sm' 
                : 'bg-neutral-800 text-neutral-200 rounded-bl-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-neutral-800 px-4 py-2 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></span>
                <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                <span className="w-2 h-2 bg-amber-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      {messages.length === 1 && (
        <div className="px-4 pb-2 flex gap-2 flex-wrap">
          {['Check-in', 'Ristorante', 'Spa'].map(q => (
            <button
              key={q}
              onClick={() => sendMessage(`Informazioni su ${q.toLowerCase()}`)}
              className="px-3 py-1 text-xs bg-amber-900/30 text-amber-400 rounded-full border border-amber-800/30 hover:bg-amber-900/50 transition"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-white/5">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Scrivi un messaggio..."
            disabled={loading}
            className="flex-1 bg-neutral-800 text-white px-4 py-2 rounded-xl text-sm outline-none focus:ring-1 focus:ring-amber-600 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-amber-600 to-amber-700 text-white px-4 py-2 rounded-xl text-sm font-medium disabled:opacity-50 hover:from-amber-500 hover:to-amber-600 transition"
          >
            Invia
          </button>
        </form>
      </div>
    </div>
  );
}
