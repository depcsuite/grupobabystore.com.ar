'use client'

import { ArrowRight, Clock3, MapPin, Menu, PackageCheck, ShoppingBag, Truck, X } from 'lucide-react'
import { useState } from 'react'

export default function EnvioExpressPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="site-shell express-page">
      <a className="promo-bar" href="/envio-express" aria-label="Conocé los envíos y retiros express"><span>Hacé tu pedido y <strong>retiralo o recibilo en el mismo día</strong></span><ArrowRight size={14} /></a>
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          <a className="brand" href="/" aria-label="Grupo Baby Store inicio"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store distribuidor oficial" /></a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal"><a href="/nosotros">Nosotros</a><a href="/productos">Productos</a><a href="/iniciar-sesion">Hacé tu pedido</a><a href="/como-comprar">Cómo comprar</a><a href="/contacto">Contacto</a><a className="header-cart" href="/productos" aria-label="Abrir carrito">Carrito</a></nav>
          
        </div>
      </header>

      <section className="express-page-hero"><div className="eyebrow">NOVEDAD · ENVÍOS Y RETIROS EXPRESS</div><h1>¿Necesitás tu pedido<br /><span>para hoy?</span></h1><p>Hacé tu pedido antes del mediodía y elegí cómo recibirlo o retirarlo en el mismo día.</p></section>
      <section className="express-details"><div className="express-intro"><div className="eyebrow">TE CONTAMOS LOS DETALLES</div><h2>Resolvé tu compra<br /><span>sin esperar.</span></h2><p>Con nuestras nuevas modalidades express podés recibir tu pedido o retirarlo por nuestro depósito de forma rápida y simple.</p></div><div className="express-options"><article className="express-option"><div className="express-option-icon"><Truck /></div><div><h3>Entregas y envíos</h3><p>Disponible para CABA y los cordones cercanos.</p><ul><li><strong>CABA</strong><span>$10.000</span></li><li><strong>1er cordón</strong><span>$12.000</span></li><li><strong>2do cordón</strong><span>$15.000</span></li></ul><p className="express-note"><Clock3 size={15} /> Pedidos antes de las 12 hs · Entrega de lunes a viernes de 15 a 20 hs.</p></div></article><article className="express-option"><div className="express-option-icon"><MapPin /></div><div><h3>Retiros por depósito</h3><p>Hacé tu pedido y retiralo 3 horas después en <strong>Palpa 3828</strong>.</p><p className="express-note"><Clock3 size={15} /> Lunes a viernes: 8:30 a 14 hs y 15 a 17 hs.</p><p className="express-note"><PackageCheck size={15} /> Después de las 14 hs, pasa al siguiente día hábil.</p></div></article></div></section>
      <section className="express-method"><div className="eyebrow">CÓMO SOLICITARLO</div><h2>Agregá la palabra <span>EXPRESS</span></h2><div className="method-grid"><article><b>01</b><h3>Elegí la modalidad</h3><p>Seleccioná “con entrega” o “retiro por depósito” al hacer tu pedido.</p></article><article><b>02</b><h3>Escribí EXPRESS</h3><p>En “Comentarios adicionales”, agregá la palabra EXPRESS.</p></article><article><b>03</b><h3>Avisale a tu comercial</h3><p>No te olvides de avisarle a tu asesor comercial para coordinarlo.</p></article></div></section>
      <section className="express-warning"><div><div className="eyebrow">IMPORTANTE</div><h2>Forma de pago</h2><p>Para los envíos express, el pago es únicamente por transferencia y debe realizarse antes de las 15 hs para poder cargarlo a la logística. Caso contrario, la entrega se coordina para el siguiente día hábil.</p></div><a className="primary-button" href="/iniciar-sesion">Hacé tu pedido <ArrowRight size={17} /></a></section>
      <section className="express-contact"><strong>Ante cualquier duda, consultá a tu asesor comercial.</strong><a href="/iniciar-sesion">Comenzar pedido <ArrowRight size={16} /></a></section><footer><div className="footer-brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /><p>El mayorista más completo de productos para bebés.</p></div><div className="footer-links"><a href="/nosotros">Nosotros</a><a href="/productos">Productos</a><a href="/como-comprar">Cómo comprar</a><a href="/contacto">Contacto</a></div><div className="footer-legal">© {new Date().getFullYear()} Grupo Baby Store<br />Distribuidor oficial</div></footer>
    </main>
  )
}
