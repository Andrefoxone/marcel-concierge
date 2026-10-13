import { Plate } from './plate'

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <Plate size="sm">Marcel</Plate>
          <span className="text-sm text-background/70">Noleggio auto con concierge AI · Milano</span>
        </div>
        <p className="text-sm text-background/70">© 2026 Marcel. Tutti i diritti riservati.</p>
      </div>
    </footer>
  )
}
