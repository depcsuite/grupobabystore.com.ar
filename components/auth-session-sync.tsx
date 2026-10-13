'use client'

import { useEffect } from 'react'

const hasSession = () => document.cookie.split(';').some(cookie => cookie.trim().startsWith('gb_logged_in=1')) || document.documentElement.dataset.authenticated === 'true'

export function AuthSessionSync() {
  useEffect(() => {
    const sync = () => {
      const loggedIn = hasSession()
      document.querySelectorAll<HTMLAnchorElement>('.header-login, a[href="/iniciar-sesion"], a[href="/cuenta"]').forEach(link => {
        const nextHref = loggedIn ? '/cuenta' : '/iniciar-sesion'
        const nextText = loggedIn ? 'MI CUENTA' : 'INGRESAR'
        if (link.getAttribute('href') !== nextHref) link.href = nextHref
        if (link.textContent?.trim() !== nextText) link.textContent = nextText
        if (link.classList.contains('is-authenticated') !== loggedIn) link.classList.toggle('is-authenticated', loggedIn)
      })
      document.querySelectorAll<HTMLElement>('[data-auth-express]').forEach(element => {
        element.hidden = !loggedIn
      })
      document.documentElement.dataset.authenticated = String(loggedIn)
    }

    sync()
    window.setTimeout(sync, 0)
    const interval = window.setInterval(sync, 500)
    window.addEventListener('pageshow', sync)
    window.addEventListener('focus', sync)
    window.addEventListener('gb-auth-changed', sync)
    return () => {
      window.clearInterval(interval)
      window.removeEventListener('pageshow', sync)
      window.removeEventListener('focus', sync)
      window.removeEventListener('gb-auth-changed', sync)
    }
  }, [])

  return null
}
