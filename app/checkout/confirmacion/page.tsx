'use client'

import Link from 'next/link'
import { CheckCircle2, ArrowRight } from 'lucide-react'

export default function OrderConfirmationPage() {
  const orderNumber = 'GB-' + new Date().getTime().toString().slice(-6)
  return <main className="checkout-page confirmation-page"><section className="confirmation-card"><CheckCircle2 size={54} /><span className="eyebrow">PEDIDO RECIBIDO</span><h1>¡Gracias por tu pedido!</h1><p>Tu pedido mayorista fue registrado correctamente.</p><strong className="confirmation-number">N.º de pedido {orderNumber}</strong><Link className="primary-action" href="/">Volver a inicio <ArrowRight size={16} /></Link></section></main>
}
