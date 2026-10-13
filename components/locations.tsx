import { MapPin } from 'lucide-react'
import { locations } from '../lib/rental-data'
import { OpenChatButton } from './chat/open-chat-button'

export function Locations() {
  return (
    <section id="sedi" className="scroll-mt-16 border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Sedi e consegna</p>
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight text-balance md:text-4xl">
              In sede, in aeroporto o in hotel
            </h2>
          </div>
          <OpenChatButton
            message="Vorrei organizzare la consegna dell'auto. Quali sono le opzioni?"
            className="h-11 self-start rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-foreground md:self-auto"
          >
            Organizza la consegna
          </OpenChatButton>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {locations.map((location) => (
            <li
              key={location.name}
              className="flex flex-col gap-4 rounded-lg border border-border bg-background p-6"
            >
              <MapPin className="size-5 text-primary" aria-hidden="true" />
              <div className="flex flex-col gap-1">
                <h3 className="font-display text-lg font-bold uppercase">{location.name}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{location.address}</p>
              </div>
              <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-4 text-sm">
                <span>{location.hours}</span>
                <span className="font-semibold">{location.fee}</span>
              </div>
            </li>
          ))}
        </ul>

        <p className="text-sm leading-relaxed text-muted-foreground">
          A Milano attenzione ad Area C e ZTL: eventuali multe vengono riaddebitate con 25€ di gestione.
        </p>
      </div>
    </section>
  )
}
