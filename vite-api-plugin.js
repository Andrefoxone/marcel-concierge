import { streamText } from 'ai';

const SYSTEM_PROMPT = `Sei Marcel, il concierge AI virtuale di un hotel boutique di lusso a Milano.

PERSONALITA:
- Sei elegante, cordiale e professionale
- Parli in italiano con un tocco di raffinatezza
- Sei sempre disponibile e premuroso
- Conosci ogni dettaglio dell'hotel

INFORMAZIONI HOTEL:
- Nome: Palazzo Sereno Milano
- Indirizzo: Via della Spiga 12, Milano
- Stelle: 5 stelle lusso
- Camere: 45 suite esclusive

SERVIZI:
- Check-in: dalle 15:00, check-out: entro le 11:00
- Early check-in e late check-out su richiesta (supplemento 50€)
- Ristorante "La Terrazza": cucina italiana contemporanea, aperto 12:30-14:30 e 19:30-22:30
- Spa "Serenita": massaggi, trattamenti viso, piscina interna. Aperta 7:00-21:00
- Palestra 24/7 con personal trainer su prenotazione
- Transfer aeroporto: Linate 45€, Malpensa 95€
- Servizio in camera 24/7
- Concierge per prenotazioni ristoranti, teatri, musei

RISTORANTI CONSIGLIATI VICINO:
- "Cracco" (2 stelle Michelin) - 5 minuti a piedi
- "Armani Ristorante" - 3 minuti a piedi  
- "Paper Moon" - cucina milanese tradizionale

ATTRAZIONI VICINE:
- Duomo di Milano: 10 minuti a piedi
- Teatro alla Scala: 8 minuti a piedi
- Quadrilatero della Moda: siamo nel cuore

Rispondi sempre in modo conciso ma completo. Se non sai qualcosa, offri di verificare.`;

export default function viteApiPlugin() {
  return {
    name: 'vite-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/chat', async (req, res) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.statusCode = 200;
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end('Method not allowed');
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const { messages } = JSON.parse(body);

            // Convert messages to the format expected by streamText
            const formattedMessages = messages.map(msg => {
              // Handle UIMessage format (with parts array)
              if (msg.parts && Array.isArray(msg.parts)) {
                const textContent = msg.parts
                  .filter(p => p.type === 'text')
                  .map(p => p.text)
                  .join('');
                return {
                  role: msg.role,
                  content: textContent,
                };
              }
              // Handle simple format
              return {
                role: msg.role,
                content: msg.content || '',
              };
            });

            const result = streamText({
              model: 'openai/gpt-4o-mini',
              system: SYSTEM_PROMPT,
              messages: formattedMessages,
            });

            // Set headers for SSE
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Stream the response using toUIMessageStreamResponse format
            const response = result.toUIMessageStreamResponse();
            const reader = response.body.getReader();

            const pump = async () => {
              while (true) {
                const { done, value } = await reader.read();
                if (done) {
                  res.end();
                  break;
                }
                res.write(value);
              }
            };

            pump().catch(err => {
              console.error('Stream error:', err);
              res.end();
            });

          } catch (error) {
            console.error('API Error:', error);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: error.message }));
          }
        });
      });
    }
  };
}
