export interface Mod { path: string; label: string; icon: string; desc: string; stage: number; unlockDay: number; built?: boolean; main?: boolean }
// unlockDay: día de la prueba gratis (60 días) en que se abre cada módulo. Se ajusta aquí.
export const modules: Mod[] = [
  { path: "/app", label: "Inicio", icon: "⌂", desc: "Tu resumen", stage: 1, unlockDay: 0, built: true, main: true },
  { path: "/app/mascotas", label: "Mascotas", icon: "🐾", desc: "Perfiles de tus perros y gatos", stage: 2, unlockDay: 0, built: true, main: true },
  { path: "/app/services", label: "Servicios", icon: "⌖", desc: "Directorio con GPS: veterinarias y más", stage: 4, unlockDay: 0, built: true, main: true },
  { path: "/app/wallet", label: "Wallet", icon: "◎", desc: "Crédito, recargas y puntos por referidos", stage: 2, unlockDay: 0, built: true, main: true },
  { path: "/app/perfil", label: "Perfil", icon: "☺", desc: "Tus datos", stage: 1, unlockDay: 0, built: true, main: true },
  { path: "/app/health", label: "KAI Health", icon: "✚", desc: "Historial médico y vacunas", stage: 2, unlockDay: 3, built: true },
  { path: "/app/diario", label: "Diario inteligente", icon: "✎", desc: "Alimentación, paseos y ánimo", stage: 2, unlockDay: 7, built: true },
  { path: "/app/vet-ia", label: "KAI Vet IA", icon: "✦", desc: "Asistente; no sustituye al veterinario", stage: 3, unlockDay: 14, built: true },
  { path: "/app/nutrition", label: "KAI Nutrition", icon: "❦", desc: "Alimentación según especie", stage: 3, unlockDay: 21, built: true },
  { path: "/app/community", label: "KAI Community", icon: "☷", desc: "Red social de mascotas", stage: 4, unlockDay: 30 },
  { path: "/app/market", label: "KAI Market", icon: "◈", desc: "Catálogo y contacto con vendedores", stage: 4, unlockDay: 40 },
  { path: "/app/adopcion", label: "Adopción y perdidas", icon: "♡", desc: "Adopciones y mascotas perdidas", stage: 4, unlockDay: 40 },
  { path: "/app/academy", label: "KAI Academy", icon: "✐", desc: "Cursos y primeros auxilios", stage: 4, unlockDay: 50 },
]
