'use client'

import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Mail,
  MapPin,
  Baby,
  Droplets,
  Gamepad2,
  Milk,
  Menu,
  MessageCircle,
  PackageCheck,
  Phone,
  Search,
  ShoppingBag,
  Truck,
  X,
} from 'lucide-react'
import { useAuthSession } from '@/components/auth-session-sync'
import { AccountMenu } from '@/components/account-menu'
import { PromoTopbar } from '@/components/promo-topbar'
import { featuredBrands, getBrandAsset } from '@/lib/brand-assets'
export { featuredBrands }

const banners = [
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-3-nMCDkwzmsiYHsuoGqPfpwTtqmv6gHQ.webp',
    alt: 'Lanzamiento de cosméticos Chicco POP y accesorios para bebés',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-1-cDOSbIo8GvpKSaFkl2fkLi2WHZSGH0.webp',
    alt: 'Nuevo ingreso Philips Avent Natural Response Glow',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-2-ixxZSWlIn8Af1bJKSbqfC8YUqB2dSp.webp',
    alt: 'Nuevo ingreso de productos NUK',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-8-vwow9a7Vu9eP4QKsIkk1u67ey8mUDi.webp',
    alt: 'Nuevo ingreso D.E.M.A. de fajas pre y post parto',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-7-MQocdSfoeEjRQo2Wy4yCZnJnKpquE9.webp',
    alt: 'Nuevos ingresos NUK: mamaderas, tetinas y chupetes',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-6-B2bT2eATNtPh9Pln4WAuPCBg1ogkSw.webp',
    alt: 'Promoción 20% off en alfombras antigolpes OK Baby',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-5-Mti7MaBMNuW6kaBKCtdDGCNueMWQDB.webp',
    alt: 'Distribuidor exclusivo Suavinex Argentina',
  },
  {
    src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/banner-4-MRKmA9XbT8DVnN8doI80ClHCslyugk.webp',
    alt: 'Distribuidor oficial Nestum y NIDO',
  },
]



export const categories = [
  { label: 'Leches Infantiles', icon: 'milk', color: 'coral', brands: ['Nutrilon', 'Vital', 'Serenísima', 'Sancor', 'Nestle', 'Nidina', 'Nido', 'Nestum'] },
  { label: 'Puericultura Liviana', icon: 'baby', color: 'sky', brands: ['Avent', 'Nuk', 'Lansinoh', 'Chicco', 'Nuby', 'Bbox', 'Suavinex', 'Bibs', 'Lillo', 'Nursimom', 'Nursimom Baby', 'Baby Innovation', 'Loopi', 'Punti', 'Ingenuity', 'Minikoioi', 'Tatoon', 'Tramontina', 'Ok Baby', 'DEMA', 'A Wish Deco', 'Floating Baby', 'Min Renee', 'Baby Safe', 'Poco Piano'] },
  { label: 'Juguetes', icon: 'gamepad', color: 'coral', brands: ['Bright Stars', 'Baby Einstein', 'Woody Toys', 'Soft Blocks', "J'adore", 'Baby Favorite', 'Little Learner', 'Baby Sunki', 'Vtech', '5 sentidos', 'Bimbi', 'Duravit', 'Rondi', 'Juliana', 'Phi Phi toys', 'Bestway'] },
  { label: 'Hidratación', icon: 'droplets', color: 'mint', brands: ['Bubba', 'Contigo', 'Termy'] },
]

const categorySubtitles: Record<string, string> = {
  'Leches Infantiles': 'Nutrición y alimentación para cada etapa',
  'Puericultura Liviana': 'Soluciones prácticas para el día a día',
  Hidratación: 'Botellas y accesorios para acompañarlos siempre',
  Juguetes: 'Juego, aprendizaje y diversión',
}

function CategoryIcon({ name }: { name: string }) {
  const Icon = name === 'milk' ? Milk : name === 'baby' ? Baby : name === 'droplets' ? Droplets : name === 'gamepad' ? Gamepad2 : ShoppingBag
  return <Icon aria-hidden="true" />
}



