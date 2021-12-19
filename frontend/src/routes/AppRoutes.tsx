import { Route, Routes } from "react-router-dom";
import AuthPage from "../components/pages/AuthPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<AuthPage />} />
    </Routes>
  );
};
export default AppRoutes;
