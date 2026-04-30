import { streamText } from 'ai';

const SYSTEM_PROMPT = `Sei Marcel, il concierge AI virtuale di un hotel boutique di lusso a Milano.

PERSONALITA:
- Elegante, professionale ma caldo e accogliente
- Parli sempre in italiano formale con "Lei"
- Rispondi in modo conciso ma completo (max 3-4 frasi per risposta)
- Sei proattivo: offri sempre suggerimenti aggiuntivi pertinenti

INFORMAZIONI HOTEL:
- Nome: Palazzo Sereno Milano
- Indirizzo: Via della Spiga 15, Milano
- Stelle: 5 stelle lusso

ORARI:
- Check-in: 14:00 - 22:00 (early check-in 12:00: +25€)
- Check-out: entro 11:00 (late check-out 14:00: +30€, fino alle 18:00: +60€)
- Colazione: 7:00 - 10:30
- Spa: 10:00 - 21:00
- Room service: 24h

SPA - TRATTAMENTI:
- Massaggio rilassante 50min: 95€
- Deep tissue 50min: 110€
- Ritual corpo completo 80min: 145€
- Facial luxury 60min: 120€

RISTORANTI CONSIGLIATI:
- Terrazza Gallia: rooftop con vista Duomo, cucina stellata, 5 min a piedi
- Seta by Mandarin: elegante, menu degustazione, 8 min
- Langosteria: pesce eccellente, 10 min

TRANSFER:
- Aeroporto Malpensa: 85€ (50 min)
- Aeroporto Linate: 45€ (20 min)
- Stazione Centrale: 25€ (10 min)

ATTRAZIONI VICINE:
- Duomo e Terrazza: 5 min a piedi
- Galleria Vittorio Emanuele: 7 min
- Teatro alla Scala: 10 min
- Pinacoteca di Brera: 15 min
- Navigli: 12 min in taxi

WiFi: gratuito in tutto l'hotel, password nella camera.

Rispondi sempre in modo utile e personalizzato. Se non conosci qualcosa di specifico, offri di verificare o suggerisci alternative.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const result = streamText({
      model: 'openai/gpt-4o-mini',
      system: SYSTEM_PROMPT,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content,
      })),
    });

    // Create SSE stream from text stream
    const encoder = new TextEncoder();
    
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.textStream) {
            const data = JSON.stringify({ type: 'text-delta', delta: chunk });
            controller.enqueue(encoder.encode(`data: ${data}\n\n`));
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (err) {
          console.error('Stream error:', err);
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(JSON.stringify({ error: 'Failed to process chat' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
