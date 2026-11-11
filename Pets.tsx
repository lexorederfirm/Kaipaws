import { FormEvent, useEffect, useState } from "react"
import { supabase } from "./supabase"
export default function Pets() {
  const [pets, setPets] = useState<any[]>([]); const [err, setErr] = useState("")
  const [f, setF] = useState({ name: "", species: "perro", breed: "", weight_kg: "" })
  const load = async () => { const { data, error } = await supabase!.from("pets").select("*").order("created_at"); if (error) setErr(error.message); else setPets(data || []) }
  useEffect(() => { load() }, [])
  async function add(e: FormEvent) {
    e.preventDefault(); setErr("")
    const { error } = await supabase!.from("pets").insert({ name: f.name.trim(), species: f.species, breed: f.breed.trim() || null, weight_kg: f.weight_kg ? Number(f.weight_kg) : null })
    if (error) setErr(error.message); else { setF({ name: "", species: "perro", breed: "", weight_kg: "" }); load() }
  }
  const del = async (id: string) => { await supabase!.from("pets").delete().eq("id", id); load() }
  return (<div className="mx-auto max-w-2xl"><h1 className="font-display text-3xl">Mis mascotas</h1>
    <form onSubmit={add} className="card mt-5 grid gap-3 sm:grid-cols-2">
      <input className="input" placeholder="Nombre" required value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
      <select className="input" value={f.species} onChange={e => setF({ ...f, species: e.target.value })}><option value="perro">Perro</option><option value="gato">Gato</option></select>
      <input className="input" placeholder="Raza" value={f.breed} onChange={e => setF({ ...f, breed: e.target.value })} />
      <input className="input" type="number" step="0.1" placeholder="Peso (kg)" value={f.weight_kg} onChange={e => setF({ ...f, weight_kg: e.target.value })} />
      <button className="btn-gold sm:col-span-2">Agregar mascota</button></form>
    {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
    <div className="mt-5 space-y-3">{pets.length === 0 && <p className="text-sm text-steel">Aún no registras mascotas. Agrega la primera arriba.</p>}
      {pets.map(p => <div key={p.id} className="card flex items-center justify-between"><div><p className="font-semibold">{p.species === "gato" ? "🐱" : "🐶"} {p.name}</p>
        <p className="text-xs text-steel">{[p.breed, p.weight_kg && p.weight_kg + " kg"].filter(Boolean).join(" · ") || "Sin más datos"}</p></div>
        <button onClick={() => del(p.id)} className="text-xs text-steel hover:text-red-400">Eliminar</button></div>)}</div></div>)
}
