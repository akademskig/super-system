import { FaBorderAll, FaScrewdriver } from 'react-icons/fa'

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
]
export default sidebarItems
