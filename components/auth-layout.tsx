'use client'

import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { SiteFooter } from './site-footer'
import { PromoTopbar } from './promo-topbar'
import { AccountMenu } from './account-menu'


export function AuthLayout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)
  return <main className="auth-page"><PromoTopbar /><header className="site-header"><div className="header-inner"><button className="mobile-menu" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button><Link href="/" className="brand"><img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-babystore-klfdfcTpVMM0KnSFJTMWDSKE9qJY1k.jpg" alt="Grupo Baby Store" /></Link><nav className={`main-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Navegación principal"><Link href="/">Inicio</Link><Link href="/productos">Productos</Link><Link href="/nosotros">Nosotros</Link><Link href="/como-comprar">Cómo comprar</Link><Link href="/contacto">Contacto</Link><AccountMenu variant="mobile" active /></nav><div className="header-actions"><AccountMenu active /></div></div></header><section className="auth-card">{children}</section><SiteFooter showContact={false} /></main>
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
