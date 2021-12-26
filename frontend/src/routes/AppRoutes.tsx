import { Route, Routes } from 'react-router-dom'
import ClientsPage from '../components/pages/ClientsPage'
import DashboardPage from '../components/pages/DashboardPage'
import InvoicesPage from '../components/pages/InvoicesPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      <Route path="/clients" element={<ClientsPage />} />
    </Routes>
  )
}
export default AppRoutes
