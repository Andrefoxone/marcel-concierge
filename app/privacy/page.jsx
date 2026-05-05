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

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p style={{ color: C.creamMuted, fontSize: 14, marginBottom: 48 }}>
          Ultimo aggiornamento: Maggio 2026
        </p>

        <div className="space-y-8" style={{ color: C.creamMuted, fontSize: 15, lineHeight: 1.8 }}>
          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              1. Titolare del Trattamento
            </h2>
            <p>
              Marcel Concierge S.r.l. con sede in Milano, Via Example 1, 20100 Milano (MI), 
              P.IVA 00000000000, email: privacy@marcelconcierge.com
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              2. Dati Raccolti
            </h2>
            <p className="mb-4">Raccogliamo i seguenti dati personali:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Dati identificativi (nome, cognome, email, telefono)</li>
              <li>Dati di navigazione e utilizzo del servizio</li>
              <li>Contenuto delle conversazioni con Marcel AI</li>
              <li>Preferenze e richieste di servizio</li>
              <li>Dati di pagamento (elaborati da terze parti certificate)</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              3. Finalita del Trattamento
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Erogazione del servizio di concierge</li>
              <li>Miglioramento dell'esperienza utente e personalizzazione</li>
              <li>Comunicazioni relative al servizio</li>
              <li>Adempimenti legali e contrattuali</li>
              <li>Marketing e promozioni (previo consenso)</li>
            </ul>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              4. Base Giuridica
            </h2>
            <p>
              Il trattamento dei dati si basa su: esecuzione del contratto, consenso dell'interessato, 
              legittimo interesse del titolare, adempimento di obblighi legali.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              5. Conservazione dei Dati
            </h2>
            <p>
              I dati personali sono conservati per il tempo necessario al conseguimento delle finalita 
              per cui sono stati raccolti e comunque non oltre i termini di legge. Le conversazioni 
              con Marcel AI sono conservate per 24 mesi per migliorare il servizio.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              6. Diritti dell'Interessato
            </h2>
            <p className="mb-4">Hai il diritto di:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accedere ai tuoi dati personali</li>
              <li>Richiedere la rettifica o la cancellazione</li>
              <li>Limitare il trattamento</li>
              <li>Opporti al trattamento</li>
              <li>Richiedere la portabilita dei dati</li>
              <li>Revocare il consenso in qualsiasi momento</li>
            </ul>
            <p className="mt-4">
              Per esercitare questi diritti, contattaci a: privacy@marcelconcierge.com
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              7. Sicurezza
            </h2>
            <p>
              Adottiamo misure di sicurezza tecniche e organizzative per proteggere i dati personali, 
              inclusa la crittografia end-to-end delle comunicazioni e l'archiviazione sicura dei dati.
            </p>
          </section>

          <section>
            <h2 style={{ fontFamily: serif, color: C.cream, fontSize: 24, fontWeight: 500, marginBottom: 16 }}>
              8. Contatti
            </h2>
            <p>
              Per qualsiasi domanda relativa alla privacy, contattaci a:<br />
              Email: privacy@marcelconcierge.com<br />
              PEC: marcelconcierge@pec.it
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
