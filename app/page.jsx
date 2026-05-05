"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, Clock, Globe, Shield, ChevronDown, Menu, X, ArrowRight, Star, MapPin, Plane, UtensilsCrossed, Hotel, Gem } from "lucide-react"

const FONT_LINK = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"

// ─── Inject fonts ───
if (typeof document !== "undefined") {
  if (!document.querySelector('link[href*="Cormorant"]')) {
    const link = document.createElement("link")
    link.rel = "stylesheet"
    link.href = FONT_LINK
    document.head.appendChild(link)
  }
}

const serif = "'Cormorant Garamond', 'Georgia', serif"
const sans = "'DM Sans', 'Helvetica Neue', sans-serif"

// ─── Color palette ───
const C = {
  bg: "#0B0A0F",
  bgCard: "#13121A",
  bgChat: "#1A1924",
  bgInput: "#0F0E15",
  gold: "#C9A96E",
  goldLight: "#E2D1A2",
  goldDark: "#8B7340",
  cream: "#F5F0E8",
  creamMuted: "#A09B8E",
  accent: "#D4AF37",
  white: "#FEFCF7",
  muted: "#6B6780",
  border: "#2A2838",
  borderLight: "#3A3848",
}

// ─── Animated dots ───
function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block w-1.5 h-1.5 rounded-full"
          style={{
            backgroundColor: C.gold,
            animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes pulse {
          0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
          40% { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  )
}

// ─── Chat Message ───
function ChatMessage({ message, isUser, isNew }) {
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
      style={{
        animation: isNew ? "fadeSlideUp 0.4s ease-out forwards" : "none",
        opacity: isNew ? 0 : 1,
      }}
    >
      {!isUser && (
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
          }}
        >
          <span style={{ fontFamily: serif, fontSize: 14, color: C.bg, fontWeight: 600 }}>M</span>
        </div>
      )}
      <div
        className="max-w-[75%] rounded-2xl px-4 py-3"
        style={{
          backgroundColor: isUser ? C.gold : C.bgChat,
          color: isUser ? C.bg : C.cream,
          fontFamily: sans,
          fontSize: 14,
          lineHeight: 1.6,
          border: isUser ? "none" : `1px solid ${C.border}`,
          borderTopRightRadius: isUser ? 4 : 16,
          borderTopLeftRadius: isUser ? 16 : 4,
        }}
      >
        {message}
      </div>
    </div>
  )
}

