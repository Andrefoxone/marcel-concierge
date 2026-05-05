"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send, CheckCircle, Hotel, Users, Globe } from "lucide-react"

const serif = "'Cormorant Garamond', 'Georgia', serif"
const sans = "'DM Sans', 'Helvetica Neue', sans-serif"

const C = {
  bg: "#0B0A0F",
  bgCard: "#13121A",
  gold: "#C9A96E",
  goldLight: "#E2D1A2",
  goldDark: "#8B7340",
  cream: "#F5F0E8",
  creamMuted: "#A09B8E",
  border: "#2A2838",
  muted: "#6B6780",
}

export default function DemoRequest() {
  const [formData, setFormData] = useState({
    hotelName: "",
    contactName: "",
    email: "",
    phone: "",
    rooms: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    // Simulate API call - in production this would send to a real endpoint
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setLoading(false)
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  if (submitted) {
    return (
      <div style={{ backgroundColor: C.bg, minHeight: "100vh", fontFamily: sans, color: C.cream }}>
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <div 
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8"
            style={{ background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})` }}
          >
            <CheckCircle size={40} style={{ color: C.bg }} />
          </div>
          <h1 style={{ fontFamily: serif, fontSize: 36, fontWeight: 300, marginBottom: 16 }}>
            Richiesta Ricevuta
          </h1>
          <p style={{ color: C.creamMuted, fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
            Grazie per il suo interesse in Marcel Concierge. Il nostro team la contattera 
            entro 24 ore per organizzare una demo personalizzata.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full transition-all"
            style={{ 
              background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
              color: C.bg,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14
            }}
          >
            <ArrowLeft size={16} />
            Torna alla Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", fontFamily: sans, color: C.cream }}>
      <div className="max-w-5xl mx-auto px-6 py-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mb-12 transition-colors"
          style={{ color: C.gold, textDecoration: "none", fontSize: 14 }}
        >
          <ArrowLeft size={16} />
          Torna alla home
        </Link>

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left: Info */}
          <div>
            <h1 style={{ fontFamily: serif, fontSize: 42, fontWeight: 300, marginBottom: 16 }}>
              Richiedi una Demo
            </h1>
            <p style={{ color: C.creamMuted, fontSize: 16, lineHeight: 1.7, marginBottom: 40 }}>
              Scopra come Marcel puo trasformare l'esperienza dei suoi ospiti. 
              Compili il form e il nostro team la contattera per una demo personalizzata.
            </p>

            <div className="space-y-6">
              {[
                { icon: Hotel, title: "Per il suo Hotel", desc: "Marcel si integra perfettamente con le sue operazioni esistenti" },
                { icon: Users, title: "Ospiti Soddisfatti", desc: "Assistenza 24/7 in qualsiasi lingua per ogni richiesta" },
                { icon: Globe, title: "Senza Limiti", desc: "Prenotazioni, esperienze, transfer - tutto in un'unica chat" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}` }}
                  >
                    <Icon size={18} style={{ color: C.gold }} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 500, marginBottom: 4 }}>{title}</h3>
                    <p style={{ color: C.creamMuted, fontSize: 14 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div 
            className="p-8 rounded-2xl"
            style={{ backgroundColor: C.bgCard, border: `1px solid ${C.border}` }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label style={{ display: "block", fontSize: 13, color: C.creamMuted, marginBottom: 8 }}>
                  Nome Hotel / Struttura *
                </label>
                <input
                  type="text"
                  name="hotelName"
                  value={formData.hotelName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                  style={{ 
                    backgroundColor: C.bg, 
                    border: `1px solid ${C.border}`,
                    color: C.cream,
                    fontSize: 14
                  }}
                  placeholder="Es. Grand Hotel Milano"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, color: C.creamMuted, marginBottom: 8 }}>
                  Nome e Cognome *
                </label>
                <input
                  type="text"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                  style={{ 
                    backgroundColor: C.bg, 
                    border: `1px solid ${C.border}`,
                    color: C.cream,
                    fontSize: 14
                  }}
                  placeholder="Es. Mario Rossi"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label style={{ display: "block", fontSize: 13, color: C.creamMuted, marginBottom: 8 }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                    style={{ 
                      backgroundColor: C.bg, 
                      border: `1px solid ${C.border}`,
                      color: C.cream,
                      fontSize: 14
                    }}
                    placeholder="email@hotel.com"
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, color: C.creamMuted, marginBottom: 8 }}>
                    Telefono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                    style={{ 
                      backgroundColor: C.bg, 
                      border: `1px solid ${C.border}`,
                      color: C.cream,
                      fontSize: 14
                    }}
                    placeholder="+39 02 1234567"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, color: C.creamMuted, marginBottom: 8 }}>
                  Numero di Camere
                </label>
                <select
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all"
                  style={{ 
                    backgroundColor: C.bg, 
                    border: `1px solid ${C.border}`,
                    color: C.cream,
                    fontSize: 14
                  }}
                >
                  <option value="">Seleziona...</option>
                  <option value="1-20">1-20 camere</option>
                  <option value="21-50">21-50 camere</option>
                  <option value="51-100">51-100 camere</option>
                  <option value="101-200">101-200 camere</option>
                  <option value="200+">200+ camere</option>
                </select>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 13, color: C.creamMuted, marginBottom: 8 }}>
                  Messaggio (opzionale)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg outline-none transition-all resize-none"
                  style={{ 
                    backgroundColor: C.bg, 
                    border: `1px solid ${C.border}`,
                    color: C.cream,
                    fontSize: 14
                  }}
                  placeholder="Ci racconti le sue esigenze specifiche..."
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full flex items-center justify-center gap-2 transition-all"
                style={{ 
                  background: `linear-gradient(135deg, ${C.gold}, ${C.goldDark})`,
                  color: C.bg,
                  fontWeight: 600,
                  fontSize: 14,
                  border: "none",
                  cursor: loading ? "wait" : "pointer",
                  opacity: loading ? 0.7 : 1
                }}
              >
                {loading ? "Invio in corso..." : (
                  <>
                    Richiedi Demo
                    <Send size={16} />
                  </>
                )}
              </button>

              <p style={{ fontSize: 12, color: C.muted, textAlign: "center" }}>
                Inviando questo form accetta la nostra{" "}
                <Link href="/privacy" style={{ color: C.gold, textDecoration: "underline" }}>Privacy Policy</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
