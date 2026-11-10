import { useAuth } from './auth'
export default function Profile() {
  const { user, name, logout } = useAuth()
  return (<div className="mx-auto max-w-xl"><h1 className="font-display text-3xl">Perfil</h1>
    <div className="card mt-6 space-y-2 text-sm">
      <p><span className="text-steel">Nombre: </span>{name || '—'}</p>
      <p><span className="text-steel">Correo: </span>{user?.email}</p>
      <p className="pt-2 text-xs text-steel">Ciudad, país, preferencias y notificaciones se guardan en la Etapa 2 (Supabase).</p></div>
    <button onClick={logout} className="btn-ghost mt-6">Cerrar sesión</button></div>)
}
