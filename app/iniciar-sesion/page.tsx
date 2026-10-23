'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AuthButton, AuthDivider, AuthField, AuthHeading, AuthLayout, AuthLink, AuthLinks } from '@/components/auth-layout'
import { useAuthSession } from '@/components/auth-session-sync'

export default function IniciarSesionPage() {
  const router = useRouter()
  const { login } = useAuthSession()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')


  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user.trim() || !password.trim()) {
      setError('Ingresá un usuario y una contraseña para continuar.')
      return
    }
    setError('')
    login()
    router.replace('/productos')
    router.refresh()
  }

  return <AuthLayout><AuthHeading eyebrow="ÁREA DE CLIENTES" title="Iniciá sesión" description="Accedé a la información de precios y hacé tus pedidos online." /><AuthDivider /><form className="auth-form" onSubmit={handleSubmit}><label className="auth-field"><span>Usuario o email</span><input required value={user} onChange={(event) => setUser(event.target.value)} placeholder="Ingresá tu usuario o email" autoComplete="username" /></label><label className="auth-field"><span>Contraseña</span><input required value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Ingresá tu contraseña" autoComplete="current-password" /></label><AuthLinks><AuthLink href="/recuperar-clave">Recordar contraseña</AuthLink></AuthLinks>{error && <p className="auth-error" role="alert">{error}</p>}<AuthButton>Iniciar sesión</AuthButton></form><AuthDivider /><div className="auth-register"><span>¿Todavía no tenés una cuenta?</span><AuthLink href="/registro">No estoy registrado</AuthLink></div></AuthLayout>
}
