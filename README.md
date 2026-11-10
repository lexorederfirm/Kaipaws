# KAI Paws — Etapa 1

## Ejecutar
1. Instala Node.js 20+.
2. `npm install`
3. Copia `.env.example` a `.env` y completa las claves de Supabase (ver abajo).
4. `npm run dev` → http://localhost:5173

## Configurar Supabase (plan Free, sin tarjeta)
1. supabase.com → New project (plan Free; no agregues tarjeta). Elige la región más cercana (São Paulo).
2. Project Settings → API: copia **Project URL** y la clave **anon public** al `.env`.
   NUNCA pongas la clave `service_role` en el frontend ni en Git.
3. Authentication → Providers: Email habilitado.
4. Authentication → URL Configuration: Site URL `http://localhost:5173` (al publicar, agrega tu dominio).
5. Correos: por defecto Supabase exige confirmar el correo y su envío integrado tiene un límite bajo. Para pruebas puedes desactivar "Confirm email"; para producción configura un SMTP propio (hay opciones gratuitas con cupo limitado).
6. Plan Free: el proyecto se pausa tras 7 días sin actividad (los datos se conservan; se reactiva desde el panel).

## Publicar (Etapa 6)
`npm run build` y sube `dist/` a un hosting estático gratuito (Cloudflare Pages, Netlify o Vercel; se define en la Etapa 6).

## Estado
Disponible: marca, landing, registro, login, recuperación, panel y navegación (5 accesos en móvil).
Pendiente: mascotas/salud/diario (E2), IA (E3), ecosistema (E4), admin y roles (E5), PWA completa con service worker (E6).
Google/Apple login: se prepara en la Etapa 2 (Apple requiere cuenta de desarrollador paga; Google es gratis).
