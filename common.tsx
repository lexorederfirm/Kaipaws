import { useEffect, useState } from "react"
import { supabase } from "./supabase"
export function usePets() {
  const [pets, setPets] = useState<any[]>([]); const [pet, setPet] = useState("")
  useEffect(() => { supabase!.from("pets").select("id,name,species").order("created_at").then(({ data }) => { setPets(data || []); if (data?.length) setPet(data[0].id) }) }, [])
  const picker = pets.length === 0
    ? <p className="card mt-5 text-sm text-steel">Primero registra una mascota en la sección Mascotas.</p>
    : <select className="input mt-5" value={pet} onChange={e => setPet(e.target.value)}>{pets.map(p => <option key={p.id} value={p.id}>{p.species === "gato" ? "🐱" : "🐶"} {p.name}</option>)}</select>
  return { pets, pet, picker }
}
export const today = () => new Date().toISOString().slice(0, 10)
