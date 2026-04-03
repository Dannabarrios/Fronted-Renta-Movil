// src/routes/AppRouter.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegistroPage from '../modules/auth/pages/RegistroPage';

const AppRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/registro" element={<RegistroPage />} />
    </Routes>
  </BrowserRouter>
);

export default AppRouter;