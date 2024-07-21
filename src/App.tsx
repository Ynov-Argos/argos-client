import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Client from './pages/Client/Client.tsx';
import ClientList from './pages/Client/ListClient.tsx';

import DefaultDashboard from './pages/Dashboard/DefaultDashboard.tsx';
import ClientForm from './components/Forms/Client/ClientForm.tsx';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Routes>

        <Route
          path="/"
          element={
            <>
              <PageTitle title="ARGOS" />
              <DefaultDashboard />
            </>
          }
        />
         <Route
          path="/client"
          element={
            <>
              <PageTitle title="ARGOS CLIENT" />
              <Client />
            </>
          }
        />
        <Route
          path="/clientListe"
          element={
            <>
              <PageTitle title="ARGOS CLIENT Liste" />
              <ClientList />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
