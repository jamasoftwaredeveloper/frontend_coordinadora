import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useQueryClient } from "@tanstack/react-query";
const AdminGuard: React.FC = () => {

  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(["getUser"]);


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
