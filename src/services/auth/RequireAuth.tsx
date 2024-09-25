import {useLocation, Navigate, Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {selectToken} from './AuthSlice.ts';

const RequireAuth = () => {
  const location = useLocation();
  const token = useSelector(selectToken) ?? localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login"  state={{from: location}} replace/>;
  }

  return <Outlet />;
};

export default RequireAuth;
