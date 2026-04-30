'use client';

import { useState, FormEvent } from 'react';

type Message = { role: 'user' | 'assistant'; text: string };

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Buonasera! Sono Marcel, il concierge virtuale del Palazzo Sereno. Come posso assisterla oggi?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMsg }].map(m => ({ role: m.role, content: m.text })) }),
      });
      
      if (!res.ok) throw new Error('API error');
      
      const text = await res.text();
      setMessages(prev => [...prev, { role: 'assistant', text }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Mi scusi, si è verificato un errore. Riprovi.' }]);
    } finally {
      setLoading(false);
    }
  }

  function quickSend(text: string) {
    if (loading) return;
    setMessages(prev => [...prev, { role: 'user', text }]);
    setLoading(true);

    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, { role: 'user', content: text }].map(m => ({ role: m.role, content: m.text })) }),
    })
      .then(res => res.text())
      .then(responseText => setMessages(prev => [...prev, { role: 'assistant', text: responseText }]))
      .catch(() => setMessages(prev => [...prev, { role: 'assistant', text: 'Errore. Riprovi.' }]))
      .finally(() => setLoading(false));
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ textAlign: 'center', padding: '60px 20px 40px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 300, letterSpacing: '0.3em', color: '#d4af78', margin: 0 }}>MARCEL</h1>
        <p style={{ color: '#888', marginTop: '10px' }}>Concierge AI per Hotel di Lusso</p>
      </header>

      <main style={{ maxWidth: '500px', margin: '0 auto', padding: '0 20px 60px' }}>
        <div style={{ background: '#1a1a1a', borderRadius: '16px', overflow: 'hidden', border: '1px solid #333' }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #d4af78, #b8924a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>M</div>
            <div>
              <div style={{ fontWeight: 600 }}>Marcel</div>
              <div style={{ fontSize: '12px', color: '#888' }}>Online - Palazzo Sereno</div>
            </div>
          </div>

          <div style={{ padding: '12px', borderBottom: '1px solid #333', display: 'flex', gap: '8px' }}>
            <button onClick={() => quickSend('A che ora è il check-in?')} disabled={loading} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #d4af78', background: 'transparent', color: '#d4af78', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '13px' }}>Check-in</button>
            <button onClick={() => quickSend('Mi consiglia un ristorante?')} disabled={loading} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #d4af78', background: 'transparent', color: '#d4af78', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '13px' }}>Ristorante</button>
            <button onClick={() => quickSend('Quali trattamenti spa avete?')} disabled={loading} style={{ padding: '8px 16px', borderRadius: '20px', border: '1px solid #d4af78', background: 'transparent', color: '#d4af78', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '13px' }}>Spa</button>
          </div>

          <div style={{ height: '350px', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ alignSelf: m.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                <div style={{ padding: '12px 16px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.role === 'user' ? 'linear-gradient(135deg, #d4af78, #b8924a)' : '#2a2a2a', color: m.role === 'user' ? '#000' : '#fff', fontSize: '14px', lineHeight: 1.5 }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: 'flex-start', padding: '12px 16px', borderRadius: '16px', background: '#2a2a2a', color: '#888' }}>
                Marcel sta scrivendo...
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} style={{ padding: '12px', borderTop: '1px solid #333', display: 'flex', gap: '8px' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Scrivi un messaggio..."
              disabled={loading}
              style={{ flex: 1, padding: '12px 16px', borderRadius: '12px', border: 'none', background: '#2a2a2a', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
            <button type="submit" disabled={loading || !input.trim()} style={{ padding: '12px 20px', borderRadius: '12px', border: 'none', background: input.trim() && !loading ? 'linear-gradient(135deg, #d4af78, #b8924a)' : '#333', color: input.trim() && !loading ? '#000' : '#666', fontWeight: 600, cursor: input.trim() && !loading ? 'pointer' : 'not-allowed' }}>
              Invia
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
