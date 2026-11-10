export interface Mod { path: string; label: string; icon: string; desc: string; stage: number; main?: boolean }
export const modules: Mod[] = [
  { path: '/app', label: 'Inicio', icon: '⌂', desc: 'Tu resumen diario', stage: 1, main: true },
  { path: '/app/mascotas', label: 'Mascotas', icon: '🐾', desc: 'Perfiles de tus perros y gatos', stage: 2, main: true },
  { path: '/app/health', label: 'KAI Health', icon: '✚', desc: 'Historial médico, vacunas y recordatorios', stage: 2, main: true },
  { path: '/app/vet-ia', label: 'KAI Vet IA', icon: '✦', desc: 'Asistente con señales de urgencia; no sustituye al veterinario', stage: 3, main: true },
  { path: '/app/perfil', label: 'Perfil', icon: '☺', desc: 'Tus datos y preferencias', stage: 1, main: true },
  { path: '/app/diario', label: 'Diario inteligente', icon: '✎', desc: 'Alimentación, paseos, ánimo y síntomas', stage: 2 },
  { path: '/app/nutrition', label: 'KAI Nutrition', icon: '❦', desc: 'Alimentación según especie y condición', stage: 3 },
  { path: '/app/community', label: 'KAI Community', icon: '☷', desc: 'Red social de mascotas', stage: 4 },
  { path: '/app/services', label: 'KAI Services', icon: '⌖', desc: 'Directorio de Pasto y Colombia', stage: 4 },
  { path: '/app/market', label: 'KAI Market', icon: '◈', desc: 'Catálogo y contacto con vendedores', stage: 4 },
  { path: '/app/adopcion', label: 'Adopción y perdidas', icon: '♡', desc: 'Adopciones y mascotas perdidas', stage: 4 },
  { path: '/app/academy', label: 'KAI Academy', icon: '✐', desc: 'Cursos y primeros auxilios', stage: 4 },
]
