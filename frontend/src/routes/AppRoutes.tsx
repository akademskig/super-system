import { Route, Routes } from 'react-router-dom'
import ClientsPage from '../components/pages/ClientsPage'
import DashboardPage from '../components/pages/DashboardPage'
import InvoicesPage from '../components/pages/InvoicesPage'
import NewInvoicePage from '../components/pages/NewInvoicePage'

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/invoices" element={<InvoicesPage />} />
      <Route path="/new-invoice" element={<NewInvoicePage />} />
      <Route path="/clients" element={<ClientsPage />} />
    </Routes>
  )
}
export default AppRoutes
