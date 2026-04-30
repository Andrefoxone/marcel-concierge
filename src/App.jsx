import { useState, useEffect, useRef } from "react";

/* ─── DEMO CHAT DATA ─── */
const DEMO_CONVERSATIONS = {
  checkin: [
    { role: "guest", text: "Buonasera, a che ora posso fare il check-in domani?" },
    { role: "marcel", text: "Buonasera! Il check-in è disponibile dalle 14:00 alle 22:00. Se desidera un orario anticipato, posso verificare la disponibilità per un early check-in alle 12:00 con un piccolo supplemento di €25. Vuole che lo prenoti?" },
    { role: "guest", text: "Sì, alle 12 sarebbe perfetto" },
    { role: "marcel", text: "Perfetto! Ho prenotato il suo early check-in per domani alle 12:00. Troverà la conferma via email. Posso aiutarla con altro? Un transfer dall'aeroporto, forse?" },
  ],
  ristorante: [
    { role: "guest", text: "Vorrei prenotare un ristorante romantico per stasera, siamo in due" },
    { role: "marcel", text: "Con piacere! Per una cena romantica le consiglio tre opzioni vicine all'hotel:\n\n🥇 Terrazza Gallia — rooftop con vista Duomo, cucina stellata, 5 min a piedi\n🥈 Seta by Mandarin — elegante, menu degustazione, 8 min\n🥉 Langosteria — pesce eccellente, atmosfera intima, 10 min\n\nVuole che prenoti un tavolo? Per che ora?" },
    { role: "guest", text: "Terrazza Gallia alle 20:30" },
    { role: "marcel", text: "Prenotato! Tavolo per 2 alla Terrazza Gallia, ore 20:30. Ho indicato che siete ospiti dell'hotel — avrete un cocktail di benvenuto offerto. Buona cena! 🥂" },
  ],
  spa: [
    { role: "guest", text: "La spa è aperta oggi? Vorrei un massaggio" },
    { role: "marcel", text: "Sì, la nostra spa è aperta oggi dalle 10:00 alle 21:00. Ecco i trattamenti disponibili per oggi:\n\n💆 Massaggio rilassante 50min — €95\n💆 Deep tissue 50min — €110\n🌿 Ritual corpo completo 80min — €145\n\nAbbiamo disponibilità alle 15:00, 16:30 e 18:00. Quale preferisce?" },
    { role: "guest", text: "Rilassante alle 16:30" },
    { role: "marcel", text: "Perfetto! Massaggio rilassante prenotato per le 16:30. Le consiglio di arrivare 15 minuti prima per usufruire della sauna e dell'area relax. L'addebito verrà aggiunto al conto camera. Buon relax! 🧖" },
  ],
};

const STATS = [
  { value: "94%", label: "Risposte automatiche", sub: "senza intervento umano" },
  { value: "24/7", label: "Sempre attivo", sub: "notti, weekend, festivi" },
  { value: "< 3s", label: "Tempo di risposta", sub: "media per messaggio" },
  { value: "+35%", label: "Upselling", sub: "servizi aggiuntivi venduti" },
];

const FEATURES = [
  { icon: "💬", title: "Conversazioni naturali", desc: "Marcel parla come un vero concierge. Capisce il contesto, ricorda le preferenze, e risponde in italiano, inglese, francese, tedesco e spagnolo." },
  { icon: "🏨", title: "Personalizzato al 100%", desc: "Configurato con i servizi, le tariffe, i ristoranti partner e le attrazioni del vostro hotel. Ogni risposta riflette la vostra identità." },
  { icon: "📱", title: "Multi-canale", desc: "Funziona sul vostro sito web, via WhatsApp e nella web app per gli ospiti. Un unico punto di contatto, ovunque." },
  { icon: "📊", title: "Dashboard analytics", desc: "Sapete esattamente cosa chiedono i vostri ospiti, quali servizi sono più richiesti, e dove c'è opportunità di revenue." },
  { icon: "🔔", title: "Escalation intelligente", desc: "Quando serve l'intervento umano, Marcel avvisa il vostro staff con tutti i dettagli del contesto. Zero informazioni perse." },
  { icon: "🔒", title: "GDPR compliant", desc: "Dati ospiti protetti, server in UE, nessun dato condiviso con terzi. Piena conformità normativa." },
];

