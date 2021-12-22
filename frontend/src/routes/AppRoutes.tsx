import { Route, Routes } from 'react-router-dom'
import DashboardPage from '../components/pages/DashboardPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />}/>
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  )
}
export default AppRoutes
