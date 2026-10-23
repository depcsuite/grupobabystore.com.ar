'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

type AuthSessionValue = {
  isLoggedIn: boolean
  isReady: boolean
  login: () => void
  logout: () => void
}

const AuthSessionContext = createContext<AuthSessionValue | null>(null)
const sessionCookie = 'gb_logged_in'
const sessionDuration = 60 * 60 * 24 * 30

function hasSessionCookie() {
  const cookie = document.cookie
    .split(';')
    .map(item => item.trim())
    .find(item => item.startsWith(`${sessionCookie}=`))

  return cookie?.slice(sessionCookie.length + 1) === '1'
}

function writeSessionCookie(value: '1' | '') {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  const maxAge = value ? sessionDuration : 0
  document.cookie = `${sessionCookie}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`
}

export function AuthSessionProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const sync = () => {
      setIsLoggedIn(hasSessionCookie())
      setIsReady(true)
    }

    sync()
    window.addEventListener('pageshow', sync)
    window.addEventListener('focus', sync)
    window.addEventListener('gb-auth-changed', sync)
    return () => {
      window.removeEventListener('pageshow', sync)
      window.removeEventListener('focus', sync)
      window.removeEventListener('gb-auth-changed', sync)
    }
  }, [])

  const login = useCallback(() => {
    writeSessionCookie('1')
    setIsLoggedIn(true)
    setIsReady(true)
    window.dispatchEvent(new Event('gb-auth-changed'))
  }, [])

  const logout = useCallback(() => {
    writeSessionCookie('')
    setIsLoggedIn(false)
    setIsReady(true)
    window.dispatchEvent(new Event('gb-auth-changed'))
  }, [])

  const value = useMemo(() => ({ isLoggedIn, isReady, login, logout }), [isLoggedIn, isReady, login, logout])

  return <AuthSessionContext.Provider value={value}>{children}</AuthSessionContext.Provider>
}

export function useAuthSession() {
  const context = useContext(AuthSessionContext)
  if (!context) throw new Error('useAuthSession debe usarse dentro de AuthSessionProvider')
  return context
}
