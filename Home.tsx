import { Link } from 'react-router-dom'
import { modules } from './modules'
import { useAuth } from './auth'
export default function Home() {
  const { name } = useAuth()
  return (<div className="mx-auto max-w-5xl">
    <h1 className="font-display text-3xl">Hola, <span className="text-gold">{name || 'bienvenido'}</span></h1>
    <p className="mt-1 text-steel">Estos son los módulos de KAI Paws y la etapa en la que se habilitan.</p>
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {modules.filter(m => m.path !== '/app').map(m => (
        <Link key={m.path} to={m.path} className="card hover:border-gold/60">
          <div className="flex items-center justify-between"><span className="text-2xl text-gold">{m.icon}</span>
            <span className="text-[10px] uppercase tracking-widest text-steel">{m.built ? 'Disponible' : `Día ${m.unlockDay}`}</span></div>
          <h3 className="mt-2 font-semibold">{m.label}</h3><p className="mt-1 text-sm text-steel">{m.desc}</p></Link>))}
    </div></div>)
}
