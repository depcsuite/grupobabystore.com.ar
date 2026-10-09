'use client'

import { ArrowRight, Clock3, MapPin, Menu, PackageCheck, Phone, Sparkles, X } from 'lucide-react'
import { useState } from 'react'
import { SiteFooter } from '@/components/site-footer'

export default function ShowroomPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <main className="site-shell showroom-page">
      <a className="promo-bar" href="/como-comprar" aria-label="Cómo hacer tu pedido en tres pasos"><Sparkles size={14} /> <span>Hacé tu pedido y <strong>retiralo o recibilo en el mismo día</strong></span><ArrowRight size={14} /></a>
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          <a className="brand" href="/" aria-label="Grupo Baby Store inicio"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /></a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal"><a href="/nosotros">Nosotros</a><a href="/productos">Productos</a><a href="/como-comprar">Cómo comprar</a><a className="active" href="/showroom">Showroom</a><a href="/contacto">Contacto</a></nav><div className="header-actions"><a className="header-login" href="/iniciar-sesion">INGRESAR</a></div>
        </div>
      </header>

      <section className="showroom-hero"><div className="showroom-hero-copy"><div className="eyebrow">VISITÁ NUESTRO ESPACIO</div><h1>Las mejores marcas,<br /><span>más cerca tuyo.</span></h1><p>Un showroom pensado para que conozcas los productos, compares opciones y encuentres el surtido ideal para tu negocio.</p><div className="showroom-actions"><a className="primary-button" href="https://maps.google.com/?q=Palpa+3828+CABA" target="_blank" rel="noreferrer">Cómo llegar <ArrowRight size={17} /></a><a className="text-link" href="tel:+5491125636000">Llamar al showroom</a></div></div><div className="showroom-hero-visual showroom-photo-slot"><div className="showroom-photo-placeholder"><PackageCheck size={28} /><strong>Foto del showroom</strong><span>Próximamente</span></div><div className="showroom-hero-stamp"><b>SHOW<br />ROOM</b><span>Palpa 3824</span></div></div></section>

      <section className="showroom-info"><div className="showroom-intro"><div className="eyebrow">UNA VISITA QUE SUMA</div><h2>Elegí con calma.<br /><span>Comprá con confianza.</span></h2><p>Acercate a conocer nuestro catálogo, ver los productos de cerca y conversar con nuestro equipo comercial.</p></div><div className="showroom-details"><div><MapPin size={20} /><span><small>Encontranos en</small>Palpa 3824/28 · Chacarita · CABA</span></div><div><Clock3 size={20} /><span><small>Horarios</small>Lunes a viernes · 9 a 17 hs</span></div><div><Phone size={20} /><span><small>Consultas</small>+54 9 11 2563-6000</span></div></div></section>

      <section className="showroom-visit"><div className="showroom-visit-heading"><div className="eyebrow">ANTES DE VENIR</div><h2>Todo listo para<br /><span>recibirte.</span></h2></div><div className="showroom-points"><article><b>01</b><h3>Traé tu lista</h3><p>Contanos qué estás buscando y te ayudamos a encontrar las mejores opciones.</p></article><article><b>02</b><h3>Conocé novedades</h3><p>Explorá lanzamientos, promociones y productos destacados de nuestras marcas.</p></article><article><b>03</b><h3>Recibí asesoramiento</h3><p>Te orientamos para que armes un surtido pensado para tu negocio.</p></article></div></section>

      <section className="showroom-cta"><div><div className="eyebrow">¿TENÉS DUDAS?</div><h2>Hablemos antes<br /><span>de tu visita.</span></h2></div><a className="primary-button" href="/contacto">Contactanos <ArrowRight size={17} /></a></section>
      <SiteFooter showContact={false} />
    </main>
  )
}
