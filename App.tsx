import { Routes, Route, Navigate } from "react-router-dom"
import Landing from "./Landing"
import AuthPage from "./AuthPage"
import Shell from "./Shell"
import Home from "./Home"
import Profile from "./Profile"
import ComingSoon from "./ComingSoon"
import Pets from "./Pets"
import Wallet from "./Wallet"
import Directory from "./Directory"
import Admin from "./Admin"
import { modules, Mod } from "./modules"
import { useAuth } from "./auth"
const pages: Record<string, () => JSX.Element> = { "/app/mascotas": Pets, "/app/wallet": Wallet, "/app/services": Directory }
function Gate({ mod }: { mod: Mod }) {
  const { days, isAdmin } = useAuth()
  if (!isAdmin && days < mod.unlockDay) return (
    <div className="mx-auto max-w-xl text-center"><div className="text-5xl text-gold">{mod.icon}</div>
      <h1 className="mt-3 font-display text-3xl">{mod.label}</h1>
      <p className="card mt-6 text-sm">Se abre el día {mod.unlockDay} de tu prueba gratis. Faltan <b className="text-gold">{mod.unlockDay - days}</b> días.</p></div>)
  const Page = pages[mod.path]
  return Page ? <Page /> : <ComingSoon mod={mod} />
}
function Protected({ children }: { children: JSX.Element }) {
  const { user, loading } = useAuth()
  if (loading) return <p className="p-10 text-steel">Cargando…</p>
  return user ? children : <Navigate to="/ingresar" replace />
}
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/ingresar" element={<AuthPage mode="login" />} />
      <Route path="/registro" element={<AuthPage mode="register" />} />
      <Route path="/recuperar" element={<AuthPage mode="reset" />} />
      <Route path="/app" element={<Protected><Shell /></Protected>}>
        <Route index element={<Home />} />
        <Route path="perfil" element={<Profile />} />
        <Route path="admin" element={<Admin />} />
        {modules.filter(m => m.path !== "/app" && m.path !== "/app/perfil").map(m =>
          <Route key={m.path} path={m.path.replace("/app/", "")} element={<Gate mod={m} />} />)}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
