import { Route, Routes } from 'react-router-dom'
import ClientsPage from '../components/pages/ClientsPage'
import CompaniesPage from '../components/pages/CompaniesPage'
import DashboardPage from '../components/pages/DashboardPage'
import InvoicesPage from '../components/pages/InvoicesPage'
import UserSettingsPage from '../components/pages/UserSettingsPage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      <Route path="/clients" element={<ClientsPage />} />
      <Route path="/companies" element={<CompaniesPage />} />
      <Route path="/user-settings" element={<UserSettingsPage />} />
    </Routes>
  )
}
export default AppRoutes
