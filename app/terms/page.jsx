"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const serif = "'Cormorant Garamond', 'Georgia', serif"
const sans = "'DM Sans', 'Helvetica Neue', sans-serif"

const C = {
  bg: "#0B0A0F",
  gold: "#C9A96E",
  goldDark: "#8B7340",
  cream: "#F5F0E8",
  creamMuted: "#A09B8E",
  border: "#2A2838",
}

export default function TermsOfService() {
  return (
    <div style={{ backgroundColor: C.bg, minHeight: "100vh", fontFamily: sans, color: C.cream }}>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 mb-12 transition-colors"
          style={{ color: C.gold, textDecoration: "none", fontSize: 14 }}
        >
          <ArrowLeft size={16} />
          Torna alla home
        </Link>

        <h1 style={{ fontFamily: serif, fontSize: 42, fontWeight: 300, marginBottom: 8 }}>
          Termini di Servizio
        </h1>
        <p style={{ color: C.creamMuted, fontSize: 14, marginBottom: 48 }}>
          Ultimo aggiornamento: Maggio 2026
        </p>

        <div className="space-y-8" style={{ color: C.creamMuted, fontSize: 15, lineHeight: 1.8 }}>
          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              1. Accettazione dei Termini
            </h2>
            <p>
              Utilizzando Marcel Concierge, l'utente accetta integralmente i presenti Termini di Servizio. 
              Se non si accettano questi termini, si prega di non utilizzare il servizio.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              2. Descrizione del Servizio
            </h2>
            <p>
              Marcel Concierge e un servizio di concierge virtuale alimentato da intelligenza artificiale 
              che assiste gli utenti nella prenotazione di ristoranti, viaggi, esperienze e altri servizi 
              di lifestyle. Il servizio e disponibile 24 ore su 24, 7 giorni su 7.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              3. Registrazione e Account
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>L'utente deve fornire informazioni accurate e aggiornate</li>
              <li>E responsabile della sicurezza delle proprie credenziali</li>
              <li>Deve avere almeno 18 anni per utilizzare il servizio</li>
              <li>Un account non puo essere ceduto o condiviso con terzi</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              4. Abbonamenti e Pagamenti
            </h2>
            <p className="mb-4">
              I piani di abbonamento si rinnovano automaticamente alla scadenza. L'utente puo disdire 
              in qualsiasi momento prima del rinnovo. I pagamenti sono elaborati in modo sicuro tramite 
              fornitori certificati (es. Stripe).
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Classique: 49/mese - 10 richieste mensili</li>
              <li>Privilege: 149/mese - richieste illimitate</li>
              <li>Maison: prezzo personalizzato su richiesta</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              5. Uso Consentito
            </h2>
            <p className="mb-4">L'utente si impegna a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Utilizzare il servizio solo per scopi leciti</li>
              <li>Non tentare di manipolare o abusare del sistema AI</li>
              <li>Non utilizzare il servizio per attivita illegali o fraudolente</li>
              <li>Non condividere contenuti offensivi o inappropriati</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              6. Limitazioni del Servizio
            </h2>
            <p>
              Marcel Concierge si impegna a fornire il miglior servizio possibile, ma non garantisce 
              la disponibilita di specifici servizi di terze parti (ristoranti, hotel, voli). 
              Le prenotazioni sono soggette a disponibilita e conferma da parte dei fornitori.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              7. Proprieta Intellettuale
            </h2>
            <p>
              Tutti i contenuti, marchi, loghi e tecnologie di Marcel Concierge sono di proprieta 
              esclusiva della societa. E vietata qualsiasi riproduzione o utilizzo non autorizzato.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              8. Limitazione di Responsabilita
            </h2>
            <p>
              Marcel Concierge non e responsabile per danni indiretti, incidentali o consequenziali 
              derivanti dall'uso del servizio. La responsabilita massima e limitata all'importo 
              pagato dall'utente negli ultimi 12 mesi.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              9. Modifiche ai Termini
            </h2>
            <p>
              Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. 
              Le modifiche saranno comunicate via email e l'uso continuato del servizio 
              costituira accettazione dei nuovi termini.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              10. Legge Applicabile
            </h2>
            <p>
              I presenti Termini sono regolati dalla legge italiana. Per qualsiasi controversia 
              sara competente il Foro di Milano.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              11. Contatti
            </h2>
            <p>
              Per domande sui Termini di Servizio:<br />
              Email: legal@marcelconcierge.com<br />
              Marcel Concierge S.r.l. - Via Example 1, 20100 Milano (MI)
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
