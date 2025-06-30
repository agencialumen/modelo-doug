import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Douglas Myth - Modelo | Entretenimento | Lifestyle | Moda",
  description:
    "Modelo masculino profissional e criador de conteúdo. Carreira internacional de modelagem, colaborações de moda e conteúdo de lifestyle no Instagram, YouTube e TikTok.",
  keywords: "Douglas Myth, modelo, moda, lifestyle, entretenimento, Instagram, YouTube, TikTok, colaborações de marca",
  authors: [{ name: "Douglas Myth" }],
  openGraph: {
    title: "Douglas Myth - Modelo Profissional e Criador de Conteúdo",
    description: "Descubra o mundo de Douglas Myth - modelo internacional e criador de conteúdo",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Douglas Myth - Modelo Profissional e Criador de Conteúdo",
    description: "Descubra o mundo de Douglas Myth - modelo internacional e criador de conteúdo",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
