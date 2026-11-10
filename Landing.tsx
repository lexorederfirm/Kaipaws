import logo from './logo.png'
import { Link } from 'react-router-dom'
import { modules } from './modules'
export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ink to-night/40">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <img src={logo} alt="KAI Paws" className="h-12 w-auto rounded" />
        <nav className="flex gap-2"><Link to="/ingresar" className="btn-ghost">Ingresar</Link>
          <Link to="/registro" className="btn-gold">Crear cuenta</Link></nav>
      </header>
      <section className="mx-auto max-w-3xl px-5 py-16 text-center">
        <p className="mb-3 text-xs tracking-[0.35em] text-gold">INTELLIGENT PET CARE</p>
        <h1 className="font-display text-4xl font-bold sm:text-6xl">El bienestar de tu mascota, <span className="text-gold">conectado</span>.</h1>
        <p className="mt-5 text-steel">Una plataforma para propietarios, veterinarios y negocios pet friendly. Empezamos en Pasto, Nariño.</p>
        <p className="mt-2 italic text-ivory/80">Conectando. Cuidando. Protegiendo.</p>
        <Link to="/registro" className="btn-gold mt-8">Comenzar gratis</Link>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-20 sm:grid-cols-2 lg:grid-cols-3">
        {modules.filter(m => m.path !== '/app' && m.path !== '/app/perfil').map(m => (
          <div key={m.path} className="card"><div className="text-2xl text-gold">{m.icon}</div>
            <h3 className="mt-2 font-semibold">{m.label}</h3><p className="mt-1 text-sm text-steel">{m.desc}</p></div>))}
      </section>
      <footer className="border-t border-white/10 py-6 text-center text-xs text-steel">© KAI Paws · La IA orienta, no reemplaza al veterinario.</footer>
    </div>)
}
