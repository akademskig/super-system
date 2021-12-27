import {
  FaBorderAll,
  FaScrewdriver,
  FaFileInvoice,
  FaUserCircle,
  FaUserCog,
  FaRegBuilding,
} from 'react-icons/fa'

const sidebarItems = [
  {
    label: 'Dashboard',
    link: '/dashboard',
    Icon: FaBorderAll,
    key: 'dashboard',
  },
  {
    label: 'User settings',
    link: '/user-settings',
    Icon: FaScrewdriver,
    authOnly: true,
    key: 'userSettings',
  },
  {
    label: 'Invoices',
    link: '/invoices',
    Icon: FaFileInvoice,
    authOnly: true,
    key: 'invoices',
  },
  {
    label: 'Clients',
    link: '/clients',
    Icon: FaUserCog,
    authOnly: true,
    key: 'clients',
  },
  {
    label: 'Companies',
    link: '/companies',
    Icon: FaRegBuilding,
    authOnly: true,
    key: 'companies',
  },
]
export default sidebarItems
