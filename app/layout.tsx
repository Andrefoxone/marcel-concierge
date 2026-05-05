import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marcel Concierge | Il Tuo Concierge AI di Lusso',
  description: 'Esperienza di ospitalita premium potenziata da intelligenza artificiale',
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
