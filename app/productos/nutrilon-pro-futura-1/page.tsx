'use client'

import { useState } from 'react'
import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  X,
} from 'lucide-react'
import { AccountMenu } from '@/components/account-menu'
import { PromoTopbar } from '@/components/promo-topbar'
import { useAuthSession } from '@/components/auth-session-sync'
import { useCart } from '@/components/cart-context'

const product = {
  id: 'nutrilon-pro-futura-1',
  name: 'Promo 19% OFF Nutrilon Profutura 1 Brick x 200 ml',
  shortName: 'Nutrilon Profutura 1 Brick x 200 ml',
  code: 'AA NUT 1 BRICK PR',
  price: 1808,
  originalPrice: 2232,
  packItems: 4,
  image: '/hero-nutrilon-1.jpg',
  availability: 'out_of_stock',
}

const money = (value: number) => `$${value.toLocaleString('es-AR', { minimumFractionDigits: 2 })}`

const relatedProducts = [
  { id: 'nutrilon-2', name: 'Nutrilon Profutura 2 Brick x 200 ml', code: 'AA NUT 2 BRICK PR', price: 1912, image: '/hero-nutrilon-1.jpg', availability: 'in_stock' },
  { id: 'nutrilon-confort', name: 'Nutrilon Confort 1 Brick x 200 ml', code: 'AA NUT CONF BRICK', price: 1874, image: '/hero-nutrilon-1.jpg', availability: 'in_stock' },
  { id: 'nutrilon-premium', name: 'Nutrilon Premium 1 Brick x 200 ml', code: 'AA NUT PREM BRICK', price: 1750, image: '/hero-nutrilon-1.jpg', availability: 'in_stock' },
  { id: 'nutrilon-3', name: 'Nutrilon Profutura 3 Brick x 200 ml', code: 'AA NUT 3 BRICK PR', price: 1986, image: '/hero-nutrilon-1.jpg', availability: 'out_of_stock' },
]

