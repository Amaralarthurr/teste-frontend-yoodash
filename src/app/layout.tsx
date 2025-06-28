import type React from "react"
import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
})

export const metadata: Metadata = {
  title: "Marvel Characters App",
  description: "Explore Marvel characters and their comics",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (  
    <html lang="pt-BR">
      <body className={`${workSans.variable} font-sans`}>{children}</body>
    </html>
  )
}