const TESTIMONIALS = [
  { name: "Francesca R.", role: "Direttrice, Boutique Hotel Brera", text: "Da quando abbiamo Marcel, il nostro front desk gestisce il 40% in meno di telefonate. Gli ospiti adorano avere risposte immediate, specialmente di notte.", stars: 5 },
  { name: "Marco B.", role: "GM, Palazzo Naviglio", text: "L'upselling è stato una sorpresa. Marcel propone la colazione in camera, il late checkout, la spa — e gli ospiti accettano perché il suggerimento arriva al momento giusto.", stars: 5 },
  { name: "Giulia T.", role: "Owner, Casa Tortona Suites", text: "Gestisco 12 camere praticamente da sola. Marcel è come avere un receptionist in più, ma che non dorme mai e non va in ferie.", stars: 5 },
];

const PRICING = [
  {
    name: "Essenziale",
    setup: "490",
    monthly: "89",
    desc: "Per strutture fino a 20 camere",
    features: ["Chatbot sul vostro sito web", "Fino a 500 conversazioni/mese", "Configurazione personalizzata", "Supporto italiano", "Dashboard base"],
    cta: "Inizia ora",
    popular: false,
  },
  {
    name: "Business",
    setup: "790",
    monthly: "149",
    desc: "Per hotel boutique 20-50 camere",
    features: ["Tutto di Essenziale +", "WhatsApp Business integrato", "Conversazioni illimitate", "Upselling automatizzato", "Dashboard analytics completa", "Aggiornamenti mensili inclusi"],
    cta: "Scegli Business",
    popular: true,
  },
  {
    name: "Premium",
    setup: "Su misura",
    monthly: "249",
    desc: "Per hotel 50+ camere e gruppi",
    features: ["Tutto di Business +", "Integrazione PMS", "Multi-lingua avanzato (8 lingue)", "Report settimanali personalizzati", "Account manager dedicato", "SLA risposta 2h"],
    cta: "Contattaci",
    popular: false,
  },
];

/* ─── COMPONENTS ─── */

// AI Response Generator - simulates intelligent concierge responses
const generateMarcelResponse = (userMessage) => {
  const msg = userMessage.toLowerCase();
  
  // Check-in related
  if (msg.includes("check-in") || msg.includes("check in") || msg.includes("arrivare") || msg.includes("arrivo")) {
    return "Il check-in e disponibile dalle 14:00 alle 22:00. Se desidera un orario anticipato, posso verificare la disponibilita per un early check-in alle 12:00 con un piccolo supplemento di 25 euro. Vuole che lo prenoti per lei?";
  }
  
  // Check-out related
  if (msg.includes("check-out") || msg.includes("check out") || msg.includes("partenza") || msg.includes("lasciare")) {
    return "Il check-out standard e entro le 11:00. Se preferisce un late check-out, posso verificare la disponibilita fino alle 14:00 (30 euro) o fino alle 18:00 (60 euro). Vuole che controlli per la sua data di partenza?";
  }
  
  // Restaurant related
  if (msg.includes("ristorante") || msg.includes("cena") || msg.includes("pranzo") || msg.includes("mangiare") || msg.includes("consiglia")) {
    return "Con piacere! Per una cena speciale le consiglio tre opzioni vicine all'hotel:\n\n• Terrazza Gallia — rooftop con vista Duomo, cucina stellata, 5 min a piedi\n• Seta by Mandarin — elegante, menu degustazione, 8 min\n• Langosteria — pesce eccellente, atmosfera intima, 10 min\n\nVuole che prenoti un tavolo? Per quante persone e a che ora?";
  }
  
  // Spa related
  if (msg.includes("spa") || msg.includes("massaggio") || msg.includes("relax") || msg.includes("benessere")) {
    return "La nostra spa e aperta oggi dalle 10:00 alle 21:00. Ecco i trattamenti disponibili:\n\n• Massaggio rilassante 50min — 95 euro\n• Deep tissue 50min — 110 euro\n• Ritual corpo completo 80min — 145 euro\n\nAbbiamo disponibilita alle 15:00, 16:30 e 18:00. Quale orario preferisce?";
  }
  
  // Transfer/taxi related
  if (msg.includes("taxi") || msg.includes("transfer") || msg.includes("aeroporto") || msg.includes("stazione")) {
    return "Posso organizzare un transfer privato per lei:\n\n• Aeroporto Malpensa — 85 euro (circa 50 min)\n• Aeroporto Linate — 45 euro (circa 20 min)\n• Stazione Centrale — 25 euro (circa 10 min)\n\nA che ora desidera partire? Posso prenotarlo subito.";
  }
  
  // Breakfast related
  if (msg.includes("colazione") || msg.includes("breakfast")) {
    return "La colazione e servita dalle 7:00 alle 10:30 nel nostro ristorante al piano terra. Offriamo un buffet continentale con prodotti freschi e locali. Se preferisce, possiamo servirla in camera con un supplemento di 12 euro. Desidera prenotare la colazione in camera per domani?";
  }
  
  // WiFi related
  if (msg.includes("wifi") || msg.includes("internet") || msg.includes("connessione")) {
    return "Il WiFi e gratuito in tutto l'hotel. La password per la sua camera e disponibile sul cartoncino nel comodino. Se ha problemi di connessione, mi faccia sapere e inviero subito l'assistenza tecnica.";
  }
  
  // Room service
  if (msg.includes("room service") || msg.includes("camera") && msg.includes("mangiare")) {
    return "Il room service e disponibile 24 ore su 24. Le invio il menu digitale? I piatti piu richiesti sono il club sandwich, la Caesar salad e la nostra pasta fresca del giorno.";
  }
  
  // Attractions/things to do
  if (msg.includes("cosa fare") || msg.includes("visitare") || msg.includes("vedere") || msg.includes("attrazioni")) {
    return "Milano offre tantissimo! Le consiglio:\n\n• Duomo e Terrazza (5 min a piedi)\n• Galleria Vittorio Emanuele II (7 min)\n• Teatro alla Scala (10 min)\n• Pinacoteca di Brera (15 min)\n• Navigli per aperitivo serale (12 min in taxi)\n\nVuole che prenoti biglietti o un tour guidato?";
  }
  
  // Greeting
  if (msg.includes("ciao") || msg.includes("buongiorno") || msg.includes("buonasera") || msg.includes("salve")) {
    return "Buongiorno! Benvenuto. Come posso assisterla oggi? Sono qui per aiutarla con prenotazioni, informazioni sull'hotel, consigli su ristoranti e attrazioni, o qualsiasi altra necessita.";
  }
  
  // Thank you
  if (msg.includes("grazie") || msg.includes("perfetto") || msg.includes("ottimo")) {
    return "E un piacere! Se ha altre domande o necessita durante il suo soggiorno, sono sempre qui per lei. Le auguro una splendida giornata!";
  }
  
  // Price/cost related
  if (msg.includes("quanto costa") || msg.includes("prezzo") || msg.includes("costo")) {
    return "Posso aiutarla con informazioni sui prezzi. A quale servizio e interessato? Check-in anticipato, late check-out, spa, transfer, o altro?";
  }
  
  // Default response
  return "Grazie per la sua domanda. Posso aiutarla con:\n\n• Check-in e check-out\n• Prenotazioni ristoranti\n• Trattamenti spa\n• Transfer e taxi\n• Consigli su attrazioni e shopping\n• Room service\n\nMi dica pure come posso assisterla!";
};

