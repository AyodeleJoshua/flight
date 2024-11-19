import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Login from '../../../pages/Auth/Login';
import Register from '../../../pages/Auth/Register';
import { useAuth } from '../../../context/auth';
import { useEffect } from 'react';

const AuthRoutes = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.isLoggedIn) {
      navigate('/flights');
    }
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
};

export default AuthRoutes;
