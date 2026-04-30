'use client';

import Chat from './Chat';

const features = [
  { icon: '🔑', title: 'Check-in Express', desc: 'Procedura digitale senza attese' },
  { icon: '🍽️', title: 'Ristoranti', desc: 'Prenotazioni nei migliori locali' },
  { icon: '💆', title: 'Spa & Wellness', desc: 'Trattamenti personalizzati' },
  { icon: '🚗', title: 'Transfer', desc: 'Auto con autista h24' },
  { icon: '🛎️', title: 'Room Service', desc: 'Servizio in camera 24/7' },
  { icon: '🎭', title: 'Esperienze', desc: 'Eventi e attrazioni esclusive' },
];

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #0f0f0f 0%, #1a1a1a 100%)', color: '#f5f0e6', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      
      {/* Hero */}
      <header style={{ padding: '80px 20px 60px', textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'inline-block', padding: '8px 20px', background: 'rgba(212,175,120,0.1)', borderRadius: '20px', marginBottom: '24px' }}>
          <span style={{ color: '#d4af78', fontSize: '12px', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>Concierge AI per Hotel di Lusso</span>
        </div>
        <h1 style={{ fontSize: 'clamp(48px, 10vw, 72px)', fontWeight: 300, color: '#d4af78', margin: '0 0 24px', letterSpacing: '12px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>MARCEL</h1>
        <p style={{ fontSize: '18px', color: '#a09080', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
          Il vostro concierge personale, disponibile 24 ore su 24, 7 giorni su 7.
        </p>
      </header>

      {/* Features */}
      <section style={{ padding: '40px 20px 60px', maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,120,0.15)', borderRadius: '16px', padding: '24px' }}>
              <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>{f.icon}</span>
              <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 600, color: '#e8e0d0' }}>{f.title}</h3>
              <p style={{ margin: 0, fontSize: '14px', color: '#7a7268', lineHeight: 1.5 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Chat Demo */}
      <section style={{ padding: '60px 20px 80px', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 400, color: '#d4af78', margin: '0 0 12px', fontFamily: "'Cormorant Garamond', Georgia, serif" }}>Prova Marcel</h2>
          <p style={{ color: '#7a7268', fontSize: '16px' }}>Scopri come Marcel può assistere i tuoi ospiti</p>
        </div>
        <Chat />
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
