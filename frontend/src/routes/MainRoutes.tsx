import { Route, Routes } from 'react-router-dom'
import Game1 from '../components/modules/Game1'
import Game2 from '../components/modules/Game2'
import AuthPage from '../components/pages/AuthPage'
import MainPage from '../components/pages/MainPage'

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<MainPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/games/game1" element={<Game1 />} />
      <Route path="/games/game2" element={<Game2 />} />
    </Routes>
  )
}
export default MainRoutes
