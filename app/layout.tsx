import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Marcel - Concierge AI per Hotel',
  description: 'Concierge virtuale intelligente per hotel di lusso',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, backgroundColor: '#0f0f0f' }}>{children}</body>
    </html>
  )
}