export default function ProductDetailPage() {
  const { addItem, count } = useCart()
  const { isLoggedIn, isReady } = useAuthSession()
  const canSeePricing = isReady && isLoggedIn
  const isOutOfStock = product.availability === 'out_of_stock'
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [quantity, setQuantity] = useState(isOutOfStock ? 0 : product.packItems)
  const [added, setAdded] = useState(false)

  const changeQuantity = (next: number) => setQuantity(Math.max(product.packItems, next))
  const addToCart = () => {
    if (isOutOfStock) return
    addItem(product)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <main className="site-shell product-detail-shell">
      <PromoTopbar />
      <header className="site-header">
        <div className="header-inner">
          <button className="mobile-menu" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
          <a className="brand" href="#inicio" aria-label="Grupo Baby Store inicio">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store distribuidor oficial" />
          </a>
          <nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal">
            <a href="/">Inicio</a>
            <a href="/productos">Productos</a>
            <a href="/nosotros">Nosotros</a>
            <a href="/como-comprar">Cómo comprar</a>
            <a href="/contacto">Contacto</a>
            <AccountMenu variant="mobile" />
          </nav>
          <div className="header-actions">
            <AccountMenu />
            <button aria-label="Buscar" className="icon-button" onClick={() => setSearchOpen(!searchOpen)}><Search /></button>
          </div>
        </div>
        {searchOpen && <div className="search-row"><Search size={18} /><input autoFocus placeholder="Buscá una marca o producto" aria-label="Buscar una marca o producto" /><button onClick={() => setSearchOpen(false)} aria-label="Cerrar búsqueda"><X size={18} /></button></div>}
      </header>

      <div className="product-detail-wrap">
        <nav className="product-detail-breadcrumb" aria-label="Migas de pan"><a href="/productos"><ArrowLeft size={15} /> Volver a productos</a><span>/</span><span>Nutrilon · Etapa 1</span></nav>
        <section className="product-hero-card">
          <div className="product-hero-media">
            <span className="product-offer-label">OFERTA MAYORISTA</span>
            <img src={product.image} alt={product.shortName} />
          </div>
          <div className="product-hero-copy">
            <p className="product-kicker">NUTRILON / ETAPA 1 / PROMOCIÓN</p>
            <h1>{product.name}</h1>
            <p className="product-code-line">Código: {product.code}</p>
            {canSeePricing ? (
              <div className="product-price-block">
                <span className="product-old-price">{money(product.originalPrice)}</span>
                <strong>{money(product.price)}</strong>
                <small>+ IVA</small>
              </div>
            ) : (
              <div className="product-login-required">
                <strong>Iniciá sesión para ver el precio</strong>
                <span>Los precios mayoristas están disponibles para clientes registrados.</span>
              </div>
            )}
            {!isOutOfStock && (
              <div className="product-pack-note">
                <span>Pack mayorista</span>
                <strong>{product.packItems} unidades por bulto</strong>
              </div>
            )}
            <p className="product-description">Nueva fórmula avanzada con prebióticos GOS/FOS y postbiótico HMO para acompañar la nutrición infantil. Una presentación práctica para sumar a tu catálogo mayorista.</p>
            {canSeePricing && (
              <div className={`product-stock${isOutOfStock ? ' is-out-of-stock' : ''}`} role="status">
                {isOutOfStock ? <X size={16} /> : <Check size={16} />}
                {isOutOfStock ? 'Agotado' : 'Hay existencias disponibles'}
              </div>
            )}
            {isOutOfStock && canSeePricing ? (
              <p className="product-unavailable-note" role="status">
                Este producto no está disponible para agregar al carrito.
              </p>
            ) : canSeePricing ? <>
              <div className="product-buy-row">
                <div className="product-detail-stepper" aria-label="Cantidad de unidades">
                  <button type="button" onClick={() => changeQuantity(quantity - product.packItems)} disabled={quantity <= product.packItems} aria-label="Disminuir cantidad"><Minus size={15} /></button>
                  <strong>{quantity}</strong>
                  <button type="button" onClick={() => changeQuantity(quantity + product.packItems)} aria-label="Aumentar cantidad"><Plus size={15} /></button>
                </div>
                <button className={`product-add-button${added ? ' is-added' : ''}`} type="button" onClick={addToCart}>{added ? <><Check size={17} /> Agregado</> : <><ShoppingBag size={17} /> Agregar al carrito</>}</button>
              </div>
              <small className="product-buy-hint">La cantidad se modifica en múltiplos de {product.packItems}, según el pack.</small>
            </> : <a className="product-login-button" href="/iniciar-sesion">Iniciar sesión para comprar</a>}
          </div>
        </section>

        <section className="product-detail-info-grid"><article><p className="product-kicker">DETALLE DEL PRODUCTO</p><h2>Nutrición pensada para cada etapa</h2><p>Nutrilon Profutura 1 acompaña la alimentación del bebé desde sus primeros meses, con una fórmula avanzada y una presentación lista para ofrecer.</p></article><aside><div><span>Presentación</span><strong>Brick x 200 ml</strong></div><div><span>Marca</span><strong>Nutrilon</strong></div><div><span>Categoría</span><strong>Fórmulas Infantiles</strong></div></aside></section>

        <section className="related-products-section" aria-labelledby="related-products-title">
          <div className="related-products-heading"><div><p className="product-kicker">TAMBIÉN TE PUEDE INTERESAR</p><h2 id="related-products-title">Otras personas también vieron</h2></div><div className="related-products-controls"><button type="button" aria-label="Productos anteriores"><ChevronLeft size={17} /></button><button type="button" aria-label="Productos siguientes"><ChevronRight size={17} /></button></div></div>
          <div className="related-products-track">
            {relatedProducts.map((item) => {
              const isRelatedOutOfStock = item.availability === 'out_of_stock'
              return (
                <article className="novelty-card related-product-card" key={item.id}>
                  <div className="novelty-image related-product-image">
                    {(!isRelatedOutOfStock || canSeePricing) && (
                      <span className={isRelatedOutOfStock ? 'is-out-of-stock' : undefined}>
                        {isRelatedOutOfStock ? 'AGOTADO' : 'NUEVO'}
                      </span>
                    )}
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="novelty-card-body">
                    <h2 className="novelty-product-title">{item.name}</h2>
                    <small className="novelty-product-code">Código: {item.code}</small>
                    {!isRelatedOutOfStock && <span className="pack-quantity">Pack de 4 unidades</span>}
                    {isRelatedOutOfStock && canSeePricing ? (
                      <>
                        <strong className="related-product-out-of-stock-price">
                          {money(item.price)} <small>+ IVA</small>
                        </strong>
                        <span className="related-product-unavailable" role="status">
                          No disponible para agregar
                        </span>
                      </>
                    ) : canSeePricing ? (
                      <>
                        <strong>{money(item.price)}</strong>
                        <button type="button" onClick={() => addItem({ ...item, packItems: 4 })}>
                          <ShoppingBag size={15} /> Agregar al carrito
                        </button>
                      </>
                    ) : (
                      <a className="related-login-link" href="/iniciar-sesion">
                        Iniciar sesión para comprar
                      </a>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      </div>

      <a className="floating-cart-button product-floating-cart" href="/checkout" aria-label={`Abrir carrito con ${count} productos`}><ShoppingCart size={20} /><span>Carrito</span>{count > 0 && <b>{count}</b>}</a>

      <footer><div className="footer-brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /><p>El mayorista más completo de productos para bebés.</p></div><div className="footer-links"><a href="/nosotros">Nosotros</a><a href="/productos">Productos</a><a href="/como-comprar">Cómo comprar</a><a href="/contacto">Contacto</a></div><div className="footer-legal">© {new Date().getFullYear()} Grupo Baby Store<br />Distribuidor oficial</div></footer>
    </main>
  )
}
