import Image from 'next/image'
import { CalendarX, Gauge, PlaneLanding } from 'lucide-react'
import { BookingForm } from './booking-form'

const facts = [
  { icon: CalendarX, text: 'Cancellazione gratuita fino a 48 ore prima' },
  { icon: PlaneLanding, text: 'Consegna a Malpensa e Linate 24 ore su 24' },
  { icon: Gauge, text: 'Chilometri illimitati dalla categoria Comfort' },
]

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:py-20">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-5">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Noleggio auto · Milano, Malpensa, Linate
            </p>
            <h1 className="font-display text-4xl font-extrabold uppercase leading-[1.02] text-balance md:text-6xl">
              {"L'auto giusta, consegnata dove serve."}
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty">
              Dica a Marcel dove va, quando e in quanti siete. Le consiglia la categoria, calcola il prezzo con
              coperture ed extra e organizza la consegna. In chat, a qualsiasi ora.
            </p>
          </div>
          <BookingForm />
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-surface sm:aspect-[4/3] lg:aspect-[4/5]">
            <Image
              src="/images/hero-car.png"
              alt="SUV grigio parcheggiato in una via del centro di Milano"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <figure className="absolute bottom-5 left-5 right-5 flex max-w-sm flex-col gap-1 rounded-lg border border-border bg-background p-4 shadow-lg sm:right-auto">
            <figcaption className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Marcel risponde
            </figcaption>
            <blockquote className="text-sm leading-relaxed">
              Per 5 persone con valigie le consiglio un Van: 99€ al giorno, km illimitati. Lo consegno a Malpensa
              all’arrivo del volo.
            </blockquote>
          </figure>
        </div>
      </div>

      <ul className="mx-auto grid max-w-7xl gap-px border-t border-border bg-border md:grid-cols-3">
        {facts.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-3 bg-background px-6 py-5 text-sm font-medium">
            <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />
            {text}
          </li>
        ))}
      </ul>
    </section>
  )
}
