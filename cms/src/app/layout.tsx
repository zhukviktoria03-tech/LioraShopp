import type { ReactNode } from 'react'

/**
 * Кореневий layout Next.js App Router для LioraShop CMS.
 * Обгортає всі сторінки, включаючи /admin (Payload CMS).
 */
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  )
}