function ChatDemo() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      text: "Buonasera e benvenuto! Sono Marcel, il vostro concierge virtuale. Come posso assisterla oggi? Posso aiutarla con check-in, prenotazioni ristoranti, spa, transfer o qualsiasi altra necessita.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = (text) => {
    const messageText = text || input;
    console.log("[v0] handleSend called with:", messageText, "isTyping:", isTyping);
    if (!messageText.trim() || isTyping) {
      console.log("[v0] Returning early - empty message or typing");
      return;
    }
    
    // Add user message
    const userMsg = { id: Date.now().toString(), role: "user", text: messageText };
    console.log("[v0] Adding user message:", userMsg);
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    
    // Simulate AI thinking and typing
    setTimeout(() => {
      const response = generateMarcelResponse(messageText);
      console.log("[v0] Generated response:", response);
      const assistantMsg = { id: (Date.now() + 1).toString(), role: "assistant", text: response };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "A che ora e il check-in?",
    "Consiglia un ristorante?",
    "La spa e aperta oggi?",
  ];

  return (
    <div style={{ background: "#1a1a1a", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(212,175,120,0.15)", maxWidth: 440, width: "100%", boxShadow: "0 24px 80px rgba(0,0,0,0.5)" }}>
      {/* Chat Header */}
      <div style={{ padding: "16px 20px", background: "linear-gradient(135deg, #1e1e1e, #252525)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: "linear-gradient(135deg, #d4af78, #b8924a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>M</div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#f0e6d6", fontFamily: "'Cormorant Garamond',Georgia,serif" }}>Marcel</div>
          <div style={{ fontSize: 11, color: "#7a7268", display: "flex", alignItems: "center", gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: isTyping ? "#f59e0b" : "#4caf50", display: "inline-block", animation: isTyping ? "dotPulse .8s ease infinite" : "none" }}></span> 
            {isTyping ? "Marcel sta scrivendo..." : "Online — Boutique Hotel Demo"}
          </div>
        </div>
      </div>

      {/* Suggested Questions - show only when chat has just the welcome message */}
      {messages.length === 1 && (
        <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8, flexWrap: "wrap" }}>
          {suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => handleSend(q)}
              disabled={isTyping}
              style={{
                padding: "6px 12px",
                borderRadius: 20,
                background: "rgba(212,175,120,0.1)",
                border: "1px solid rgba(212,175,120,0.2)",
                color: "#c9a96e",
                fontSize: 11,
                fontWeight: 600,
                cursor: isTyping ? "default" : "pointer",
                fontFamily: "'DM Sans',sans-serif",
                transition: "all .2s",
                opacity: isTyping ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isTyping) e.target.style.background = "rgba(212,175,120,0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "rgba(212,175,120,0.1)";
              }}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Messages */}
      <div ref={chatRef} style={{ padding: "16px", height: 320, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          
          return (
            <div key={msg.id} style={{
              alignSelf: isUser ? "flex-end" : "flex-start",
              maxWidth: "85%", animation: "msgIn .35s ease",
            }}>
              <div style={{
                padding: "10px 14px", 
                borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                background: isUser ? "linear-gradient(135deg, #d4af78, #b8924a)" : "rgba(255,255,255,0.06)",
                color: isUser ? "#1a1a1a" : "#e0d8c8",
                fontSize: 13, lineHeight: 1.55, fontFamily: "'DM Sans',sans-serif", whiteSpace: "pre-line"
              }}>{msg.text}</div>
            </div>
          );
        })}
        {isTyping && (
          <div style={{ alignSelf: "flex-start", animation: "msgIn .2s ease" }}>
            <div style={{ padding: "10px 18px", borderRadius: "16px 16px 16px 4px", background: "rgba(255,255,255,0.06)", display: "flex", gap: 4 }}>
              {[0,1,2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: "50%", background: "#c9a96e", animation: `dotPulse .8s ease ${i * 0.15}s infinite` }}></span>)}
            </div>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "#1e1e1e" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.05)", borderRadius: 12, padding: "4px 4px 4px 14px" }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Scrivi un messaggio..."
            disabled={isTyping}
            style={{
              flex: 1,
              fontSize: 13,
              color: "#e8e0d0",
              background: "transparent",
              border: "none",
              outline: "none",
              fontFamily: "'DM Sans',sans-serif",
            }}
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: input.trim() && !isTyping ? "linear-gradient(135deg, #d4af78, #b8924a)" : "rgba(255,255,255,0.05)",
              border: "none",
              cursor: input.trim() && !isTyping ? "pointer" : "default",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              color: input.trim() && !isTyping ? "#1a1a1a" : "#5a5a4a",
              transition: "all .2s",
            }}
          >
            {isTyping ? "..." : "↗"}
          </button>
        </div>
      </div>
    </div>
  );
}

