import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Salfa testovoe react",
  description: "SPA со списком карточек для тестового задания salfa",
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
