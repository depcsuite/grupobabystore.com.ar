'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

type CartItem = { id: string; name: string; code: string; price: number; quantity: number; packItems?: number }
type CartContextValue = { items: CartItem[]; addItem: (item: Omit<CartItem, 'quantity'>) => void; updateQuantity: (id: string, quantity: number) => void; removeItem: (id: string) => void; clearCart: () => void; subtotal: number; count: number }
const CartContext = createContext<CartContextValue | null>(null)
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => { if (typeof window === 'undefined') return []; const saved = window.sessionStorage.getItem('gb_cart'); if (!saved) return []; try { return JSON.parse(saved) as CartItem[] } catch { window.sessionStorage.removeItem('gb_cart'); return [] } })
  useEffect(() => { window.sessionStorage.setItem('gb_cart', JSON.stringify(items)) }, [items])
  const addItem = (item: Omit<CartItem, 'quantity'>) => setItems(current => { const existing = current.find(product => product.id === item.id); const step = item.packItems ?? existing?.packItems ?? 1; return existing ? current.map(product => product.id === item.id ? { ...product, quantity: product.quantity + step } : product) : [...current, { ...item, quantity: step }] })
  const updateQuantity = (id: string, quantity: number) => setItems(current => current.flatMap(item => { if (item.id !== id) return [item]; const step = item.packItems ?? 1; if (quantity <= 0) return []; return [{ ...item, quantity: Math.max(step, Math.round(quantity / step) * step) }] }))
  const removeItem = (id: string) => setItems(current => current.filter(item => item.id !== id))
  const clearCart = () => setItems([])
  const value = useMemo(() => ({ items, addItem, updateQuantity, removeItem, clearCart, subtotal: items.reduce((total, item) => total + item.price * item.quantity, 0), count: items.reduce((total, item) => total + item.quantity, 0) }), [items])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
export function useCart() { const context = useContext(CartContext); if (!context) throw new Error('useCart debe usarse dentro de CartProvider'); return context }
