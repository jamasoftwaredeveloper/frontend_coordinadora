import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useQueryClient } from "@tanstack/react-query";
import { User } from '../types/TUser';
const AdminGuard: React.FC = () => {

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData<User>(["getUser"]);


  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }
  /*
    if (user) {
      return <Navigate to="/admin" replace />;
    }*/

  if (user?.role !== 'admin') {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export default AdminGuard;
