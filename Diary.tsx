import { FormEvent, useEffect, useState } from "react"
import { supabase } from "./supabase"
import { usePets, today } from "./common"
export default function Diary() {
  const { pets, pet, picker } = usePets()
  const [rows, setRows] = useState<any[]>([]); const [err, setErr] = useState("")
  const [f, setF] = useState({ date: today(), mood: "bien", water: "normal", walk_min: "", food: "", symptoms: "", notes: "" })
  const load = async () => { if (!pet) return; const { data } = await supabase!.from("diary").select("*").eq("pet_id", pet).order("date", { ascending: false }).limit(30); setRows(data || []) }
  useEffect(() => { load() }, [pet])
  async function add(e: FormEvent) {
    e.preventDefault(); setErr("")
    const { error } = await supabase!.from("diary").insert({ pet_id: pet, date: f.date, mood: f.mood, water: f.water, walk_min: f.walk_min ? Number(f.walk_min) : null, food: f.food.trim() || null, symptoms: f.symptoms.trim() || null, notes: f.notes.trim() || null })
    if (error) setErr(error.message); else { setF({ ...f, walk_min: "", food: "", symptoms: "", notes: "" }); load() }
  }
  const week = rows.filter(r => Date.now() - new Date(r.date).getTime() < 7 * 864e5)
  const walks = week.filter(r => r.walk_min != null)
  const avg = walks.length ? Math.round(walks.reduce((a, r) => a + r.walk_min, 0) / walks.length) : null
  const sym = week.filter(r => r.symptoms).length
  return (<div className="mx-auto max-w-2xl"><h1 className="font-display text-3xl">Diario</h1>{picker}
    {pets.length > 0 && <>
      <div className="card mt-4 text-sm"><p className="font-semibold text-gold">Resumen de 7 días</p>
        <p className="mt-1">Días registrados: {week.length}{avg != null ? " · paseo promedio: " + avg + " min" : ""} · días con síntomas anotados: {sym}</p>
        <p className="mt-1 text-xs text-steel">Solo cuenta lo que registras. No es un diagnóstico; ante dudas, consulta a un veterinario.</p></div>
      <form onSubmit={add} className="card mt-4 grid gap-3 sm:grid-cols-2">
        <input className="input" type="date" required value={f.date} onChange={e => setF({ ...f, date: e.target.value })} />
        <select className="input" value={f.mood} onChange={e => setF({ ...f, mood: e.target.value })}><option value="bien">Ánimo: bien</option><option value="regular">Ánimo: regular</option><option value="decaído">Ánimo: decaído</option></select>
        <select className="input" value={f.water} onChange={e => setF({ ...f, water: e.target.value })}><option value="poco">Agua: poca</option><option value="normal">Agua: normal</option><option value="mucho">Agua: mucha</option></select>
        <input className="input" type="number" min="0" max="600" placeholder="Paseo (minutos)" value={f.walk_min} onChange={e => setF({ ...f, walk_min: e.target.value })} />
        <input className="input sm:col-span-2" placeholder="Alimentación (qué y cuánto comió)" value={f.food} onChange={e => setF({ ...f, food: e.target.value })} />
        <input className="input sm:col-span-2" placeholder="Síntomas (vómito, tos, deposiciones…)" value={f.symptoms} onChange={e => setF({ ...f, symptoms: e.target.value })} />
        <input className="input sm:col-span-2" placeholder="Notas" value={f.notes} onChange={e => setF({ ...f, notes: e.target.value })} />
        <button className="btn-gold sm:col-span-2">Guardar día</button></form>
      {err && <p className="mt-3 text-sm text-red-400">{err}</p>}
      <div className="mt-5 space-y-3">{rows.length === 0 && <p className="text-sm text-steel">Aún no hay entradas para esta mascota.</p>}
        {rows.map(r => <div key={r.id} className="card text-sm"><p className="font-semibold">{r.date} · ánimo {r.mood} · agua {r.water}{r.walk_min != null ? " · paseo " + r.walk_min + " min" : ""}</p>
          {r.food && <p className="text-steel">Comió: {r.food}</p>}{r.symptoms && <p className="text-gold">Síntomas: {r.symptoms}</p>}{r.notes && <p className="text-steel">{r.notes}</p>}</div>)}</div></>}</div>)
}