function Section({ children, id, style = {} }) {
  return <section id={id} style={{ padding: "80px 24px", maxWidth: 1100, margin: "0 auto", ...style }}>{children}</section>;
}

function SectionLabel({ children }) {
  return <div style={{ display:"flex", alignItems:"center", gap:12, justifyContent:"center", marginBottom:16 }}>
    <div style={{width:32, height:1, background:"rgba(201,169,110,0.4)"}}></div>
    <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: "#c9a96e", fontFamily: "'DM Sans',sans-serif" }}>{children}</span>
    <div style={{width:32, height:1, background:"rgba(201,169,110,0.4)"}}></div>
  </div>;
}

/* ─── MAIN ─── */
export default function App() {
  const [formSent, setFormSent] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [fields, setFields] = useState({ name:"", hotel:"", email:"", phone:"", rooms:"" });

  const handleSubmit = async () => {
    if (!fields.name || !fields.email || !fields.hotel) return;
    setFormLoading(true);
    try {
      await fetch("https://formspree.io/f/mbdqnyey", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(fields)
      });
    } catch(e) {}
    setFormLoading(false);
    setFormSent(true);
  };

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#0c0b09", color: "#e8e0d0", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        ::-webkit-scrollbar{width:3px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(212,175,120,0.15);border-radius:2px}
        @keyframes fi{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes msgIn{from{opacity:0;transform:translateY(8px) scale(0.96)}to{opacity:1;transform:translateY(0) scale(1)}}
        @keyframes dotPulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}
        @keyframes glow{0%,100%{opacity:0.4}50%{opacity:0.7}}
        a{color:#c9a96e;text-decoration:none}
        .btn-gold{transition:all .25s ease!important}
        .btn-gold:hover{transform:translateY(-2px)!important;box-shadow:0 8px 32px rgba(212,175,120,0.4)!important}
        .btn-outline:hover{background:rgba(212,175,120,0.06)!important;border-color:rgba(212,175,120,0.5)!important}
        .feature-card:hover{border-color:rgba(212,175,120,0.2)!important;transform:translateY(-4px)!important;background:rgba(212,175,120,0.03)!important}
        .feature-card{transition:all .3s ease!important}
        .pricing-card:hover{transform:translateY(-4px)}
        .pricing-card{transition:transform .3s ease}
      `}</style>

      {/* ─── NAV ─── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(12,11,9,0.92)", backdropFilter: "blur(24px) saturate(180%)", borderBottom: "1px solid rgba(212,175,120,0.06)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #d4af78, #b8924a)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 16, fontWeight: 800, color: "#0f0f0e"
          }}>M</div>
          <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 18, fontWeight: 700, color: "#f0e6d6" }}>Marcel</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {[["Come funziona","#come-funziona"],["Demo","#demo"],["Prezzi","#prezzi"],["Contatti","#contatti"]].map(([l,h]) =>
            <a key={l} href={h} style={{ fontSize: 13, color: "#8a8278", fontWeight: 600, textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e=>e.target.style.color="#c9a96e"} onMouseLeave={e=>e.target.style.color="#8a8a7a"}>{l}</a>
          )}
          <a href="#contatti" style={{
            fontSize: 12, fontWeight: 700, padding: "8px 20px", borderRadius: 8,
            background: "linear-gradient(135deg, #d4af78, #b8924a)", color: "#0f0f0e",
            textDecoration: "none", transition: "transform .2s"
          }} className="btn-gold">Demo gratuita</a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "100px 24px 60px", position: "relative",
        background: "radial-gradient(ellipse at 20% 50%, rgba(212,175,120,0.07) 0%, transparent 55%), radial-gradient(ellipse at 80% 20%, rgba(180,140,90,0.04) 0%, transparent 45%), radial-gradient(ellipse at 50% 100%, rgba(212,175,120,0.03) 0%, transparent 50%)"
      }}>
        {/* Subtle grain overlay */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundSize: "128px" }} />

        <div style={{ maxWidth: 1100, width: "100%", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap", justifyContent: "center", position: "relative", zIndex: 1 }}>
          {/* Left - Copy */}
          <div style={{ flex: "1 1 480px", minWidth: 320, animation: "fi .8s ease" }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: "#c9a96e", marginBottom: 20 }}>
              AI Concierge per Hotel Boutique
            </div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: "clamp(44px, 5.5vw, 68px)",
              fontWeight: 600, lineHeight: 1.05, color: "#f7f0e6", marginBottom: 28, letterSpacing: -1.5
            }}>
              Il vostro concierge<br/>
              <span style={{ color: "#c9a96e" }}>che non dorme mai.</span>
            </h1>
            <p style={{ fontSize: 17, lineHeight: 1.7, color: "#9a9080", marginBottom: 32, maxWidth: 520 }}>
              Marcel accoglie i vostri ospiti 24 ore su 24, risponde alle loro domande, 
              prenota ristoranti e servizi, e genera revenue extra — tutto in modo 
              automatico e con la voce del vostro hotel.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 40 }}>
              <a href="#contatti" style={{
                padding: "15px 36px", borderRadius: 50, fontWeight: 600, fontSize: 14, letterSpacing: 0.5,
                background: "linear-gradient(135deg, #c9a96e, #b8924a)", color: "#0c0b09",
                textDecoration: "none", boxShadow: "0 4px 28px rgba(201,169,110,0.3)"
              }} className="btn-gold">Richiedi demo gratuita</a>
              <a href="#demo" className="btn-outline" style={{
                padding: "15px 36px", borderRadius: 50, fontWeight: 600, fontSize: 14, letterSpacing: 0.5,
                border: "1px solid rgba(201,169,110,0.35)", color: "#c9a96e",
                textDecoration: "none"
              }}>Guarda come funziona ↓</a>
            </div>
            <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
              {[["Nessun codice richiesto","🚀"],["Setup in 48 ore","⚡"],["ROI dal primo mese","📈"]].map(([t,i]) =>
                <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#7a7268" }}>
                  <span style={{ fontSize: 16 }}>{i}</span>{t}
                </div>
              )}
            </div>
          </div>

          {/* Right - Chat Demo */}
          <div style={{ flex: "0 1 440px", animation: "fi .8s ease .2s both" }}>
            <ChatDemo />
          </div>
        </div>
      </div>

      {/* ─── STATS BAR ─── */}
      <div style={{ borderTop: "1px solid rgba(212,175,120,0.08)", borderBottom: "1px solid rgba(212,175,120,0.08)", background: "rgba(255,255,255,0.012)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", padding: "40px 24px" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "12px 24px", minWidth: 140 }}>
              <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 44, fontWeight: 700, color: "#c9a96e", letterSpacing: -1 }}>{s.value}</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#e8e0d0", marginTop: 4 }}>{s.label}</div>
              <div style={{ fontSize: 11, color: "#6a6a5a" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── IL PROBLEMA ─── */}
      <Section>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>Il problema</SectionLabel>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 38, fontWeight: 600, lineHeight: 1.25, color: "#f5ede0", letterSpacing: -0.5, marginBottom: 24 }}>
            I vostri ospiti hanno domande.<br/>A qualsiasi ora.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "#8a8278", marginBottom: 32 }}>
            Il 68% delle richieste degli ospiti arriva fuori dall'orario di reception. 
            Ogni domanda senza risposta è una prenotazione persa, un servizio non venduto, 
            una recensione a 4 stelle invece che 5. Il vostro staff non può essere 
            ovunque — Marcel sì.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            {[
              { icon: "🌙", title: "Di notte", text: "Il 42% delle richieste arriva tra le 22:00 e le 8:00" },
              { icon: "🌍", title: "In altre lingue", text: "Ospiti internazionali bloccati dalla barriera linguistica" },
              { icon: "💸", title: "Revenue perso", text: "Servizi extra non proposti = soldi lasciati sul tavolo" },
            ].map((b, i) => (
              <div key={i} style={{
                padding: 28, borderRadius: 20, background: "rgba(255,255,255,0.018)",
                border: "1px solid rgba(255,255,255,0.055)", textAlign: "left"
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{b.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e8e0d0", marginBottom: 6 }}>{b.title}</div>
                <div style={{ fontSize: 13, color: "#7a7268", lineHeight: 1.6 }}>{b.text}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ─── COME FUNZIONA ─── */}
      <Section id="come-funziona" style={{ background: "rgba(255,255,255,0.012)" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Come funziona</SectionLabel>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 38, fontWeight: 600, color: "#f5ede0", letterSpacing: -0.5 }}>
            Tre passi. Nessun codice.
          </h2>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {[
            { step: "01", title: "Ci raccontate il vostro hotel", desc: "Ci inviate le informazioni: servizi, tariffe, ristoranti partner, FAQ, attrazioni. Noi configuriamo Marcel con la vostra identità e il vostro tono di voce.", time: "Giorno 1" },
            { step: "02", title: "Testiamo insieme", desc: "Vi mostriamo Marcel in azione. Affinate le risposte, aggiungete dettagli, approvate il comportamento. Tutto via una dashboard semplice.", time: "Giorno 2-3" },
            { step: "03", title: "Online in 48 ore", desc: "Installiamo il widget sul vostro sito con una riga di codice. Da quel momento, Marcel è operativo e ogni conversazione è tracciata nella vostra dashboard.", time: "Giorno 3-4" },
          ].map((s, i) => (
            <div key={i} style={{
              flex: "1 1 300px", maxWidth: 340, padding: 32, borderRadius: 20,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(212,175,120,0.08)",
              position: "relative", overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", top: -10, right: -5,
                fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 80, fontWeight: 900,
                color: "rgba(212,175,120,0.06)", lineHeight: 1
              }}>{s.step}</div>
              <div style={{ position: "relative" }}>
                <div style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 2, color: "#c9a96e", marginBottom: 12 }}>{s.time}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 20, fontWeight: 700, color: "#f0e6d6", marginBottom: 12 }}>{s.title}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: "#7a7268" }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── FEATURES ─── */}
      <Section id="demo">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Funzionalità</SectionLabel>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 38, fontWeight: 600, color: "#f5ede0", letterSpacing: -0.5 }}>
            Tutto quello che serve. Niente di superfluo.
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {FEATURES.map((f, i) => (
            <div key={i} style={{
              padding: "28px 24px", borderRadius: 20,
              background: "rgba(255,255,255,0.018)", border: "1px solid rgba(255,255,255,0.06)"
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(212,175,120,0.2)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)"}>
              <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f0e6d6", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, lineHeight: 1.7, color: "#7a7268" }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── TESTIMONIALS ─── */}
      <Section style={{ background: "rgba(255,255,255,0.012)" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Cosa dicono i nostri clienti</SectionLabel>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 38, fontWeight: 600, color: "#f5ede0", letterSpacing: -0.5 }}>
            Risultati reali, non promesse.
          </h2>
        </div>
        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", justifyContent: "center" }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              flex: "1 1 300px", maxWidth: 340, padding: 28, borderRadius: 16,
              background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)"
            }}>
              <div style={{ color: "#c9a96e", fontSize: 16, marginBottom: 12, letterSpacing: 2 }}>{"★".repeat(t.stars)}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#a0a090", marginBottom: 16, fontStyle: "italic" }}>"{t.text}"</p>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#e8e0d0" }}>{t.name}</div>
                <div style={{ fontSize: 12, color: "#6a6a5a" }}>{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── PRICING ─── */}
      <Section id="prezzi">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <SectionLabel>Prezzi trasparenti</SectionLabel>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 38, fontWeight: 600, color: "#f5ede0", letterSpacing: -0.5 }}>
            Investimento chiaro. Zero sorprese.
          </h2>
          <p style={{ fontSize: 14, color: "#7a7268", marginTop: 12 }}>Setup una tantum + canone mensile. Disdici quando vuoi.</p>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
          {PRICING.map((p, i) => (
            <div key={i} style={{
              flex: "1 1 280px", maxWidth: 340, padding: 32, borderRadius: 20,
              background: p.popular ? "linear-gradient(180deg, rgba(212,175,120,0.08), rgba(212,175,120,0.02))" : "rgba(255,255,255,0.02)",
              border: p.popular ? "1px solid rgba(212,175,120,0.3)" : "1px solid rgba(255,255,255,0.06)",
              position: "relative"
            }}>
              {p.popular && <div style={{
                position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)",
                background: "linear-gradient(135deg, #d4af78, #b8924a)", color: "#0f0f0e",
                fontSize: 10, fontWeight: 800, padding: "4px 16px", borderRadius: 20, textTransform: "uppercase", letterSpacing: 1
              }}>Più scelto</div>}
              <div style={{ fontSize: 13, fontWeight: 700, color: "#c9a96e", marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: "#6a6a5a", marginBottom: 20 }}>{p.desc}</div>
              <div style={{ marginBottom: 4 }}>
                <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 40, fontWeight: 800, color: "#f0e6d6" }}>€{p.monthly}</span>
                <span style={{ fontSize: 14, color: "#6a6a5a" }}>/mese</span>
              </div>
              <div style={{ fontSize: 12, color: "#7a7268", marginBottom: 24 }}>
                Setup: <b style={{ color: "#c9a96e" }}>€{p.setup}</b> una tantum
              </div>
              <div style={{ marginBottom: 24 }}>
                {p.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 10, fontSize: 13, color: "#a0a090" }}>
                    <span style={{ color: "#c9a96e", fontSize: 14, lineHeight: 1, marginTop: 1 }}>✓</span>
                    <span>{f}</span>
                  </div>
                ))}
              </div>
              <a href="#contatti" style={{
                display: "block", textAlign: "center", padding: "13px 24px", borderRadius: 50, fontWeight: 600, fontSize: 13, letterSpacing: 0.5,
                background: p.popular ? "linear-gradient(135deg, #d4af78, #b8924a)" : "transparent",
                color: p.popular ? "#0f0f0e" : "#c9a96e",
                border: p.popular ? "none" : "1px solid rgba(212,175,120,0.3)",
                textDecoration: "none", transition: "transform .2s"
              }}>{p.cta}</a>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 32, fontSize: 13, color: "#6a6a5a" }}>
          💡 Il costo medio di un receptionist notturno è €2.800/mese. Marcel parte da €89.
        </div>
      </Section>

      {/* ─── ROI CALCULATOR ─── */}
      <Section style={{ background: "rgba(255,255,255,0.012)" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>Il calcolo che conta</SectionLabel>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 34, fontWeight: 600, color: "#f5ede0", letterSpacing: -0.5, marginBottom: 32 }}>
            Quanto vi costa NON avere Marcel?
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, textAlign: "left" }}>
            {[
              { label: "Richieste notturne perse/mese", value: "~120", icon: "🌙" },
              { label: "Conversione media in prenotazione", value: "8%", icon: "📊" },
              { label: "Prenotazioni perse/mese", value: "~10", icon: "❌" },
              { label: "Valore medio prenotazione", value: "€180", icon: "💰" },
              { label: "Revenue perso/mese", value: "€1.800", icon: "📉" },
              { label: "Costo Marcel Business/mese", value: "€149", icon: "✅" },
            ].map((r, i) => (
              <div key={i} style={{
                padding: "16px", borderRadius: 12,
                background: i === 5 ? "rgba(212,175,120,0.08)" : "rgba(255,255,255,0.02)",
                border: i === 5 ? "1px solid rgba(212,175,120,0.2)" : "1px solid rgba(255,255,255,0.05)"
              }}>
                <div style={{ fontSize: 16, marginBottom: 6 }}>{r.icon}</div>
                <div style={{ fontSize: 11, color: "#6a6a5a", marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 700, color: i === 5 ? "#c9a96e" : "#f0e6d6" }}>{r.value}</div>
              </div>
            ))}
          </div>
          <div style={{
            marginTop: 24, padding: "20px 28px", borderRadius: 14,
            background: "linear-gradient(135deg, rgba(212,175,120,0.1), rgba(212,175,120,0.03))",
            border: "1px solid rgba(212,175,120,0.2)"
          }}>
            <div style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 24, fontWeight: 700, color: "#c9a96e" }}>ROI: 12x</div>
            <div style={{ fontSize: 13, color: "#8a8278", marginTop: 4 }}>Per ogni euro investito in Marcel, ne recuperate dodici in revenue e risparmio operativo.</div>
          </div>
        </div>
      </Section>

      {/* ─── CTA / CONTACT ─── */}
      <Section id="contatti">
        <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
          <SectionLabel>Iniziamo</SectionLabel>
          <h2 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 38, fontWeight: 600, color: "#f5ede0", letterSpacing: -0.5, marginBottom: 12 }}>
            Provate Marcel nel vostro hotel.
          </h2>
          <p style={{ fontSize: 15, color: "#7a7268", marginBottom: 36 }}>
            Configuriamo una demo gratuita personalizzata con i dati del vostro hotel. 
            Nessun impegno, nessuna carta di credito.
          </p>

          {!formSent ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { ph: "Nome e cognome *", type: "text", key: "name" },
                { ph: "Nome dell'hotel *", type: "text", key: "hotel" },
                { ph: "Email *", type: "email", key: "email" },
                { ph: "Telefono (opzionale)", type: "tel", key: "phone" },
              ].map((f, i) => (
                <input key={i} type={f.type} placeholder={f.ph} value={fields[f.key]}
                  onChange={e => setFields(prev => ({ ...prev, [f.key]: e.target.value }))}
                  style={{
                    padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
                    background: "rgba(255,255,255,0.03)", color: "#e8e0d0", fontSize: 14,
                    fontFamily: "'DM Sans',sans-serif", outline: "none", transition: "border-color .2s"
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(212,175,120,0.3)"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              ))}
              <select value={fields.rooms} onChange={e => setFields(prev => ({ ...prev, rooms: e.target.value }))} style={{
                padding: "14px 18px", borderRadius: 10, border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.03)", color: "#8a8278", fontSize: 14,
                fontFamily: "'DM Sans',sans-serif", outline: "none"
              }}>
                <option value="">Quante camere ha il vostro hotel?</option>
                <option>Meno di 20</option>
                <option>20-50</option>
                <option>50-100</option>
                <option>Più di 100</option>
              </select>
              <button onClick={handleSubmit} disabled={formLoading} style={{
                padding: "16px 32px", borderRadius: 50, border: "none", cursor: formLoading ? "wait" : "pointer",
                background: "linear-gradient(135deg, #c9a96e, #b8924a)", color: "#0c0b09",
                fontSize: 14, fontWeight: 700, letterSpacing: 0.5, fontFamily: "'DM Sans',sans-serif",
                boxShadow: "0 4px 28px rgba(201,169,110,0.3)", transition: "all .25s",
                opacity: formLoading ? 0.7 : 1
              }}>{formLoading ? "Invio in corso..." : "Richiedi la demo gratuita →"}</button>
              <div style={{ fontSize: 11, color: "#5a5a4a", marginTop: 4 }}>
                🔒 I vostri dati sono al sicuro. Niente spam, promesso.
              </div>
            </div>
          ) : (
            <div style={{
              padding: 40, borderRadius: 20, background: "rgba(212,175,120,0.05)",
              border: "1px solid rgba(212,175,120,0.15)"
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
              <h3 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 24, fontWeight: 700, color: "#c9a96e", marginBottom: 8 }}>Grazie!</h3>
              <p style={{ fontSize: 15, color: "#8a8278" }}>Vi contatteremo entro 24 ore con una demo personalizzata per il vostro hotel.</p>
            </div>
          )}
        </div>
      </Section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        padding: "48px 24px", borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(0,0,0,0.5)"
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{
                width: 24, height: 24, borderRadius: 6, background: "linear-gradient(135deg, #d4af78, #b8924a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 12, fontWeight: 800, color: "#0f0f0e"
              }}>M</div>
              <span style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 15, fontWeight: 700, color: "#f0e6d6" }}>Marcel Concierge</span>
            </div>
            <div style={{ fontSize: 11, color: "#5a5a4a" }}>AI concierge per l'ospitalità italiana.</div>
          </div>
          <div style={{ display: "flex", gap: 20, fontSize: 12, color: "#5a5a4a" }}>
            <span>info@marcelconcierge.com</span>
            <span>Milano, Italia</span>
            <span>P.IVA IT00000000000</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
