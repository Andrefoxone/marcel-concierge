export type FleetCategory = {
  id: string
  name: string
  models: string
  price: string
  priceNote: string
  image: string
  specs: { label: string; value: string }[]
  chatMessage: string
}

export const fleet: FleetCategory[] = [
  {
    id: 'city',
    name: 'City',
    models: 'Fiat 500, Panda o simili',
    price: '39€',
    priceNote: 'al giorno',
    image: '/images/fleet-city.png',
    specs: [
      { label: 'Posti', value: '4' },
      { label: 'Cambio', value: 'Manuale' },
      { label: 'Chilometri', value: '200 km/giorno' },
      { label: 'Deposito', value: '300€' },
    ],
    chatMessage: "Vorrei informazioni su un'auto della categoria City: disponibilità e prezzo per le mie date.",
  },
  {
    id: 'comfort',
    name: 'Comfort',
    models: 'Jeep Compass, VW Golf Variant o simili',
    price: '69€',
    priceNote: 'al giorno',
    image: '/images/fleet-comfort.png',
    specs: [
      { label: 'Posti', value: '5' },
      { label: 'Cambio', value: 'Automatico' },
      { label: 'Chilometri', value: 'Illimitati' },
      { label: 'Secondo guidatore', value: 'Gratis' },
    ],
    chatMessage: "Vorrei informazioni su un'auto della categoria Comfort: disponibilità e prezzo per le mie date.",
  },
  {
    id: 'van',
    name: 'Van',
    models: 'Ford Tourneo, VW Multivan o simili',
    price: '99€',
    priceNote: 'al giorno',
    image: '/images/fleet-van.png',
    specs: [
      { label: 'Posti', value: '8-9' },
      { label: 'Chilometri', value: 'Illimitati' },
      { label: 'Deposito', value: '500€' },
      { label: 'Ideale per', value: 'Gruppi e famiglie' },
    ],
    chatMessage: 'Vorrei informazioni su un Van per un gruppo: disponibilità e prezzo per le mie date.',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    models: 'BMW Serie 5, Mercedes Classe E, Porsche su richiesta',
    price: 'da 180€',
    priceNote: 'al giorno',
    image: '/images/fleet-luxury.png',
    specs: [
      { label: 'Preventivo', value: 'Personalizzato' },
      { label: 'Deposito', value: '1.500€' },
      { label: 'Consegna', value: 'In hotel o aeroporto' },
      { label: 'Modelli', value: 'Su richiesta' },
    ],
    chatMessage: "Vorrei un preventivo per un'auto della categoria Luxury.",
  },
]

export const pickupLocations = ['Milano Centro', 'Aeroporto Malpensa', 'Aeroporto Linate', 'Hotel a Milano']

export const requirements = [
  { title: 'Età minima 21 anni', detail: 'Sotto i 25 anni supplemento giovane guidatore di 12€/giorno.' },
  { title: 'Patente da almeno 1 anno', detail: 'Per patenti extra UE serve anche la patente internazionale.' },
  { title: 'Carta di credito', detail: 'Intestata al guidatore principale. Non accettiamo carte prepagate.' },
  { title: 'Deposito cauzionale', detail: 'Da 300€ in base alla categoria, sbloccato alla riconsegna.' },
]

export const coverages = [
  { name: 'Base', price: 'Inclusa', excess: '1.200€', detail: 'RCA e furto' },
  { name: 'Ridotta', price: '+15€/giorno', excess: '300€', detail: 'Franchigia ridotta' },
  { name: 'Totale', price: '+25€/giorno', excess: 'Zero', detail: 'Nessuna franchigia' },
]

export const extras = [
  { name: 'Secondo guidatore', price: '8€/giorno', note: 'gratis su Comfort' },
  { name: 'Seggiolino bambino', price: '7€/giorno' },
  { name: 'Navigatore GPS', price: '6€/giorno' },
  { name: 'Telepass', price: '5€/giorno' },
  { name: 'Catene da neve', price: 'Incluse', note: 'in inverno' },
  { name: 'Carburante', price: 'Pieno/pieno' },
]

export const locations = [
  {
    name: 'Milano Centro',
    address: 'Via Vittor Pisani 20, vicino a Stazione Centrale',
    hours: 'Lun-sab 8:00-20:00, dom 9:00-13:00',
    fee: 'Ritiro in sede',
  },
  {
    name: 'Aeroporto Malpensa',
    address: 'Consegna al terminal su prenotazione',
    hours: '24 ore su 24',
    fee: '50€',
  },
  {
    name: 'Aeroporto Linate',
    address: 'Consegna al terminal su prenotazione',
    hours: '24 ore su 24',
    fee: '30€',
  },
  {
    name: 'Hotel a Milano',
    address: 'Consegna e ritiro direttamente in hotel',
    hours: 'Su prenotazione',
    fee: '25€',
  },
]
