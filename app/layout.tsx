import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fantoccini 3D',
  description: 'Make and shake',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased bg-gradient-to-br from-slate-50 to-blue-50 min-h-screen">{children}</body>
    </html>
  )
}