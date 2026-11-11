import { FormEvent, useEffect, useState } from "react"
import { supabase } from "./supabase"
import { usePets, today } from "./common"
const kinds = ["vacuna", "desparasitación", "antipulgas", "medicamento", "cirugía", "examen", "otro"]
export default function Health() {
  const { pets, pet, picker } = usePets()
  const [rows, setRows] = useState<any[]>([]); const [err, setErr] = useState("")
  const [f, setF] = useState({ kind: "vacuna", title: "", date: today(), next_date: "", notes: "" })
  const load = async () => { if (!pet) return; const { data } = await supabase!.from("health_records").select("*").eq("pet_id", pet).order("date", { ascending: false }); setRows(data || []) }
  useEffect(() => { load() }, [pet])
  async function add(e: FormEvent) {
    e.preventDefault(); setErr("")
    const { error } = await supabase!.from("health_records").insert({ pet_id: pet, kind: f.kind, title: f.title.trim(), date: f.date, next_date: f.next_date || null, notes: f.notes.trim() || null })
    if (error) setErr(error.message); else { setF({ ...f, title: "", next_date: "", notes: "" }); load() }
  }
  const del = async (id: string) => { await supabase!.from("health_records").delete().eq("id", id); load() }
  const left = (d: string) => Math.ceil((new Date(d).getTime() - Date.now()) / 864e5)
  const soon = rows.filter(r => r.next_date && left(r.next_date) <= 30).sort((a, b) => a.next_date.localeCompare(b.next_date))
  return (<div className="mx-auto max-w-2xl"><h1 className="font-display text-3xl">KAI Health</h1>{picker}
    {pets.length > 0 && <>
      {soon.length > 0 && <div className="card mt-4 border-gold/60"><h2 className="font-semibold text-gold">Próximos y vencidos</h2>
        {soon.map(r => <p key={r.id} className="mt-1 text-sm">{r.title} · {left(r.next_date) < 0 ? "vencido hace " + -left(r.next_date) + " días" : "en " + left(r.next_date) + " días"} ({r.next_date})</p>)}
        <p className="mt-2 text-xs text-steel">Los avisos se ven aquí dentro de la app. Los avisos por notificación llegan en una entrega posterior.</p></div>}
      <form onSubmit={add} className="card mt-4 grid gap-3 sm:grid-cols-2">
        <select className="input" value={f.kind} onChange={e => setF({ ...f, kind: e.target.value })}>{kinds.map(k => <option key={k}>{k}</option>)}</select>
        <input className="input" placeholder="Nombre (ej. Rabia, Triple felina)" required value={f.title} onChange={e => setF({ ...f, title: e.target.value })} />
        <label className="text-xs text-steel">Fecha<input className="input mt-1" type="date" required value={f.date} onChange={e => setF({ ...f, date: e.target.value })} /></label>
        <label className="text-xs text-steel">Próxima (opcional)<input className="input mt-1" type="date" value={f.next_date} onChange={e => setF({ ...f, next_date: e.target.value })} /></label>
        <input className="input sm:col-span-2" placeholder="Notas (opcional)" value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} />
        <button className="btn-gold sm:col-span-2">Guardar registro</button></form>
      {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
      <div className="mt-5 space-y-3">{rows.length === 0 && <p className="text-sm text-steel">Aún no hay registros para esta mascota.</p>}
        {rows.map(r => <div key={r.id} className="card flex justify-between gap-2"><div><p className="font-semibold">{r.title} <span className="text-xs text-steel">· {r.kind}</span></p>
          <p className="text-xs text-steel">{r.date}{r.next_date ? " · próxima " + r.next_date : ""}{r.notes ? " · " + r.notes : ""}</p></div>
          <button onClick={() => del(r.id)} className="text-xs text-steel hover:text-red-400">Eliminar</button></div>)}</div></>}</div>)
}
