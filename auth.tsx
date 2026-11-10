import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase, supabaseConfigured } from './supabase'

const NOT_CONFIGURED = 'Supabase aún no está configurado. Copia .env.example a .env y completa las claves (ver README).'
interface Ctx { user: User | null; name: string; loading: boolean
  register(name: string, email: string, pass: string): Promise<boolean>
  login(email: string, pass: string): Promise<void>
  reset(email: string): Promise<void>; logout(): Promise<void> }
const C = createContext<Ctx>(null as unknown as Ctx)
export const useAuth = () => useContext(C)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(supabaseConfigured)
  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => { setUser(data.session?.user ?? null); setLoading(false) })
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setUser(s?.user ?? null))
    return () => data.subscription.unsubscribe()
  }, [])
  const need = () => { if (!supabase) throw new Error(NOT_CONFIGURED); return supabase }
  const value: Ctx = { user, loading, name: (user?.user_metadata?.full_name as string) || '',
    register: async (name, email, pass) => {
      const { data, error } = await need().auth.signUp({ email, password: pass, options: { data: { full_name: name } } })
      if (error) throw error
      return Boolean(data.session)
    },
    login: async (email, pass) => { const { error } = await need().auth.signInWithPassword({ email, password: pass }); if (error) throw error },
    reset: async email => { const { error } = await need().auth.resetPasswordForEmail(email, { redirectTo: window.location.origin + '/ingresar' }); if (error) throw error },
    logout: async () => { if (supabase) await supabase.auth.signOut() } }
  return <C.Provider value={value}>{children}</C.Provider>
}
