'use client'

import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Buongiorno. Sono Marcel, il suo concierge personale. Come posso assisterla oggi?' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || loading) return

    setInput('')
    const newMessages = [...messages, { role: 'user', content: messageText }]
    setMessages(newMessages)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      })

      if (!res.ok) throw new Error('API Error')

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage = ''

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break
        assistantMessage += decoder.decode(value)
        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = { role: 'assistant', content: assistantMessage }
          return updated
        })
      }
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Mi scusi, si e verificato un errore. Riprovi.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <span className="font-serif text-background font-bold text-lg">M</span>
            </div>
            <span className="font-serif text-xl text-cream">Marcel</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#servizi" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Servizi</a>
            <a href="#come-funziona" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Come Funziona</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Pricing</a>
          </nav>
          <button
            onClick={() => setChatOpen(true)}
            className="px-5 py-2 rounded-full bg-gold text-background font-medium text-sm hover:bg-gold-light transition-colors"
          >
            Parla con Marcel
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold text-sm tracking-widest uppercase mb-4">Concierge AI di Lusso</p>
          <h1 className="font-serif text-5xl md:text-7xl text-cream leading-tight mb-6">
            L&apos;eccellenza dell&apos;ospitalita,<br />reinventata
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            Marcel e il concierge virtuale che trasforma ogni richiesta dei tuoi ospiti in un&apos;esperienza indimenticabile. Disponibile 24/7, multilingue, impeccabile.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setChatOpen(true)}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-dark text-background font-semibold hover:opacity-90 transition-opacity"
            >
              Prova Marcel Ora
            </button>
            <a
              href="#come-funziona"
              className="px-8 py-4 rounded-full border border-border text-foreground font-medium hover:bg-card transition-colors"
            >
              Scopri di Piu
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="servizi" className="py-20 px-6 bg-card">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-widest uppercase mb-4">Servizi</p>
            <h2 className="font-serif text-4xl md:text-5xl text-cream">Tutto cio che serve ai tuoi ospiti</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: '🔑', title: 'Check-in Express', desc: 'Procedura digitale senza attese alla reception' },
              { icon: '🍽️', title: 'Prenotazioni Ristoranti', desc: 'I migliori tavoli nei ristoranti piu esclusivi' },
              { icon: '🚗', title: 'Transfer & Auto', desc: 'Auto con autista disponibili in ogni momento' },
              { icon: '🎭', title: 'Eventi & Spettacoli', desc: 'Biglietti per teatro, concerti ed esperienze VIP' },
              { icon: '💆', title: 'Wellness & Spa', desc: 'Prenotazioni spa e trattamenti personalizzati' },
              { icon: '✈️', title: 'Viaggi & Escursioni', desc: 'Tour privati e esperienze su misura' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-2xl bg-background border border-border hover:border-gold/30 transition-colors">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-serif text-xl text-cream mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="come-funziona" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-widest uppercase mb-4">Come Funziona</p>
            <h2 className="font-serif text-4xl md:text-5xl text-cream">Semplice, elegante, efficace</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Integrazione', desc: 'Marcel si integra con il tuo sistema gestionale in poche ore' },
              { step: '02', title: 'Personalizzazione', desc: 'Configuriamo le risposte secondo il tono del tuo brand' },
              { step: '03', title: 'Attivazione', desc: 'I tuoi ospiti iniziano a ricevere assistenza immediata' },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center mx-auto mb-6">
                  <span className="font-serif text-gold text-xl">{item.step}</span>
                </div>
                <h3 className="font-serif text-2xl text-cream mb-3">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-gold text-sm tracking-widest uppercase mb-4">Pricing</p>
            <h2 className="font-serif text-4xl md:text-5xl text-cream">Piani su misura per ogni esigenza</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Essenziale', price: '€299', period: '/mese', features: ['Fino a 50 camere', 'Chat 24/7', 'Supporto email'] },
              { name: 'Business', price: '€599', period: '/mese', features: ['Fino a 150 camere', 'Chat + Voice', 'Integrazioni PMS', 'Analytics'], featured: true },
              { name: 'Enterprise', price: 'Su misura', period: '', features: ['Camere illimitate', 'White label', 'API dedicate', 'Account manager'] },
            ].map((plan, i) => (
              <div
                key={i}
                className={`p-8 rounded-2xl border ${plan.featured ? 'bg-gold/5 border-gold' : 'bg-background border-border'}`}
              >
                <h3 className="font-serif text-2xl text-cream mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="font-serif text-4xl text-gold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="text-muted-foreground text-sm flex items-center gap-2">
                      <span className="text-gold">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-medium text-sm transition-colors ${
                    plan.featured
                      ? 'bg-gold text-background hover:bg-gold-light'
                      : 'border border-border text-foreground hover:bg-card'
                  }`}
                >
                  {plan.price === 'Su misura' ? 'Contattaci' : 'Inizia Ora'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
              <span className="font-serif text-background font-bold">M</span>
            </div>
            <span className="font-serif text-lg text-cream">Marcel Concierge</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Termini</a>
            <a href="#" className="hover:text-foreground transition-colors">Contatti</a>
          </div>
          <p className="text-muted text-sm">© 2026 Marcel Concierge. Tutti i diritti riservati.</p>
        </div>
      </footer>

      {/* Floating Chat Button */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center shadow-lg hover:scale-105 transition-transform z-50"
        >
          <span className="font-serif text-background font-bold text-xl">M</span>
        </button>
      )}

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
          <div className="w-full max-w-md bg-card rounded-2xl border border-border shadow-2xl overflow-hidden">
            {/* Chat Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                  <span className="font-serif text-background font-bold">M</span>
                </div>
                <div>
                  <p className="font-serif text-cream">Marcel</p>
                  <p className="text-xs text-muted-foreground">Risposta istantanea</p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="w-8 h-8 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm ${
                      msg.role === 'user'
                        ? 'bg-gold text-background rounded-br-sm'
                        : 'bg-background border border-border text-foreground rounded-bl-sm'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-background border border-border px-4 py-2 rounded-2xl rounded-bl-sm">
                    <span className="text-muted-foreground text-sm">Marcel sta scrivendo...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
              {['Check-in?', 'Ristorante?', 'Spa?'].map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="px-3 py-1 rounded-full bg-background border border-border text-xs text-muted-foreground hover:border-gold/50 hover:text-foreground transition-colors whitespace-nowrap"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
              className="p-4 border-t border-border flex gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Scrivi un messaggio..."
                className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-gold/50"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="w-10 h-10 rounded-full bg-gold text-background flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ↑
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