// ─── Service Card ───
function ServiceCard({ icon: Icon, title, description, delay }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="p-6 rounded-xl cursor-pointer transition-all duration-500"
      style={{
        backgroundColor: hovered ? C.bgChat : "transparent",
        border: `1px solid ${hovered ? C.goldDark : C.border}`,
        animation: `fadeSlideUp 0.6s ease-out ${delay}s forwards`,
        opacity: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
        style={{
          background: hovered
            ? `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`
            : `${C.bgCard}`,
          border: `1px solid ${hovered ? "transparent" : C.border}`,
          transition: "all 0.5s ease",
        }}
      >
        <Icon size={18} style={{ color: hovered ? C.bg : C.gold, transition: "color 0.5s" }} />
      </div>
      <h3 style={{ fontFamily: serif, color: C.cream, fontSize: 20, fontWeight: 500, marginBottom: 8 }}>
        {title}
      </h3>
      <p style={{ fontFamily: sans, color: C.creamMuted, fontSize: 13, lineHeight: 1.6 }}>
        {description}
      </p>
    </div>
  )
}

// ─── Testimonial ───
function Testimonial({ quote, author, role }) {
  return (
    <div
      className="p-6 rounded-xl"
      style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}` }}
    >
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} size={12} fill={C.gold} style={{ color: C.gold }} />
        ))}
      </div>
      <p style={{ fontFamily: serif, fontStyle: "italic", color: C.cream, fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>
        "{quote}"
      </p>
      <div>
        <p style={{ fontFamily: sans, color: C.gold, fontSize: 13, fontWeight: 500 }}>{author}</p>
        <p style={{ fontFamily: sans, color: C.muted, fontSize: 12 }}>{role}</p>
      </div>
    </div>
  )
}

// ─── Stat ───
function Stat({ value, label }) {
  return (
    <div className="text-center">
      <p style={{ fontFamily: serif, color: C.gold, fontSize: 40, fontWeight: 300, letterSpacing: -1 }}>
        {value}
      </p>
      <p style={{ fontFamily: sans, color: C.creamMuted, fontSize: 12, textTransform: "uppercase", letterSpacing: 2 }}>
        {label}
      </p>
    </div>
  )
}

// ════════════════════════════════════════
//  MAIN COMPONENT
// ════════════════════════════════════════
export default function MarcelConcierge() {
  const [mounted, setMounted] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Buongiorno. Sono Marcel, il suo concierge personale. Come posso assisterla oggi?", isUser: false, isNew: false },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    console.log('[v0] Component mounted')
  }, [])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, typing])
  
  if (!mounted) {
    return <div style={{ backgroundColor: "#0B0A0F", minHeight: "100vh" }} />
  }

  const handleSend = async (customMessage) => {
    const userMsg = (customMessage || input).trim()
    if (!userMsg) return
    setInput("")
    const newMessages = [...messages, { text: userMsg, isUser: true, isNew: true }]
    setMessages(newMessages)
    setTyping(true)
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.isUser ? 'user' : 'assistant',
            content: m.text,
          })),
        }),
      })
      
      if (!response.ok) throw new Error('API Error')
      
      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''
      
      setTyping(false)
      setMessages((prev) => [...prev, { text: '', isUser: false, isNew: true }])
      
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        fullText += chunk
        setMessages((prev) => {
          const updated = [...prev]
          updated[updated.length - 1] = { text: fullText, isUser: false, isNew: true }
          return updated
        })
      }
    } catch (err) {
      console.error(err)
      setTyping(false)
      setMessages((prev) => [...prev, { text: 'Mi scusi, si è verificato un errore. Riprovi tra poco.', isUser: false, isNew: true }])
    }
  }

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", fontFamily: sans, color: C.cream }}>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        ::selection {
          background: ${C.gold};
          color: ${C.bg};
        }
        * { scrollbar-width: thin; scrollbar-color: ${C.border} transparent; }
      `}</style>

      {/* ─── NAVBAR ─── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
        style={{
          background: `linear-gradient(180deg, ${C.bg}ee 0%, ${C.bg}00 100%)`,
          backdropFilter: "blur(20px)",
        }}
      >
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})` }}
            >
              <span style={{ fontFamily: serif, fontSize: 16, color: C.bg, fontWeight: 700 }}>M</span>
            </div>
            <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 500, color: C.cream, letterSpacing: 1 }}>
              Marcel
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Servizi", "Come funziona", "Testimonianze", "Pricing"].map((item) => (
              <a
                key={item}
                href="#"
                className="transition-colors duration-300"
                style={{ fontFamily: sans, fontSize: 13, color: C.creamMuted, textDecoration: "none", letterSpacing: 0.5 }}
                onMouseEnter={(e) => (e.target.style.color = C.gold)}
                onMouseLeave={(e) => (e.target.style.color = C.creamMuted)}
              >
                {item}
              </a>
            ))}
            <button
              className="px-5 py-2 rounded-full transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
                color: C.bg,
                fontFamily: sans,
                fontSize: 13,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => { console.log('[v0] Parla con Marcel clicked'); setChatOpen(true); }}
            >
              Parla con Marcel
            </button>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} style={{ color: C.cream }} /> : <Menu size={20} style={{ color: C.cream }} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4" style={{ animation: "fadeIn 0.3s ease" }}>
            {["Servizi", "Come funziona", "Testimonianze", "Pricing"].map((item) => (
              <a key={item} href="#" style={{ fontFamily: sans, fontSize: 14, color: C.creamMuted, textDecoration: "none" }}>
                {item}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* ─── HERO ─── */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        {/* Ambient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full opacity-[0.07] blur-[120px] pointer-events-none"
          style={{ background: `radial-gradient(ellipse, ${C.gold}, transparent 70%)` }}
        />
        <div
          className="absolute top-20 right-10 w-1 h-1 rounded-full opacity-40"
          style={{ backgroundColor: C.gold, animation: "float 4s ease-in-out infinite", boxShadow: `0 0 20px ${C.gold}40` }}
        />
        <div
          className="absolute top-40 left-20 w-0.5 h-0.5 rounded-full opacity-30"
          style={{ backgroundColor: C.goldLight, animation: "float 5s ease-in-out 1s infinite", boxShadow: `0 0 15px ${C.goldLight}30` }}
        />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{
              border: `1px solid ${C.goldDark}40`,
              backgroundColor: `${C.gold}08`,
              animation: "fadeSlideUp 0.5s ease-out forwards",
            }}
          >
            <Sparkles size={12} style={{ color: C.gold }} />
            <span style={{ fontFamily: sans, fontSize: 11, color: C.gold, letterSpacing: 2, textTransform: "uppercase" }}>
              AI-Powered Luxury Concierge
            </span>
          </div>

          <h1
            className="mb-6"
            style={{
              fontFamily: serif,
              fontSize: "clamp(38px, 7vw, 72px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: C.cream,
              animation: "fadeSlideUp 0.6s ease-out 0.15s forwards",
              opacity: 0,
            }}
          >
            Il suo mondo,{" "}
            <span
              style={{
                background: `linear-gradient(90deg, ${C.gold}, ${C.goldLight}, ${C.gold})`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer 4s linear infinite",
                fontStyle: "italic",
              }}
            >
              orchestrato
            </span>
          </h1>

          <p
            className="max-w-xl mx-auto mb-10"
            style={{
              fontFamily: sans,
              fontSize: 16,
              color: C.creamMuted,
              lineHeight: 1.7,
              animation: "fadeSlideUp 0.6s ease-out 0.3s forwards",
              opacity: 0,
            }}
          >
            Marcel è il concierge che anticipa ogni desiderio. Viaggi, ristoranti, esperienze esclusive — tutto curato con l'intelligenza artificiale e il tocco umano.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fadeSlideUp 0.6s ease-out 0.45s forwards", opacity: 0 }}
          >
            <button
              className="group px-8 py-3.5 rounded-full flex items-center justify-center gap-2 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
                color: C.bg,
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => { console.log('[v0] Inizia ora clicked'); setChatOpen(true); }}
            >
              Inizia ora
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <a
              href="/demo"
              className="px-8 py-3.5 rounded-full transition-all duration-300 inline-block text-center"
              style={{
                backgroundColor: "transparent",
                border: `1px solid ${C.goldDark}`,
                color: C.gold,
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              Richiedi Demo
            </a>
          </div>
        </div>

        {/* ── Stats ribbon ── */}
        <div
          className="max-w-3xl mx-auto mt-20 grid grid-cols-3 gap-6 py-8 px-6 rounded-2xl"
          style={{
            backgroundColor: C.bgCard,
            border: `1px solid ${C.border}`,
            animation: "fadeSlideUp 0.6s ease-out 0.6s forwards",
            opacity: 0,
          }}
        >
          <Stat value="24/7" label="Disponibilità" />
          <Stat value="12k+" label="Richieste gestite" />
          <Stat value="98%" label="Soddisfazione" />
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ fontFamily: sans, fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
              Servizi
            </p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, color: C.cream }}>
              Ogni desiderio, una soluzione
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <ServiceCard icon={Plane} title="Travel Design" description="Itinerari su misura, voli privati, trasferimenti esclusivi. Ogni viaggio diventa un'esperienza irripetibile." delay={0.1} />
            <ServiceCard icon={UtensilsCrossed} title="Fine Dining" description="Prenotazioni nei ristoranti più esclusivi. Accesso prioritario, menu personalizzati, chef privati." delay={0.2} />
            <ServiceCard icon={Hotel} title="Hospitality" description="Le suite migliori, upgrade garantiti, welcome amenities. Il lusso che si adatta a lei." delay={0.3} />
            <ServiceCard icon={Gem} title="Lifestyle" description="Shopping privato, eventi esclusivi, wellness premium. Ogni momento della giornata, curato." delay={0.4} />
            <ServiceCard icon={Globe} title="Global Access" description="Una rete mondiale di contatti e partner. Ovunque lei sia, Marcel è già lì." delay={0.5} />
            <ServiceCard icon={Shield} title="Privacy Totale" description="Discrezione assoluta. I suoi dati protetti con crittografia end-to-end e protocolli riservati." delay={0.6} />
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 px-6" style={{ backgroundColor: C.bgCard }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ fontFamily: sans, fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
              Come funziona
            </p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, color: C.cream }}>
              Tre passi. Nessun limite.
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { n: "01", title: "Parli con Marcel", desc: "Scriva ciò che desidera in chat. In qualsiasi lingua, a qualsiasi ora." },
              { n: "02", title: "Marcel orchestra", desc: "La nostra AI analizza, seleziona e coordina le migliori opzioni in tempo reale." },
              { n: "03", title: "Lei vive", desc: "Riceve proposte curate, conferme istantanee e un'esperienza senza pensieri." },
            ].map((step) => (
              <div key={step.n} className="text-center">
                <p style={{ fontFamily: serif, fontSize: 48, fontWeight: 300, color: `${C.gold}30`, marginBottom: 16 }}>
                  {step.n}
                </p>
                <h3 style={{ fontFamily: serif, fontSize: 22, fontWeight: 500, color: C.cream, marginBottom: 8 }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: sans, fontSize: 13, color: C.creamMuted, lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ fontFamily: sans, fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
              Testimonianze
            </p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, color: C.cream }}>
              Chi ci ha scelto, non torna indietro
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            <Testimonial
              quote="Marcel mi ha trovato un tavolo da Mirazur in 20 minuti. Era tutto esaurito da mesi. Non chiedo come fa, apprezzo che lo faccia."
              author="Giulia V."
              role="Imprenditrice, Milano"
            />
            <Testimonial
              quote="Ho delegato l'intero viaggio a Tokyo. Volo, hotel, ristoranti, autista. Perfetto in ogni dettaglio. Non potrei più farne a meno."
              author="Marco R."
              role="CEO, Roma"
            />
            <Testimonial
              quote="La discrezione è ciò che mi ha conquistato. Marcel gestisce tutto senza che io debba spiegare nulla due volte."
              author="Alessandra D."
              role="Avvocato, Torino"
            />
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section className="py-24 px-6" style={{ backgroundColor: C.bgCard }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p style={{ fontFamily: sans, fontSize: 11, color: C.gold, letterSpacing: 3, textTransform: "uppercase", marginBottom: 12 }}>
              Piani
            </p>
            <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 300, color: C.cream }}>
              Scelga il suo livello
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                name: "Classique",
                price: "49",
                desc: "Per chi inizia a delegare",
                features: ["10 richieste / mese", "Risposta entro 2h", "Prenotazioni ristoranti", "Supporto via chat"],
                featured: false,
              },
              {
                name: "Privilège",
                price: "149",
                desc: "Il preferito dai nostri clienti",
                features: ["Richieste illimitate", "Risposta istantanea", "Travel design completo", "Concierge dedicato", "Accesso eventi esclusivi"],
                featured: true,
              },
              {
                name: "Maison",
                price: "Su misura",
                desc: "Per esigenze uniche",
                features: ["Tutto di Privilège", "Risposta immediata 24/7", "Rete partner globale", "Account manager privato", "Servizi su misura"],
                featured: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className="p-8 rounded-2xl relative"
                style={{
                  backgroundColor: plan.featured ? C.bgChat : "transparent",
                  border: `1px solid ${plan.featured ? C.gold : C.border}`,
                  transform: plan.featured ? "scale(1.03)" : "none",
                }}
              >
                {plan.featured && (
                  <div
                    className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
                      fontFamily: sans,
                      fontSize: 10,
                      fontWeight: 600,
                      color: C.bg,
                      letterSpacing: 1,
                      textTransform: "uppercase",
                    }}
                  >
                    Più scelto
                  </div>
                )}
                <h3 style={{ fontFamily: serif, fontSize: 24, fontWeight: 500, color: C.cream, marginBottom: 4 }}>
                  {plan.name}
                </h3>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, marginBottom: 20 }}>{plan.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  {plan.price !== "Su misura" && (
                    <span style={{ fontFamily: sans, fontSize: 14, color: C.gold }}>€</span>
                  )}
                  <span style={{ fontFamily: serif, fontSize: plan.price === "Su misura" ? 28 : 44, fontWeight: 300, color: C.cream }}>
                    {plan.price}
                  </span>
                  {plan.price !== "Su misura" && (
                    <span style={{ fontFamily: sans, fontSize: 13, color: C.muted }}>/mese</span>
                  )}
                </div>
                <div className="flex flex-col gap-3 mb-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ backgroundColor: C.gold }} />
                      <span style={{ fontFamily: sans, fontSize: 13, color: C.creamMuted }}>{f}</span>
                    </div>
                  ))}
                </div>
                <a
                  href={plan.price === "Su misura" ? "/demo" : "#"}
                  className="w-full py-3 rounded-full transition-all duration-300 block text-center"
                  style={{
                    background: plan.featured ? `linear-gradient(135deg, ${C.gold}, ${C.goldDark})` : "transparent",
                    color: plan.featured ? C.bg : C.gold,
                    border: plan.featured ? "none" : `1px solid ${C.goldDark}`,
                    fontFamily: sans,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                    textDecoration: "none",
                  }}
                >
                  {plan.price === "Su misura" ? "Contattaci" : "Scegli " + plan.name}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 px-6 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${C.gold}, transparent 60%)` }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <h2 style={{ fontFamily: serif, fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 300, color: C.cream, marginBottom: 16 }}>
            Pronto a vivere senza compromessi?
          </h2>
          <p style={{ fontFamily: sans, fontSize: 15, color: C.creamMuted, lineHeight: 1.7, marginBottom: 32 }}>
            Marcel è pronto ad assisterla. Ogni giorno, ogni richiesta, ogni dettaglio.
          </p>
          <button
            className="group px-10 py-4 rounded-full flex items-center gap-2 mx-auto transition-all duration-300"
            style={{
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
              color: C.bg,
              fontFamily: sans,
              fontSize: 15,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setChatOpen(true)}
          >
            Parla con Marcel
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="py-12 px-6" style={{ borderTop: `1px solid ${C.border}` }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})` }}
                >
                  <span style={{ fontFamily: serif, fontSize: 12, color: C.bg, fontWeight: 700 }}>M</span>
                </div>
                <span style={{ fontFamily: serif, fontSize: 16, color: C.cream }}>Marcel Concierge</span>
              </div>
              <p style={{ fontFamily: sans, fontSize: 13, color: C.muted, maxWidth: 280 }}>
                Il concierge AI che trasforma ogni desiderio in realta.
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.gold, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                  Link
                </p>
                <div className="flex flex-col gap-2">
                  <a href="#" style={{ fontFamily: sans, fontSize: 13, color: C.creamMuted, textDecoration: "none" }}>Servizi</a>
                  <a href="#" style={{ fontFamily: sans, fontSize: 13, color: C.creamMuted, textDecoration: "none" }}>Pricing</a>
                  <a href="/demo" style={{ fontFamily: sans, fontSize: 13, color: C.creamMuted, textDecoration: "none" }}>Richiedi Demo</a>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.gold, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                  Legale
                </p>
                <div className="flex flex-col gap-2">
                  <a href="/privacy" style={{ fontFamily: sans, fontSize: 13, color: C.creamMuted, textDecoration: "none" }}>Privacy Policy</a>
                  <a href="/terms" style={{ fontFamily: sans, fontSize: 13, color: C.creamMuted, textDecoration: "none" }}>Termini di Servizio</a>
                </div>
              </div>
              <div>
                <p style={{ fontFamily: sans, fontSize: 12, color: C.gold, letterSpacing: 1, textTransform: "uppercase", marginBottom: 12 }}>
                  Contatti
                </p>
                <div className="flex flex-col gap-2">
                  <span style={{ fontFamily: sans, fontSize: 13, color: C.creamMuted }}>info@marcelconcierge.com</span>
                  <span style={{ fontFamily: sans, fontSize: 13, color: C.creamMuted }}>+39 02 1234567</span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-6" style={{ borderTop: `1px solid ${C.border}` }}>
            <p style={{ fontFamily: sans, fontSize: 12, color: C.muted, textAlign: "center" }}>
              © 2026 Marcel Concierge S.r.l. - P.IVA 00000000000 - Tutti i diritti riservati.
            </p>
          </div>
        </div>
      </footer>

      {/* ═══════════════════════════════════
           CHAT PANEL
         ══════════════════════════════���════ */}
      {chatOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:justify-end p-0 sm:p-6"
          style={{ animation: "fadeIn 0.3s ease" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0"
            style={{ backgroundColor: `${C.bg}90`, backdropFilter: "blur(8px)" }}
            onClick={() => setChatOpen(false)}
          />
          {/* Chat window */}
          <div
            className="relative w-full sm:w-[420px] h-full sm:h-[620px] sm:rounded-2xl flex flex-col overflow-hidden"
            style={{
              backgroundColor: C.bgCard,
              border: `1px solid ${C.border}`,
              boxShadow: `0 25px 80px ${C.bg}cc, 0 0 60px ${C.gold}08`,
              animation: "fadeSlideUp 0.4s ease-out",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: `1px solid ${C.border}` }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})` }}
                  >
                    <span style={{ fontFamily: serif, fontSize: 18, color: C.bg, fontWeight: 600 }}>M</span>
                  </div>
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full"
                    style={{ backgroundColor: "#4ADE80", border: `2px solid ${C.bgCard}` }}
                  />
                </div>
                <div>
                  <p style={{ fontFamily: serif, fontSize: 16, fontWeight: 500, color: C.cream }}>Marcel</p>
                  <div className="flex items-center gap-1.5">
                    <Clock size={10} style={{ color: C.gold }} />
                    <span style={{ fontFamily: sans, fontSize: 11, color: C.creamMuted }}>Online — risponde subito</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200"
                style={{ backgroundColor: C.bgChat, border: "none", cursor: "pointer" }}
              >
                <X size={14} style={{ color: C.creamMuted }} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-5">
              {messages.map((m, i) => (
                <ChatMessage key={i} message={m.text} isUser={m.isUser} isNew={m.isNew} />
              ))}
              {typing && <TypingDots />}
              <div ref={chatEndRef} />
            </div>

            {/* Quick actions */}
            {messages.length <= 1 && (
              <div className="px-5 pb-2 flex flex-wrap gap-2">
                {["Prenota un ristorante", "Organizza un viaggio", "Evento esclusivo"].map((q) => (
                  <button
                    key={q}
                    className="px-3 py-1.5 rounded-full transition-all duration-200"
                    style={{
                      backgroundColor: "transparent",
                      border: `1px solid ${C.border}`,
                      color: C.creamMuted,
                      fontFamily: sans,
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                    onClick={() => handleSend(q)}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = C.goldDark
                      e.target.style.color = C.gold
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = C.border
                      e.target.style.color = C.creamMuted
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-4" style={{ borderTop: `1px solid ${C.border}` }}>
              <div
                className="flex items-center gap-2 rounded-xl px-4 py-2.5"
                style={{ backgroundColor: C.bgInput, border: `1px solid ${C.border}` }}
              >
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Scriva qui la sua richiesta..."
                  className="flex-1 outline-none bg-transparent"
                  style={{
                    fontFamily: sans,
                    fontSize: 14,
                    color: C.cream,
                    border: "none",
                  }}
                />
                <button
                  onClick={handleSend}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: input.trim()
                      ? `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`
                      : C.bgChat,
                    border: "none",
                    cursor: input.trim() ? "pointer" : "default",
                  }}
                >
                  <Send size={14} style={{ color: input.trim() ? C.bg : C.muted }} />
                </button>
              </div>
              <p className="text-center mt-2" style={{ fontFamily: sans, fontSize: 10, color: C.muted }}>
                Powered by Marcel AI — Privacy garantita
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ─── FLOATING CHAT BUTTON ─── */}
      {!chatOpen && (
        <button
          onClick={() => { console.log('[v0] Floating button clicked'); setChatOpen(true); }}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
            boxShadow: `0 8px 32px ${C.gold}40`,
            border: "none",
            cursor: "pointer",
            animation: "fadeSlideUp 0.5s ease-out 1s forwards",
            opacity: 0,
          }}
        >
          <span style={{ fontFamily: serif, fontSize: 22, color: C.bg, fontWeight: 700 }}>M</span>
        </button>
      )}
    </div>
  )
}
