'use client'

import { useState } from 'react'
import { Baby, Droplets, Gamepad2, Milk, ShoppingBag } from 'lucide-react'
import { AccountMenu } from '@/components/account-menu'
import { PromoTopbar } from '@/components/promo-topbar'
import { categories, featuredBrands } from '@/app/page'

function CategoryIcon({ name }: { name: string }) {
  const Icon = name === 'milk' ? Milk : name === 'baby' ? Baby : name === 'droplets' ? Droplets : name === 'gamepad' ? Gamepad2 : ShoppingBag
  return <Icon aria-hidden="true" />
}

const normalizeBrand = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f.'’\s]/g, '').toLowerCase()
const getBrandAsset = (name: string) => featuredBrands.find((brand) => {
  const requested = normalizeBrand(name)
  const available = normalizeBrand(brand.name)
  return available.includes(requested) || requested.includes(available)
})

export default function HaceTuPedidoPage() {
  const [activeCategory, setActiveCategory] = useState('Todas')

  return (
    <main className="site-shell order-page">
      <PromoTopbar />
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="Grupo Baby Store inicio">
            <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store distribuidor oficial" />
          </a>
          <nav className="main-nav" aria-label="Navegación principal">
            <a href="/">Inicio</a><a href="/productos">Productos</a><a href="/nosotros">Nosotros</a><a href="/como-comprar">Cómo comprar</a><a href="/contacto">Contacto</a>
          </nav>
          <div className="header-actions"><AccountMenu /></div>
        </div>
      </header>

      <section className="order-page-intro">
        <div className="eyebrow">CATÁLOGO MAYORISTA</div>
        <h1>Hacé tu pedido</h1>
        <p>Elegí una categoría o explorá nuestras marcas para encontrar todo lo que necesitás para tu negocio.</p>
      </section>

      <section className="brands-section order-page-catalog" aria-label="Categorías de productos">
        <div className="brand-category-filters" role="tablist" aria-label="Filtrar marcas por categoría">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'Todas'}
            className={activeCategory === 'Todas' ? 'is-active' : ''}
            onClick={() => setActiveCategory('Todas')}
          >
            <ShoppingBag aria-hidden="true" />
            Todas
          </button>
          {categories.map((category) => (
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === category.label}
              className={activeCategory === category.label ? 'is-active' : ''}
              onClick={() => setActiveCategory(category.label)}
              key={category.label}
            >
              <CategoryIcon name={category.icon} />
              {category.label}
            </button>
          ))}
        </div>
        <div className="brand-category-list" aria-label="Marcas agrupadas por categoría">
          {categories
            .filter((category) => activeCategory === 'Todas' || activeCategory === category.label)
            .map((category) => (
              <section className={`brand-category brand-category-${category.color}`} key={category.label} aria-labelledby={`pedido-${category.label}`}>
                <div className="brand-category-heading"><div className="brand-category-title"><CategoryIcon name={category.icon} /><h3 id={`pedido-${category.label}`}>{category.label}</h3></div><p>Elegí una marca para ver sus productos</p></div>
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

      <footer><div className="footer-brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /><p>El mayorista más completo de productos para bebés.</p></div><div className="footer-links"><a href="/">Inicio</a><a href="/productos">Productos</a><a href="/nosotros">Nosotros</a><a href="/como-comprar">Cómo comprar</a><a href="/contacto">Contacto</a></div><div className="footer-legal">© {new Date().getFullYear()} Grupo Baby Store<br />Distribuidor oficial</div></footer>
    </main>
  )
}
