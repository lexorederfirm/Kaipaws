import { Routes, Route, Navigate } from 'react-router-dom'
import Landing from './Landing'
import AuthPage from './AuthPage'
import Shell from './Shell'
import Home from './Home'
import Profile from './Profile'
import ComingSoon from './ComingSoon'
import { modules } from './modules'
import { useAuth } from './auth'

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
        {modules.filter(m => m.stage > 1).map(m =>
          <Route key={m.path} path={m.path.replace('/app/', '')} element={<ComingSoon mod={m} />} />)}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
