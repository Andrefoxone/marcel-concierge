# Marcel Concierge — Guida Deploy su Cloudflare Pages

## Prerequisiti

Prima di iniziare ti servono 3 cose:

1. **Account GitHub** — se non ce l'hai: vai su https://github.com e registrati (gratuito)
2. **Account Cloudflare** — vai su https://dash.cloudflare.com/sign-up (gratuito)
3. **Git installato sul tuo Mac/PC** — apri il terminale e scrivi `git --version`. Se non c'è, su Mac installa con `xcode-select --install`, su Windows scarica da https://git-scm.com

---

## STEP 1 — Crea il repository su GitHub

1. Vai su https://github.com/new
2. Nome repository: `marcel-concierge`
3. Lascia **Public** (oppure Private, non cambia per Cloudflare)
4. **NON** spuntare "Add a README" (il progetto ha già tutto)
5. Clicca **Create repository**
6. GitHub ti mostra una pagina con delle istruzioni — tienila aperta, ti servirà tra un attimo

---

## STEP 2 — Scarica il progetto e pushalo su GitHub

Apri il **Terminale** (Mac) o **Command Prompt / PowerShell** (Windows).

```bash
# 1. Vai nella cartella dove hai scaricato/scompattato il progetto
cd ~/Downloads/marcel-concierge

# 2. Inizializza git
git init

# 3. Aggiungi tutti i file
git add .

# 4. Primo commit
git commit -m "Marcel Concierge v1 - landing page"

# 5. Collega al tuo repo GitHub (sostituisci TUO-USERNAME)
git remote add origin https://github.com/TUO-USERNAME/marcel-concierge.git

# 6. Rinomina il branch in main
git branch -M main

# 7. Pusha tutto
git push -u origin main
```

Se ti chiede username/password di GitHub, usa il tuo username e come password un **Personal Access Token** (non la password di GitHub). Per crearlo:
- Vai su https://github.com/settings/tokens
- "Generate new token (classic)"
- Spunta `repo`
- Genera e copialo — usalo come password

---

## STEP 3 — Collega Cloudflare Pages a GitHub

1. Vai su https://dash.cloudflare.com
2. Nel menu a sinistra clicca **Workers & Pages**
3. Clicca **Create** (bottone blu)
4. Seleziona il tab **Pages**
5. Clicca **Connect to Git**
6. Autorizza Cloudflare ad accedere al tuo GitHub (ti chiederà il permesso)
7. Seleziona il repository `marcel-concierge`
8. Clicca **Begin setup**

---

## STEP 4 — Configura il build

Nella schermata di configurazione:

| Campo | Valore |
|---|---|
| **Project name** | `marcel-concierge` |
| **Production branch** | `main` |
| **Framework preset** | Seleziona **None** |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |

Poi clicca **Save and Deploy**.

Cloudflare farà il build automaticamente. Ci vogliono 1-2 minuti. Quando vedi ✅ **Success**, il sito è online!

Ti darà un URL tipo: `marcel-concierge.pages.dev`

---

## STEP 5 — Collega il dominio marcelconcierge.com

1. Nella dashboard di Cloudflare Pages, vai nel tuo progetto `marcel-concierge`
2. Vai nel tab **Custom domains**
3. Clicca **Set up a custom domain**
4. Scrivi `marcelconcierge.com`
5. Clicca **Continue**

Adesso dipende da dove hai comprato il dominio:

**Se il dominio è già su Cloudflare (DNS gestito da Cloudflare):**
- Cloudflare aggiunge automaticamente il record CNAME
- Clicca **Activate domain**
- Aspetta 1-2 minuti → fatto!

**Se il dominio è su un altro registrar (es. GoDaddy, Namecheap, Aruba):**

Hai due opzioni:

**Opzione A — Trasferisci i DNS a Cloudflare (consigliato):**
1. In Cloudflare dashboard principale, clicca **Add a site**
2. Scrivi `marcelconcierge.com`
3. Scegli il piano **Free**
4. Cloudflare ti dà 2 nameserver (tipo `anna.ns.cloudflare.com` e `bob.ns.cloudflare.com`)
5. Vai nel pannello del tuo registrar → sezione DNS/Nameserver
6. Sostituisci i nameserver attuali con quelli di Cloudflare
7. Aspetta propagazione (da 10 minuti a 24 ore, di solito 30 minuti)
8. Torna su Cloudflare Pages → Custom domains → ripeti il collegamento

**Opzione B — Aggiungi solo un record CNAME:**
1. Vai nel pannello DNS del tuo registrar
2. Aggiungi un record:
   - Tipo: `CNAME`
   - Nome: `@` (oppure `marcelconcierge.com`)
   - Valore: `marcel-concierge.pages.dev`
3. Aggiungi anche per www:
   - Tipo: `CNAME`
   - Nome: `www`
   - Valore: `marcel-concierge.pages.dev`

L'SSL (https) è automatico e gratuito con Cloudflare.

---

## STEP 6 — Aggiornamenti futuri

Ogni volta che vuoi aggiornare il sito:

```bash
# Modifica i file, poi:
git add .
git commit -m "Descrizione della modifica"
git push
```

Cloudflare rileva automaticamente il push e fa il re-deploy in 1-2 minuti. Zero intervento manuale.

---

## STEP 7 — Collegare il form contatti (per ricevere i lead)

Il form nella landing è un mockup. Per ricevere davvero le email dei lead, hai due opzioni semplici:

**Opzione A — Formspree (più veloce, gratuito fino a 50 invii/mese):**
1. Vai su https://formspree.io e registrati
2. Crea un nuovo form, ti dà un endpoint tipo `https://formspree.io/f/xAbCdEfG`
3. Nel codice (`src/App.jsx`), sostituisci il bottone `onClick` con un vero form submit verso quell'endpoint

**Opzione B — Resend (più pro, gratuito fino a 100 email/giorno):**
1. Vai su https://resend.com e registrati
2. Crea un Cloudflare Worker che riceve il form e manda l'email via Resend API
3. Più setup ma più controllo

Per partire subito, usa Formspree — ci metti 5 minuti.

---

## Struttura del progetto

```
marcel-concierge/
├── index.html          ← Entry point HTML con meta tag SEO
├── package.json        ← Dipendenze (React + Vite)
├── vite.config.js      ← Configurazione Vite
├── public/
│   ├── favicon.svg     ← Icona del sito
│   ├── _headers        ← Header di sicurezza Cloudflare
│   └── _redirects      ← Redirect SPA per Cloudflare
└── src/
    ├── main.jsx        ← Entry point React
    └── App.jsx         ← Tutta la landing page
```

---

## Checklist finale

- [ ] Repository GitHub creato e codice pushato
- [ ] Cloudflare Pages collegato a GitHub
- [ ] Build riuscita (vedi il sito su .pages.dev)
- [ ] Dominio personalizzato collegato
- [ ] SSL attivo (https funziona)
- [ ] Form contatti collegato (Formspree o Resend)
- [ ] Test su mobile (il sito è responsive)
- [ ] Condividi il link e inizia l'outreach!
