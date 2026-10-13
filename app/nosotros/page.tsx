'use client'

import { ArrowRight, ChevronDown, Menu, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState } from 'react'

const values = ['Honestidad', 'Calidad', 'Proactividad', 'Responsabilidad', 'Integridad']
const foundingYear = 2014

export default function NosotrosPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => setIsLoggedIn(document.cookie.includes('gb_logged_in=1')), [])

  return (
    <main className="site-shell about-page">
      {isLoggedIn && <a className="promo-bar" href="/como-comprar" aria-label="Cómo hacer tu pedido en tres pasos"><img className="promo-logo-express" src="/logo-express.svg" alt="Express" /><span>Hacé tu pedido y <strong>retiralo o recibilo en el mismo día</strong></span><ArrowRight size={14} /></a>}
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          <a className="brand" href="/" aria-label="Grupo Baby Store inicio"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store distribuidor oficial" /></a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
            <a href="/">Inicio</a>
            <a href="/productos">Productos</a>
            <a className="active" href="/nosotros">Nosotros</a>
            <a href="/como-comprar">Cómo comprar</a>
            <a href="/contacto">Contacto</a>
          </nav><div className="header-actions"><a className="header-login" href={isLoggedIn ? '/cuenta' : '/iniciar-sesion'}>{isLoggedIn ? 'Mi cuenta' : <><ShoppingBag size={16} /> INGRESAR</>}</a></div>
        </div>
      </header>

      <section className="about-hero"><div className="eyebrow">GRUPO BABY STORE · DESDE {foundingYear}</div><h1>Desarrollamos negocios<br /><span>que acompañan familias.</span></h1><p>Somos aliados estratégicos de quienes trabajan para hacer crecer el mundo de los bebés.</p></section>

      <section className="about-intro"><div className="about-number">01</div><div className="about-years-badge"><strong>{new Date().getFullYear() - foundingYear}</strong><span>años desarrollando negocios</span></div><div><div className="eyebrow">QUIÉNES SOMOS</div><h2>Un equipo que conoce<br /><span>el rubro de verdad.</span></h2><p>Somos una empresa que nació en el año 2014 con un objetivo claro: ser referentes en el mercado como desarrolladores de negocios en el mundo de los bebés, comercializando las líneas de puericultura más importantes del mundo.</p><p>Hoy somos más de 20 personas trabajando día a día para sostener ese objetivo en el tiempo.</p></div></section>

      <section className="mission-grid"><article><div className="eyebrow">MISIÓN</div><h2>Hacemos crecer<br /><span>tu negocio.</span></h2><p>Brindar a nuestros clientes la puesta en marcha y crecimiento de sus negocios a través del asesoramiento y servicio personalizado, entregando cada día productos de calidad, permitiendo maximizar su rentabilidad sostenida en el tiempo.</p></article><article><div className="eyebrow">VISIÓN</div><h2>El futuro del<br /><span>desarrollo mayorista.</span></h2><p>Posicionarnos como la empresa más importante de Argentina en el desarrollo de negocios para Babystores, Farmacias, Pañaleras y afines, generando alianzas estratégicas que aseguren valor para nuestros clientes.</p></article></section>

      <section className="values-section"><div><div className="eyebrow">NUESTROS VALORES</div><h2>La forma en que<br /><span>trabajamos.</span></h2></div><div className="values-list">{values.map((value, index) => <div key={value}><span>0{index + 1}</span><strong>{value}</strong></div>)}</div></section>

      <section className="initiative-section"><div className="eyebrow">INICIATIVA</div><h2>Una solución integral<br /><span>en un solo lugar.</span></h2><div className="initiative-copy"><p>Grupo Baby Store nace en 2014 como un nuevo concepto en desarrollo de negocios en el mundo de los bebés, generando alianzas estratégicas con las marcas más importantes del mundo como Nutricia Bagó, Philips Avent, Chicco, Nuk, Nuby, Baby Innovation, Tramontina y muchos más.</p><p>Nuestra propuesta permite resolver las compras de productos en un solo lugar desde el celular o la computadora a través de nuestra exclusiva plataforma online, mejorando la experiencia del usuario.</p><p>Contamos con personal capacitado con más de 20 años en el rubro, ofreciendo asesoramiento profesional y personalizado para asegurar el crecimiento de cada cliente. Hoy, más de 500 clientes nos eligen en todo el país.</p></div><a className="primary-button" href="/#pedido">Trabajemos juntos <ArrowRight size={17} /></a></section>

      <section className="careers-section" id="postulaciones"><div className="careers-copy"><div className="eyebrow">SUMATE AL EQUIPO</div><h2>Creá tu próximo desafío<br /><span>con nosotros.</span></h2><p>Buscamos personas con iniciativa, compromiso y ganas de construir junto a nosotros el futuro del desarrollo de negocios para bebés.</p><div className="careers-note">Ante cualquier duda, escribinos y te contamos más sobre nuestra cultura y oportunidades.</div></div><form className="career-form" onSubmit={event => { event.preventDefault(); alert('Gracias por postularte. Recibimos tu información.') }}><div className="form-row"><label>Nombre y apellido<input required name="name" placeholder="Tu nombre completo" /></label><label>Email<input required type="email" name="email" placeholder="nombre@ejemplo.com" /></label></div><div className="form-row"><label>Teléfono<input name="phone" placeholder="11 1234 5678" /></label><label>LinkedIn<input type="url" name="linkedin" placeholder="https://linkedin.com/in/tu-perfil" /></label></div><label>Área de interés<select name="area" defaultValue=""><option value="" disabled>Elegí un área</option><option>Ventas y asesoramiento</option><option>Administración</option><option>Logística</option><option>Marketing</option><option>Otro</option></select></label><label className="cv-upload">Adjuntá tu CV<input required type="file" name="cv" accept=".pdf,.doc,.docx" /><small>PDF, DOC o DOCX · máximo 5 MB</small></label><label>Mensaje adicional<textarea name="message" placeholder="Contanos brevemente sobre vos" rows={4} /></label><button className="primary-button" type="submit">Enviar postulación <ArrowRight size={17} /></button></form></section>

      <footer><div className="footer-brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /><p>El mayorista más completo de productos para bebés.</p></div><div className="footer-links"><a href="/">Inicio</a><a href="/productos">Productos</a><a href="/nosotros">Nosotros</a><a href="/como-comprar">Cómo comprar</a><a href="/contacto">Contacto</a></div><form className="footer-subscribe" onSubmit={(event) => event.preventDefault()}><strong>Recibí nuestras novedades</strong><span>Ingresá tu email y enterate primero.</span><div><input type="email" required placeholder="tu@email.com" aria-label="Email para suscribirse" /><button type="submit">Suscribirme</button></div></form><div className="footer-legal">© {new Date().getFullYear()} Grupo Baby Store<br />Distribuidor oficial</div></footer>
    </main>
  )
}
