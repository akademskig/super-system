import { FaBorderAll, FaScrewdriver } from 'react-icons/fa'

const sidebarItems = [
  {
    label: 'Dashboard',
    link: '/dashboard',
    Icon: FaBorderAll,
  },
  {
    label: 'User settings',
    link: '/user-settings',
    Icon: FaScrewdriver,
    authOnly: true,
  },
]
export default sidebarItems
