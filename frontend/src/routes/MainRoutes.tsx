import { Route, Routes } from 'react-router-dom'
import AuthPage from '../components/pages/AuthPage'
import MainPage from '../components/pages/MainPage'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  )
}
export default MainRoutes
