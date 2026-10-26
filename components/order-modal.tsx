'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Baby, Droplets, Gamepad2, Milk, Search, ShoppingBag, X } from 'lucide-react'

const categories = [
  { label: 'Leches Infantiles', icon: 'milk', brands: ['Nutrilon', 'Vital', 'Serenísima', 'Sancor', 'Nestle', 'Nidina', 'Nido', 'Nestum'] },
  { label: 'Puericultura Liviana', icon: 'baby', brands: ['Avent', 'Nuk', 'Lansinoh', 'Chicco', 'Nuby', 'Bbox', 'Suavinex', 'Bibs', 'Lillo', 'Nursimom', 'Nursimom Baby', 'Baby Innovation', 'Loopi', 'Punti', 'Ingenuity', 'Minikoioi', 'Tatoon', 'Tramontina', 'Ok Baby', 'DEMA', 'A Wish Deco', 'Floating Baby', 'Min Renee', 'Baby Safe', 'Poco Piano'] },
  { label: 'Juguetes', icon: 'gamepad', brands: ['Bright Stars', 'Baby Einstein', 'Woody Toys', 'Soft Blocks', "J'adore", 'Baby Favorite', 'Little Learner', 'Baby Sunki', 'Vtech', '5 sentidos', 'Bimbi', 'Duravit', 'Rondi', 'Juliana', 'Phi Phi toys', 'Bestway'] },
  { label: 'Hidratación', icon: 'droplets', brands: ['Bubba', 'Contigo', 'Termy'] },
]

function CategoryIcon({ name }: { name: string }) {
  const Icon = name === 'milk' ? Milk : name === 'baby' ? Baby : name === 'droplets' ? Droplets : name === 'gamepad' ? Gamepad2 : ShoppingBag
  return <Icon aria-hidden="true" />
}

const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f.'’\s]/g, '').toLowerCase()

export function OrderModal() {
  const [open, setOpen] = useState(false)
  const [brandSearch, setBrandSearch] = useState('')
  useEffect(() => {
    const show = () => setOpen(true)
    window.addEventListener('open-order-modal', show)
    return () => window.removeEventListener('open-order-modal', show)
  }, [])
  if (!open) return null
  const brands = Array.from(new Set(categories.flatMap((category) => category.brands))).sort((a, b) => a.localeCompare(b, 'es', { sensitivity: 'base' }))
  const visibleBrands = brands.filter((brand) => normalize(brand).includes(normalize(brandSearch)))
  return <div className="modal-backdrop" role="presentation" onClick={() => setOpen(false)}><div className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title" onClick={(event) => event.stopPropagation()}><button className="modal-close" type="button" aria-label="Cerrar" onClick={() => setOpen(false)}><X /></button><div className="eyebrow">CATÁLOGO MAYORISTA</div><h2 id="order-title">Hacé tu pedido</h2><p>Elegí una categoría o marca para encontrar productos y comprar online.</p><div className="order-filter-section"><strong>Filtrar por categoría</strong><div className="order-filter-grid">{categories.map((category) => <a key={category.label} href={`/productos?categoria=${encodeURIComponent(category.label)}`} onClick={() => setOpen(false)}><CategoryIcon name={category.icon} /><span>{category.label}</span><ArrowRight size={14} /></a>)}</div></div><div className="order-filter-section"><strong>Filtrar por marca</strong><label className="order-brand-search"><Search size={16} aria-hidden="true" /><span className="sr-only">Buscar marca</span><input type="search" value={brandSearch} onChange={(event) => setBrandSearch(event.target.value)} placeholder="Buscá una marca" aria-label="Buscar una marca" /></label><div className="order-brand-list">{visibleBrands.map((brand) => <a key={brand} href={`/productos?marca=${encodeURIComponent(brand)}`} onClick={() => setOpen(false)}>{brand}</a>)}</div>{visibleBrands.length === 0 && <p className="order-no-results">No encontramos marcas con esa búsqueda.</p>}</div><a href="/productos" className="primary-button order-catalog-link" onClick={() => setOpen(false)}>Ver catálogo completo <ArrowRight size={16} /></a></div></div>
}
