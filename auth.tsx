import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase, supabaseConfigured } from "./supabase"
const NOT_CONFIGURED = "Supabase aún no está configurado."
interface Ctx { user: User | null; name: string; role: string; isAdmin: boolean; days: number; loading: boolean
  register(name: string, email: string, pass: string, ref?: string): Promise<boolean>
  login(email: string, pass: string): Promise<void>
  reset(email: string): Promise<void>; logout(): Promise<void> }
const C = createContext<Ctx>(null as unknown as Ctx)
export const useAuth = () => useContext(C)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState("USUARIO")
  const [loading, setLoading] = useState(supabaseConfigured)
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); setLoading(false) })
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => data.subscription.unsubscribe()
  }, [])
  useEffect(() => {
    if (!supabase || !user) { setRole("USUARIO"); return }
    supabase.from("profiles").select("role").eq("id", user.id).maybeSingle().then(({ data }) => setRole(data?.role || "USUARIO"))
  }, [user])
  const need = () => { if (!supabase) throw new Error(NOT_CONFIGURED); return supabase }
  const days = user ? Math.floor((Date.now() - new Date(user.created_at).getTime()) / 864e5) : 0
  const value: Ctx = { user, loading, role, days, isAdmin: role === "SUPER_ADMIN" || role === "ADMIN",
    name: (user?.user_metadata?.full_name as string) || "",
    register: async (name, email, pass, ref) => {
      const { data, error } = await need().auth.signUp({ email, password: pass, options: { data: { full_name: name, ref: ref || "" } } })
      if (error) throw error
      return Boolean(data.session)
    },
    login: async (email, pass) => { const { error } = await need().auth.signInWithPassword({ email, password: pass }); if (error) throw error },
    reset: async email => { const { error } = await need().auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + "/ingresar" }); if (error) throw error },
    logout: async () => { if (supabase) await supabase.auth.signOut() } }
  return <C.Provider value={value}>{children}</C.Provider>
}
