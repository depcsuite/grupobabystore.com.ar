'use client'

import Link from 'next/link'
import { Menu, ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'
import { SiteFooter } from './site-footer'


export function AuthLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <main className="auth-page"><header className="site-header"><div className="header-inner"><button className="mobile-menu" aria-label="Abrir menú" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><Link href="/" className="brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /></Link><nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal"><Link href="/nosotros">Nosotros</Link><Link href="/productos">Productos</Link><Link href="/como-comprar">Cómo comprar</Link><Link href="/showroom">Showroom</Link><Link href="/contacto">Contacto</Link></nav><div className="header-actions"><Link className="header-login active" href="/iniciar-sesion"><ShoppingBag size={16} /> INGRESAR</Link></div></div></header><section className="auth-card">{children}</section><SiteFooter showContact={false} /></main>
}

export function AuthField({ label, type = 'text', placeholder }: { label: string; type?: string; placeholder: string }) {
  return <label className="auth-field"><span>{label}</span><input type={type} placeholder={placeholder} /></label>
}

export function AuthButton({ children }: { children: React.ReactNode }) {
  return <button className="auth-button" type="submit">{children}</button>
} 

export function AuthHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <header className="auth-heading"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></header>
} 

export function AuthDivider() { return <div className="auth-divider" /> }

export function AuthLinks({ children }: { children: React.ReactNode }) { return <div className="auth-links">{children}</div> }

export function AuthLink({ href, children }: { href: string; children: React.ReactNode }) { return <Link href={href}>{children}</Link> }

export function AuthFormNote({ children }: { children: React.ReactNode }) { return <p className="auth-note">{children}</p> }
