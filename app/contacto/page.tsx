'use client'

import { ArrowRight, CheckCircle2, Mail, MapPin, Menu, MessageCircle, Phone, Send, ShoppingBag, X } from 'lucide-react'
import { FormEvent, useState } from 'react'

export default function ContactoPage() {
  const [sent, setSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <main className="site-shell contact-page">
      <a className="promo-bar" href="/como-comprar" aria-label="Cómo hacer tu pedido en tres pasos"><span>Hacé tu pedido y <strong>retiralo o recibilo en el mismo día</strong></span><ArrowRight size={14} /></a>
      <header className="site-header">
        <div className="header-inner"><button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><a className="brand" href="/" aria-label="Grupo Baby Store inicio"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store distribuidor oficial" /></a><nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal"><a href="/nosotros">Nosotros</a><a href="/productos">Productos</a><a href="/como-comprar">Cómo comprar</a><a href="/showroom">Showroom</a><a className="active" href="/contacto">Contacto</a></nav><div className="header-actions"><a className="header-login" href="/iniciar-sesion"><ShoppingBag size={16} /> INGRESAR</a></div></div>
      </header>

      <section className="contact-faq"><div className="contact-faq-intro"><div className="eyebrow">CENTRO DE AYUDA</div><h1>Encontrá respuestas<br /><span>rápidamente.</span></h1><p>Reunimos las consultas más frecuentes para que puedas resolver lo que necesitás rápidamente.</p></div><div className="section-heading"><div><div className="eyebrow">PREGUNTAS FRECUENTES</div><h2>Resolvemos tus dudas</h2></div><p>Respuestas rápidas para comprar mejor.</p></div><div className="faq-grid"><details open><summary>¿Cómo hago un pedido mayorista?<span>+</span></summary><p>Ingresá al catálogo, agregá productos al carrito y completá el checkout con la modalidad de entrega o retiro.</p></details><details><summary>¿Los precios incluyen IVA?<span>+</span></summary><p>No. Todos los precios del catálogo son sin IVA. En el checkout se adiciona el IVA del 21% al final.</p></details><details><summary>¿Hacen entregas express?<span>+</span></summary><p>Sí. Seleccioná envío a domicilio y escribí EXPRESS en comentarios. Consultá zonas y horarios en la sección express.</p></details><details><summary>¿Puedo retirar mi pedido?<span>+</span></summary><p>Sí, podés elegir retiro por depósito en Palpa 3828 y te indicaremos cuándo está disponible.</p></details></div></section>
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
      <footer><div className="footer-brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /><p>El mayorista más completo de productos para bebés.</p></div><div className="footer-links"><a href="/nosotros">Nosotros</a><a href="/productos">Productos</a><a href="/como-comprar">Cómo comprar</a><a href="/showroom">Showroom</a><a href="/contacto">Contacto</a></div><form className="footer-subscribe" onSubmit={(event) => event.preventDefault()}><strong>Recibí nuestras novedades</strong><span>Ingresá tu email y enterate primero.</span><div><input type="email" required placeholder="tu@email.com" aria-label="Email para suscribirse" /><button type="submit">Suscribirme</button></div></form><div className="footer-legal">© {new Date().getFullYear()} Grupo Baby Store<br />Distribuidor oficial</div></footer>
    </main>
  )
}
