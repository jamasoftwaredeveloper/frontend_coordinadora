import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserAuthQuery } from '../hooks/Queries/useAuthQuery';

// Define tipos para las funciones que obtienen token y rol

const AdminGuard: React.FC = () => {
  
  const { data: user } = useUserAuthQuery();
  console.log("user",user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default AdminGuard;
