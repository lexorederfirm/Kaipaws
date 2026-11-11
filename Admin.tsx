import { FormEvent, useEffect, useState } from "react"
import { Navigate } from "react-router-dom"
import { supabase } from "./supabase"
import { useAuth } from "./auth"
export default function Admin() {
  const { isAdmin } = useAuth()
  const [tops, setTops] = useState<any[]>([]); const [biz, setBiz] = useState<any[]>([]); const [msg, setMsg] = useState("")
  const [g, setG] = useState({ email: "", unit: "COP", amount: "", note: "" })
  const load = async () => {
    setTops((await supabase!.from("topups").select("*").eq("status", "pending").order("created_at")).data || [])
    setBiz((await supabase!.from("businesses").select("*").eq("verified", false).eq("source", "usuario")).data || [])
  }
  useEffect(() => { if (isAdmin) load() }, [isAdmin])
  if (!isAdmin) return <Navigate to="/app" replace />
  const done = (error: any) => { setMsg(error ? error.message : "Listo"); load() }
  async function grant(e: FormEvent) { e.preventDefault(); const { error } = await supabase!.rpc("admin_grant", { p_email: g.email, p_unit: g.unit, p_amount: Number(g.amount), p_note: g.note || "Ajuste del administrador" }); done(error) }
  return (<div className="mx-auto max-w-3xl space-y-5"><h1 className="font-display text-3xl">Administración</h1>{msg && <p className="text-sm text-gold">{msg}</p>}
    <div className="card"><h2 className="font-semibold">Recargas pendientes</h2><p className="text-xs text-steel">Confirma primero en tu Nequi, Daviplata o Bre-B que el dinero llegó, con el mismo monto y comprobante.</p>
      {tops.length === 0 && <p className="mt-2 text-sm text-steel">Sin pendientes.</p>}
      {tops.map(t => <div key={t.id} className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm"><span>${Number(t.amount).toLocaleString("es-CO")} · {t.method} · ref {t.reference}</span>
        <span className="flex gap-2"><button className="btn-gold" onClick={async () => done((await supabase!.rpc("approve_topup", { p_id: t.id })).error)}>Aprobar</button>
          <button className="btn-ghost" onClick={async () => done((await supabase!.from("topups").update({ status: "rejected" }).eq("id", t.id)).error)}>Rechazar</button></span></div>)}</div>
    <div className="card"><h2 className="font-semibold">Negocios por verificar</h2>{biz.length === 0 && <p className="mt-2 text-sm text-steel">Sin pendientes.</p>}
      {biz.map(b => <div key={b.id} className="mt-3 flex items-center justify-between gap-2 text-sm"><span>{b.name} · {b.category} · {b.phone || "sin teléfono"}</span>
        <button className="btn-gold" onClick={async () => done((await supabase!.from("businesses").update({ verified: true }).eq("id", b.id)).error)}>Verificar</button></div>)}</div>
    <form onSubmit={grant} className="card grid gap-2 sm:grid-cols-4"><h2 className="font-semibold sm:col-span-4">Dar crédito o puntos</h2>
      <input className="input sm:col-span-2" type="email" placeholder="Correo del usuario" required value={g.email} onChange={e => setG({ ...g, email: e.target.value })} />
      <select className="input" value={g.unit} onChange={e => setG({ ...g, unit: e.target.value })}><option value="COP">Crédito COP</option><option value="PTS">Puntos</option></select>
      <input className="input" type="number" placeholder="Cantidad" required value={g.amount} onChange={e => setG({ ...g, amount: e.target.value })} />
      <input className="input sm:col-span-3" placeholder="Motivo" value={g.note} onChange={e => setG({ ...g, note: e.target.value })} /><button className="btn-gold">Aplicar</button></form></div>)
}
