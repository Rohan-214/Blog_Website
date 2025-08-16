import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAuthenticated}) => {
  if (!isAuthenticated) {
    return <Navigate to= "/login"  />;
  }
  return <Outlet />; // Renders the child routes if authenticated
};

export default ProtectedRoute;