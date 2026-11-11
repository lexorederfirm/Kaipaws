import { FormEvent, useEffect, useState } from "react"
import { supabase } from "./supabase"
import { useAuth } from "./auth"
import { wa } from "./common"
const labels: Record<string, string> = { comunidad: "Publicación", producto: "Producto o servicio", adopcion: "En adopción", encontrada: "Mascota encontrada", perdida: "Mascota perdida" }
interface P { title: string; kinds: string[]; price?: boolean; contact?: boolean; location?: boolean; social?: boolean }
export default function Board({ title, kinds, price, contact, location, social }: P) {
  const { user, isAdmin } = useAuth()
  const [posts, setPosts] = useState<any[]>([]); const [likes, setLikes] = useState<any[]>([]); const [open, setOpen] = useState("")
  const [cm, setCm] = useState<any[]>([]); const [ct, setCt] = useState(""); const [msg, setMsg] = useState("")
  const [f, setF] = useState({ kind: kinds[0], title: "", body: "", price: "", contact: "", location: "" })
  const load = async () => {
    const { data } = await supabase!.from("posts").select("*").in("kind", kinds).eq("status", "activo").order("created_at", { ascending: false }).limit(50)
    setPosts(data || [])
    if (social && data?.length) setLikes((await supabase!.from("likes").select("post_id,user_id").in("post_id", data.map(p => p.id))).data || [])
  }
  useEffect(() => { load() }, [])
  async function add(e: FormEvent) {
    e.preventDefault(); setMsg("")
    const { error } = await supabase!.from("posts").insert({ kind: f.kind, title: f.title.trim(), body: f.body.trim() || null, price: f.price ? Number(f.price) : null, contact: f.contact.trim() || null, location: f.location.trim() || null })
    if (error) setMsg(error.message); else { setF({ ...f, title: "", body: "", price: "", contact: "", location: "" }); load() }
  }
  const mine = (id: string) => likes.some(l => l.post_id === id && l.user_id === user!.id)
  async function like(id: string) {
    if (mine(id)) await supabase!.from("likes").delete().eq("post_id", id).eq("user_id", user!.id); else await supabase!.from("likes").insert({ post_id: id })
    load()
  }
  async function toggle(id: string) { if (open === id) return setOpen(""); setOpen(id); setCm((await supabase!.from("comments").select("*").eq("post_id", id).order("created_at")).data || []) }
  async function comment(id: string) { if (!ct.trim()) return; await supabase!.from("comments").insert({ post_id: id, body: ct.trim() }); setCt(""); toggle(id); setOpen(id); setCm((await supabase!.from("comments").select("*").eq("post_id", id).order("created_at")).data || []) }
  async function report(id: string) { const { error } = await supabase!.from("reports").insert({ post_id: id, reason: "Reporte de usuario" }); setMsg(error ? "Ya reportaste esta publicación." : "Gracias, un administrador la revisará.") }
  const del = async (id: string) => { await supabase!.from("posts").delete().eq("id", id); load() }
  return (<div className="mx-auto max-w-2xl"><h1 className="font-display text-3xl">{title}</h1>
    <form onSubmit={add} className="card mt-5 grid gap-3">
      {kinds.length > 1 && <select className="input" value={f.kind} onChange={e => setF({ ...f, kind: e.target.value })}>{kinds.map(k => <option key={k} value={k}>{labels[k]}</option>)}</select>}
      <input className="input" placeholder="Título" required minLength={3} value={f.title} onChange={e => setF({ ...f, title: e.target.value })} />
      <textarea className="input" rows={3} placeholder="Descripción" maxLength={2000} value={f.body} onChange={e => setF({ ...f, body: e.target.value })} />
      {price && <input className="input" type="number" min="0" placeholder="Precio COP (opcional)" value={f.price} onChange={e => setF({ ...f, price: e.target.value })} />}
      {location && <input className="input" placeholder="Zona o barrio aproximado" value={f.location} onChange={e => setF({ ...f, location: e.target.value })} />}
      {contact && <input className="input" placeholder="WhatsApp de contacto" value={f.contact} onChange={e => setF({ ...f, contact: e.target.value })} />}
      <button className="btn-gold">Publicar</button></form>
    {msg && <p className="mt-3 text-sm text-gold">{msg}</p>}
    <div className="mt-5 space-y-3">{posts.length === 0 && <p className="card text-sm text-steel">Aún no hay publicaciones. Sé la primera persona en publicar.</p>}
      {posts.map(p => <div key={p.id} className="card"><p className="text-[10px] uppercase tracking-widest text-steel">{labels[p.kind]} · {p.author_name} · {new Date(p.created_at).toLocaleDateString("es-CO")}</p>
        <h3 className="mt-1 font-semibold">{p.title}{p.price != null ? " · $" + Number(p.price).toLocaleString("es-CO") : ""}</h3>
        {p.body && <p className="mt-1 whitespace-pre-wrap text-sm text-ivory/80">{p.body}</p>}{p.location && <p className="mt-1 text-xs text-steel">Zona: {p.location}</p>}
        <div className="mt-3 flex flex-wrap gap-2 text-sm">
          {p.contact && <a className="btn-ghost" target="_blank" rel="noreferrer" href={wa(p.contact)}>WhatsApp</a>}
          {social && <button className="btn-ghost" onClick={() => like(p.id)}>{mine(p.id) ? "♥" : "♡"} {likes.filter(l => l.post_id === p.id).length}</button>}
          {social && <button className="btn-ghost" onClick={() => toggle(p.id)}>Comentarios</button>}
          <button className="text-xs text-steel hover:text-gold" onClick={() => report(p.id)}>Reportar</button>
          {(p.author === user!.id || isAdmin) && <button className="text-xs text-steel hover:text-red-400" onClick={() => del(p.id)}>Eliminar</button>}</div>
        {open === p.id && <div className="mt-3 space-y-2 border-t border-white/10 pt-3 text-sm">{cm.map(c => <p key={c.id}><b className="text-gold">{c.author_name}:</b> {c.body}</p>)}
          <div className="flex gap-2"><input className="input" placeholder="Escribe un comentario" maxLength={500} value={ct} onChange={e => setCt(e.target.value)} /><button className="btn-gold" onClick={() => comment(p.id)}>Enviar</button></div></div>}</div>)}</div></div>)
}
