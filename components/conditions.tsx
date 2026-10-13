import { Check } from 'lucide-react'
import { coverages, extras, requirements } from '../lib/rental-data'

export function Conditions() {
  return (
    <section id="condizioni" className="scroll-mt-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 py-20">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">Condizioni</p>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight text-balance md:text-4xl">
            Tutto scritto prima di partire
          </h2>
        </div>

        <div className="grid gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-5">
            <h3 className="font-display text-lg font-bold uppercase">Cosa serve</h3>
            <ul className="flex flex-col gap-4">
              {requirements.map((item) => (
                <li key={item.title} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold">{item.title}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{item.detail}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-display text-lg font-bold uppercase">Coperture</h3>
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-foreground text-xs uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="pb-3 font-semibold">
                    Copertura
                  </th>
                  <th scope="col" className="pb-3 font-semibold">
                    Prezzo
                  </th>
                  <th scope="col" className="pb-3 text-right font-semibold">
                    Franchigia
                  </th>
                </tr>
              </thead>
              <tbody>
                {coverages.map((coverage) => (
                  <tr key={coverage.name} className="border-b border-border">
                    <th scope="row" className="py-4 font-normal">
                      <span className="block font-semibold">{coverage.name}</span>
                      <span className="text-muted-foreground">{coverage.detail}</span>
                    </th>
                    <td className="py-4">{coverage.price}</td>
                    <td className="py-4 text-right font-display text-base font-bold">{coverage.excess}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-5">
            <h3 className="font-display text-lg font-bold uppercase">Extra</h3>
            <ul className="flex flex-col">
              {extras.map((extra) => (
                <li
                  key={extra.name}
                  className="flex items-baseline justify-between gap-4 border-b border-border py-3 text-sm"
                >
                  <span>
                    {extra.name}
                    {extra.note && <span className="text-muted-foreground">{` · ${extra.note}`}</span>}
                  </span>
                  <span className="shrink-0 font-semibold">{extra.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
