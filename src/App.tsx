import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultDashboard from './pages/Dashboard/Default.tsx';
import LogIn from './pages/Authentication/LogIn.tsx';

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

        <Route path="/auth/login" element={<> <PageTitle title="ARGOS - Login" /> <LogIn /> </>}></Route>
      </Routes>
    </>
  );
}

export default App;
