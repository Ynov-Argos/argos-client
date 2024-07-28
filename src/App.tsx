import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import DefaultDashboard from './pages/Dashboard/Default.tsx';
import LogIn from './pages/Authentication/LogIn.tsx';
import Layout from './layout/Layout.tsx';
import RequireAuth from './services/auth/RequireAuth.tsx';
import User from './pages/User/User.tsx';
import UserList from './pages/User/UserList.tsx';

import Client from './pages/Client/Client.tsx';
import ClientList from './pages/Client/ListClient.tsx';



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (<Loader />) : (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          {/* public routes */}
          <Route path='login' element={<> <PageTitle title="ARGOS - Login" /> <LogIn /> </>}></Route>

          {/* private routes */}
          <Route element={<RequireAuth />}>
            <Route path='' element={<> <PageTitle title='ARGOS' /> <DefaultDashboard/> </>}></Route>
            <Route path='/user/:id' element={<> <PageTitle title='ARGOS - User' /> <User/> </>}></Route>
            <Route path='/user/list' element={<> <PageTitle title='ARGOS - User' /> <UserList/> </>}></Route>
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
          </Route>
        </Route>
        
      </Routes>
    </>
  );
}

export default App;
