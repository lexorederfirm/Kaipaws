import { Mod } from './modules'
export default function ComingSoon({ mod }: { mod: Mod }) {
  return (<div className="mx-auto max-w-xl text-center"><div className="text-5xl text-gold">{mod.icon}</div>
    <h1 className="mt-3 font-display text-3xl">{mod.label}</h1><p className="mt-2 text-steel">{mod.desc}</p>
    <p className="card mt-6 text-sm">Este módulo aún no está construido. Se desarrolla en la <b className="text-gold">Etapa {mod.stage}</b>.</p></div>)
}
