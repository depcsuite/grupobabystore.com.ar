'use client'

import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const promoMessages = ['Hacé tu pedido y retiralo o recibilo en el mismo día', '¡Nuevos ingresos! Mamaderas, tetines y chupetes', 'Hasta 50% OFF en promociones']

export function PromoTopbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [promoIndex, setPromoIndex] = useState(0)
  const visiblePromoMessages = isLoggedIn ? promoMessages : promoMessages.slice(1)

  useEffect(() => {
    const syncAuth = () => setIsLoggedIn(document.cookie.split(';').some(cookie => cookie.trim().startsWith('gb_logged_in=1')))
    syncAuth()
    window.addEventListener('pageshow', syncAuth)
    window.addEventListener('gb-auth-changed', syncAuth)
    const timer = window.setInterval(() => setPromoIndex(current => (current + 1) % visiblePromoMessages.length), 4200)
    return () => { window.removeEventListener('pageshow', syncAuth); window.removeEventListener('gb-auth-changed', syncAuth); window.clearInterval(timer) }
  }, [visiblePromoMessages.length])

  const movePromo = (direction: number) => setPromoIndex(current => (current + direction + visiblePromoMessages.length) % visiblePromoMessages.length)

  return <div className="promo-bar" role="region" aria-label="Promociones de Grupo Baby Store"><button className="promo-control" type="button" aria-label="Frase anterior" onClick={() => movePromo(-1)}><ChevronLeft size={18} /></button><a className="promo-content" href="/como-comprar">{isLoggedIn && promoIndex === 0 ? <img className="promo-logo-express" src="/logo-express.svg" alt="Express" /> : <Sparkles className="promo-generic-icon" size={19} aria-hidden="true" />}<span className="promo-message">{visiblePromoMessages[promoIndex]}</span><ArrowRight size={14} /></a><button className="promo-control" type="button" aria-label="Frase siguiente" onClick={() => movePromo(1)}><ChevronRight size={18} /></button></div>
}
