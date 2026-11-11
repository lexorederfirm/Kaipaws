import { FormEvent, useEffect, useState } from "react"
import { supabase } from "./supabase"
const cats = ["Veterinaria", "Hospital", "Farmacia", "Peluquería", "Guardería", "Tienda", "Paseador", "Entrenador", "Hotel Pet Friendly", "Restaurante Pet Friendly"]
const dist = (a: number, b: number, c: number, d: number) => { const r = Math.PI / 180, x = Math.sin((c - a) * r / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin((d - b) * r / 2) ** 2; return 12742 * Math.asin(Math.sqrt(x)) }
const wa = (n: string) => { const d = n.replace(/\D/g, ""); return "https://wa.me/" + (d.length === 10 ? "57" + d : d) }
export default function Directory() {
  const [list, setList] = useState<any[]>([]); const [cat, setCat] = useState(""); const [pos, setPos] = useState<[number, number] | null>(null)
  const [msg, setMsg] = useState(""); const [f, setF] = useState({ name: "", category: cats[0], address: "", phone: "", whatsapp: "" })
  const load = async () => setList((await supabase!.from("businesses").select("*").order("name")).data || [])
  useEffect(() => { load() }, [])
  const locate = () => navigator.geolocation.getCurrentPosition(p => setPos([p.coords.latitude, p.coords.longitude]), () => setMsg("No se pudo obtener tu ubicación. Revisa el permiso del navegador."))
  let shown = list.filter(b => !cat || b.category === cat)
  if (pos) shown = [...shown].sort((x, y) => (x.lat == null ? 1e9 : dist(pos[0], pos[1], x.lat, x.lng)) - (y.lat == null ? 1e9 : dist(pos[0], pos[1], y.lat, y.lng)))
  async function add(e: FormEvent) {
    e.preventDefault(); setMsg("")
    const { error } = await supabase!.from("businesses").insert({ ...f, phone: f.phone || null, whatsapp: f.whatsapp || null, address: f.address || null, lat: pos?.[0] ?? null, lng: pos?.[1] ?? null })
    if (error) setMsg(error.message); else { setMsg("Recibimos tu negocio. Aparecerá cuando sea verificado."); setF({ ...f, name: "", address: "", phone: "", whatsapp: "" }) }
  }
  return (<div className="mx-auto max-w-3xl"><h1 className="font-display text-3xl">Servicios</h1>
    <div className="mt-4 flex flex-wrap gap-2"><select className="input w-auto" value={cat} onChange={e => setCat(e.target.value)}><option value="">Todas las categorías</option>{cats.map(c => <option key={c}>{c}</option>)}</select>
      <button onClick={locate} className="btn-ghost">{pos ? "Ordenado por cercanía" : "Cerca de mí"}</button></div>
    {msg && <p className="mt-3 text-sm text-gold">{msg}</p>}
    <div className="mt-5 space-y-3">{shown.length === 0 && <p className="card text-sm text-steel">Aún no hay negocios en esta categoría. Registra el tuyo abajo o espera la carga de negocios verificados de Pasto.</p>}
      {shown.map(b => <div key={b.id} className="card"><div className="flex justify-between gap-2"><h3 className="font-semibold">{b.name}</h3>
        <span className={"text-[10px] uppercase tracking-widest " + (b.verified ? "text-gold" : "text-steel")}>{b.verified ? "Verificado" : "Por verificar"}</span></div>
        <p className="text-xs text-steel">{b.category}{b.address ? " · " + b.address : ""}{pos && b.lat != null ? " · " + dist(pos[0], pos[1], b.lat, b.lng).toFixed(1) + " km" : ""}</p>
        <div className="mt-3 flex flex-wrap gap-2">{b.phone && <a className="btn-ghost" href={"tel:" + b.phone}>Llamar</a>}{b.whatsapp && <a className="btn-ghost" href={wa(b.whatsapp)} target="_blank" rel="noreferrer">WhatsApp</a>}
          {(b.lat != null || b.address) && <a className="btn-ghost" target="_blank" rel="noreferrer" href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(b.lat != null ? b.lat + "," + b.lng : b.address + ", Pasto")}>Cómo llegar</a>}</div></div>)}</div>
    <details className="card mt-6"><summary className="cursor-pointer text-gold">Registrar mi negocio</summary>
      <form onSubmit={add} className="mt-3 grid gap-2"><input className="input" placeholder="Nombre" required value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
        <select className="input" value={f.category} onChange={e => setF({ ...f, category: e.target.value })}>{cats.map(c => <option key={c}>{c}</option>)}</select>
        <input className="input" placeholder="Dirección" value={f.address} onChange={e => setF({ ...f, address: e.target.value })} />
        <input className="input" placeholder="Teléfono" value={f.phone} onChange={e => setF({ ...f, phone: e.target.value })} />
        <input className="input" placeholder="WhatsApp" value={f.whatsapp} onChange={e => setF({ ...f, whatsapp: e.target.value })} />
        <p className="text-xs text-steel">Si tocaste «Cerca de mí» antes, se guarda tu ubicación actual como la del negocio.</p><button className="btn-gold">Enviar para verificación</button></form></details></div>)
}
