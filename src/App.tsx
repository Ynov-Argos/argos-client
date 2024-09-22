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
import OneTimeSearch from './pages/OneTimeSearch/OneTimeSearch.tsx';
import OneTimeSearchResult from './pages/OneTimeSearch/OneTimeSearchResult.tsx';
import EntityDetails from './pages/Matching/EntityDetails.tsx';
import Client from './pages/Clients/Client.tsx';
import ClientList from './pages/Clients/ClientList.tsx';

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
            <Route path='/one-time-search' element={<> <PageTitle title='ARGOS - Recherche Unique' /> <OneTimeSearch/> </>}></Route>
            <Route path='/one-time-search/:id' element={<> <PageTitle title='ARGOS - Résultat de la recherche' /> <OneTimeSearchResult/> </>}></Route>
            <Route path='/matching/entity/:id' element={<> <PageTitle title={'ARGOS - Détail Gel des Avoirs'}/> <EntityDetails/></>}></Route>
            <Route path='/client/:id' element={<> <PageTitle title={'ARGOS - Client'}/> <Client/></>} ></Route>
            <Route path='/client/list' element={<> <PageTitle title={'ARGOS - Clients'}/> <ClientList/></>} ></Route>S
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
