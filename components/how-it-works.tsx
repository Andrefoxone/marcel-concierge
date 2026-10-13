const steps = [
  {
    title: 'Scriva a Marcel',
    text: 'Date, luogo di ritiro e numero di persone: bastano poche righe, in qualsiasi lingua.',
  },
  {
    title: 'Riceve il preventivo',
    text: 'Categoria consigliata, coperture, extra e prezzo totale stimato. Nessuna sorpresa al bancone.',
  },
  {
    title: 'Il team conferma',
    text: 'Riceve la conferma e trova l’auto pronta in sede, in aeroporto o direttamente in hotel.',
  },
]

export function HowItWorks() {
  return (
    <section id="come-funziona" className="scroll-mt-16 bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-14 px-6 py-20">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-semibold uppercase tracking-widest text-accent">Come funziona</p>
          <h2 className="font-display text-3xl font-extrabold uppercase leading-tight text-balance md:text-4xl">
            Dalla chat al volante in tre passaggi
          </h2>
        </div>

        <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
          <span
            aria-hidden="true"
            className="absolute left-5 right-5 top-5 hidden border-t-4 border-dashed border-accent md:block"
          />
          {steps.map((step, index) => (
            <li key={step.title} className="relative flex flex-col gap-4">
              <span className="flex size-10 items-center justify-center rounded-md bg-accent font-display text-lg font-extrabold text-accent-foreground">
                {index + 1}
              </span>
              <h3 className="font-display text-xl font-bold uppercase">{step.title}</h3>
              <p className="max-w-sm leading-relaxed text-background/70">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
