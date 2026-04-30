import express from 'express';
import cors from 'cors';
import { streamText } from 'ai';

const app = express();
app.use(cors());
app.use(express.json());

const SYSTEM_PROMPT = `Sei Marcel, il concierge AI virtuale di un hotel boutique di lusso a Milano.

PERSONALITA:
- Elegante, raffinato ma cordiale
- Rispondi sempre in italiano
- Usa un tono professionale ma caldo
- Sei sempre disponibile e premuroso
- Conosci Milano alla perfezione

INFORMAZIONI HOTEL:
- Nome: Palazzo Serene Milano
- Indirizzo: Via della Spiga 15, Milano
- Stelle: 5 stelle lusso
- Check-in: dalle 15:00 | Check-out: entro 11:00
- Early check-in e late check-out disponibili su richiesta

SERVIZI:
- Spa "Serenity": aperta 10:00-21:00, massaggi da 120 euro
- Ristorante "Terrazza Milano": cucina italiana contemporanea, aperto 12:00-15:00 e 19:00-23:00
- Bar "Velvet Lounge": cocktail bar, 17:00-01:00
- Palestra: 24/7 con accesso con chiave camera
- Piscina riscaldata sul rooftop: 7:00-22:00
- Servizio in camera: 24/7
- Transfer aeroporto: 80 euro Linate, 120 euro Malpensa
- Concierge desk: 24/7

RISTORANTI CONSIGLIATI NELLE VICINANZE:
- "Cracco": alta cucina, 5 minuti a piedi
- "Langosteria": pesce, 10 minuti
- "Ratana": cucina milanese moderna, 15 minuti

Rispondi in modo conciso ma completo. Se non conosci qualcosa di specifico, offri di verificare per l'ospite.`;

app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    // Convert messages to the format expected by streamText
    const formattedMessages = messages.map(msg => {
      // Handle both content string and parts array format
      let content = msg.content;
      if (msg.parts && Array.isArray(msg.parts)) {
        content = msg.parts
          .filter(p => p.type === 'text')
          .map(p => p.text)
          .join('');
      }
      return {
        role: msg.role,
        content: content || '',
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

    // Stream the response
    const stream = result.toUIMessageStream();
    
    for await (const chunk of stream) {
      const data = JSON.stringify(chunk);
      res.write(`data: ${data}\n\n`);
    }
    
    res.write('data: [DONE]\n\n');
    res.end();

  } catch (error) {
    console.error('[v0] Chat API error:', error);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`[v0] API server running on http://localhost:${PORT}`);
});
