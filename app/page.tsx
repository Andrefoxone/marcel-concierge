import ChatDemo from './components/ChatDemo';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#f0e6d6' }}>
      {/* Hero Section */}
      <header style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '40px 20px',
        background: 'radial-gradient(ellipse at top, #1a1a1a 0%, #0f0f0f 70%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '140%',
          height: '200%',
          background: 'radial-gradient(circle at 30% 20%, rgba(212,175,120,0.03) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ marginBottom: 24, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontSize: 'clamp(48px, 8vw, 72px)', 
            fontWeight: 300, 
            letterSpacing: '0.3em',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            color: '#c9a96e',
            margin: 0
          }}>
            MARCEL
          </h1>
          <p style={{ 
            fontSize: 'clamp(14px, 2vw, 18px)', 
            color: '#8a7a6a', 
            letterSpacing: '0.2em',
            marginTop: 8,
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Concierge AI per Hotel di Lusso
          </p>
        </div>

        <p style={{ 
          maxWidth: 600, 
          textAlign: 'center', 
          color: '#9a8a7a', 
          fontSize: 'clamp(16px, 2vw, 20px)',
          lineHeight: 1.7,
          marginBottom: 48,
          padding: '0 20px',
          position: 'relative',
          zIndex: 1
        }}>
          L&apos;intelligenza artificiale al servizio dell&apos;ospitalita. 
          Un concierge virtuale disponibile 24/7 per i tuoi ospiti.
        </p>

        <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 460, padding: '0 20px' }}>
          <ChatDemo />
        </div>

        <p style={{ 
          marginTop: 24, 
          color: '#5a5a4a', 
          fontSize: 13,
          position: 'relative',
          zIndex: 1
        }}>
          Prova a chiedere informazioni su check-in, ristoranti, spa o transfer
        </p>
      </header>

      {/* Features Section */}
      <section style={{ 
        padding: '100px 20px', 
        background: '#0a0a0a',
        borderTop: '1px solid rgba(212,175,120,0.1)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontWeight: 300,
            color: '#c9a96e',
            letterSpacing: '0.15em',
            marginBottom: 16,
            fontFamily: "'Cormorant Garamond', Georgia, serif"
          }}>
            Perche Marcel
          </h2>
          <p style={{ 
            textAlign: 'center', 
            color: '#7a7268', 
            maxWidth: 600, 
            margin: '0 auto 64px',
            fontSize: 16,
            lineHeight: 1.7
          }}>
            Un concierge AI che trasforma l&apos;esperienza degli ospiti nel tuo hotel
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 32
          }}>
            {[
              { icon: '24/7', title: 'Sempre Disponibile', desc: 'Assistenza immediata in ogni momento, giorno e notte, senza attese' },
              { icon: '🌍', title: 'Multilingua', desc: 'Comunica fluentemente in oltre 50 lingue per ospiti internazionali' },
              { icon: '✨', title: 'Personalizzato', desc: "Si adatta al tono e allo stile del tuo brand per un'esperienza unica" },
              { icon: '📊', title: 'Analytics', desc: 'Insights dettagliati sulle richieste e preferenze degli ospiti' },
              { icon: '🔗', title: 'Integrazioni', desc: 'Si connette con PMS, booking engine e sistemi esistenti' },
              { icon: '🎯', title: 'Upselling', desc: 'Suggerisce servizi aggiuntivi aumentando il revenue per ospite' },
            ].map((feature, i) => (
              <div key={i} style={{ 
                padding: 32,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.01) 100%)',
                borderRadius: 16,
                border: '1px solid rgba(212,175,120,0.1)'
              }}>
                <div style={{ 
                  fontSize: 32, 
                  marginBottom: 16,
                  color: feature.icon === '24/7' ? '#c9a96e' : 'inherit',
                  fontWeight: feature.icon === '24/7' ? 700 : 400
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e8dcc8', marginBottom: 8 }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#7a7268', fontSize: 14, lineHeight: 1.6, margin: 0 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section style={{ 
        padding: '100px 20px', 
        background: '#0f0f0f',
        borderTop: '1px solid rgba(212,175,120,0.1)'
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: 'clamp(32px, 5vw, 48px)', 
            fontWeight: 300,
            color: '#c9a96e',
            letterSpacing: '0.15em',
            marginBottom: 64,
            fontFamily: "'Cormorant Garamond', Georgia, serif"
          }}>
            Come Funziona
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            {[
              { step: '01', title: 'Configurazione', desc: 'Personalizziamo Marcel con le informazioni del tuo hotel, servizi, orari e tone of voice' },
              { step: '02', title: 'Integrazione', desc: 'Marcel si integra con il tuo sito web, app o sistemi di messaggistica esistenti' },
              { step: '03', title: 'Assistenza', desc: 'Gli ospiti ricevono risposte immediate e accurate su qualsiasi richiesta' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
                <div style={{ 
                  fontSize: 48, 
                  fontWeight: 200, 
                  color: 'rgba(212,175,120,0.3)',
                  lineHeight: 1,
                  minWidth: 80
                }}>
                  {item.step}
                </div>
                <div style={{ flex: 1, minWidth: 250 }}>
                  <h3 style={{ fontSize: 24, fontWeight: 500, color: '#e8dcc8', marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#7a7268', fontSize: 16, lineHeight: 1.7, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        padding: '100px 20px', 
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)',
        borderTop: '1px solid rgba(212,175,120,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{ 
          fontSize: 'clamp(28px, 5vw, 40px)', 
          fontWeight: 300,
          color: '#c9a96e',
          letterSpacing: '0.1em',
          marginBottom: 24
        }}>
          Pronto a Trasformare l&apos;Esperienza dei Tuoi Ospiti?
        </h2>
        <p style={{ color: '#7a7268', maxWidth: 500, margin: '0 auto 40px', fontSize: 16, lineHeight: 1.7 }}>
          Richiedi una demo personalizzata per il tuo hotel
        </p>
        <button style={{
          padding: '16px 48px',
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.1em',
          background: 'linear-gradient(135deg, #d4af78 0%, #b8924a 100%)',
          color: '#0f0f0f',
          border: 'none',
          borderRadius: 8,
          cursor: 'pointer'
        }}>
          RICHIEDI DEMO
        </button>
      </section>

      {/* Footer */}
      <footer style={{ 
        padding: '40px 20px', 
        borderTop: '1px solid rgba(212,175,120,0.1)',
        textAlign: 'center'
      }}>
        <p style={{ color: '#4a4a3a', fontSize: 13 }}>
          © 2026 Marcel AI — Concierge Virtuale per Hotel di Lusso
        </p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; font-family: 'DM Sans', sans-serif; }
        @keyframes msgIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes dotPulse { 0%, 100% { opacity: 0.4; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
