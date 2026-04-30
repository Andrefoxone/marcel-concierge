import ChatDemo from './components/ChatDemo';

const FEATURES = [
  {
    icon: "🌙",
    title: "24/7 Disponibile",
    desc: "Assistenza continua, giorno e notte, senza attese"
  },
  {
    icon: "🗣️",
    title: "Multilingua",
    desc: "Comunica in italiano, inglese, francese, tedesco e altre lingue"
  },
  {
    icon: "⚡",
    title: "Risposte Immediate",
    desc: "Informazioni istantanee su servizi, prenotazioni e richieste"
  },
  {
    icon: "🎯",
    title: "Personalizzato",
    desc: "Si adatta al tono e ai servizi specifici del tuo hotel"
  }
];

const SCENARIOS = [
  { icon: "🔑", title: "Check-in", desc: "Gestione arrivi e partenze" },
  { icon: "🍽️", title: "Ristoranti", desc: "Prenotazioni e consigli culinari" },
  { icon: "💆", title: "Spa & Wellness", desc: "Trattamenti e disponibilità" },
  { icon: "🚗", title: "Transfer", desc: "Taxi e trasporti privati" },
  { icon: "🎭", title: "Esperienze", desc: "Eventi e attrazioni locali" },
  { icon: "🛎️", title: "Room Service", desc: "Ordini e richieste in camera" }
];

