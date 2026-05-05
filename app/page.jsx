"use client"

import { useState, useEffect, useRef } from "react"

const C = {
  bg: "#0B0A0F",
  gold: "#C9A86C",
  goldDark: "#A3824A",
  cream: "#F5F0E8",
  muted: "#6B6B6B",
  border: "#1E1E24",
}

export default function Marcel() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { text: "Buongiorno. Sono Marcel, il suo concierge personale. Come posso assisterla oggi?", isUser: false }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const chatRef = useRef(null)

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight)
  }, [messages])

  const send = async (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return
    setInput("")
    const newMsgs = [...messages, { text: msg, isUser: true }]
    setMessages(newMsgs)
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMsgs.map(m => ({ role: m.isUser ? "user" : "assistant", content: m.text })) })
      })
      if (!res.ok) throw new Error()
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let full = ""
      setMessages(prev => [...prev, { text: "", isUser: false }])
      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        full += decoder.decode(value)
        setMessages(prev => {
          const copy = [...prev]
          copy[copy.length - 1] = { text: full, isUser: false }
          return copy
        })
      }
    } catch {
      setMessages(prev => [...prev, { text: "Mi scusi, si e verificato un errore.", isUser: false }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ backgroundColor: C.bg, color: C.cream, minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
      {/* HEADER */}
      <header style={{ padding: "20px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: C.bg }}>M</div>
          <span style={{ fontSize: 20, fontWeight: 600 }}>Marcel</span>
        </div>
        <button onClick={() => setChatOpen(true)} style={{ padding: "12px 24px", borderRadius: 30, background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, border: "none", color: C.bg, fontWeight: 600, cursor: "pointer" }}>
          Parla con Marcel
        </button>
      </header>

      {/* HERO */}
      <section style={{ padding: "100px 40px", textAlign: "center", maxWidth: 900, margin: "0 auto" }}>
        <p style={{ color: C.gold, fontSize: 14, letterSpacing: 2, marginBottom: 20, textTransform: "uppercase" }}>Il Concierge AI per Hotel di Lusso</p>
        <h1 style={{ fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 300, marginBottom: 24, lineHeight: 1.2 }}>
          Ogni desiderio,<br /><span style={{ color: C.gold }}>un comando</span>
        </h1>
        <p style={{ color: C.muted, fontSize: 18, maxWidth: 600, margin: "0 auto 40px" }}>
          Marcel trasforma ogni richiesta in realta. Assistenza personalizzata 24/7 per i tuoi ospiti.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setChatOpen(true)} style={{ padding: "16px 32px", borderRadius: 30, background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, border: "none", color: C.bg, fontWeight: 600, cursor: "pointer", fontSize: 15 }}>
            Inizia Ora
          </button>
          <a href="/demo" style={{ padding: "16px 32px", borderRadius: 30, border: `1px solid ${C.goldDark}`, color: C.gold, textDecoration: "none", fontWeight: 500, fontSize: 15 }}>
            Richiedi Demo
          </a>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "80px 40px", maxWidth: 1200, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, marginBottom: 60 }}>Servizi Esclusivi</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            { icon: "🍽️", title: "Ristoranti", desc: "Prenotazioni nei migliori locali" },
            { icon: "🎭", title: "Esperienze", desc: "Eventi e attrazioni esclusive" },
            { icon: "🚗", title: "Transfer", desc: "Auto con autista h24" },
            { icon: "💆", title: "Spa & Wellness", desc: "Trattamenti personalizzati" },
            { icon: "🛎️", title: "Room Service", desc: "Servizio in camera 24/7" },
            { icon: "✈️", title: "Viaggi", desc: "Organizzazione completa" },
          ].map((f, i) => (
            <div key={i} style={{ padding: 32, borderRadius: 16, border: `1px solid ${C.border}`, background: "rgba(255,255,255,0.02)" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, marginBottom: 8, color: C.cream }}>{f.title}</h3>
              <p style={{ color: C.muted, fontSize: 14 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section style={{ padding: "80px 40px", maxWidth: 1000, margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, marginBottom: 60 }}>Piani</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {[
            { name: "Essential", price: "€299", desc: "Per boutique hotel", features: ["Fino a 50 camere", "Chat AI 24/7", "Risposta istantanea", "Supporto email"] },
            { name: "Premium", price: "€599", desc: "Per hotel 4 stelle", features: ["Fino a 150 camere", "Tutto in Essential", "Dashboard analytics", "Supporto prioritario"], featured: true },
            { name: "Enterprise", price: "Su misura", desc: "Per catene e resort", features: ["Camere illimitate", "Tutto in Premium", "Integrazioni custom", "Account manager dedicato"] },
          ].map((p, i) => (
            <div key={i} style={{ padding: 32, borderRadius: 16, border: `1px solid ${p.featured ? C.gold : C.border}`, background: p.featured ? "rgba(201,168,108,0.1)" : "rgba(255,255,255,0.02)" }}>
              <h3 style={{ fontSize: 20, marginBottom: 4 }}>{p.name}</h3>
              <p style={{ color: C.muted, fontSize: 13, marginBottom: 16 }}>{p.desc}</p>
              <p style={{ fontSize: 36, fontWeight: 600, color: C.gold, marginBottom: 24 }}>{p.price}<span style={{ fontSize: 14, fontWeight: 400, color: C.muted }}>{p.price !== "Su misura" && "/mese"}</span></p>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 24 }}>
                {p.features.map((f, j) => <li key={j} style={{ padding: "8px 0", color: C.cream, fontSize: 14 }}>✓ {f}</li>)}
              </ul>
              <a href="/demo" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 30, background: p.featured ? `linear-gradient(135deg, ${C.gold}, ${C.goldDark})` : "transparent", border: p.featured ? "none" : `1px solid ${C.goldDark}`, color: p.featured ? C.bg : C.gold, textDecoration: "none", fontWeight: 600, fontSize: 14 }}>
                {p.price === "Su misura" ? "Contattaci" : "Scegli " + p.name}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "40px", borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <div style={{ display: "flex", gap: 24, justifyContent: "center", marginBottom: 20 }}>
          <a href="/privacy" style={{ color: C.muted, fontSize: 13, textDecoration: "none" }}>Privacy</a>
          <a href="/terms" style={{ color: C.muted, fontSize: 13, textDecoration: "none" }}>Termini</a>
          <a href="/demo" style={{ color: C.muted, fontSize: 13, textDecoration: "none" }}>Demo</a>
        </div>
        <p style={{ color: C.muted, fontSize: 12 }}>© 2026 Marcel Concierge. Tutti i diritti riservati.</p>
      </footer>

      {/* FLOATING BUTTON */}
      {!chatOpen && (
        <button onClick={() => setChatOpen(true)} style={{ position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, border: "none", cursor: "pointer", boxShadow: "0 4px 20px rgba(201,168,108,0.4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: C.bg, fontSize: 20, zIndex: 999 }}>
          M
        </button>
      )}

      {/* CHAT POPUP */}
      {chatOpen && (
        <div style={{ position: "fixed", bottom: 24, right: 24, width: 380, height: 520, borderRadius: 20, background: C.bg, border: `1px solid ${C.border}`, display: "flex", flexDirection: "column", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", zIndex: 1000 }}>
          {/* Header */}
          <div style={{ padding: 16, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, color: C.bg }}>M</div>
              <div>
                <div style={{ fontWeight: 600 }}>Marcel</div>
                <div style={{ fontSize: 12, color: C.muted }}>Online</div>
              </div>
            </div>
            <button onClick={() => setChatOpen(false)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 24, lineHeight: 1 }}>×</button>
          </div>

          {/* Quick Actions */}
          <div style={{ padding: "12px 16px", display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["Prenota ristorante", "Info spa", "Transfer"].map((q, i) => (
              <button key={i} onClick={() => send(q)} style={{ padding: "8px 14px", borderRadius: 20, background: "rgba(201,168,108,0.15)", border: `1px solid ${C.goldDark}`, color: C.gold, fontSize: 12, cursor: "pointer" }}>
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: 16 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.isUser ? "flex-end" : "flex-start", marginBottom: 12 }}>
                <div style={{ maxWidth: "80%", padding: "12px 16px", borderRadius: 16, background: m.isUser ? `linear-gradient(135deg, ${C.gold}, ${C.goldDark})` : "rgba(255,255,255,0.08)", color: m.isUser ? C.bg : C.cream, fontSize: 14 }}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", gap: 4, padding: 12 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold, animation: "pulse 1s infinite" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold, animation: "pulse 1s infinite 0.2s" }} />
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold, animation: "pulse 1s infinite 0.4s" }} />
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={(e) => { e.preventDefault(); send(); }} style={{ padding: 16, borderTop: `1px solid ${C.border}`, display: "flex", gap: 10 }}>
            <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Scrivi un messaggio..." style={{ flex: 1, padding: "12px 16px", borderRadius: 30, background: "rgba(255,255,255,0.05)", border: `1px solid ${C.border}`, color: C.cream, outline: "none" }} />
            <button type="submit" disabled={loading} style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: C.bg, fontWeight: 700, fontSize: 18 }}>→</button>
          </form>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}
