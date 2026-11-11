import { FormEvent, useEffect, useState } from "react"
import { supabase } from "./supabase"
import { useAuth } from "./auth"
const NUM = "3057824410"
const channels = [["nequi", "Nequi", NUM], ["daviplata", "Daviplata", NUM], ["breb", "Llave Bre-B", "@" + NUM]]
const cop = (n: number) => "$" + Math.round(n).toLocaleString("es-CO")
export default function Wallet() {
  const { user, days } = useAuth()
  const [tx, setTx] = useState<any[]>([]); const [tops, setTops] = useState<any[]>([]); const [code, setCode] = useState("")
  const [f, setF] = useState({ method: "nequi", amount: "", reference: "" }); const [msg, setMsg] = useState("")
  const load = async () => {
    const s = supabase!
    setTx((await s.from("wallet_tx").select("*").order("created_at", { ascending: false })).data || [])
    setTops((await s.from("topups").select("*").order("created_at", { ascending: false })).data || [])
    setCode((await s.from("profiles").select("referral_code").eq("id", user!.id).maybeSingle()).data?.referral_code || "")
  }
  useEffect(() => { load() }, [])
  const sum = (u: string) => tx.filter(t => t.unit === u).reduce((a, t) => a + Number(t.amount), 0)
  async function send(e: FormEvent) {
    e.preventDefault(); setMsg("")
    const { error } = await supabase!.from("topups").insert({ method: f.method, amount: Number(f.amount), reference: f.reference.trim() })
    if (error) setMsg(error.message); else { setMsg("Solicitud enviada. Se acredita cuando se verifique el pago."); setF({ ...f, amount: "", reference: "" }); load() }
  }
  const link = location.origin + "/registro?ref=" + code
  return (<div className="mx-auto max-w-2xl space-y-5"><h1 className="font-display text-3xl">Wallet</h1>
    <div className="grid grid-cols-2 gap-3"><div className="card"><p className="text-xs text-steel">Crédito</p><p className="text-2xl text-gold">{cop(sum("COP"))}</p></div>
      <div className="card"><p className="text-xs text-steel">Puntos</p><p className="text-2xl text-gold">{sum("PTS")}</p></div></div>
    <p className="card text-sm">Prueba gratis: llevas <b className="text-gold">{days}</b> de 60 días. Aún no se cobra nada; los módulos se abren día a día.</p>
    <div className="card space-y-2"><h2 className="font-semibold">Recargar</h2>
      <p className="text-xs text-steel">1) Envía el dinero a cualquiera de estos canales. 2) Registra aquí el monto y el número de comprobante. 3) Se acredita al verificar el pago.</p>
      {channels.map(c => <p key={c[0]} className="text-sm"><span className="text-steel">{c[1]}: </span><b>{c[2]}</b></p>)}
      <form onSubmit={send} className="grid gap-2 pt-2 sm:grid-cols-3">
        <select className="input" value={f.method} onChange={e => setF({ ...f, method: e.target.value })}>{channels.map(c => <option key={c[0]} value={c[0]}>{c[1]}</option>)}</select>
        <input className="input" type="number" min="5000" placeholder="Monto COP" required value={f.amount} onChange={e => setF({ ...f, amount: e.target.value })} />
        <input className="input" placeholder="N.º de comprobante" required value={f.reference} onChange={e => setF({ ...f, reference: e.target.value })} />
        <button className="btn-gold sm:col-span-3">Registrar recarga</button></form>
      {msg && <p className="text-sm text-gold">{msg}</p>}</div>
    <div className="card space-y-2"><h2 className="font-semibold">Gana puntos por referir</h2>
      <p className="text-xs text-steel">Recibes 100 puntos por cada persona que se registre con tu código; ella recibe 50.</p>
      <p className="break-all text-sm">Código: <b className="text-gold">{code || "…"}</b></p>
      <button className="btn-ghost" onClick={() => navigator.clipboard?.writeText(link).then(() => setMsg("Enlace copiado"))}>Copiar mi enlace</button></div>
    <div className="card"><h2 className="font-semibold">Movimientos</h2>
      {tx.length === 0 && tops.length === 0 && <p className="mt-2 text-sm text-steel">Aún no tienes movimientos.</p>}
      {tops.filter(t => t.status !== "approved").map(t => <p key={t.id} className="mt-2 text-sm text-steel">{cop(t.amount)} por {t.method} · {t.status === "pending" ? "pendiente de verificar" : "rechazada"}</p>)}
      {tx.map(t => <p key={t.id} className="mt-2 text-sm">{new Date(t.created_at).toLocaleDateString("es-CO")} · {t.kind} · <b className="text-gold">{t.unit === "COP" ? cop(t.amount) : t.amount + " pts"}</b></p>)}</div></div>)
}