export default function Page() {
  const [activeBanner, setActiveBanner] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showExpress, setShowExpress] = useState(false)
  const [showPromoPopup, setShowPromoPopup] = useState(true)
  const [brandSearch, setBrandSearch] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const { isLoggedIn } = useAuthSession()

  const [activeCategory, setActiveCategory] = useState('Todas')
  const nextBanner = () => setActiveBanner((current) => (current + 1) % banners.length)
  const previousBanner = () => setActiveBanner((current) => (current - 1 + banners.length) % banners.length)

  return (
    <main className="site-shell">
      <PromoTopbar />
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          <a className="brand" href="#inicio" aria-label="Grupo Baby Store inicio">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store distribuidor oficial" />
          </a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
  <a href="/">Inicio</a>
  <a href="/productos">Productos</a>
  <a href="/nosotros">Nosotros</a>
  <a href="/como-comprar">Cómo comprar</a>
  <a href="/contacto">Contacto</a>
</nav>
          <div className="header-actions">
            <AccountMenu /><button aria-label="Buscar" className="icon-button" onClick={() => setSearchOpen(!searchOpen)}><Search /></button>
          </div>
        </div>
        {searchOpen && <div className="search-row"><Search size={18} /><input autoFocus placeholder="Buscá una marca o producto" aria-label="Buscar una marca o producto" /><button onClick={() => setSearchOpen(false)}><X size={18} /></button></div>}
      </header>

      <section className="hero" id="inicio" aria-label="Novedades">
        <img src={banners[activeBanner].src} alt={banners[activeBanner].alt} />
        <button className="carousel-arrow left" aria-label="Banner anterior" onClick={previousBanner}><ChevronLeft /></button>
        <button className="carousel-arrow right" aria-label="Banner siguiente" onClick={nextBanner}><ChevronRight /></button>
        <div className="carousel-dots">{banners.map((banner, index) => <button key={banner.src} className={activeBanner === index ? 'active' : ''} aria-label={`Ir al banner ${index + 1}`} onClick={() => setActiveBanner(index)} />)}</div>
      </section>

      <section className="intro-section" id="nosotros">
        <div className="eyebrow">GRUPO BABY STORE · DISTRIBUIDOR OFICIAL</div>
        <h1>El mayorista más completo<br /><span>de productos para bebés.</span></h1>
        <p>Todo lo que tu negocio necesita, en un solo lugar. Marcas líderes, asesoramiento personalizado y una plataforma pensada para hacer crecer tu tienda.</p>
        <a className="primary-button" href="/iniciar-sesion">Empezá a comprar <ArrowRight size={17} /></a>
      </section>


      <section className="brands-section" id="marcas">
        <div className="section-heading"><div><div className="eyebrow">NUESTRO CATÁLOGO</div><h2>Marcas para cada etapa</h2></div><a href="/productos" className="text-link">Ver todos los productos <ArrowRight size={16} /></a></div>
        <p className="section-lead">Trabajamos con las marcas más importantes del mundo para que encuentres siempre lo mejor para tus clientes.</p>
<div className="brand-category-filters" role="tablist" aria-label="Filtrar marcas por categoría">
  <button type="button" role="tab" aria-selected={activeCategory === 'Todas'} className={activeCategory === 'Todas' ? 'is-active' : ''} onClick={() => setActiveCategory('Todas')}><ShoppingBag aria-hidden="true" />Todas</button>
  {categories.map((category) => <button type="button" role="tab" aria-selected={activeCategory === category.label} className={activeCategory === category.label ? 'is-active' : ''} onClick={() => setActiveCategory(category.label)} key={category.label}><CategoryIcon name={category.icon} />{category.label}</button>)}
</div>
<div className="brand-category-list" aria-label="Marcas agrupadas por categoría">
  {categories.filter((category) => activeCategory === 'Todas' || activeCategory === category.label).map((category) => (
            <section className={`brand-category brand-category-${category.color}`} key={category.label} aria-labelledby={`category-${category.label}`}>
              <div className="brand-category-heading"><div className="brand-category-title"><h3 id={`category-${category.label}`}>{category.label}</h3></div><p>{categorySubtitles[category.label]}</p></div>
              <div className="brand-logo-grid">
                {category.brands.map((brandName) => {
                  const brand = getBrandAsset(brandName)
                  return <a className="brand-logo-card" href={`/productos?marca=${encodeURIComponent(brandName)}`} key={brandName} aria-label={`Ver productos de ${brandName}`}><span className="brand-name-fallback">{brandName}</span>{brand && <img src={brand.src} alt={brandName} />}</a>
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      {isLoggedIn && <section className="express-banner-section" id="oportunidades"><div className="express-seo-copy"><img className="express-block-logo" src="/logo-express.svg" alt="Express: envíos y retiros en el mismo día" /><div><div className="eyebrow">SERVICIO EXPRESS</div><h2>Envíos y retiros express<br /><span>para tu negocio.</span></h2><p>Hacé tu pedido mayorista antes del mediodía y retiralo o recibilo en el mismo día.</p></div><a className="express-seo-link" href="/envio-express">Ver zonas, horarios y condiciones <ArrowRight size={16} /></a></div></section>}

      <section className="contact-section" id="contacto"><div><div className="eyebrow">ESTAMOS PARA AYUDARTE</div><h2>Hablemos de<br /><span>tu negocio.</span></h2><p>Si tenés dudas o consultas, escribinos. Un asesor comercial te va a responder a la brevedad.</p></div><div className="contact-details"><a href="mailto:info@grupobabystore.com.ar"><Mail /> info@grupobabystore.com.ar</a><a href="tel:+5491125636000"><Phone /> +54 9 11 2563-6000</a><span><MapPin /> Palpa 3824/28 · Chacarita, CABA</span><a className="whatsapp-link" href="https://wa.me/5491125636000"><MessageCircle /> Escribinos por WhatsApp <ArrowRight size={16} /></a></div></section>

      <footer><div className="footer-brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /><p>El mayorista más completo de productos para bebés.</p></div><div className="footer-links"><a href="/">Inicio</a><a href="/productos">Productos</a><a href="/nosotros">Nosotros</a><a href="/como-comprar">Cómo comprar</a><a href="/contacto">Contacto</a></div><form className="footer-subscribe" onSubmit={(event) => event.preventDefault()}><strong>Recibí nuestras novedades</strong><span>Ingresá tu email y enterate primero.</span><div><input type="email" required placeholder="tu@email.com" aria-label="Email para suscribirse" /><button type="submit">Suscribirme</button></div></form><div className="footer-legal">© {new Date().getFullYear()} Grupo Baby Store<br />Distribuidor oficial</div></footer>

      {showPromoPopup && <div className="promo-popup-backdrop" role="presentation" onClick={() => setShowPromoPopup(false)}><div className="promo-popup" role="dialog" aria-modal="true" aria-label="Nuevas promociones" onClick={(event) => event.stopPropagation()}><button className="promo-popup-close" aria-label="Cerrar promociones" onClick={() => setShowPromoPopup(false)}><X size={21} /></button><img src="/popup.webp" alt="Nuevas promociones de productos Nuby con hasta 35% de descuento" /></div></div>}

      {showExpress && <div className="modal-backdrop" role="presentation" onClick={() => setShowExpress(false)}><div className="express-modal" role="dialog" aria-modal="true" aria-labelledby="express-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" aria-label="Cerrar" onClick={() => setShowExpress(false)}><X /></button><div className="eyebrow">NOVEDAD</div><h2 id="express-title">Envíos y retiros <em>express</em></h2><p>Hacé tu pedido antes de las 12 del mediodía y te lo entregamos en el día.</p><div className="modal-row"><Truck /><div><b>Entregas / Envíos</b><span>CABA $10.000 · 1er cordón $12.000 · 2do cordón $15.000</span></div></div><div className="modal-row"><PackageCheck /><div><b>Retiros express</b><span>Retirá en Palpa 3828, 3 horas después de hacer tu pedido.</span></div></div><div className="modal-note">Seleccioná la modalidad y escribí <strong>EXPRESS</strong> en comentarios. No te olvides de avisarle a tu comercial.</div><a href="/iniciar-sesion" className="primary-button" onClick={() => setShowExpress(false)}>Hacer mi pedido <ArrowRight size={17} /></a></div></div>}
    </main>
  )
}
