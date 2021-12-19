import { FaFortAwesomeAlt } from "react-icons/fa"
import { GiAlienBug } from "react-icons/gi"
import { IconType } from "react-icons/lib"

export type DashboardItem = {
  label: string
  Icon?: IconType
}
const dashboardItems = [
  {
    label: "Game1",
    Icon: FaFortAwesomeAlt,
  },
  {
    label: "Game2",
    Icon: GiAlienBug,
  },
]
export default dashboardItems
