'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export default function Chat() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: 'Buonasera! Sono Marcel, il concierge virtuale del Palazzo Sereno. Come posso assisterla oggi?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, streaming]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    
    const userMsg: Message = { id: String(Date.now()), role: 'user', text };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setStreaming('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.text }))
        })
      });

      if (!res.body) throw new Error('No body');
      
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value);
        setStreaming(full);
      }

      setMessages(m => [...m, { id: String(Date.now() + 1), role: 'assistant', text: full }]);
    } catch {
      setMessages(m => [...m, { id: String(Date.now() + 1), role: 'assistant', text: 'Mi scusi, si è verificato un errore.' }]);
    }
    
    setLoading(false);
    setStreaming('');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div style={{ maxWidth: '440px', margin: '0 auto', background: '#1a1a1a', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(212,175,120,0.15)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
      
      {/* Header */}
      <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg, #1e1e1e, #252525)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #d4af78, #b8924a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: '#1a1a1a' }}>M</div>
        <div>
          <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0e6d6' }}>Marcel</div>
          <div style={{ fontSize: '11px', color: '#7a7268', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: loading ? '#f59e0b' : '#4caf50' }}></span>
            {loading ? 'Sta scrivendo...' : 'Online'}
          </div>
        </div>
      </div>

      {/* Quick buttons */}
      {messages.length === 1 && (
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['Check-in', 'Ristorante', 'Spa'].map((label, i) => (
            <button
              key={i}
              type="button"
              onClick={() => send(label === 'Check-in' ? 'A che ora è il check-in?' : label === 'Ristorante' ? 'Mi consiglia un ristorante?' : 'Quali trattamenti spa avete?')}
              disabled={loading}
              style={{
                padding: '6px 12px',
                borderRadius: '20px',
                background: 'rgba(212,175,120,0.1)',
                border: '1px solid rgba(212,175,120,0.2)',
                color: '#c9a96e',
                fontSize: '11px',
                fontWeight: 600,
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.5 : 1,
              }}
            >
              {label}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div ref={scrollRef} style={{ padding: '16px', height: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            <div style={{
              padding: '10px 14px',
              borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
              background: msg.role === 'user' ? 'linear-gradient(135deg, #d4af78, #b8924a)' : 'rgba(255,255,255,0.06)',
              color: msg.role === 'user' ? '#1a1a1a' : '#e0d8c8',
              fontSize: '13px',
              lineHeight: 1.55,
              whiteSpace: 'pre-wrap'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {streaming && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
            <div style={{ padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: 'rgba(255,255,255,0.06)', color: '#e0d8c8', fontSize: '13px', lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>
              {streaming}
            </div>
          </div>
        )}
        {loading && !streaming && (
          <div style={{ alignSelf: 'flex-start' }}>
            <div style={{ padding: '10px 18px', borderRadius: '16px', background: 'rgba(255,255,255,0.06)', color: '#c9a96e' }}>...</div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#1e1e1e', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Scrivi un messaggio..."
          disabled={loading}
          style={{
            flex: 1,
            padding: '10px 14px',
            background: 'rgba(255,255,255,0.05)',
            border: 'none',
            borderRadius: '12px',
            color: '#e8e0d0',
            fontSize: '13px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: input.trim() && !loading ? 'linear-gradient(135deg, #d4af78, #b8924a)' : 'rgba(255,255,255,0.05)',
            border: 'none',
            cursor: input.trim() && !loading ? 'pointer' : 'default',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: input.trim() && !loading ? '#1a1a1a' : '#5a5a4a',
          }}
        >
          {loading ? '...' : '↗'}
        </button>
      </form>
    </div>
  );
}
