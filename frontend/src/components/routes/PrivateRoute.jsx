import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

// Private routes, you can only access them if you're logged in
const PrivateRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to='/login' />;
  }

  return <Outlet />;
};

export default PrivateRoute;
