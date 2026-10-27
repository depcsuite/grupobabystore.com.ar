import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'
import { CartProvider } from '@/components/cart-context'
import { AuthSessionProvider } from '@/components/auth-session-sync'
import { GlobalCart } from '@/components/global-cart'
import './auth.css'

export const metadata: Metadata = {
  title: 'Grupo Baby Store | Mayorista de productos para bebés',
  description: 'El mayorista más completo de productos para bebés. Marcas líderes, asesoramiento personalizado y envíos a todo el país.',
  generator: 'v0.app',
  icons: {
    icon: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg',
    apple: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es-AR">
      <body className="antialiased">
        <AuthSessionProvider>
          <CartProvider>
            {children}
            <GlobalCart />
          </CartProvider>
        </AuthSessionProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
