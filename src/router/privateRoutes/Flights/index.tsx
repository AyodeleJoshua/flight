import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import Flights from '../../../pages/Flights';
import Flight from '../../../pages/Flights/Flight';
import NewFlight from '../../../pages/Flights/NewFlight';
import { useAuth } from '../../../context/auth';
import AuthenticatedNavbar from '../../../components/AuthenticatedNavbar';

const FlightsRoutes = () => {
  const { state } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!state.isLoggedIn) {
      navigate('/auth/login');
    }
  }, []);

  return (
    <>
      <AuthenticatedNavbar />
      <main>
        <Routes>
          <Route index element={<Flights />} />
          <Route path="/new" element={<NewFlight />} />
          <Route path="/:flightId" element={<Flight />} />
        </Routes>
      </main>
    </>
  );
};

export default FlightsRoutes;
