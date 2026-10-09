'use client'

import { ArrowRight, Mail, MapPin, Menu, Phone, Search, ShoppingBag, Sparkles, X } from 'lucide-react'
import { useState } from 'react'

const steps = [
 { number: '01', title: 'Registrate', text: 'Completá tus datos para que podamos validar tu cuenta comercial.' },
 { number: '02', title: 'Te contactamos', text: 'Un asesor de ventas se pondrá en contacto para avanzar con tu registro y ayudarte.' },
 { number: '03', title: 'Ingresá a tu cuenta', text: 'Una vez activado tu acceso, ingresá a tu área de cliente con tu usuario y contraseña.' },
 { number: '04', title: 'Hacé tu pedido', text: 'Elegí los productos que necesita tu negocio y enviá tu pedido mayorista online.' }
]

export default function ComoComprarPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="site-shell">
      <a className="promo-bar" href="/como-comprar" aria-label="Cómo hacer tu pedido en tres pasos"><Sparkles size={14} /> <span>Hacé tu pedido y <strong>retiralo o recibilo en el mismo día</strong></span><ArrowRight size={14} /></a>
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          <a className="brand" href="/" aria-label="Grupo Baby Store inicio"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store distribuidor oficial" /></a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
            <a href="/nosotros">Nosotros</a><a href="/productos">Productos</a><a href="/como-comprar">Cómo comprar</a><a href="/showroom">Showroom</a><a href="/contacto">Contacto</a></nav><div className="header-actions"><a className="header-login" href="/iniciar-sesion"><ShoppingBag size={16} /> INGRESAR</a><button aria-label="Buscar" className="icon-button" type="button"><Search /></button></div>
        </div>
      </header>

<section className="buy-hero"><div className="eyebrow">GUÍA PARA CLIENTES MAYORISTAS</div><h1>Hacé tu pedido en<br /><span>simples pasos.</span></h1><p>Registrarte es el primer paso para acceder a nuestro catálogo, recibir asesoramiento y hacer crecer tu negocio.</p></section>
<section className="buy-steps"><div className="buy-heading"><div className="eyebrow">CÓMO FUNCIONA</div><h2>Tu próxima compra<br /><span>empieza acá.</span></h2><p>Un proceso simple y acompañado para que puedas comprar al por mayor sin perder tiempo.</p></div><div className="steps-grid">{steps.map((step) => <article className="step-card" key={step.number}><div className="step-number">{step.number}</div><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></section><section className="express-banner-section how-express-section"><div className="express-seo-copy"><img className="express-block-logo" src="/logo-express.svg" alt="Express" /><div><div className="eyebrow">SERVICIO EXPRESS</div><h2>Envíos y retiros express<br /><span>para tu negocio.</span></h2><p>Hacé tu pedido mayorista antes del mediodía y retiralo o recibilo en el mismo día.</p></div><a className="express-seo-link" href="/envio-express">Ver zonas, horarios y condiciones <ArrowRight size={16} /></a></div></section>
      <section className="contact-section" id="contacto"><div><div className="eyebrow">ESTAMOS PARA AYUDARTE</div><h2>Hablemos de<br /><span>tu negocio.</span></h2><p>Si tenés dudas o consultas, escribinos. Un asesor comercial te va a responder a la brevedad.</p></div><div className="contact-details"><a href="mailto:info@grupobabystore.com.ar"><Mail /> info@grupobabystore.com.ar</a><a href="tel:+5491125636000"><Phone /> +54 9 11 2563-6000</a><span><MapPin /> Palpa 3824/28 · Chacarita · CABA</span></div></section>
          <footer><div className="footer-brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /><p>El mayorista más completo de productos para bebés.</p></div><div className="footer-links"><a href="/nosotros">Nosotros</a><a href="/#marcas">Marcas</a><a href="/como-comprar">Cómo comprar</a><a href="/contacto">Contacto</a></div><form className="footer-subscribe" onSubmit={(event) => event.preventDefault()}><strong>Recibí nuestras novedades</strong><span>Ingresá tu email y enterate primero.</span><div><input type="email" required placeholder="tu@email.com" aria-label="Email para suscribirse" /><button type="submit">Suscribirme</button></div></form><div className="footer-legal">© 2025 Grupo Baby Store<br />Distribuidor oficial</div></footer>
    </main>
  )
}
