'use client'

import { useRouter } from 'next/navigation'
import { Fragment, useState } from 'react'
import { AuthButton, AuthDivider, AuthField, AuthHeading, AuthLayout, AuthLink, AuthLinks } from '@/components/auth-layout'

export default function IniciarSesionPage() {
  const router = useRouter()
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [requiresCode, setRequiresCode] = useState(false)
  const [code, setCode] = useState('')

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!user.trim() || !password.trim()) {
      setError('Ingresá un usuario y una contraseña para continuar.')
      return
    }
    setError('')
    setRequiresCode(true)
  }

  function verifyCode(event: React.FormEvent<HTMLFormElement>) { event.preventDefault(); if (code.trim().length !== 4) { setError('Ingresá el código de 4 dígitos enviado a tu email.'); return }; document.cookie = 'gb_logged_in=1; path=/; max-age=2592000; SameSite=Lax'; router.push('/cuenta') }
  function updateCode(index: number, value: string) { const digit = value.replace(/\D/g, '').slice(-1); const next = code.padEnd(4, ' ').split(''); next[index] = digit; setCode(next.join('').replace(/\s+$/, '')); }
  function renderCodeInput(index: number) { return <input key={index} aria-label={`Dígito ${index + 1}`} value={code[index] ?? ''} onChange={(event) => { updateCode(index, event.target.value); if (event.target.value) (event.currentTarget.parentElement?.querySelectorAll('input')[index + 1] as HTMLInputElement | undefined)?.focus() }} onKeyDown={(event) => { if (event.key === 'Backspace' && !code[index]) (event.currentTarget.parentElement?.querySelectorAll('input')[index - 1] as HTMLInputElement | undefined)?.focus() }} inputMode="numeric" autoComplete={index === 0 ? 'one-time-code' : 'off'} maxLength={1} /> }

  return <AuthLayout><AuthHeading eyebrow="ÁREA DE CLIENTES" title={requiresCode ? 'Verificá tu ingreso' : 'Iniciá sesión'} description={requiresCode ? `Enviamos un código de seguridad a ${user}.` : 'Accedé a la información de precios y hacé tus pedidos online.'} /><AuthDivider />{requiresCode ? <form className="auth-form" onSubmit={verifyCode}><label className="auth-field auth-code-field"><span>Código de verificación</span><div className="auth-code-inputs" role="group" aria-label="Código de verificación de 4 dígitos">{[0, 1, 2, 3].map((index) => <Fragment key={index}>{index === 2 && <span className="auth-code-separator" aria-hidden="true">-</span>}{renderCodeInput(index)}</Fragment>)}</div></label>{error && <p className="auth-error" role="alert">{error}</p>}<AuthButton>Verificar y continuar</AuthButton><AuthLinks><button type="button" className="auth-text-button" onClick={() => { setRequiresCode(false); setCode(''); setError('') }}>Volver al inicio de sesión</button></AuthLinks></form> : <form className="auth-form" onSubmit={handleSubmit}><label className="auth-field"><span>Usuario o email</span><input required value={user} onChange={(event) => setUser(event.target.value)} placeholder="Ingresá tu usuario o email" autoComplete="username" /></label><label className="auth-field"><span>Contraseña</span><input required value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Ingresá tu contraseña" autoComplete="current-password" /></label><AuthLinks><AuthLink href="/recuperar-clave">Recordar contraseña</AuthLink></AuthLinks>{error && <p className="auth-error" role="alert">{error}</p>}<AuthButton>Iniciar sesión</AuthButton></form>}<AuthDivider /><div className="auth-register"><span>¿Todavía no tenés una cuenta?</span><AuthLink href="/registro">No estoy registrado</AuthLink></div></AuthLayout>
}
