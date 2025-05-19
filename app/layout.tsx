import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Game Of Life',
  description: "Watch colorful patterns unfold in Conway's Game of Life, an interactive simulation of cellular automata.",
  icons: {
    icon: '/Game-Of-Life/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
