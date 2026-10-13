import { MessageCircle } from 'lucide-react'
import { Plate } from './plate'
import { OpenChatButton } from './chat/open-chat-button'

const links = [
  { href: '#flotta', label: 'Flotta' },
  { href: '#come-funziona', label: 'Come funziona' },
  { href: '#condizioni', label: 'Condizioni' },
  { href: '#sedi', label: 'Sedi' },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6">
        <a href="#top" aria-label="Marcel, torna all'inizio">
          <Plate size="sm">Marcel</Plate>
        </a>
        <nav aria-label="Principale" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <OpenChatButton className="flex h-10 items-center gap-2 rounded-md bg-foreground px-4 text-sm font-semibold text-background transition-colors hover:bg-primary">
          <MessageCircle className="size-4" aria-hidden="true" />
          Prenota in chat
        </OpenChatButton>
      </div>
    </header>
  )
}
