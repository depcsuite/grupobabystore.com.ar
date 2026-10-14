'use client'

import { CheckCircle2, Mail, MapPin, Menu, MessageCircle, Phone, Search, Send, X } from 'lucide-react'
import { PromoTopbar } from '@/components/promo-topbar'
import { FormEvent, useState } from 'react'
import { useAuthSession } from '@/components/auth-session-sync'
import { AccountMenu } from '@/components/account-menu'

export default function ContactoPage() {
  const [sent, setSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { isLoggedIn } = useAuthSession()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <main className="site-shell contact-page">
      <PromoTopbar />
      <header className="site-header">
        <div className="header-inner"><button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><a className="brand" href="/" aria-label="Grupo Baby Store inicio"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store distribuidor oficial" /></a><nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal"><a href="/">Inicio</a><a href="/productos">Productos</a><a href="/nosotros">Nosotros</a><a href="/como-comprar">Cómo comprar</a><a className="active" href="/contacto">Contacto</a></nav><div className="header-actions"><AccountMenu /><button className="icon-button" type="button" aria-label="Buscar"><Search size={18} /></button></div></div>
      </header>

      <section className="contact-content contact-unified">
        <div className="contact-unified-info"><div className="eyebrow">ESTAMOS PARA AYUDARTE</div><h2>Hablemos de<br /><span>tu negocio.</span></h2><p>Si tenés dudas o consultas, escribinos. Un asesor comercial te va a responder a la brevedad.</p><div className="contact-details"><a href="mailto:info@grupobabystore.com.ar"><Mail /> info@grupobabystore.com.ar</a><a href="tel:+5491125636000"><Phone /> +54 9 11 2563-6000</a><span><MapPin /> Palpa 3824/28 · Chacarita · CABA</span></div></div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-heading"><div><div className="eyebrow">CONTACTO</div><h2>Escribínos</h2></div><Phone className="form-heading-icon" /></div>
          <label>Nombre(*)<input name="nombre" required placeholder="Tu nombre" /></label>
          <div className="form-row"><label>Email(*)<input type="email" name="email" required placeholder="tu@email.com" /></label><label>Teléfono<input name="telefono" placeholder="Tu teléfono" /></label></div>
          <label>Mensaje(*)<textarea name="mensaje" required placeholder="¿En qué podemos ayudarte?" rows={5} /></label>
          {sent && <p className="contact-success" role="status"><CheckCircle2 size={18} /> Gracias por escribirnos. Nos pondremos en contacto pronto.</p>}
          <button className="primary-button" type="submit">Enviar consulta <Send size={16} /></button>
        </form>
      </section>
      <footer><div className="footer-brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /><p>El mayorista más completo de productos para bebés.</p></div><div className="footer-links"><a href="/">Inicio</a><a href="/nosotros">Nosotros</a><a href="/productos">Productos</a><a href="/como-comprar">Cómo comprar</a><a href="/">Inicio</a><a href="/contacto">Contacto</a></div><form className="footer-subscribe" onSubmit={(event) => event.preventDefault()}><strong>Recibí nuestras novedades</strong><span>Ingresá tu email y enterate primero.</span><div><input type="email" required placeholder="tu@email.com" aria-label="Email para suscribirse" /><button type="submit">Suscribirme</button></div></form><div className="footer-legal">© {new Date().getFullYear()} Grupo Baby Store<br />Distribuidor oficial</div></footer>
    </main>
  )
}