export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #141414 50%, #0a0a0a 100%)',
      fontFamily: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif"
    }}>
      {/* Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes dotPulse {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'rgba(10,10,10,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #d4af78, #b8924a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            fontWeight: 700,
            color: '#1a1a1a'
          }}>M</div>
          <span style={{
            fontSize: 18,
            fontWeight: 600,
            color: '#f0e6d6',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            letterSpacing: 2
          }}>MARCEL</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <a href="#features" style={{ color: '#8a8a7a', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>Funzionalità</a>
          <a href="#demo" style={{ color: '#8a8a7a', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>Demo</a>
          <a href="#contact" style={{ color: '#8a8a7a', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>Contatti</a>
          <button style={{
            padding: '10px 24px',
            background: 'linear-gradient(135deg, #d4af78, #b8924a)',
            border: 'none',
            borderRadius: 8,
            color: '#1a1a1a',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer'
          }}>Richiedi Demo</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '120px 40px 80px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Effects */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: 400,
          height: 400,
          background: 'radial-gradient(circle, rgba(212,175,120,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '10%',
          right: '15%',
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(184,146,74,0.06) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }} />

        <div style={{
          maxWidth: 1200,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Left - Text Content */}
          <div style={{ animation: 'fadeInUp 0.8s ease' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              background: 'rgba(212,175,120,0.1)',
              borderRadius: 20,
              marginBottom: 24
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4caf50' }} />
              <span style={{ fontSize: 12, color: '#c9a96e', fontWeight: 500 }}>Powered by AI</span>
            </div>
            
            <h1 style={{
              fontSize: 56,
              fontWeight: 600,
              color: '#f5f0e6',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              lineHeight: 1.1,
              margin: '0 0 24px'
            }}>
              Il Concierge
              <br />
              <span style={{
                background: 'linear-gradient(90deg, #d4af78, #e8c992, #d4af78)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                animation: 'shimmer 3s linear infinite'
              }}>Intelligente</span>
              <br />
              per il tuo Hotel
            </h1>
            
            <p style={{
              fontSize: 17,
              color: '#8a8a7a',
              lineHeight: 1.7,
              margin: '0 0 40px',
              maxWidth: 480
            }}>
              Marcel trasforma l&apos;esperienza degli ospiti con un assistente AI 
              disponibile 24/7. Risposte immediate, prenotazioni semplificate, 
              servizio impeccabile in ogni lingua.
            </p>
            
            <div style={{ display: 'flex', gap: 16 }}>
              <button style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #d4af78, #b8924a)',
                border: 'none',
                borderRadius: 12,
                color: '#1a1a1a',
                fontSize: 15,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8
              }}>
                Inizia Ora
                <span>→</span>
              </button>
              <button style={{
                padding: '16px 32px',
                background: 'transparent',
                border: '1px solid rgba(212,175,120,0.3)',
                borderRadius: 12,
                color: '#c9a96e',
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer'
              }}>
                Guarda Video
              </button>
            </div>
            
            {/* Stats */}
            <div style={{
              display: 'flex',
              gap: 48,
              marginTop: 60,
              paddingTop: 40,
              borderTop: '1px solid rgba(255,255,255,0.06)'
            }}>
              {[
                { value: '98%', label: 'Soddisfazione' },
                { value: '24/7', label: 'Disponibilità' },
                { value: '< 2s', label: 'Tempo risposta' }
              ].map((stat, i) => (
                <div key={i}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: '#d4af78', fontFamily: "'Cormorant Garamond', serif" }}>{stat.value}</div>
                  <div style={{ fontSize: 12, color: '#6a6a5a', marginTop: 4 }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Chat Demo */}
          <div style={{ animation: 'fadeInUp 0.8s ease 0.2s both' }}>
            <ChatDemo />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{
        padding: '100px 40px',
        background: 'rgba(255,255,255,0.01)'
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{
              fontSize: 40,
              fontWeight: 600,
              color: '#f0e6d6',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              margin: '0 0 16px'
            }}>Perché scegliere Marcel</h2>
            <p style={{ fontSize: 15, color: '#6a6a5a', maxWidth: 500, margin: '0 auto' }}>
              Un assistente AI progettato per l&apos;eccellenza dell&apos;ospitalità
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24
          }}>
            {FEATURES.map((f, i) => (
              <div key={i} style={{
                padding: 32,
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 16,
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 600, color: '#e0d8c8', margin: '0 0 8px' }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#6a6a5a', lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scenarios Section */}
      <section style={{ padding: '80px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{
              fontSize: 40,
              fontWeight: 600,
              color: '#f0e6d6',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              margin: '0 0 16px'
            }}>Cosa può fare Marcel</h2>
            <p style={{ fontSize: 15, color: '#6a6a5a' }}>
              Gestisce ogni aspetto dell&apos;esperienza ospite
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: 16
          }}>
            {SCENARIOS.map((s, i) => (
              <div key={i} style={{
                padding: 24,
                background: 'rgba(255,255,255,0.02)',
                borderRadius: 12,
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                <h4 style={{ fontSize: 14, fontWeight: 600, color: '#c9a96e', margin: '0 0 4px' }}>{s.title}</h4>
                <p style={{ fontSize: 11, color: '#5a5a5a', margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" style={{
        padding: '100px 40px',
        background: 'linear-gradient(135deg, rgba(212,175,120,0.05) 0%, rgba(184,146,74,0.02) 100%)'
      }}>
        <div style={{
          maxWidth: 700,
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 44,
            fontWeight: 600,
            color: '#f0e6d6',
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            margin: '0 0 20px'
          }}>Trasforma il tuo hotel</h2>
          <p style={{
            fontSize: 16,
            color: '#7a7a6a',
            marginBottom: 40,
            lineHeight: 1.7
          }}>
            Richiedi una demo personalizzata e scopri come Marcel può 
            elevare l&apos;esperienza dei tuoi ospiti.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <input 
              type="email" 
              placeholder="La tua email"
              style={{
                padding: '16px 24px',
                width: 300,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12,
                color: '#e0d8c8',
                fontSize: 14,
                outline: 'none'
              }}
            />
            <button style={{
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #d4af78, #b8924a)',
              border: 'none',
              borderRadius: 12,
              color: '#1a1a1a',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer'
            }}>
              Richiedi Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: 'linear-gradient(135deg, #d4af78, #b8924a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            fontWeight: 700,
            color: '#1a1a1a'
          }}>M</div>
          <span style={{ fontSize: 14, color: '#5a5a5a' }}>Marcel Concierge AI</span>
        </div>
        <p style={{ fontSize: 12, color: '#4a4a4a', margin: 0 }}>
          © 2024 Marcel. Tutti i diritti riservati.
        </p>
      </footer>
    </main>
  );
}
