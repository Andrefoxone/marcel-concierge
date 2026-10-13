import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

export async function POST(req) {
  try {
    const data = await req.json()
    
    const { hotelName, contactName, email, phone, hotelType, roomsCount, message, plan } = data
    
    // Validate required fields
    if (!hotelName || !contactName || !email) {
      return new Response(JSON.stringify({ error: 'Campi obbligatori mancanti' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    
    // Insert into database
    await sql`
      INSERT INTO demo_requests (hotel_name, contact_name, email, phone, hotel_type, rooms_count, message, plan)
      VALUES (${hotelName}, ${contactName}, ${email}, ${phone || null}, ${hotelType || null}, ${roomsCount || null}, ${message || null}, ${plan || null})
    `
    
    return new Response(JSON.stringify({ success: true, message: 'Richiesta ricevuta con successo' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Demo API error:', error)
    return new Response(JSON.stringify({ error: 'Errore nel salvataggio della richiesta' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
