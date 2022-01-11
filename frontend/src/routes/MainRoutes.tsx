import { Navigate, Route, Routes } from 'react-router-dom'
import useAuth from '../components/hooks/useAuth'
import AuthPage from '../components/pages/AuthPage'
import MainPage from '../components/pages/MainPage'

const MainRoutes = () => {
  const { checkAuth } = useAuth()
  return (
    <Routes>
      <Route
        path="/*"
        element={checkAuth() ? <MainPage /> : <Navigate to="/auth" />}
      />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}
export default MainRoutes
