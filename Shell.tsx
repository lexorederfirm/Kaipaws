import logo from './logo.png'
import { NavLink, Outlet, Link } from 'react-router-dom'
import { modules } from './modules'
import { useAuth } from './auth'
export default function Shell() {
  const { logout, isAdmin } = useAuth(); const main = modules.filter(m => m.main); const all = isAdmin ? [...modules, { path: '/app/admin', label: 'Administración', icon: '⚙', desc: '', stage: 5, unlockDay: 0, built: true }] : modules
  const cls = ({ isActive }: { isActive: boolean }) => isActive ? 'text-gold' : 'text-steel hover:text-ivory'
  return (
    <div className="min-h-screen md:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/10 bg-night/40 p-4 md:flex">
        <Link to="/app"><img src={logo} alt="KAI Paws" className="mb-6 h-16 rounded" /></Link>
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {all.map(m => <NavLink key={m.path} to={m.path} end={m.path === '/app'} className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2 text-sm ${isActive ? 'bg-gold/10 text-gold' : 'text-steel hover:text-ivory'}`}><span className="w-5 text-center">{m.icon}</span>{m.label}</NavLink>)}
        </nav>
        <button onClick={logout} className="btn-ghost mt-4">Cerrar sesión</button>
      </aside>
      <main className="flex-1 p-5 pb-24 md:p-10 md:pb-10"><Outlet /></main>
      <nav className="fixed inset-x-0 bottom-0 z-10 flex justify-around border-t border-white/10 bg-ink/95 py-2 backdrop-blur md:hidden" style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}>
        {main.map(m => <NavLink key={m.path} to={m.path} end={m.path === '/app'} className={cls}><div className="flex flex-col items-center text-[11px]"><span className="text-lg">{m.icon}</span>{m.label.replace('KAI ', '')}</div></NavLink>)}
      </nav>
    </div>)
}
