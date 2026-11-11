import logo from './logo.png'
import { FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from './auth'
import { supabaseConfigured } from './supabase'

const titles = { login: 'Ingresar', register: 'Crear cuenta', reset: 'Recuperar contraseña' }
export default function AuthPage({ mode }: { mode: 'login' | 'register' | 'reset' }) {
  const { login, register, reset } = useAuth(); const nav = useNavigate()
  const [f, setF] = useState({ name: '', email: '', pass: '', ref: new URLSearchParams(location.search).get('ref') || '' })
  const [msg, setMsg] = useState(''); const [err, setErr] = useState(''); const [busy, setBusy] = useState(false)
  async function submit(e: FormEvent) {
    e.preventDefault(); setErr(''); setMsg(''); setBusy(true)
    try {
      if (mode === 'login') { await login(f.email, f.pass); nav('/app') }
      else if (mode === 'register') { const ok = await register(f.name.trim(), f.email, f.pass, f.ref.trim()); if (ok) nav('/app'); else setMsg('Cuenta creada. Revisa tu correo para confirmarla y luego ingresa.') }
      else { await reset(f.email); setMsg('Si el correo existe, recibirás un enlace para restablecerla.') }
    } catch (x) { setErr(x instanceof Error ? x.message : 'Ocurrió un error') }
    setBusy(false)
  }
  return (
    <div className="grid min-h-screen place-items-center px-5">
      <form onSubmit={submit} className="card w-full max-w-sm space-y-4">
        <Link to="/"><img src={logo} alt="KAI Paws" className="mx-auto h-20 rounded" /></Link>
        <h1 className="text-center font-display text-2xl">{titles[mode]}</h1>
        {!supabaseConfigured && <p className="rounded-lg bg-gold/10 p-3 text-xs text-gold">Supabase no está configurado: completa el archivo .env para habilitar el acceso.</p>}
        {mode === 'register' && <input className="input" placeholder="Nombre" required value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />}
        {mode === 'register' && <input className="input" placeholder="Código de referido (opcional)" value={f.ref} onChange={e => setF({ ...f, ref: e.target.value })} />}
        <input className="input" type="email" placeholder="Correo" required autoComplete="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} />
        {mode !== 'reset' && <input className="input" type="password" placeholder="Contraseña (mín. 8)" required minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={f.pass} onChange={e => setF({ ...f, pass: e.target.value })} />}
        {err && <p className="text-sm text-red-400">{err}</p>}{msg && <p className="text-sm text-gold">{msg}</p>}
        <button disabled={busy} className="btn-gold w-full">{busy ? 'Procesando…' : titles[mode]}</button>
        <div className="flex justify-between text-xs text-steel">
          {mode === 'login' ? <><Link to="/registro" className="hover:text-gold">Crear cuenta</Link><Link to="/recuperar" className="hover:text-gold">¿Olvidaste tu contraseña?</Link></>
            : <Link to="/ingresar" className="hover:text-gold">Volver a ingresar</Link>}
        </div>
      </form>
    </div>)
}
