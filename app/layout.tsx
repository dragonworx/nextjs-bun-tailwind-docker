import type { Metadata } from 'next'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}