import { createClient } from '@supabase/supabase-js'
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined
export const supabaseConfigured = Boolean(url && key)
// Solo la clave "anon" (pública) va en el frontend. Nunca uses la "service_role" aquí.
export const supabase = supabaseConfigured ? createClient(url!, key!) : null
