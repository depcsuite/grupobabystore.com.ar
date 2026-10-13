'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, ShoppingBag } from 'lucide-react'
import { useAuthSession } from '@/components/auth-session-sync'

const accountLinks = [
  { href: '/cuenta/datos-personales', label: 'Datos personales' },
  { href: '/cuenta/mis-pedidos', label: 'Mis pedidos' },
  { href: '/cuenta/cuenta-corriente', label: 'Cuenta corriente' },
]

export function AccountMenu({ active = false }: { active?: boolean }) {
  const { isLoggedIn, logout } = useAuthSession()
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('mousedown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  const closeMenu = () => setOpen(false)
  const signOut = () => {
    logout()
    setOpen(false)
    router.replace('/')
  }

  return (
    <>
      {pathname !== '/productos' && (
        <Link className="header-order" href={isLoggedIn ? '/productos' : '/iniciar-sesion'}>
          <ShoppingBag size={16} /> Hacé tu pedido
        </Link>
      )}
      {isLoggedIn ? (
        <div className="account-dropdown" ref={menuRef}>
          <button className={`header-login account-dropdown-trigger${active ? ' active' : ''}`} type="button" aria-expanded={open} aria-controls="account-dropdown-options" onClick={() => setOpen(current => !current)}>
            MI CUENTA <ChevronDown size={15} aria-hidden="true" />
          </button>
          <div className="account-dropdown-menu" id="account-dropdown-options" hidden={!open}>
            <nav aria-label="Opciones de mi cuenta">
              {accountLinks.map(link => (
                <Link href={link.href} key={link.href} onClick={closeMenu}>{link.label}</Link>
              ))}
              <button type="button" onClick={signOut}>Cerrar sesión</button>
            </nav>
          </div>
        </div>
      ) : (
        <Link className={`header-login${active ? ' active' : ''}`} href="/iniciar-sesion"><ShoppingBag size={16} /> INGRESAR</Link>
      )}
    </>
  )
}
