'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { ArrowRight, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { useCart } from '@/components/cart-context'

const money = (value: number) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(value)

export function GlobalCart() {
  const pathname = usePathname()
  const { items, count, subtotal, updateQuantity, removeItem } = useCart()
  const [cartOpen, setCartOpen] = useState(false)

  if (pathname === '/productos') return null

  return (
    <>
      <button className="floating-cart-button" type="button" onClick={() => setCartOpen(true)} aria-label={`Abrir carrito con ${count} productos`}>
        <ShoppingCart size={20} />
        <span>Carrito</span>
        {count > 0 && <b>{count}</b>}
      </button>
      <aside className={cartOpen ? 'cart-sidebar is-open' : 'cart-sidebar'} aria-label="Carrito de pedido">
        <div className="cart-sidebar-head">
          <div>
            <span className="eyebrow">PEDIDO MAYORISTA</span>
            <h2>Tu carrito <small>Total: {count} ítems</small></h2>
          </div>
          <button type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito">×</button>
        </div>
        {items.length === 0 ? (
          <div className="cart-empty"><ShoppingCart size={30} /><p>Tu carrito está vacío.</p><span>Agregá productos para comenzar tu pedido.</span></div>
        ) : (
          <>
            <div className="cart-items">
              {items.map((item) => (
                <div className="cart-item" key={item.id}>
                  <img src="/hero-nutrilon-1.jpg" alt="" />
                  <div>
                    <strong>{item.name}</strong><small>{item.code}</small>
                    <div className="cart-item-controls">
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - (item.packItems ?? 1))} aria-label={`Disminuir cantidad de ${item.name}`}><Minus size={12} /></button>
                      <input className="cart-quantity-input" type="number" min="1" value={item.quantity} onChange={(event) => updateQuantity(item.id, Math.max(1, Number(event.target.value) || 1))} aria-label={`Cantidad de ${item.name}`} />
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + (item.packItems ?? 1))} aria-label={`Aumentar cantidad de ${item.name}`}><Plus size={12} /></button>
                      <button className="cart-remove" type="button" onClick={() => removeItem(item.id)} aria-label={`Eliminar ${item.name}`}><Trash2 size={13} /></button>
                    </div>
                  </div>
                  <b>{money(item.price * item.quantity)}</b>
                </div>
              ))}
            </div>
            <div className="cart-sidebar-total"><span>Subtotal sin IVA</span><strong>{money(subtotal)}</strong><div className="cart-action-buttons"><button type="button" className="cart-continue-button" onClick={() => setCartOpen(false)}>Seguir comprando</button><a href="/checkout" className="cart-checkout-button">Finalizar pedido <ArrowRight size={16} /></a></div></div>
          </>
        )}
      </aside>
      {cartOpen && <button className="cart-backdrop" type="button" onClick={() => setCartOpen(false)} aria-label="Cerrar carrito" />}
    </>
  )
}
