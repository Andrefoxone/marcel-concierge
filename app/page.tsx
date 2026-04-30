'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'assistant', text: 'Buonasera! Sono Marcel, il concierge virtuale. Come posso assisterla?' }
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
      setMessages(m => [...m, { id: String(Date.now() + 1), role: 'assistant', text: 'Errore. Riprova.' }]);
    }
    
    setLoading(false);
    setStreaming('');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  return (
    <div style={{ minHeight: '100vh', background: '#111', color: '#eee', fontFamily: 'system-ui' }}>
      <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
        
        <h1 style={{ textAlign: 'center', color: '#c9a96e', letterSpacing: 4, fontWeight: 300, marginBottom: 8 }}>MARCEL</h1>
        <p style={{ textAlign: 'center', color: '#666', fontSize: 14, marginBottom: 32 }}>Concierge AI per Hotel</p>

        <div style={{ background: '#1a1a1a', borderRadius: 12, border: '1px solid #333', overflow: 'hidden' }}>
          
          <div style={{ padding: 12, borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>M</div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Marcel</div>
              <div style={{ fontSize: 11, color: '#666' }}>{loading ? 'Scrive...' : 'Online'}</div>
            </div>
          </div>

          {messages.length === 1 && (
            <div style={{ padding: 10, borderBottom: '1px solid #333', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Check-in?', 'Ristoranti?', 'Spa?'].map(q => (
                <button key={q} onClick={() => send(q)} disabled={loading} style={{ padding: '5px 10px', borderRadius: 12, background: '#222', border: '1px solid #444', color: '#c9a96e', fontSize: 12, cursor: 'pointer' }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <div ref={scrollRef} style={{ height: 300, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {messages.map(m => (
              <div key={m.id} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                <div style={{ padding: '8px 12px', borderRadius: 12, background: m.role === 'user' ? '#c9a96e' : '#333', color: m.role === 'user' ? '#111' : '#ddd', fontSize: 13 }}>
                  {m.text}
                </div>
              </div>
            ))}
            {streaming && (
              <div style={{ alignSelf: 'flex-start', maxWidth: '80%' }}>
                <div style={{ padding: '8px 12px', borderRadius: 12, background: '#333', color: '#ddd', fontSize: 13 }}>{streaming}</div>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ padding: 10, borderTop: '1px solid #333', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Scrivi..."
              disabled={loading}
              style={{ flex: 1, padding: 10, borderRadius: 8, background: '#222', border: 'none', color: '#eee', fontSize: 13 }}
            />
            <button type="submit" disabled={loading || !input.trim()} style={{ padding: '10px 16px', borderRadius: 8, background: input.trim() ? '#c9a96e' : '#333', border: 'none', color: input.trim() ? '#111' : '#666', fontWeight: 600, cursor: input.trim() ? 'pointer' : 'default' }}>
              Invia
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
