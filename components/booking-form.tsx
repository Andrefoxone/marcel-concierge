'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { pickupLocations } from '../lib/rental-data'
import { useMarcelChat } from './chat/chat-provider'

const fieldClass =
  'h-11 w-full rounded-md border border-border bg-background px-3 text-sm text-foreground outline-none focus:border-primary'
const labelClass = 'text-xs font-semibold uppercase tracking-wider text-muted-foreground'

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString('it-IT', { day: 'numeric', month: 'long' })
}

export function BookingForm() {
  const { openChat } = useMarcelChat()
  const [error, setError] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const pickup = String(data.get('pickup'))
    const dropoff = String(data.get('dropoff'))
    const start = String(data.get('start'))
    const end = String(data.get('end'))
    const people = String(data.get('people'))

    if (!start || !end) return setError('Inserisca le date di ritiro e di riconsegna.')
    if (end < start) return setError('La riconsegna deve essere dopo il ritiro.')
    setError('')

    const returnPlace = dropoff === 'same' ? pickup : dropoff
    openChat(
      `Vorrei noleggiare un'auto: ritiro a ${pickup} il ${formatDate(start)}, riconsegna a ${returnPlace} il ${formatDate(end)}. Siamo in ${people}. Cosa mi consiglia e quanto costerebbe in totale?`,
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Richiedi un preventivo"
      className="grid gap-4 rounded-lg border border-border bg-background p-5 shadow-sm sm:grid-cols-2"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="pickup" className={labelClass}>
          Ritiro
        </label>
        <select id="pickup" name="pickup" className={fieldClass} defaultValue={pickupLocations[0]}>
          {pickupLocations.map((location) => (
            <option key={location}>{location}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="dropoff" className={labelClass}>
          Riconsegna
        </label>
        <select id="dropoff" name="dropoff" className={fieldClass} defaultValue="same">
          <option value="same">Stesso luogo</option>
          {pickupLocations.map((location) => (
            <option key={location}>{location}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="start" className={labelClass}>
          Dal
        </label>
        <input id="start" name="start" type="date" className={fieldClass} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="end" className={labelClass}>
          Al
        </label>
        <input id="end" name="end" type="date" className={fieldClass} />
      </div>
      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <label htmlFor="people" className={labelClass}>
          Passeggeri
        </label>
        <select id="people" name="people" className={fieldClass} defaultValue="2 persone">
          {Array.from({ length: 9 }, (_, index) => {
            const label = index === 0 ? '1 persona' : `${index + 1} persone`
            return <option key={label}>{label}</option>
          })}
        </select>
      </div>
      {error && (
        <p role="alert" className="text-sm font-medium text-primary sm:col-span-2">
          {error}
        </p>
      )}
      <button
        type="submit"
        className="flex h-12 items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground sm:col-span-2"
      >
        Calcola il prezzo con Marcel
        <ArrowRight className="size-4" aria-hidden="true" />
      </button>
    </form>
  )
}
