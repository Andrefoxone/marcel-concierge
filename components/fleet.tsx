import Image from 'next/image'
import { fleet } from '../lib/rental-data'
import { Plate } from './plate'
import { OpenChatButton } from './chat/open-chat-button'

export function Fleet() {
  return (
    <section id="flotta" className="scroll-mt-16 bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-6 py-20">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">La flotta</p>
            <h2 className="font-display text-3xl font-extrabold uppercase leading-tight text-balance md:text-4xl">
              Quattro categorie, un prezzo chiaro
            </h2>
          </div>
          <p className="max-w-sm leading-relaxed text-muted-foreground">
            Prezzi al giorno, IVA inclusa. Sconto del 10% per noleggi di 7 giorni o più.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {fleet.map((category) => (
            <article
              key={category.id}
              className="flex flex-col overflow-hidden rounded-lg border border-border bg-background"
            >
              <div className="relative aspect-[4/3] bg-surface">
                <Image
                  src={category.image || '/placeholder.svg'}
                  alt={`Auto della categoria ${category.name}: ${category.models}`}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <Plate size="sm" className="absolute left-4 top-4">
                  {category.name}
                </Plate>
              </div>
              <div className="flex flex-1 flex-col gap-5 p-6">
                <div className="flex flex-col gap-2">
                  <p className="text-sm leading-relaxed text-muted-foreground">{category.models}</p>
                  <p className="flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold">{category.price}</span>
                    <span className="text-sm text-muted-foreground">{category.priceNote}</span>
                  </p>
                </div>
                <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-border pt-5">
                  {category.specs.map((spec) => (
                    <div key={spec.label} className="flex flex-col gap-0.5">
                      <dt className="text-xs uppercase tracking-wider text-muted-foreground">{spec.label}</dt>
                      <dd className="text-sm font-semibold">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
                <OpenChatButton
                  message={category.chatMessage}
                  className="mt-auto h-11 rounded-md border-2 border-foreground text-sm font-semibold transition-colors hover:bg-foreground hover:text-background"
                >
                  Chiedi disponibilità
                </OpenChatButton>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
