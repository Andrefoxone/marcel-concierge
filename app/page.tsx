import ChatDemo from './components/ChatDemo';

export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
        {/* Header */}
        <div style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: '#c9a96e',
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              margin: 0,
              letterSpacing: 2,
            }}
          >
            MARCEL
          </h1>
          <p
            style={{
              fontSize: 13,
              color: '#6a6a5a',
              marginTop: 8,
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: 1,
            }}
          >
            Concierge AI per Hotel di Lusso
          </p>
        </div>

        {/* Chat Demo */}
        <ChatDemo />

        {/* Footer */}
        <p
          style={{
            fontSize: 11,
            color: '#4a4a4a',
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Prova a chiedere informazioni su check-in, ristoranti, spa o transfer
        </p>
      </div>
    </main>
  );
}
