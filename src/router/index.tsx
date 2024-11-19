import { Navigate, Route, Routes } from 'react-router-dom';

import { lazy, Suspense } from 'react';
import Spinner from '../lib/Spinner';

const FlightsRoutes = lazy(() => import('./privateRoutes/Flights'));
const AuthRoutes = lazy(() => import('./publicRoutes/Auth'));

const Router = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path="/flights/*" element={<FlightsRoutes />} />
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route path="*" element={<Navigate to="/flights" />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
