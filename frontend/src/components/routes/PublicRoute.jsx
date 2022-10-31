import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';

// Public routes, you can only access them if you are not logged in
const PublicRoute = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to='/' />;
  }

  return <Outlet />;
};

export default PublicRoute;
