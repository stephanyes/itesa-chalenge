'use client'
import { Inter } from "next/font/google"
const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children} :any)  {
    return (
    <html lang="eng">
      <body className={inter.className}>{children}</body>
    </html>
  )
}