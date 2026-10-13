import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Marcel | Il concierge AI per il noleggio auto',
  description: "Scegli l'auto giusta, scopri prezzi e coperture e prenota la consegna in chat, 24 ore su 24.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  )
}
