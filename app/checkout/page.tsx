'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight, Check, Minus, Plus, Search, ShoppingBag, Truck, X } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useCart } from '@/components/cart-context'
import { AccountMenu } from '@/components/account-menu'
import { SiteFooter } from '@/components/site-footer'

const money = (value: number) => value.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 })
type DeliveryZone = 'caba' | 'amba' | 'other'

type Address = { id: string; value: string; zone: DeliveryZone; province: string }

const savedAddresses: Address[] = [
  { id: 'cabildo', value: 'Av. Cabildo 2450, CABA, CP: 1428', zone: 'caba', province: 'CABA' },
  { id: 'billingurst', value: 'Billingurst 1120 1A, CABA, CP: 1425', zone: 'caba', province: 'CABA' },
  { id: 'alem', value: 'Alem 30, Mendoza, Mendoza, CP: 1234', zone: 'other', province: 'Mendoza' },
]

const provinceOptions = [
  'CABA',
  'Buenos Aires',
  'Catamarca',
  'Chaco',
  'Chubut',
  'Córdoba',
  'Corrientes',
  'Entre Ríos',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquén',
  'Río Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucumán',
] as const

export default function CheckoutPage({ initialStep = 1 }: { initialStep?: 1 | 2 }) {
  const { items, subtotal, updateQuantity, removeItem, clearCart } = useCart()
  const router = useRouter()
  const [step] = useState<1 | 2>(initialStep)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [addresses, setAddresses] = useState<Address[]>(savedAddresses)
  const [selectedAddress, setSelectedAddress] = useState('cabildo')
  const [express, setExpress] = useState(false)
  const [isAddingAddress, setIsAddingAddress] = useState(false)
  const [deliveryMode, setDeliveryMode] = useState<'shipping' | 'pickup'>('shipping')
  const [pickupExpress, setPickupExpress] = useState(false)
  const selected = addresses.find((address) => address.id === selectedAddress) ?? addresses[0]
  const isTransport = selected.zone === 'other'
  const baseDelivery = selected.zone === 'caba' ? 10000 : selected.zone === 'amba' ? 20000 : 10000
  const expressDeliveryCost = 15000
  const isExpressDelivery = deliveryMode === 'shipping' && selected.province === 'CABA' && express
  const deliveryCost = deliveryMode === 'shipping'
    ? isExpressDelivery ? expressDeliveryCost : baseDelivery
    : 0
  const iva = subtotal * 0.21
  const total = subtotal + (step === 2 ? deliveryCost : 0) + iva
  const deliveryLabel = deliveryMode === 'pickup'
    ? pickupExpress ? 'Retiro express' : 'Retiro normal'
    : isExpressDelivery ? 'Envío express' : isTransport ? 'Despacho a transporte' : 'Envío'

  const handleAddAddress = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const province = String(formData.get('province') ?? '').trim()
    const locality = String(formData.get('locality') ?? '').trim()
    const street = String(formData.get('street') ?? '').trim()
    const number = String(formData.get('number') ?? '').trim()
    const floor = String(formData.get('floor') ?? '').trim()
    const postalCode = String(formData.get('postalCode') ?? '').trim()
    const betweenStreets = String(formData.get('betweenStreets') ?? '').trim()
    const addressParts = [
      `${street} ${number}${floor ? `, ${floor}` : ''}`,
      `${locality}, ${province}`,
      `CP: ${postalCode}`,
    ]
    if (betweenStreets) addressParts.push(`Entre calles: ${betweenStreets}`)
    const address: Address = {
      id: `address-${Date.now()}`,
      value: addressParts.join(', '),
      province,
      zone: province === 'CABA' ? 'caba' : province === 'Buenos Aires' ? 'amba' : 'other',
    }
    setAddresses((currentAddresses) => [...currentAddresses, address])
    setSelectedAddress(address.id)
    setExpress(false)
    setIsAddingAddress(false)
  }

  return <main className="checkout-page">
    <div className="promo-bar" role="region" aria-label="Promociones de Grupo Baby Store"><button className="promo-control" type="button" aria-label="Promoción anterior"><ArrowLeft size={16} /></button><a className="promo-content" href="/como-comprar"><span>Hacé tu pedido y <strong>retiralo o recibilo en el mismo día</strong></span><ArrowRight size={14} /></a></div>
    <header className="site-header"><div className="header-inner"><button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <span>☰</span>}</button><Link className="brand" href="/" aria-label="Grupo Baby Store inicio"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store distribuidor oficial" /></Link><nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal"><Link href="/">Inicio</Link><Link href="/productos">Productos</Link><Link href="/nosotros">Nosotros</Link><Link href="/como-comprar">Cómo comprar</Link><Link href="/contacto">Contacto</Link></nav><div className="header-actions"><AccountMenu /><button aria-label="Buscar" className="icon-button" type="button" onClick={() => setSearchOpen(!searchOpen)}><Search size={18} /></button></div></div>{searchOpen && <div className="search-row"><Search size={18} /><input autoFocus placeholder="Buscá una marca o producto" aria-label="Buscar una marca o producto" /><button type="button" onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda"><X size={18} /></button></div>}</header>
    <header className="checkout-header"><Link href="/productos" className="checkout-back"><ArrowLeft size={17} /> Volver al catálogo</Link><div className="checkout-step"><span className={step === 1 ? 'active' : 'complete'}>1</span><b>Pedido</b><i /><span className={step === 2 ? 'active' : ''}>2</span><b>Entrega</b><i /><span>3</span><b>Confirmación</b></div></header>
    <section className="checkout-intro"><div className="eyebrow">PEDIDO MAYORISTA</div><h1>{step === 1 ? <>Revisá tu <span>pedido.</span></> : <>¿Cómo querés <span>recibirlo?</span></>}</h1><p>{step === 1 ? 'Todos los precios están expresados sin IVA. El impuesto se suma al final.' : 'Seleccioná un domicilio para calcular la modalidad y el costo de entrega.'}</p></section>
    <div className="checkout-layout"><section className="checkout-order">{step === 1 ? <><div className="checkout-section-heading"><div><h2>Productos seleccionados</h2><p>{items.length} productos · cantidades editables</p></div><ShoppingBag size={22} /></div>{items.length === 0 ? <div className="checkout-empty"><ShoppingBag size={34} /><h3>Tu pedido está vacío</h3><p>Sumá productos desde el catálogo para comenzar.</p><Link href="/productos" className="primary-action">Ver catálogo</Link></div> : <div className="checkout-items">{items.map(item => <article className="checkout-item" key={item.id}><img src="/hero-nutrilon-1.jpg" alt="" /><div className="checkout-item-info"><h3>{item.name}</h3><p>Código: {item.code}</p><strong>{money(item.price)} <small>+ IVA</small></strong></div><div className="checkout-quantity"><button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label={`Disminuir ${item.name}`}><Minus size={14} /></button><span>{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label={`Aumentar ${item.name}`}><Plus size={14} /></button></div><div className="checkout-line-total"><span className="checkout-line-subtotal-label">Subtotal</span><strong>{money(item.price * item.quantity)} <small>+ IVA</small></strong><button type="button" onClick={() => removeItem(item.id)}>Eliminar</button></div></article>)}</div>}</> : <div className={`delivery-page-card ${isTransport ? 'transport-mode' : 'shipping-mode'}`}><div className="delivery-card-heading"><Truck size={22} /><div><span className="eyebrow">RECEPCIÓN DEL PEDIDO</span><h2>Elegí cómo recibirlo</h2><p>La modalidad se adapta automáticamente a la zona del domicilio.</p></div></div><div className="delivery-mode-tabs"><button type="button" className={deliveryMode === 'shipping' ? 'active' : ''} onClick={() => setDeliveryMode('shipping')}>Entrega a domicilio</button><button type="button" className={deliveryMode === 'pickup' ? 'active' : ''} onClick={() => { setDeliveryMode('pickup'); setExpress(false); setIsAddingAddress(false) }}>Retiro por depósito</button></div>{deliveryMode === 'shipping' && <><div className="delivery-address-heading"><div><h3>Domicilio de entrega</h3><p>Elegí dónde querés recibir tu pedido.</p></div></div><div className="delivery-address-list">{addresses.map(address => <label className={`delivery-address-option ${selectedAddress === address.id ? 'selected' : ''}`} key={address.id}><input type="radio" name="address" checked={selectedAddress === address.id} onChange={() => { setSelectedAddress(address.id); setExpress(false) }} /><span className="delivery-radio"><Check size={13} /></span><span>{address.value}</span></label>)}</div>{isAddingAddress ? <form className="delivery-address-form" onSubmit={handleAddAddress}><h4>Agregar un domicilio</h4><div className="delivery-address-form-grid"><label className="delivery-address-form-field"><span>Provincia</span><select name="province" defaultValue="" autoComplete="address-level1" required><option value="" disabled>Seleccioná una provincia</option>{provinceOptions.map(province => <option value={province} key={province}>{province}</option>)}</select></label><label className="delivery-address-form-field"><span>Localidad</span><input name="locality" autoComplete="address-level2" placeholder="Ej. Palermo" required /></label><label className="delivery-address-form-field"><span>Calle</span><input name="street" autoComplete="address-line1" placeholder="Ej. Av. Santa Fe" required /></label><label className="delivery-address-form-field"><span>Nro</span><input name="number" placeholder="Ej. 1200" required /></label><label className="delivery-address-form-field"><span>Piso/Dpto (opcional)</span><input name="floor" placeholder="Ej. 2° A" /></label><label className="delivery-address-form-field"><span>Código postal</span><input name="postalCode" autoComplete="postal-code" placeholder="Ej. 1425" required /></label><label className="delivery-address-form-field delivery-address-form-field-wide"><span>Entre calles (opcional)</span><input name="betweenStreets" placeholder="Ej. Santa Fe y Córdoba" /></label></div><div className="delivery-address-form-actions"><button type="button" className="delivery-address-form-cancel" onClick={() => setIsAddingAddress(false)}>Cancelar</button><button type="submit" className="primary-action">Guardar domicilio</button></div></form> : <button type="button" className="add-delivery-address" onClick={() => setIsAddingAddress(true)}><Plus size={16} />Agregar nuevo domicilio</button>}<div className="delivery-cost-card"><div><span className="delivery-cost-kicker">{isTransport ? 'MODALIDAD FUERA DE AMBA' : 'MODALIDAD DE ENTREGA'}</span><h3>{isExpressDelivery ? 'Envío express' : isTransport ? 'Despacho a transporte' : 'Envío'}</h3><p>{isExpressDelivery ? 'Entrega prioritaria con precio final, sin IVA.' : isTransport ? 'Tu pedido se despacha al transporte que elijas. El costo es final y no suma IVA.' : 'Entregamos en CABA y AMBA. El costo es final y no suma IVA.'}</p></div><strong>{money(deliveryCost)}</strong></div>{selected.province === 'CABA' && <label className={`delivery-express-option ${express ? 'is-selected' : ''}`}><input type="checkbox" checked={express} onChange={(event) => setExpress(event.target.checked)} /><span><b>Agregar envío express</b><small>Precio final: {money(expressDeliveryCost)}. Reemplaza el envío estándar y no suma IVA.</small></span><img className="delivery-express-logo" src="/logo-express.svg" alt="Logo de Envío Express" /></label>}</>}{deliveryMode === 'pickup' &&     <div className="pickup-choice"><h3>Retiro por depósito</h3><fieldset className="pickup-service-options"><legend>Elegí una opción de retiro</legend><label className={`pickup-service-option ${!pickupExpress ? 'selected' : ''}`}><input type="radio" name="pickup-service" checked={!pickupExpress} onChange={() => setPickupExpress(false)} /><span><b>Retiro normal</b><small>Retiro por depósito en horario habitual.</small></span></label><label className={`pickup-service-option pickup-service-option-express ${pickupExpress ? 'selected' : ''}`}><input type="radio" name="pickup-service" checked={pickupExpress} onChange={() => setPickupExpress(true)} /><span><b>Retiro express</b><small>Hacé tu pedido y retiralo 3 horas después.<br /><br />Lunes a viernes: 8:30 a 14 hs y 15 a 17 hs.<br /><br />Después de las 14 hs, pasa al siguiente día hábil. No tiene costo adicional.</small></span><img src="/logo-express.svg" alt="Express" /></label></fieldset></div>}<label className="checkout-notes"><span>Notas del pedido (opcional)</span><textarea placeholder="Indicaciones para la entrega" rows={3} /></label></div>}</section><aside className="checkout-summary"><div className="checkout-summary-heading"><h2>Total del carrito</h2><span>Valores mayoristas</span></div><div className="summary-lines"><p>Subtotal <strong>{money(subtotal)}</strong></p>{step === 2 && <p>{deliveryLabel} <strong>{money(deliveryCost)}</strong></p>}<p>IVA <strong>{money(iva)}</strong></p><div className="summary-total"><span>Total</span><strong>{money(total)}</strong></div></div><div className="checkout-step-actions">{step === 2 && <button type="button" className="checkout-back-step" onClick={() => router.push('/checkout')}>Volver al pedido</button>}{step === 1 && <button type="button" className="primary-action checkout-continue-button" onClick={() => router.push('/checkout/entrega')} disabled={items.length === 0}>Continuar con la entrega <ArrowRight size={16} /></button>}{step === 2 && <button type="button" className="primary-action checkout-confirm-button" onClick={() => { clearCart(); router.push('/checkout/confirmacion') }}>Confirmar pedido <ArrowRight size={16} /></button>}</div></aside></div><SiteFooter showContact={false} /></main>
}
