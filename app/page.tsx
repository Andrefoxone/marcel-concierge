'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

function ChatDemo() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Buonasera e benvenuto al Palazzo Sereno! Sono Marcel, il vostro concierge virtuale. Come posso assisterla oggi?',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, streamingText]);

  const handleSend = async (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setStreamingText('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      if (!response.ok) throw new Error('API Error');
      if (!response.body) throw new Error('No body');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data:')) {
            const data = line.slice(5).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.delta) {
                fullText += parsed.delta;
                setStreamingText(fullText);
              }
            } catch {
              // skip
            }
          }
        }
      }

      if (fullText) {
        setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: fullText }]);
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', text: 'Mi scusi, si e verificato un errore. Riprovi tra poco.' }]);
    } finally {
      setIsLoading(false);
      setStreamingText('');
    }
  };

  const suggestions = ['A che ora e il check-in?', 'Consiglia un ristorante?', 'Prenota la spa'];

  return (
    <div style={{ background: '#1a1a1a', borderRadius: 20, overflow: 'hidden', border: '1px solid rgba(212,175,120,0.15)', maxWidth: 440, width: '100%', boxShadow: '0 24px 80px rgba(0,0,0,0.5)' }}>
      {/* Header */}
      <div style={{ padding: '16px 20px', background: 'linear-gradient(135deg, #1e1e1e, #252525)', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg, #d4af78, #b8924a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: '#1a1a1a' }}>M</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#f0e6d6' }}>Marcel</div>
          <div style={{ fontSize: 11, color: '#7a7268', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: isLoading ? '#f59e0b' : '#4caf50' }} />
            {isLoading ? 'Sta scrivendo...' : 'Online'}
          </div>
        </div>
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {suggestions.map((q, i) => (
            <button key={i} onClick={() => handleSend(q)} disabled={isLoading} style={{ padding: '6px 12px', borderRadius: 20, background: 'rgba(212,175,120,0.1)', border: '1px solid rgba(212,175,120,0.2)', color: '#c9a96e', fontSize: 11, fontWeight: 600, cursor: 'pointer', opacity: isLoading ? 0.5 : 1 }}>
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div ref={chatRef} style={{ padding: 16, height: 320, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
        {messages.map((msg) => (
          <div key={msg.id} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%' }}>
            <div style={{ padding: '10px 14px', borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: msg.role === 'user' ? 'linear-gradient(135deg, #d4af78, #b8924a)' : 'rgba(255,255,255,0.06)', color: msg.role === 'user' ? '#1a1a1a' : '#e0d8c8', fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-line' }}>
              {msg.text}
            </div>
          </div>
        ))}
        {streamingText && (
          <div style={{ alignSelf: 'flex-start', maxWidth: '85%' }}>
            <div style={{ padding: '10px 14px', borderRadius: '16px 16px 16px 4px', background: 'rgba(255,255,255,0.06)', color: '#e0d8c8', fontSize: 13, lineHeight: 1.55, whiteSpace: 'pre-line' }}>
              {streamingText}
            </div>
          </div>
        )}
        {isLoading && !streamingText && (
          <div style={{ alignSelf: 'flex-start' }}>
            <div style={{ padding: '10px 18px', borderRadius: '16px 16px 16px 4px', background: 'rgba(255,255,255,0.06)', display: 'flex', gap: 4 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a96e', animation: 'pulse 1s infinite' }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a96e', animation: 'pulse 1s infinite 0.2s' }} />
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a96e', animation: 'pulse 1s infinite 0.4s' }} />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', background: '#1e1e1e' }}>
        <div style={{ display: 'flex', gap: 8, background: 'rgba(255,255,255,0.05)', borderRadius: 12, padding: '4px 4px 4px 14px' }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Scrivi un messaggio..."
            disabled={isLoading}
            style={{ flex: 1, fontSize: 13, color: '#e8e0d0', background: 'transparent', border: 'none', outline: 'none' }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isLoading || !inputValue.trim()}
            style={{ width: 36, height: 36, borderRadius: 8, background: inputValue.trim() ? 'linear-gradient(135deg, #d4af78, #b8924a)' : 'rgba(255,255,255,0.05)', border: 'none', cursor: inputValue.trim() ? 'pointer' : 'default', fontSize: 16, color: inputValue.trim() ? '#1a1a1a' : '#5a5a4a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            ↗
          </button>
        </div>
      </div>

      <style>{`@keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }`}</style>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#f0e6d6' }}>
      <header style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', background: 'radial-gradient(ellipse at top, #1a1a1a 0%, #0f0f0f 70%)' }}>
        <h1 style={{ fontSize: 'clamp(48px, 8vw, 72px)', fontWeight: 300, letterSpacing: '0.3em', color: '#c9a96e', margin: 0, marginBottom: 8 }}>MARCEL</h1>
        <p style={{ fontSize: 16, color: '#8a7a6a', letterSpacing: '0.2em', marginBottom: 32 }}>Concierge AI per Hotel di Lusso</p>
        <p style={{ maxWidth: 600, textAlign: 'center', color: '#9a8a7a', fontSize: 18, lineHeight: 1.7, marginBottom: 48, padding: '0 20px' }}>
          L&apos;intelligenza artificiale al servizio dell&apos;ospitalita. Un concierge virtuale disponibile 24/7.
        </p>
        <ChatDemo />
        <p style={{ marginTop: 24, color: '#5a5a4a', fontSize: 13 }}>Prova a chiedere informazioni su check-in, ristoranti, spa o transfer</p>
      </header>

      <section style={{ padding: '100px 20px', background: '#0a0a0a', borderTop: '1px solid rgba(212,175,120,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 300, color: '#c9a96e', letterSpacing: '0.15em', marginBottom: 64 }}>Perche Marcel</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
            {[
              { icon: '24/7', title: 'Sempre Disponibile', desc: 'Assistenza immediata in ogni momento' },
              { icon: '🌍', title: 'Multilingua', desc: 'Comunica in oltre 50 lingue' },
              { icon: '✨', title: 'Personalizzato', desc: 'Si adatta al tuo brand' },
              { icon: '📊', title: 'Analytics', desc: 'Insights sulle richieste degli ospiti' },
              { icon: '🔗', title: 'Integrazioni', desc: 'Connette PMS e booking engine' },
              { icon: '🎯', title: 'Upselling', desc: 'Aumenta il revenue per ospite' },
            ].map((f, i) => (
              <div key={i} style={{ padding: 32, background: 'rgba(255,255,255,0.02)', borderRadius: 16, border: '1px solid rgba(212,175,120,0.1)' }}>
                <div style={{ fontSize: 32, marginBottom: 16, color: f.icon === '24/7' ? '#c9a96e' : 'inherit', fontWeight: f.icon === '24/7' ? 700 : 400 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e8dcc8', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ color: '#7a7268', fontSize: 14, lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '100px 20px', background: '#0f0f0f', borderTop: '1px solid rgba(212,175,120,0.1)', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 300, color: '#c9a96e', letterSpacing: '0.1em', marginBottom: 24 }}>Pronto a Trasformare l&apos;Esperienza dei Tuoi Ospiti?</h2>
        <p style={{ color: '#7a7268', maxWidth: 500, margin: '0 auto 40px', fontSize: 16 }}>Richiedi una demo personalizzata per il tuo hotel</p>
        <button style={{ padding: '16px 48px', fontSize: 14, fontWeight: 600, letterSpacing: '0.1em', background: 'linear-gradient(135deg, #d4af78, #b8924a)', color: '#0f0f0f', border: 'none', borderRadius: 8, cursor: 'pointer' }}>RICHIEDI DEMO</button>
      </section>

      <footer style={{ padding: '40px 20px', borderTop: '1px solid rgba(212,175,120,0.1)', textAlign: 'center' }}>
        <p style={{ color: '#4a4a3a', fontSize: 13 }}>© 2026 Marcel AI — Concierge Virtuale per Hotel di Lusso</p>
      </footer>
    </div>
  );
}
