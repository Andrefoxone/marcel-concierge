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
    { id: '1', role: 'assistant', text: 'Buonasera! Sono Marcel, il concierge virtuale del Palazzo Sereno. Come posso assisterla oggi?' }
  ]);
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight);
  }, [messages, streaming]);

  async function send(text: string) {
    console.log('[v0] send() called with:', text, 'loading:', loading);
    if (!text.trim() || loading) return;
    console.log('[v0] Starting fetch...');
    
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
      setMessages(m => [...m, { id: String(Date.now() + 1), role: 'assistant', text: 'Mi scusi, si è verificato un errore. Riprovi tra poco.' }]);
    }
    
    setLoading(false);
    setStreaming('');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    send(input);
  }

  const features = [
    { icon: '🔑', title: 'Check-in Express', desc: 'Procedura digitale senza attese' },
    { icon: '🍽️', title: 'Ristoranti', desc: 'Prenotazioni nei migliori locali' },
    { icon: '💆', title: 'Spa & Wellness', desc: 'Trattamenti personalizzati' },
    { icon: '🚗', title: 'Transfer', desc: 'Auto con autista h24' },
    { icon: '🛎️', title: 'Room Service', desc: 'Servizio in camera 24/7' },
    { icon: '🎭', title: 'Esperienze', desc: 'Eventi e attrazioni esclusive' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)', color: '#f5f0e6', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      
      {/* Hero Section */}
      <header style={{ padding: '80px 20px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '8px 20px', background: 'rgba(212,175,120,0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <span style={{ color: '#d4af78', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Concierge AI per Hotel di Lusso</span>
        </div>
        <h1 style={{ fontSize: 'clamp(48px, 10vw, 72px)', fontWeight: 300, color: '#d4af78', margin: '0 0 24px', letterSpacing: '12px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>MARCEL</h1>
        <p style={{ fontSize: '18px', color: '#a09080', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
          Il vostro concierge personale, disponibile 24 ore su 24, 7 giorni su 7. 
          Assistenza impeccabile per ogni esigenza del vostro soggiorno.
        </p>
      </header>

      {/* Features Grid */}
      <section style={{ padding: '40px 20px 60px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {features.map((f, i) => (
            <div key={i} style={{ 
              background: 'rgba(255,255,255,0.03)', 
              border: '1px solid rgba(212,175,120,0.15)', 
              borderRadius: '16px', 
              padding: '24px',
              transition: 'all 0.3s ease'
            }}>
              <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>{f.icon}</span>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600, color: '#e8e0d0' }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#7a7268', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Demo Section */}
      <section style={{ padding: '60px 20px 80px', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 400, color: '#d4af78', margin: '0 0 12px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Prova Marcel</h2>
          <p style={{ color: '#7a7268', fontSize: '16px' }}>Scopri come Marcel può assistere i tuoi ospiti</p>
        </div>

        <div style={{ maxWidth: '440px', margin: '0 auto', background: '#1a1a1a', borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(212,175,120,0.15)', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
          
          {/* Chat Header */}
          <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg, #1e1e1e, #252525)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #d4af78, #b8924a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 700, color: '#1a1a1a' }}>M</div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#f0e6d6', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Marcel</div>
              <div style={{ fontSize: '11px', color: '#7a7268', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: loading ? '#f59e0b' : '#4caf50', display: 'inline-block' }}></span>
                {loading ? 'Sta scrivendo...' : 'Online — Palazzo Sereno'}
              </div>
            </div>
          </div>

          {/* Quick Suggestions */}
          {messages.length === 1 && (
            <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {[
                { label: 'Check-in', q: 'A che ora è il check-in?' },
                { label: 'Ristorante', q: 'Mi consiglia un ristorante per stasera?' },
                { label: 'Spa', q: 'Quali trattamenti spa sono disponibili?' },
              ].map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => { console.log('[v0] Button clicked:', item.label); send(item.q); }}
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
                  {item.label}
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

          {/* Input Bar */}
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

        <p style={{ textAlign: 'center', marginTop: '24px', color: '#5a5a4a', fontSize: '13px' }}>
          Prova a chiedere informazioni su check-in, ristoranti, spa o transfer.
        </p>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 20px', borderTop: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
        <p style={{ color: '#d4af78', fontSize: '24px', fontWeight: 300, letterSpacing: '6px', margin: '0 0 12px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>MARCEL</p>
        <p style={{ color: '#5a5a4a', fontSize: '13px', margin: 0 }}>Concierge AI per Hotel di Lusso</p>
      </footer>
    </div>
  );
}
